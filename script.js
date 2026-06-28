const activityCityGroups = {
  guojiao: [
    "三亚市",
    "海口市",
    "常德市",
    "益阳市",
    "永州市",
    "郴州市",
    "惠州市",
    "深圳市",
    "广州市",
    "佛山市",
    "上饶市",
    "抚州市",
    "吉安市",
    "宜春市",
    "新余市",
    "萍乡市",
    "武汉市",
    "黄冈市",
    "十堰市",
    "宜昌市",
    "恩施土家族苗族自治州",
    "襄阳市",
    "长沙市",
    "宁波市",
    "舟山市",
    "丽水市",
    "温州市",
    "绍兴市",
    "金华市",
    "亳州市",
    "阜阳市",
    "合肥市",
    "芜湖市",
    "三明市",
    "宁德市",
    "福州市",
    "莆田市",
    "南通市",
    "常州市",
    "扬州市",
    "泰州市",
    "镇江市",
    "承德市",
    "秦皇岛市",
    "长春市",
    "天津市",
    "大同市",
    "太原市",
    "晋城市",
    "朔州市",
    "阳泉市",
    "赤峰市",
    "大连市",
    "沈阳市",
    "营口市",
    "锦州市",
    "潍坊市",
    "青岛市",
    "济南市",
    "滨州市",
    "日照市",
    "枣庄市",
    "济宁市",
    "乌鲁木齐市",
    "伊犁哈萨克自治州",
    "克拉玛依市",
    "吐鲁番市",
    "和田地区",
    "哈密市",
    "喀什地区",
    "石河子市",
    "天水市",
    "定西市",
    "庆阳市",
    "陇南市",
    "兰州市",
    "白银市",
    "酒泉市",
    "银川市",
    "渭南市",
    "西安市",
    "海东市",
    "海西蒙古族藏族自治州",
    "西宁市",
    "广安市",
    "周口市",
    "商丘市",
    "开封市",
    "安阳市",
    "新乡市",
    "濮阳市",
    "郑州市",
    "鹤壁市",
    "信阳市",
    "漯河市",
    "许昌市",
    "驻马店市",
    "南阳市",
    "平顶山市",
    "洛阳市",
  ],
  guojiaoHuaijiu: ["南京市", "杭州市", "唐山市", "临沂市", "聊城市", "南充市", "达州市", "重庆市"],
  guojiaoHuaijiuJiaoling: ["石家庄市"],
  guojiaoJiaolingTequ: ["成都市"],
  guojiaoTequ: ["信阳市"],
};

const categoryOptions = [
  {
    id: "all",
    name: "全部活动门店",
    route: "冰饮品鉴活动门店",
  },
  {
    id: "guojiao",
    name: "国窖门店",
    route: "国窖1573冰饮品鉴门店",
    product: "国窖1573",
    scene: "餐酒品鉴 / 商务宴请",
    packageName: "国窖1573冰饮餐酒套餐",
  },
  {
    id: "guojiaoHuaijiu",
    name: "国窖&怀旧门店",
    route: "国窖1573与怀旧系列餐酒门店",
    product: "国窖1573 / 怀旧60",
    scene: "宴席小聚 / 品质餐酒",
    packageName: "国窖1573&怀旧冰饮餐酒套餐",
  },
  {
    id: "guojiaoHuaijiuJiaoling",
    name: "国窖&怀旧&窖龄门店",
    route: "多产品冰饮品鉴门店",
    product: "国窖1573 / 怀旧60 / 窖龄",
    scene: "多产品品鉴 / 朋友聚饮",
    packageName: "多产品冰饮品鉴套餐",
  },
  {
    id: "guojiaoJiaolingTequ",
    name: "国窖&窖龄&特曲门店",
    route: "多产品餐酒品鉴门店",
    product: "国窖1573 / 窖龄 / 特曲",
    scene: "城市餐酒 / 周末聚饮",
    packageName: "国窖&窖龄&特曲冰饮餐酒套餐",
  },
  {
    id: "guojiaoTequ",
    name: "国窖&特曲门店",
    route: "国窖1573与特曲餐酒门店",
    product: "国窖1573 / 特曲",
    scene: "地方菜 / 轻松开席",
    packageName: "国窖&特曲冰饮餐酒套餐",
  },
];

