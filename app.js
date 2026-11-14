import firstBank from './banks/2026-11.js'

const root = document.querySelector('#app')
const sessionLimit = 10 * 60 * 1000
const slots = ['读准指令', '找全条件', '找材料依据', '答齐小问', '读清英文要求']
const subjects = ['语文', '数学', '语文', '数学', '英语']
const subjectAt = (item,index) => item.subject ?? subjects[index]
const groups = {practice:'审题练习',test:'独立小测'}
const stateKey = 'changsha-workbook-v1'
const stored = load()
let {records, active} = stored
let persistent = true
let banks = [firstBank]
let interval
let feedback = false

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey))
    if (Array.isArray(saved?.records)) return {records:saved.records,active:saved.active ?? null}
  } catch {}
  return {records:[],active:null}
}

function save() {
  try {
    localStorage.setItem(stateKey, JSON.stringify({records,active}))
  } catch {
    persistent = false
  }
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
})[char])
const monthLabel = month => month.replace('-', ' 年 ').replace(/$/, ' 月')
const localDate = date => new Intl.DateTimeFormat('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Shanghai'}).format(date)
const durationLabel = ms => {
  const seconds = Math.max(0, Math.ceil(ms / 1000))
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

async function loadBanks() {
  try {
    const response = await fetch('./banks/index.json', {cache:'no-cache'})
    if (!response.ok) return
    const {months} = await response.json()
    const additional = [...new Set(months)].filter(m => /^\d{4}-(0[1-9]|1[0-2])$/.test(m) && m !== firstBank.month)
    const results = await Promise.allSettled(additional.map(month => import(`./banks/${month}.js`)))
    banks.push(...results.filter(r => r.status === 'fulfilled').map(r => r.value.default).filter(validBank))
    banks.sort((a,b) => b.month.localeCompare(a.month))
  } catch {}
}

function validBank(bank) {
  return !!bank?.month && ['practice','test'].every(mode =>
    Array.isArray(bank[mode]) && bank[mode].length > 0 &&
    bank[mode].every(set => Array.isArray(set) && set.length === slots.length &&
      set.every((item,index) => item && subjectAt(item,index) === subjects[index] &&
        (index !== slots.length - 1 || item.subject === '英语' && item.lang === 'en'))))
}

function route(page) {
  if (location.hash === '#' + page) render()
  else location.hash = page
}

function view(html) {
  root.innerHTML = html
  root.focus({preventScroll:true})
  window.scrollTo(0,0)
}

function panelPage(title, content) {
  return `<div class="narrow"><a class="back" href="#home">← 返回首页</a><h1 class="page-title">${title}</h1>${content}</div>`
}

function render() {
  clearInterval(interval)
  const page = location.hash.slice(1) || 'home'
  if (active && Date.now() >= active.deadline) {
    finish(true)
    return
  }
  document.querySelectorAll('nav a').forEach(a => {
    if (a.hash === '#' + page) a.setAttribute('aria-current','page')
    else a.removeAttribute('aria-current')
  })
  if (page === 'session' && active) {
    renderQuestion()
  } else if (page === 'practice' || page === 'test') {
    renderStart(page)
  } else if (page === 'result' && records.length) {
    renderResult(records.at(-1))
  } else if (page === 'scores') {
    renderScores()
  } else if (page === 'bank') {
    renderBanks()
  } else {
    root.replaceChildren(document.querySelector('#home-template').content.cloneNode(true))
    const bank = banks[0]
    const count = [...bank.practice,...bank.test].reduce((total,set) => total + set.length,0)
    document.querySelector('#bank-title').textContent = monthLabel(bank.month) + '题库'
    document.querySelector('#bank-summary').textContent = count + ' 道原创题 · ' + bank.summary
    if (active) {
      const link = document.createElement('a')
      link.className = 'button'
      link.href = '#session'
      link.textContent = '继续上一次' + groups[active.mode]
      root.querySelector('.hero-copy').append(' ',link)
    }
  }
  if (active) {
    tick()
    interval = setInterval(tick,250)
  }
}

function renderStart(mode) {
  const heading = groups[mode]
  const message = mode === 'practice'
    ? '先读整题，可以点一下题目里的关键短句。每做完一题，就能回看和修改一次。'
    : '像在试卷上一样读题和作答。你可以来回检查，整组交卷后会看到答案。'
  const bank = banks[0]
  const all = availableSets(mode)
  const resume = active
    ? `<p class="notice">你还有一组${groups[active.mode]}，剩余 ${durationLabel(active.deadline - Date.now())}。</p><a href="#session" class="button primary">继续完成</a>`
    : `<button class="button primary" data-action="start" data-mode="${mode}">开始${heading}</button>`
  view(panelPage(heading,`<section class="panel"><h2>${slots.length} 道题 · 最长 10 分钟</h2><p class="subtle">语文 2 题，数学 2 题，英语 1 题。</p><p>${message}</p>
    <p class="notice">${monthLabel(bank.month)}题库 · ${all.length} 组可用${mode === 'test' ? '，优先用你没见过的题。' : ''}</p>
    <div class="controls">${resume}</div></section>`))
}

function availableSets(mode) {
  return banks.flatMap(bank => bank[mode].map((questions,index) => ({
    id:`${bank.month}-${mode}-${index + 1}`, month:bank.month, questions
  })))
}

function start(mode) {
  if (active) return route('session')
  const sets = availableSets(mode)
  const seen = new Set(records.map(record => record.setId))
  const next = sets.find(set => !seen.has(set.id))
  const last = records.filter(record => record.mode === mode).at(-1)
  const repeatIndex = sets.findIndex(set => set.id === last?.setId)
  const chosen = next ?? sets[(repeatIndex + 1) % sets.length]
  const started = Date.now()
  active = {
    mode, setId:chosen.id, month:chosen.month, questions:chosen.questions,
    repeat:!next, started, deadline:started + sessionLimit, index:0,
    responses:chosen.questions.map(() => ({answers:{},marks:[],first:null,checked:false}))
  }
  feedback = false
  save()
  route('session')
}

function fieldHtml(field, index, answer, practice, lang) {
  if (!field.options) {
    return `<div class="field-title"><label for="answer-${index}">${escapeHtml(field.label)}</label></div>
      <div class="number-field"><input id="answer-${index}" data-field="${index}" inputmode="decimal" type="text" autocomplete="off" value="${escapeHtml(answer ?? '')}" maxlength="20">
      <span>${escapeHtml(field.unit)}</span></div>`
  }
  const legend = practice || index > 0 ? field.label : '作答'
  return `<legend>${escapeHtml(legend)}</legend>` + field.options.map((option,i) => `
    <label class="choice"><input type="radio" name="field-${index}" data-field="${index}" value="${i}" ${answer === String(i) ? 'checked' : ''}>
    <span${lang ? ' lang="en"' : ''}>${'ABCDEF'[i]}. ${escapeHtml(option)}</span></label>`).join('')
}

function renderQuestion() {
  const {mode,index,questions,responses} = active
  const item = questions[index]
  const response = responses[index]
  const practice = mode === 'practice'
  const markText = practice ? '<p class="mark-label">点一下你想标记的短句</p>' : ''
  const questionText = item.parts.map((part,i) => practice
    ? `<button type="button" class="segment" data-action="mark" data-mark="${i}" aria-pressed="${response.marks.includes(i)}">${escapeHtml(part)}</button>`
    : escapeHtml(part)).join(practice || item.lang === 'en' ? ' ' : '')
  const progress = questions.map((_,i) => {
    const filled = Object.values(responses[i].answers).some(value => value !== '')
    return `<button type="button" data-action="jump" data-index="${i}" ${i === index ? 'aria-current="step"' : ''} ${practice ? 'disabled' : ''} class="${filled ? 'answered' : ''}" aria-label="第 ${i + 1} 题${filled ? '，已有作答' : ''}">${i + 1}</button>`
  }).join('')
  const action = practice && !response.checked
    ? '<button type="button" class="button primary" data-action="check">检查这一题</button>'
    : practice
      ? `<button type="button" class="button primary" data-action="${index < questions.length - 1 ? 'next' : 'finish'}">${index < questions.length - 1 ? '下一题 →' : '看练习结果'}</button>`
      : `<button type="button" class="button" data-action="prev" ${index === 0 ? 'disabled' : ''}>上一题</button>
         ${index < questions.length - 1 ? '<button type="button" class="button primary" data-action="next">下一题 →</button>' : ''}`
  const checkText = practice && response.checked ? practiceFeedback(item,response) : ''
  view(`<div class="narrow"><div class="topline"><h1>${groups[mode]} · 第 ${index + 1} / ${questions.length} 题</h1><span class="clock" id="clock" aria-label="剩余时间">${durationLabel(active.deadline - Date.now())}</span></div>
    <div class="progress" style="--steps:${questions.length}" aria-label="题目进度">${progress}</div>
    <section class="panel"><p class="subject">${subjectAt(item,index)}${practice ? ' · ' + (item.skill ?? slots[index]) : ''}</p>
    <h2>${escapeHtml(item.title)}</h2>${markText}<p class="question"${item.lang === 'en' ? ' lang="en"' : ''}>${questionText}</p>
    ${item.fields.map((field,i) => `<fieldset>${fieldHtml(field,i,response.answers[i],practice,item.lang === 'en')}</fieldset>`).join('')}
    <div class="controls">${action}${practice ? '' : '<button type="button" class="button end" data-action="review">检查并交卷</button>'}</div>${checkText}
    </section><a href="#home" class="back">暂回首页</a></div>`)
  tick()
}

function scoreItem(item, response) {
  const statuses = item.fields.map((field,i) => {
    const raw = String(response.answers[i] ?? '').trim().replace(/[０-９．]/g, char =>
      char === '．' ? '.' : String(char.charCodeAt(0) - 0xFF10))
    if (!raw) return 'empty'
    const valid = field.options ? raw === String(field.correct)
      : /^\+?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw) && Number(raw) === field.correct
    return valid ? 'correct' : 'wrong'
  })
  return {statuses, correct:statuses.every(s => s === 'correct'), missing:statuses.filter(s => s === 'empty').length}
}

