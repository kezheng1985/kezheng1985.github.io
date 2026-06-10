const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");

const OUT = __dirname;
const ASSET_DIR = path.join(OUT, "ppt-assets");
fs.mkdirSync(ASSET_DIR, { recursive: true });

const colors = {
  ink: "17201B",
  muted: "66706B",
  paper: "F7F4ED",
  white: "FFFDF8",
  green: "1F6F54",
  mint: "D5EFE4",
  gold: "C89135",
  red: "A9362F",
  blue: "327F99",
  peach: "F2DFB8",
};

let ppt;

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function svgAsset(name, svg) {
  const svgPath = path.join(ASSET_DIR, `${name}.svg`);
  const pngPath = path.join(ASSET_DIR, `${name}.png`);
  fs.writeFileSync(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  return pngPath;
}

function kvSvg() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1000" viewBox="0 0 1800 1000">
    <defs>
      <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#1f6f54"/>
        <stop offset="0.55" stop-color="#327f99"/>
        <stop offset="1" stop-color="#f2dfb8"/>
      </linearGradient>
      <linearGradient id="drink" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#f0cf74" stop-opacity=".95"/>
        <stop offset="1" stop-color="#a9362f" stop-opacity=".9"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#17201b" flood-opacity=".28"/>
      </filter>
    </defs>
    <rect width="1800" height="1000" fill="url(#sky)"/>
    <circle cx="1450" cy="185" r="110" fill="#e4b860"/>
    <path d="M0 710 C210 620 380 620 560 692 C770 777 905 768 1110 663 C1340 545 1530 580 1800 715 L1800 1000 L0 1000 Z" fill="#fffdf8" opacity=".78"/>
    <path d="M0 810 C250 760 450 800 620 865 C810 940 995 930 1210 830 C1400 742 1585 765 1800 842 L1800 1000 L0 1000 Z" fill="#f2dfb8" opacity=".72"/>
    <g opacity=".34" fill="#fffdf8">
      <rect x="112" y="238" width="150" height="240" rx="18"/>
      <rect x="310" y="294" width="104" height="178" rx="18"/>
      <rect x="1230" y="298" width="130" height="214" rx="18"/>
      <rect x="1400" y="336" width="86" height="154" rx="16"/>
    </g>
    <g filter="url(#shadow)" transform="translate(1050 210)">
      <rect x="0" y="0" width="230" height="520" rx="42" fill="#ffffff" opacity=".34" stroke="#fffdf8" stroke-width="8"/>
      <path d="M8 310 C60 278 142 348 222 300 L222 492 Q222 520 190 520 L40 520 Q8 520 8 488 Z" fill="url(#drink)"/>
      <rect x="55" y="150" width="72" height="72" rx="12" fill="#fffdf8" opacity=".74" transform="rotate(18 91 186)"/>
      <rect x="122" y="220" width="68" height="68" rx="12" fill="#fffdf8" opacity=".66" transform="rotate(-18 156 254)"/>
      <rect x="66" y="282" width="64" height="64" rx="12" fill="#fffdf8" opacity=".56" transform="rotate(31 98 314)"/>
    </g>
    <text x="140" y="190" fill="#ffd98d" font-size="34" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="700">泸州老窖 2026 冰饮整合营销</text>
    <text x="135" y="335" fill="#fffdf8" font-size="116" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="900">一城一味</text>
    <text x="135" y="470" fill="#fffdf8" font-size="116" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="900">冰饮一夏</text>
    <text x="142" y="550" fill="#fffdf8" opacity=".9" font-size="38" font-family="PingFang SC, Microsoft YaHei, Arial">长沙热辣夜宵 · 成都火锅冰饮 · 上海海派小酌</text>
    <g transform="translate(142 612)">
      <rect width="520" height="72" rx="36" fill="#a9362f"/>
      <text x="36" y="48" fill="#fffdf8" font-size="31" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="800">扫码进入冰饮一夏城市地图</text>
    </g>
  </svg>`;
}

function posterSvg(title, subtitle, scene, fill, accent) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="${fill}"/>
        <stop offset="1" stop-color="#fffdf8"/>
      </linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#17201b" flood-opacity=".20"/></filter>
    </defs>
    <rect width="900" height="1200" fill="url(#bg)"/>
    <circle cx="724" cy="158" r="92" fill="${accent}" opacity=".88"/>
    <path d="M0 846 C120 790 226 800 340 852 C490 920 596 905 728 840 C802 803 858 803 900 824 L900 1200 L0 1200 Z" fill="#fffdf8" opacity=".72"/>
    <path d="M0 970 C158 920 274 955 390 1008 C520 1068 650 1058 790 980 C842 952 876 948 900 950 L900 1200 L0 1200 Z" fill="#f2dfb8" opacity=".86"/>
    <g filter="url(#shadow)" transform="translate(575 455)">
      <rect width="150" height="330" rx="32" fill="#ffffff" opacity=".42" stroke="#fffdf8" stroke-width="5"/>
      <path d="M8 194 C48 176 96 218 142 190 L142 310 Q142 330 122 330 L28 330 Q8 330 8 310 Z" fill="#a9362f" opacity=".82"/>
      <rect x="32" y="93" width="46" height="46" rx="8" fill="#fffdf8" opacity=".76" transform="rotate(18 55 116)"/>
      <rect x="80" y="142" width="44" height="44" rx="8" fill="#fffdf8" opacity=".66" transform="rotate(-17 102 164)"/>
    </g>
    <text x="70" y="116" fill="#a9362f" font-size="27" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="800">一城一味 冰饮一夏</text>
    <text x="70" y="250" fill="#17201b" font-size="72" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="900">${esc(title)}</text>
    <text x="72" y="322" fill="#17201b" font-size="34" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="700">${esc(subtitle)}</text>
    <rect x="70" y="392" width="400" height="62" rx="31" fill="#17201b"/>
    <text x="98" y="433" fill="#fffdf8" font-size="29" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="800">${esc(scene)}</text>
    <g transform="translate(70 920)">
      <rect width="180" height="180" rx="16" fill="#fffdf8" stroke="#17201b" stroke-width="4"/>
      ${Array.from({ length: 7 })
        .map((_, i) =>
          Array.from({ length: 7 })
            .map((__, j) => {
              if ((i * 3 + j * 5) % 4 === 0) {
                return `<rect x="${22 + j * 20}" y="${22 + i * 20}" width="12" height="12" fill="#17201b"/>`;
              }
              return "";
            })
            .join(""),
        )
        .join("")}
      <text x="214" y="58" fill="#17201b" font-size="30" font-family="PingFang SC, Microsoft YaHei, Arial" font-weight="800">扫码预约</text>
      <text x="214" y="103" fill="#66706b" font-size="24" font-family="PingFang SC, Microsoft YaHei, Arial">领券 · 到店 · 复购</text>
    </g>
  </svg>`;
}