const majorCityOptions = [
  "北京市",
  "上海市",
  "广州市",
  "深圳市",
  "成都市",
  "重庆市",
  "杭州市",
  "南京市",
  "武汉市",
  "西安市",
  "郑州市",
  "长沙市",
  "天津市",
  "青岛市",
  "济南市",
  "苏州市",
  "无锡市",
  "徐州市",
  "宁波市",
  "温州市",
  "厦门市",
  "泉州市",
  "福州市",
  "合肥市",
  "南昌市",
  "太原市",
  "石家庄市",
  "沈阳市",
  "大连市",
  "长春市",
  "哈尔滨市",
  "呼和浩特市",
  "银川市",
  "兰州市",
  "西宁市",
  "乌鲁木齐市",
  "拉萨市",
  "昆明市",
  "贵阳市",
  "南宁市",
  "桂林市",
  "海口市",
  "三亚市",
  "佛山市",
  "东莞市",
  "珠海市",
  "中山市",
  "惠州市",
  "汕头市",
];

const provinceGroups = {
  北京市: ["北京市"],
  上海市: ["上海市"],
  天津市: ["天津市"],
  重庆市: ["重庆市"],
  海南省: ["三亚市", "海口市"],
  湖南省: ["常德市", "益阳市", "永州市", "郴州市", "长沙市"],
  广东省: ["惠州市", "深圳市", "广州市", "佛山市", "东莞市", "珠海市", "中山市", "汕头市"],
  江西省: ["上饶市", "抚州市", "吉安市", "宜春市", "新余市", "萍乡市", "南昌市"],
  湖北省: ["武汉市", "黄冈市", "十堰市", "宜昌市", "恩施土家族苗族自治州", "襄阳市"],
  浙江省: ["宁波市", "舟山市", "丽水市", "温州市", "绍兴市", "金华市", "杭州市"],
  安徽省: ["亳州市", "阜阳市", "合肥市", "芜湖市"],
  福建省: ["三明市", "宁德市", "福州市", "莆田市", "厦门市", "泉州市"],
  江苏省: ["南通市", "常州市", "扬州市", "泰州市", "镇江市", "南京市", "苏州市", "无锡市", "徐州市"],
  河北省: ["承德市", "秦皇岛市", "唐山市", "石家庄市"],
  吉林省: ["长春市"],
  山西省: ["大同市", "太原市", "晋城市", "朔州市", "阳泉市"],
  内蒙古自治区: ["赤峰市", "呼和浩特市"],
  辽宁省: ["大连市", "沈阳市", "营口市", "锦州市"],
  山东省: ["潍坊市", "青岛市", "济南市", "滨州市", "日照市", "枣庄市", "济宁市", "临沂市", "聊城市"],
  新疆维吾尔自治区: ["乌鲁木齐市", "伊犁哈萨克自治州", "克拉玛依市", "吐鲁番市", "和田地区", "哈密市", "喀什地区", "石河子市"],
  甘肃省: ["天水市", "定西市", "庆阳市", "陇南市", "兰州市", "白银市", "酒泉市"],
  宁夏回族自治区: ["银川市"],
  陕西省: ["渭南市", "西安市"],
  青海省: ["海东市", "海西蒙古族藏族自治州", "西宁市"],
  四川省: ["广安市", "南充市", "达州市", "成都市"],
  河南省: ["周口市", "商丘市", "开封市", "安阳市", "新乡市", "濮阳市", "郑州市", "鹤壁市", "信阳市", "漯河市", "许昌市", "驻马店市", "南阳市", "平顶山市", "洛阳市"],
  黑龙江省: ["哈尔滨市"],
  广西壮族自治区: ["南宁市", "桂林市"],
  云南省: ["昆明市"],
  贵州省: ["贵阳市"],
  西藏自治区: ["拉萨市"],
};