function practiceFeedback(item,response) {
  const score = scoreItem(item,response)
  const missed = item.keys.some(k => !response.marks.includes(k))
  if (score.correct && !missed) return '<div class="feedback good" role="status">答齐了，关键短句也标出来了。</div>'
  if (feedback) return `<div class="feedback" role="status">${escapeHtml(item.explanation)}<br>可标记：${item.keys.map(k => escapeHtml(item.parts[k])).join(' / ')}</div>`
  return `<div class="feedback" role="status"><b>${score.missing ? `还有 ${score.missing} 项没有填写。` : score.correct ? '答案对了，再找一找关键短句。' : '有答案需要再核对。'}</b>
    <p>${escapeHtml(item.tip)}</p><div class="controls"><button type="button" class="button" data-action="retry">修改后再检查</button><button type="button" class="button" data-action="reveal">看解析</button></div></div>`
}

function review() {
  view(panelPage('准备交卷',`<section class="panel"><p>交卷后就可以看本组结果。</p>
    <p class="subtle">剩余时间 <span id="clock"></span></p>
    <div class="controls"><button type="button" class="button" data-action="back-question">继续检查</button><button type="button" class="button primary" data-action="finish">确认交卷</button></div></section>`))
  tick()
}

function finish(expired = false) {
  if (!active) return
  const {mode,setId,month,questions,responses,repeat,started,deadline} = active
  const results = questions.map((item,i) => {
    const response = responses[i]
    const first = response.first ?? response
    return {title:item.title, subject:subjectAt(item,i), explanation:item.explanation, fields:item.fields.map(field => field.label),
      first:scoreItem(item,first), final:scoreItem(item,response), attempted:Object.values(response.answers).some(value => String(value).trim()),
      missed:mode === 'practice' ? item.keys.filter(k => !first.marks.includes(k)).length : null}
  })
  const record = {mode,setId,month,repeat,expired,results,date:Math.min(Date.now(),deadline),elapsed:Math.min(Date.now() - started,sessionLimit)}
  records.push(record)
  active = null
  save()
  route('result')
}