function addBg(slide, fill = colors.paper) {
  slide.background = { color: fill };
}

function addTitle(slide, eyebrow, title, body) {
  slide.addText(eyebrow, { x: 0.55, y: 0.45, w: 6.5, h: 0.25, fontSize: 9, bold: true, color: colors.red, margin: 0 });
  slide.addText(title, { x: 0.55, y: 0.78, w: 8.3, h: 0.78, fontSize: 28, bold: true, color: colors.ink, margin: 0, breakLine: false });
  if (body) {
    slide.addText(body, { x: 0.58, y: 1.62, w: 7.6, h: 0.5, fontSize: 12, color: colors.muted, fit: "shrink", margin: 0.02, breakLine: false });
  }
}

function addPill(slide, text, x, y, w, color = colors.green) {
  slide.addShape(ppt.ShapeType.roundRect, { x, y, w, h: 0.34, rectRadius: 0.06, fill: { color: colors.mint }, line: { color: colors.mint } });
  slide.addText(text, { x: x + 0.08, y: y + 0.08, w: w - 0.16, h: 0.14, fontSize: 8.2, bold: true, color, margin: 0, align: "center" });
}

function addCard(slide, x, y, w, h, title, body, accent = colors.green) {
  slide.addShape(ppt.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.04, fill: { color: colors.white, transparency: 3 }, line: { color: "DFE6DE" }, shadow: { type: "outer", color: "17201B", opacity: 0.08, blur: 1, angle: 45, distance: 1 } });
  slide.addShape(ppt.ShapeType.rect, { x, y, w: 0.08, h, fill: { color: accent }, line: { color: accent } });
  slide.addText(title, { x: x + 0.24, y: y + 0.18, w: w - 0.38, h: 0.26, fontSize: 12.5, bold: true, color: colors.ink, margin: 0 });
  slide.addText(body, { x: x + 0.24, y: y + 0.55, w: w - 0.38, h: h - 0.68, fontSize: 9.3, color: colors.muted, fit: "shrink", valign: "mid", breakLine: false, margin: 0.01 });
}