const cityDistricts = {
  北京市: "朝阳区",
  上海市: "黄浦区",
  广州市: "天河区",
  深圳市: "南山区",
  成都市: "锦江区",
  重庆市: "渝中区",
  杭州市: "上城区",
  南京市: "秦淮区",
  武汉市: "江汉区",
  长沙市: "芙蓉区",
  西安市: "雁塔区",
  郑州市: "金水区",
  青岛市: "市南区",
  济南市: "历下区",
  天津市: "和平区",
};

const provinceByCity = Object.entries(provinceGroups).reduce((result, [province, cities]) => {
  cities.forEach((city) => {
    result[city] = province;
  });
  return result;
}, {});

const participatingCities = [...new Set(Object.values(activityCityGroups).flat())];
const cityOptions = [...new Set([...majorCityOptions, ...participatingCities])];
const categoryById = Object.fromEntries(categoryOptions.map((category) => [category.id, category]));
const activityStores = Object.entries(activityCityGroups).flatMap(([categoryId, cities]) =>
  cities.map((city, index) => createStore(city, categoryId, index)),
);

let activeCityName = "成都市";
let activeCategoryId = "all";
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function init() {
  renderCityOptions();
  renderCategoryOptions();
  detectCity();
  bindEvents();
}

function bindEvents() {
  $("#citySelect").addEventListener("change", (event) => {
    activeCityName = event.target.value;
    $("#locationStatus").textContent = `已切换至 ${activeCityName}`;
    render();
  });

  $("#categorySelect").addEventListener("change", (event) => {
    activeCategoryId = event.target.value;
    render();
  });

  $("#dialogNavigateBtn").addEventListener("click", (event) => {
    event.preventDefault();
    $("#storeDialog").close();
    showToast("示意跳转：正在打开门店导航");
  });
}

function renderCityOptions() {
  $("#citySelect").innerHTML = cityOptions
    .map((city) => `<option value="${city}">${city}</option>`)
    .join("");
}

function renderCategoryOptions() {
  $("#categorySelect").innerHTML = categoryOptions
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join("");
}

function detectCity() {
  $("#citySelect").value = activeCityName;
  $("#categorySelect").value = activeCategoryId;
  $("#locationStatus").textContent = `已识别：${activeCityName}`;
  render();
}

function render() {
  const stores = getVisibleStores();
  const category = categoryById[activeCategoryId];
  const cityHasActivity = participatingCities.includes(activeCityName);
  const countLabel = stores.length ? `${stores.length} 家门店` : "暂无门店";

  $("#cityHeadline").textContent = cityHasActivity
    ? `${activeCityName} · ${category.route}`
    : `${activeCityName} · 附近暂无门店信息`;
  $("#storeCount").textContent = countLabel;

  renderMap(stores, cityHasActivity);
  renderStorePhotos(stores, cityHasActivity);
  renderStores(stores, cityHasActivity);
}

function getVisibleStores() {
  if (!participatingCities.includes(activeCityName)) return [];
  return activityStores.filter((store) => {
    const cityMatched = store.city === activeCityName;
    const categoryMatched = activeCategoryId === "all" || store.categoryId === activeCategoryId;
    return cityMatched && categoryMatched;
  });
}

function renderMap(stores, cityHasActivity) {
  if (!stores.length) {
    $("#cityMap").innerHTML = `
      <div class="empty-map">
        <strong>附近暂无门店信息</strong>
        <span>${cityHasActivity ? "当前分类暂无活动门店，可切换门店分类查看。" : "当前城市暂未开放冰饮品鉴活动，可手动切换至活动城市。"}</span>
      </div>`;
    return;
  }

  const pins = stores
    .map(
      (store) => `
      <button class="map-pin ${store.type}" style="left:${store.x}%;top:${store.y}%" data-store="${store.id}" aria-label="${store.name}">
        <span>${store.name}</span>
      </button>`,
    )
    .join("");

  $("#cityMap").innerHTML = `<div class="map-route"></div>${pins}`;
  $$(".map-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const store = stores.find((item) => item.id === pin.dataset.store);
      openStoreDialog(store);
    });
  });
}