function tick() {
  if (!active) return
  const left = active.deadline - Date.now()
  if (left <= 0) return finish(true)
  const clock = document.querySelector('#clock')
  if (clock) {
    clock.textContent = durationLabel(left)
    clock.classList.toggle('soon',left <= 60_000)
  }
}

function metrics(record) {
  return {
    correct:record.results.filter(result => result.final.correct).length,
    blanks:record.results.reduce((sum,result) => sum + result.final.missing,0),
    partial:record.results.filter(result => result.attempted && result.final.missing > 0).length
  }
}

function stats(record) {
  const {correct,blanks,partial} = metrics(record)
  return `<div class="score-grid"><div class="stat"><b>${correct} / ${record.results.length}</b>整题答对</div><div class="stat"><b>${blanks} 项</b>空白（${partial} 题部分作答）</div><div class="stat"><b>${durationLabel(record.elapsed)}</b>用时</div></div>`
}

function itemDetails(record) {
  return record.results.map((item,i) => {
    const {correct,missing} = item.final
    const mark = correct ? '答对' : missing ? `有 ${missing} 项空白` : '可以再看'
    const first = record.mode === 'practice'
      ? `<p>第一次作答 ${item.first.correct ? '整题答对' : item.first.missing ? '有 ' + item.first.missing + ' 项空白' : '答案待核对'}${item.missed ? '，有 ' + item.missed + ' 处建议标记的短句未标出' : ''}。</p>` : ''
    return `<details class="record"><summary>第 ${i + 1} 题 · ${subjectAt(item,i)} · ${escapeHtml(item.title)} <span class="badge ${correct ? '' : 'warn'}">${mark}</span></summary>
      ${first}<p>${escapeHtml(item.explanation)}</p></details>`
  }).join('')
}