function addFooter(slide, num) {
  slide.addText("泸州老窖「一城一味 冰饮一夏」整合营销提案", { x: 0.55, y: 7.06, w: 5.8, h: 0.16, fontSize: 6.8, color: "8A928D", margin: 0 });
  slide.addText(String(num).padStart(2, "0"), { x: 12.2, y: 7.02, w: 0.55, h: 0.18, fontSize: 8, bold: true, color: "8A928D", margin: 0, align: "right" });
}

function bulletText(items) {
  return items.map((item) => ({ text: item, options: { bullet: { type: "bullet" }, hanging: 4 } }));
}

function addPhoneMock(slide, x, y, title, handle, hook, body, cta, accent = colors.green) {
  slide.addShape(ppt.ShapeType.roundRect, {
    x,
    y,
    w: 3.05,
    h: 4.35,
    rectRadius: 0.08,
    fill: { color: colors.white },
    line: { color: "D9E2DA", width: 1 },
    shadow: { type: "outer", color: "17201B", opacity: 0.1, blur: 1, angle: 45, distance: 1 },
  });
  slide.addShape(ppt.ShapeType.roundRect, { x: x + 0.18, y: y + 0.2, w: 2.69, h: 1.58, rectRadius: 0.05, fill: { color: accent }, line: { color: accent } });
  slide.addText(title, { x: x + 0.34, y: y + 0.42, w: 2.34, h: 0.32, fontSize: 15, bold: true, color: colors.white, margin: 0, fit: "shrink" });
  slide.addText(handle, { x: x + 0.34, y: y + 0.86, w: 2.34, h: 0.18, fontSize: 8.5, color: colors.white, transparency: 10, margin: 0 });
  slide.addText(hook, { x: x + 0.34, y: y + 1.12, w: 2.34, h: 0.38, fontSize: 12, bold: true, color: colors.white, fit: "shrink", margin: 0 });
  slide.addText(body, { x: x + 0.28, y: y + 2.02, w: 2.48, h: 1.25, fontSize: 9.6, color: colors.ink, fit: "shrink", breakLine: false, margin: 0.03 });
  slide.addShape(ppt.ShapeType.roundRect, { x: x + 0.28, y: y + 3.55, w: 2.48, h: 0.42, rectRadius: 0.06, fill: { color: colors.ink }, line: { color: colors.ink } });
  slide.addText(cta, { x: x + 0.38, y: y + 3.69, w: 2.28, h: 0.12, fontSize: 8.8, bold: true, color: colors.white, margin: 0, align: "center" });
}