function renderStorePhotos(stores, cityHasActivity) {
  if (!stores.length) {
    $("#storePhotos").innerHTML = `
      <div class="empty-state">${cityHasActivity ? "当前分类暂无门店图片，可切换活动门店分类查看。" : "当前城市暂无活动门店图片。"}</div>`;
    return;
  }

  $("#storePhotos").innerHTML = stores
    .slice(0, 3)
    .map(
      (store) => `
      <article class="photo-card" style="--photo-bg:${store.photoBg}">
        <div>
          <strong>${store.name}</strong>
          <span>${store.city}${store.district} · ${store.scene}</span>
        </div>
      </article>`,
    )
    .join("");
}

function renderStores(stores, cityHasActivity) {
  if (!stores.length) {
    $("#storeList").innerHTML = `
      <div class="empty-state">${cityHasActivity ? "当前分类暂无活动门店，可切换活动门店分类查看。" : "附近暂无门店信息"}</div>`;
    return;
  }

  $("#storeList").innerHTML = stores
    .map(
      (store) => `
      <article class="store-card">
        <div>
          <div class="store-title">
            <strong>${store.name}</strong>
            <span class="store-type ${store.type}">${store.product}</span>
          </div>
          <p>${store.scene} · ${store.city}${store.district}</p>
          <p>${store.address}</p>
          <p>${store.hours} · ${store.phone}</p>
        </div>
        <button class="detail-btn" data-store="${store.id}">查看信息</button>
      </article>`,
    )
    .join("");

  $$(".detail-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const store = stores.find((item) => item.id === button.dataset.store);
      openStoreDialog(store);
    });
  });
}

function openStoreDialog(store) {
  $("#dialogType").textContent = `${store.typeName} · ${store.product}`;
  $("#dialogTitle").textContent = store.name;
  $("#dialogDetails").innerHTML = `
    ${detailItem("门店类型", store.typeName)}
    ${detailItem("详细地址", store.address)}
    ${detailItem("联系电话", store.phone)}
    ${detailItem("营业时间", store.hours)}
    ${detailItem("套餐/商品示意", store.packageName)}
    ${detailItem("适合人数/场景", store.people)}
  `;
  $("#storeDialog").showModal();
}

function detailItem(label, value) {
  return `<div class="detail-item"><span>${label}</span><strong>${value}</strong></div>`;
}

function createStore(city, categoryId, index) {
  const category = categoryById[categoryId];
  const province = provinceByCity[city] || "活动省份";
  const district = cityDistricts[city] || "核心商圈";
  const cityLabel = city.replace(/(土家族苗族自治州|蒙古族藏族自治州|哈萨克自治州|自治州|地区|市)$/g, "");
  const isRetail = categoryId === "guojiao" && index % 7 === 0;
  const type = isRetail ? "retail" : "dining";
  const hash = hashText(`${city}-${categoryId}-${index}`);

  return {
    id: `${categoryId}-${city}-${index}`,
    name: isRetail ? `${cityLabel}冰饮酒水合作门店` : `${cityLabel}餐酒品鉴合作门店`,
    type,
    typeName: isRetail ? "酒水门店" : "餐饮门店",
    categoryId,
    province,
    city,
    district,
    address: `${province}${city}${district} · ${cityLabel}核心商圈示意合作门店`,
    phone: "以活动页面及门店公示为准",
    hours: isRetail ? "10:00-22:00" : "11:30-22:30",
    product: category.product,
    packageName: category.packageName,
    scene: isRetail ? "冰饮推荐 / 酒水陈列" : category.scene,
    people: isRetail ? "朋友小聚 / 居家尝鲜" : "2-4人小聚 / 周末餐酒品鉴",
    x: 14 + (hash % 68),
    y: 18 + ((hash >> 3) % 56),
    photoBg: photoBackground(hash),
  };
}

function hashText(text) {
  return [...text].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);
}

function photoBackground(hash) {
  const palettes = [
    "linear-gradient(135deg, #1f6f54, #c89135)",
    "linear-gradient(135deg, #327f99, #a9362f)",
    "linear-gradient(135deg, #20362f, #d6b36b)",
    "linear-gradient(135deg, #6b8f7c, #f0c278)",
    "linear-gradient(135deg, #174c63, #f1d29b)",
  ];
  return palettes[hash % palettes.length];
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

init();