function renderResult(record) {
  view(panelPage(record.mode === 'test' ? '小测结果' : '练习结果',
    `<section class="panel"><h2>${record.expired ? '10 分钟到了，已提交' : '这组完成了'}</h2>${stats(record)}
    ${record.repeat ? '<p class="subtle">这组题以前做过，保留为复练记录。</p>' : ''}
    ${persistent ? '' : '<p class="notice">浏览器无法保存记录。关闭页面前可以查看本次结果。</p>'}
    ${itemDetails(record)}<div class="controls"><a class="button primary" href="#scores">看成绩对比</a><a class="button" href="#home">回首页</a></div></section>`))
}

function renderScores() {
  const fresh = records.filter(record => record.mode === 'test' && !record.repeat && record.results.length === slots.length).slice(-2)
  const comparison = fresh.length === 2 ? compare(...fresh) : `<p class="subtle">完成两组三科独立小测后，这里会显示对比。已完成 ${fresh.length} / 2 组。</p>`
  const history = records.slice().reverse().map(record => {
    const {correct} = metrics(record)
    return `<details class="record"><summary>${localDate(record.date)} · ${groups[record.mode]} · ${correct}/${record.results.length} 题${record.repeat ? ' · 复练' : ''}</summary>${stats(record)}${itemDetails(record)}</details>`
  }).join('') || '<p class="subtle">完成一组练习或小测后，就能在这里看到记录。</p>'
  view(panelPage('成绩记录',`<section class="panel"><h2>最近两次独立小测</h2>${comparison}</section>
    <section class="panel"><h2>练习与测试记录</h2>${history}</section>`))
}

function compare(before,after) {
  const a = metrics(before)
  const b = metrics(after)
  const fields = record => record.results.reduce((count,item) => count + item.fields.length,0)
  const subjectScore = (record,subject) => {
    const items = record.results.filter((item,index) => subjectAt(item,index) === subject)
    return items.filter(item => item.final.correct).length + '/' + items.length
  }
  return `<p class="subtle">${localDate(before.date)} → ${localDate(after.date)} · 两组都为 ${slots.length} 道新题</p>
    <div class="score-grid"><div class="stat"><b>${a.correct} → ${b.correct}</b>整题答对 / ${slots.length}</div>
    <div class="stat"><b>${a.blanks}/${fields(before)} → ${b.blanks}/${fields(after)}</b>空白作答项</div>
    <div class="stat"><b>${a.partial} → ${b.partial}</b>部分作答题数</div></div>
    <p class="subject-scores">${[...new Set(subjects)].map(subject =>
      `<span>${subject} <b>${subjectScore(before,subject)} → ${subjectScore(after,subject)}</b></span>`).join('')}</p>`
}

function renderBanks() {
  const list = banks.map(bank => `<section class="panel"><h2>${monthLabel(bank.month)}题库</h2>
    <p>${escapeHtml(bank.summary)}</p><p class="subtle">原创 · 语文、数学、英语 · ${bank.practice.length} 组练习、${bank.test.length} 组小测</p></section>`).join('')
  view(panelPage('月度题库', list))
}

function capture(event) {
  if (!active || location.hash !== '#session' || event.target.dataset.field === undefined) return
  if (Date.now() >= active.deadline) return finish(true)
  const {field} = event.target.dataset
  active.responses[active.index].answers[field] = event.target.value
  const current = document.querySelector('[aria-current="step"]')
  current?.classList.toggle('answered',Object.values(active.responses[active.index].answers).some(Boolean))
  save()
}

root.addEventListener('input',capture)
root.addEventListener('click',event => {
  const button = event.target.closest('[data-action]')
  if (!button) return
  const {action,mode,index,mark} = button.dataset
  if (action === 'start') return start(mode)
  if (!active) return
  if (Date.now() >= active.deadline) return finish(true)
  const response = active.responses[active.index]
  if (action === 'mark') {
    const id = Number(mark)
    response.marks = response.marks.includes(id) ? response.marks.filter(v => v !== id) : [...response.marks,id]
    button.setAttribute('aria-pressed',String(response.marks.includes(id)))
    save()
    return
  }
  if (action === 'check' || action === 'retry') {
    response.first ??= {answers:{...response.answers},marks:[...response.marks]}
    response.checked = true
    feedback = action === 'retry'
  }
  if (action === 'reveal') feedback = true
  if (action === 'next' || action === 'prev' || action === 'jump') {
    active.index = action === 'jump' ? Number(index) : active.index + (action === 'next' ? 1 : -1)
    feedback = false
  }
  if (action === 'finish') return finish()
  if (action === 'review') return review()
  save()
  renderQuestion()
})
window.addEventListener('hashchange',render)
document.addEventListener('visibilitychange',tick)
render()
loadBanks().then(() => { if (!active) render() })
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
  navigator.serviceWorker.register('./sw.js').catch(() => {})
}