async function main() {
  const kvPath = await svgAsset("key-visual", kvSvg());
  const posters = [
    await svgAsset("poster-tasting", posterSvg("品鉴场景", "三城周末 · 冰饮开席", "预约长沙/成都/上海门店", "#d5efe4", "#c89135")),
    await svgAsset("poster-pairing", posterSvg("餐酒套餐", "一城一味 · 三城三搭", "夜宵/火锅/小酌可订", "#f2dfb8", "#1f6f54")),
    await svgAsset("poster-cloud", posterSvg("云店活动", "领券复购 · 三城同款", "冰饮尝鲜装限时购", "#d8edf3", "#a9362f")),
    await svgAsset("poster-retail", posterSvg("新零售活动", "门店扫码 · 权益核销", "终端陈列联动会员", "#efe7d8", "#327f99")),
    await svgAsset("poster-3k", posterSvg("3K 内容", "三城达人 · 真实打卡", "城市酒单与冰饮教学", "#e5eadc", "#c89135")),
  ];

  const pptx = new pptxgen();
  ppt = pptx;
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Codex";
  pptx.company = "OpenAI";
  pptx.subject = "泸州老窖一城一味冰饮一夏整合营销提案";
  pptx.title = "一城一味 冰饮一夏";
  pptx.lang = "zh-CN";
  pptx.theme = {
    headFontFace: "PingFang SC",
    bodyFontFace: "PingFang SC",
    lang: "zh-CN",
  };
  pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333, height: 7.5 });
  pptx.layout = "CUSTOM_WIDE";

  let n = 1;

  {
    const slide = pptx.addSlide();
    slide.background = { color: colors.green };
    slide.addImage({ path: kvPath, x: 0, y: 0, w: 13.333, h: 7.5 });
  }

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "PROJECT OVERVIEW", "提案目标：以长沙、成都、上海三城打透冰饮餐饮样板", "不是单点传播，而是围绕品鉴、餐酒、云店、新零售和 3K 内容建立完整活动闭环。");
    addCard(slide, 0.75, 2.08, 3.65, 2.0, "客户部门任务", "会员中心运营、拉新、权益管理；线上 social 内容、媒介传播、KOL/KOS/KOC 协同。", colors.red);
    addCard(slide, 4.85, 2.08, 3.65, 2.0, "市场问题", "年轻人对白酒饮用方式缺少好感；传统经销压货逻辑难以持续，需要真实动销和场景渗透。", colors.gold);
    addCard(slide, 8.95, 2.08, 3.65, 2.0, "策略机会", "用城市风味菜系降低理解门槛，用冰饮白酒重塑低负担、清爽、佐餐、社交友好的认知。", colors.green);
    slide.addText("核心转化链路", { x: 0.8, y: 4.65, w: 2.3, h: 0.28, fontSize: 13, bold: true, color: colors.ink, margin: 0 });
    ["内容种草", "领券预约", "到店品鉴", "套餐核销", "云店复购", "会员沉淀"].forEach((t, i) => {
      const x = 0.8 + i * 2.02;
      slide.addShape(ppt.ShapeType.roundRect, { x, y: 5.18, w: 1.5, h: 0.72, rectRadius: 0.06, fill: { color: i % 2 ? colors.mint : colors.white }, line: { color: "DFE6DE" } });
      slide.addText(t, { x: x + 0.12, y: 5.42, w: 1.26, h: 0.18, fontSize: 10, bold: true, color: colors.ink, margin: 0, align: "center" });
      if (i < 5) slide.addText("→", { x: x + 1.56, y: 5.38, w: 0.34, h: 0.2, fontSize: 16, bold: true, color: colors.gold, margin: 0, align: "center" });
    });
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "CAMPAIGN ARCHITECTURE", "三大重点城市：用差异化餐饮场景打透「一城一味」", "长沙主打热辣夜宵，成都主打火锅朋友局，上海主打海派小酌与精致餐酒。");
    const rows = [
      ["长沙", "小炒/夜宵", "湘味小炒冰饮套餐", "辣口夏夜朋友局"],
      ["成都", "火锅/川味", "冰镇浓香双人火锅套餐", "麻辣后的一杯清爽"],
      ["上海", "海派小馆/Bistro", "海派小酌冰饮套餐", "精致餐酒低负担"],
    ];
    slide.addShape(ppt.ShapeType.roundRect, { x: 0.7, y: 1.95, w: 11.95, h: 4.25, rectRadius: 0.04, fill: { color: colors.white }, line: { color: "DFE6DE" } });
    ["城市", "餐饮场景", "主推套餐", "消费者记忆点"].forEach((h, i) => {
      slide.addText(h, { x: 1 + i * 2.9, y: 2.18, w: 2.5, h: 0.18, fontSize: 10, bold: true, color: colors.red, margin: 0 });
    });
    rows.forEach((row, r) => {
      const y = 2.85 + r * 0.88;
      slide.addShape(ppt.ShapeType.line, { x: 0.95, y: y - 0.18, w: 11.35, h: 0, line: { color: "E9EEE8", width: 1 } });
      row.forEach((txt, i) => {
        slide.addText(txt, { x: 1 + i * 2.9, y, w: 2.5, h: 0.32, fontSize: 11.2, color: i === 0 ? colors.ink : colors.muted, bold: i === 0, margin: 0, fit: "shrink" });
      });
    });
    addPill(slide, "三城做强餐饮样板", 1, 6.43, 1.9);
    addPill(slide, "每城 20-50 家合作门店", 3.15, 6.43, 2.25);
    addPill(slide, "非重点城市走云店券包扩散", 5.65, 6.43, 2.65);
    addPill(slide, "周五至周日集中爆发", 8.6, 6.43, 2.1);
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "PRODUCT ROLE", "线上工具定位：冰饮一夏城市地图", "它不是单纯 H5，而是会员运营工具 + LBS 门店工具 + 云店交易入口。");
    addCard(slide, 0.75, 2.0, 2.5, 3.7, "消费者端", "城市定位\n附近门店\n套餐详情\n一键预约\n权益钱包\n云店购买\n内容入口\n分享裂变", colors.green);
    addCard(slide, 3.55, 2.0, 2.5, 3.7, "门店端", "门店资料\n预约管理\n库存名额\n扫码核销\n数据看板\n素材包下载", colors.gold);
    addCard(slide, 6.35, 2.0, 2.5, 3.7, "后台端", "城市管理\n活动配置\n券规则\n会员标签\n云店接口\n风险预警", colors.blue);
    addCard(slide, 9.15, 2.0, 2.75, 3.7, "核心原则", "先跑通 MVP：门店列表、套餐详情、预约核销、权益钱包、云店跳转、基础看板。\n活动中再增强榜单、打卡墙和自动化券包。", colors.red);
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "CONSUMER JOURNEY", "从种草到复购：三条路径统一落到小程序", "所有线下物料、达人内容、门店二维码都指向同一个转化入口。");
    const stages = [
      ["种草路径", "短视频/小红书/朋友圈 → 小程序 → 定位城市 → 查看附近门店 → 领取券 → 预约套餐"],
      ["到店路径", "到店扫码 → 查看冰饮喝法 → 点套餐 → 核销权益 → 拍照打卡 → 获得复购券"],
      ["复购路径", "活动后券提醒 → 云店购买同款 → 解锁积分 → 下次活动优先预约"],
    ];
    stages.forEach(([t, b], i) => addCard(slide, 0.9, 1.95 + i * 1.45, 11.3, 1.02, t, b, [colors.green, colors.gold, colors.red][i]));
    slide.addText("关键体验标准：少解释、少跳转、强场景、强权益、强复购。", { x: 0.95, y: 6.25, w: 8.5, h: 0.3, fontSize: 14, bold: true, color: colors.ink, margin: 0 });
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide, "EEF5EF");
    addTitle(slide, "KEY VISUAL", "主 KV 方向：三城风味 + 冰饮白酒 + 扫码转化", "长沙的热辣、成都的麻辣、上海的轻盈小酌，共同组成夏季城市餐酒入口。");
    slide.addImage({ path: kvPath, x: 0.8, y: 1.68, w: 7.2, h: 4.0 });
    addCard(slide, 8.35, 1.74, 3.8, 0.92, "主视觉口号", "一城一味 冰饮一夏", colors.red);
    addCard(slide, 8.35, 2.92, 3.8, 0.92, "画面元素", "长沙夜宵、成都火锅、上海 bistro、冰杯、冰桶、扫码入口", colors.gold);
    addCard(slide, 8.35, 4.1, 3.8, 0.92, "传播落点", "扫码进入城市地图，完成领券、预约、到店核销", colors.green);
    addCard(slide, 8.35, 5.28, 3.8, 0.92, "延展规则", "保留主题字、冰饮杯、城市风味标签和二维码区域", colors.blue);
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "VISUAL SYSTEM", "五类视觉延展：三城内容分发，同一套识别系统", "每张海报都保留主题、城市风味、场景利益点、行动按钮和扫码入口。");
    const labels = ["品鉴场景", "餐酒套餐", "云店活动", "新零售活动", "3K 内容"];
    posters.forEach((p, i) => {
      const x = 0.55 + i * 2.48;
      slide.addImage({ path: p, x, y: 1.68, w: 2.15, h: 2.86 });
      slide.addText(labels[i], { x, y: 4.72, w: 2.15, h: 0.22, fontSize: 11, bold: true, color: colors.ink, margin: 0, align: "center" });
    });
    slide.addText("建议统一应用在：长沙/成都/上海门店桌贴、菜单插页、冰桶贴、杯垫、朋友圈海报、小红书封面、短视频结尾卡、云店活动页。", {
      x: 0.8,
      y: 5.55,
      w: 11.5,
      h: 0.5,
      fontSize: 12,
      color: colors.muted,
      fit: "shrink",
      margin: 0,
      align: "center",
    });
    addFooter(slide, n++);
  }

  const visualSlides = [
    ["品鉴场景延展", posters[0], "三城周末 · 冰饮开席", ["适用：长沙夜宵、成都火锅、上海小馆门口海报/桌贴/服务员推荐卡", "目标：降低尝试门槛，把低度冰饮表达为轻松品鉴", "CTA：预约三城品鉴席，核销后发放云店复购券"]],
    ["餐酒套餐延展", posters[1], "一城一味 · 三城三搭", ["适用：菜单插页、套餐页、达人探店封面", "目标：长沙讲热辣、成都讲麻辣清爽、上海讲轻盈小酌", "CTA：预订双人/四人城市套餐"]],
    ["云店活动延展", posters[2], "领券复购 · 三城同款", ["适用：云店首页 banner、券包弹窗、短信/企微触达图", "目标：把三城线下体验转成活动后 48 小时复购", "CTA：购买冰饮尝鲜装/朋友聚饮装/城市推荐装"]],
    ["新零售活动延展", posters[3], "门店扫码 · 权益核销", ["适用：三城核心商圈烟酒店/商超终端陈列、冰柜贴、导购手卡", "目标：让新零售终端承接会员领券和商品购买", "CTA：扫码领权益，到店/到家都可转化"]],
    ["3K 内容延展", posters[4], "三城达人 · 真实打卡", ["适用：长沙夜宵 KOL、成都火锅 KOS、上海生活方式 KOC 内容模板", "目标：统一内容落点，避免只做话题曝光", "CTA：打开三城酒单，查看附近门店"]],
  ];

  visualSlides.forEach(([title, img, subtitle, bullets]) => {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "CREATIVE EXTENSION", title, subtitle);
    slide.addImage({ path: img, x: 0.95, y: 1.58, w: 3.2, h: 4.27 });
    slide.addText(bulletText(bullets), { x: 4.75, y: 1.95, w: 7.2, h: 1.8, fontSize: 15, color: colors.ink, breakLine: false, fit: "shrink", margin: 0.04, paraSpaceAfterPt: 12 });
    addCard(slide, 4.75, 4.45, 3.25, 1.2, "版式保留", "主题字、场景利益点、冰饮杯、二维码入口。", colors.green);
    addCard(slide, 8.35, 4.45, 3.25, 1.2, "可替换区域", "城市菜品、门店名称、套餐价格、达人头像。", colors.gold);
    addFooter(slide, n++);
  });

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "3K CONTENT STRATEGY", "3K 内容矩阵：KOL 种草，KOS 转化，KOC 扩散", "三类内容都必须把流量导向同一个小程序入口，避免只做话题热闹。");
    addCard(slide, 0.75, 1.85, 3.7, 3.45, "KOL：城市风味种草", "角色：城市美食/生活方式达人\n内容：城市酒单、餐酒搭配、冰饮调法\n重点：把白酒冰饮讲成夏季餐桌新体验\n落点：视频挂小程序门店页或城市酒单页", colors.red);
    addCard(slide, 4.82, 1.85, 3.7, 3.45, "KOS：门店现场转化", "角色：店长、主理人、调酒师、服务员、城市体验官\n内容：到店口播、套餐讲解、桌边冰饮演示\n重点：让用户知道怎么点、怎么喝、怎么领券\n落点：门店二维码与核销码", colors.gold);
    addCard(slide, 8.89, 1.85, 3.7, 3.45, "KOC：真实体验扩散", "角色：普通消费者、本地探店用户、会员种子用户\n内容：打卡图文、短评、朋友局合照、套餐反馈\n重点：真实感、低门槛、可模仿\n落点：分享门店/套餐得券", colors.green);
    slide.addText("城市内容分工：长沙讲「热辣夜宵后的清爽」；成都讲「火锅朋友局的冰饮搭子」；上海讲「海派小酌的轻盈餐酒」。", {
      x: 0.95,
      y: 6.05,
      w: 11.5,
      h: 0.36,
      fontSize: 13,
      bold: true,
      color: colors.ink,
      fit: "shrink",
      margin: 0,
      align: "center",
    });
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide, "EEF5EF");
    addTitle(slide, "3K DEMO", "内容 demo 示意：同一主题，三种内容形态", "以下为提案阶段示意，可直接拆成达人 brief、门店话术和 KOC 打卡模板。");
    addPhoneMock(
      slide,
      0.9,
      1.65,
      "KOL 短视频",
      "@长沙夜宵地图",
      "长沙夜宵太辣？试试这杯冰饮浓香。",
      "镜头 1：口味虾上桌\n镜头 2：冰杯加酒、加冰、轻摇\n镜头 3：朋友试饮反应\n字幕：扫码预约附近门店，领取冰饮套餐券",
      "打开长沙城市酒单",
      colors.red,
    );
    addPhoneMock(
      slide,
      5.15,
      1.65,
      "KOS 门店口播",
      "成都火锅店长",
      "这套冰饮火锅套餐，第一次喝白酒也好入口。",
      "桌边动作：冰桶展示、杯型说明、菜品搭配\n服务话术：先冰饮、再吃辣、再领券\n引导：桌贴二维码预约/核销，核销后送云店复购券",
      "扫码核销套餐权益",
      colors.gold,
    );
    addPhoneMock(
      slide,
      9.4,
      1.65,
      "KOC 图文笔记",
      "上海周末小酌",
      "不是传统酒局，是一顿很轻松的海派小酌。",
      "图 1：门店环境\n图 2：熏鱼/冷盘/冰饮杯\n图 3：好友合照\n正文：价格、口味、适合人数、预约入口\n评论区置顶：分享套餐得券",
      "分享套餐领券",
      colors.green,
    );
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "3K OPERATING MODEL", "3K 内容生产机制：统一 brief，分层产出，数据回流", "用标准化内容包保证效率，用城市化表达保证真实感。");
    const steps = [
      ["1. 统一 brief", "主题口径\n城市卖点\n产品露出规范\n小程序落点"],
      ["2. 城市脚本包", "长沙：夜宵清爽\n成都：火锅搭子\n上海：海派小酌"],
      ["3. 分层发布", "KOL 预热种草\nKOS 到店转化\nKOC 真实打卡"],
      ["4. 数据复盘", "内容点击\n领券预约\n到店核销\n云店复购"],
    ];
    steps.forEach(([t, b], i) => addCard(slide, 0.75 + i * 3.05, 1.85, 2.65, 2.35, t, b, [colors.red, colors.gold, colors.green, colors.blue][i]));
    slide.addShape(ppt.ShapeType.roundRect, { x: 0.95, y: 4.75, w: 11.4, h: 1.25, rectRadius: 0.04, fill: { color: colors.white }, line: { color: "DFE6DE" } });
    slide.addText("建议交付物", { x: 1.18, y: 5.08, w: 1.4, h: 0.22, fontSize: 12, bold: true, color: colors.red, margin: 0 });
    slide.addText("3 条 KOL 短视频脚本 / 3 份城市 KOS 口播卡 / 9 组 KOC 图文模板 / 1 套评论区引导话术 / 1 份内容审核清单 / 1 张投放排期表", {
      x: 2.55,
      y: 5.05,
      w: 9.45,
      h: 0.28,
      fontSize: 12.2,
      color: colors.ink,
      fit: "shrink",
      margin: 0,
    });
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "MVP BUILD", "一期上线范围：4-6 周跑通活动闭环", "先把预约、核销、权益和云店转化跑通，再围绕数据做二期增强。");
    const phases = [
      ["第 1-2 周", "长沙/成都/上海门店与套餐配置\n券包规则与云店商品准备\n三城视觉物料主 KV 与模板定稿"],
      ["第 3-4 周", "小程序活动专区\n门店地图、套餐详情、预约核销\n权益钱包与云店跳转"],
      ["第 5-6 周", "门店联调与运营培训\nKOL/KOS/KOC 内容排期\n数据看板与预警上线"],
      ["活动中迭代", "城市热度榜、用户打卡墙\n自动化券包发放\n会员标签精细化"],
    ];
    phases.forEach(([t, b], i) => addCard(slide, 0.8 + i * 3.05, 2.1, 2.65, 3.25, t, b, [colors.red, colors.gold, colors.green, colors.blue][i]));
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide);
    addTitle(slide, "KPI FRAMEWORK", "复盘指标：内容、交易、会员三类一起看", "避免只看曝光，重点追踪 3K 内容导流、到店核销、云店订单和会员资产沉淀。");
    addCard(slide, 0.85, 2.0, 3.45, 3.25, "内容指标", "KOL 完播率/互动率\nKOS 扫码转化率\nKOC 打卡量\n城市酒单点击率\n内容到预约转化率", colors.gold);
    addCard(slide, 4.95, 2.0, 3.45, 3.25, "交易指标", "小程序访问人数\n领券率\n预约转化率\n到店核销率\n套餐销售额\n云店订单转化率\n复购率", colors.green);
    addCard(slide, 9.05, 2.0, 3.45, 3.25, "会员指标", "新增会员数\n老会员唤醒数\n权益使用率\n会员标签完善率\n活动后 30 天复购/互动率", colors.red);
    addFooter(slide, n++);
  }

  {
    const slide = pptx.addSlide();
    addBg(slide, colors.ink);
    slide.addText("最终交付建议", { x: 0.9, y: 0.8, w: 4.2, h: 0.42, fontSize: 24, bold: true, color: colors.white, margin: 0 });
    slide.addText("用一个活动专区承接所有触点，用一套视觉系统管理所有物料，用一次夏季餐桌体验沉淀长期会员资产。", {
      x: 0.9,
      y: 1.55,
      w: 8.2,
      h: 1.3,
      fontSize: 30,
      bold: true,
      color: colors.white,
      fit: "shrink",
      breakLine: false,
      margin: 0,
    });
    ["三城主 KV 深化", "五类延展海报完稿", "小程序活动专区上线", "三城门店物料铺设", "3K 内容矩阵投放", "活动数据复盘"].forEach((t, i) => {
      addPill(slide, t, 0.95 + (i % 3) * 3.05, 4.0 + Math.floor(i / 3) * 0.6, 2.55, colors.green);
    });
    slide.addText("一城一味 冰饮一夏", { x: 0.95, y: 6.25, w: 6, h: 0.36, fontSize: 24, bold: true, color: colors.gold, margin: 0 });
  }

  const outPath = path.join(OUT, "泸州老窖_一城一味冰饮一夏_整合营销提案.pptx");
  await pptx.writeFile({ fileName: outPath });
  console.log(outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
