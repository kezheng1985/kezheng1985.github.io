const campaignData = {
  cities: [
    {
      id: "chengdu",
      name: "成都",
      flavor: "火锅冰饮路线",
      hero: "麻辣火锅搭配清爽冰饮，适合周末朋友局。",
      stores: [
        {
          name: "锦里巷子火锅",
          distance: "1.2km",
          scene: "hotpot",
          seats: 36,
          x: 28,
          y: 42,
          package: "冰镇浓香双人火锅套餐",
          price: 198,
          pairing: "毛肚、鸭血、鲜牛肉 + 冰饮泸州老窖特调",
          benefit: "到店核销送 30 元云店复购券",
        },
        {
          name: "宽窄小院川菜",
          distance: "2.4km",
          scene: "local",
          seats: 24,
          x: 58,
          y: 34,
          package: "川味小聚四人套餐",
          price: 368,
          pairing: "回锅肉、辣子鸡、冰粉 + 低度冰饮酒单",
          benefit: "会员积分双倍",
        },
        {
          name: "玉林夜宵铺",
          distance: "3.1km",
          scene: "night",
          seats: 18,
          x: 72,
          y: 58,
          package: "夏夜串串冰饮套餐",
          price: 168,
          pairing: "串串、烤脑花、冰饮白酒杯",
          benefit: "分享好友各得 15 元券",
        },
      ],
      creators: [
        ["KOL", "城市美食博主发布「火锅怎么喝得更清爽」短视频"],
        ["KOS", "门店店长演示冰桶、冰杯、佐餐顺序"],
        ["KOC", "周末朋友局打卡，带门店定位和套餐链接"],
      ],
    },
    {
      id: "changsha",
      name: "长沙",
      flavor: "小炒夜宵路线",
      hero: "重口小炒、夜宵排档和冰饮白酒形成夏夜组合。",
      stores: [
        {
          name: "坡子街小炒馆",
          distance: "0.9km",
          scene: "local",
          seats: 32,
          x: 36,
          y: 48,
          package: "湘味小炒冰饮套餐",
          price: 188,
          pairing: "辣椒炒肉、口味虾 + 冰饮浓香杯",
          benefit: "到店送云店尝鲜装券",
        },
        {
          name: "解放西夜宵局",
          distance: "1.7km",
          scene: "night",
          seats: 26,
          x: 62,
          y: 38,
          package: "口味虾四人聚饮套餐",
          price: 328,
          pairing: "口味虾、臭豆腐、凉菜 + 冰饮白酒壶",
          benefit: "晒单返积分 188",
        },
        {
          name: "湘江边烧烤",
          distance: "2.8km",
          scene: "night",
          seats: 20,
          x: 76,
          y: 62,
          package: "江边烧烤冰饮套餐",
          price: 238,
          pairing: "烤牛油、烤鱼、冰饮特调",
          benefit: "复购券限时 48 小时有效",
        },
      ],
      creators: [
        ["KOL", "夜宵场景种草「辣口之后的一杯清爽」"],
        ["KOS", "服务员桌边推荐双人/四人套餐"],
        ["KOC", "小红书城市酒单笔记和朋友圈晒单"],
      ],
    },
    {
      id: "shanghai",
      name: "上海",
      flavor: "海派小酌路线",
      hero: "用精致小馆、bistro 与夜生活场景表达更轻盈的冰饮餐酒体验。",
      stores: [
        {
          name: "武康路海派小馆",
          distance: "1.4km",
          scene: "local",
          seats: 28,
          x: 33,
          y: 36,
          package: "海派小酌冰饮套餐",
          price: 258,
          pairing: "熏鱼、葱油鸡、冰饮浓香杯",
          benefit: "领券后云店同款 9 折",
        },
        {
          name: "巨鹿路 Bistro",
          distance: "2.2km",
          scene: "night",
          seats: 22,
          x: 55,
          y: 52,
          package: "Bistro 冰饮双人套餐",
          price: 298,
          pairing: "小食拼盘、烤鸡、低度冰饮调法",
          benefit: "会员积分双倍",
        },
        {
          name: "外滩夜色小酌",
          distance: "3.6km",
          scene: "night",
          seats: 16,
          x: 78,
          y: 41,
          package: "城市夜景朋友局",
          price: 428,
          pairing: "海鲜小食、冷盘、冰饮酒壶",
          benefit: "分享好友得复购券",
        },
      ],
      creators: [
        ["KOL", "海派 bistro 与低负担冰饮的搭配内容"],
        ["KOS", "门店主理人讲解城市小酌酒单"],
        ["KOC", "小红书/朋友圈发布夜景小酌真实体验"],
      ],
    },
  ],
  coupons: [
    ["新人尝鲜券", "满 99 减 20，适用于冰饮白酒套餐"],
    ["到店核销券", "预约后到店扫码可用，核销后送云店券"],
    ["分享裂变券", "好友领券后，双方各得 15 元券"],
    ["云店复购券", "活动同款酒水 48 小时限时可用"],
  ],
  bookings: [
    ["18:30", "锦里巷子火锅", "四人 · 冰镇浓香套餐", "待到店"],
    ["19:00", "宽窄小院川菜", "双人 · 川味小聚", "已确认"],
    ["20:00", "玉林夜宵铺", "六人 · 串串套餐", "待核销"],
    ["20:30", "锦里巷子火锅", "双人 · 火锅套餐", "已核销"],
  ],
  tags: ["成都火锅偏好", "长沙夜宵偏好", "上海小酌偏好", "周末聚饮", "冰饮尝鲜", "云店复购", "KOC 晒单", "低度饮用"],
};

let activeCity = campaignData.cities[0];
let activeStore = activeCity.stores[0];
let points = 1280;
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function init() {
  renderCityOptions();
  renderConsumer();
  renderOperator();
  renderAdmin();
  bindEvents();
}

function bindEvents() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  $("#citySelect").addEventListener("change", (event) => {
    activeCity = campaignData.cities.find((city) => city.id === event.target.value);
    activeStore = activeCity.stores[0];
    renderConsumer();
  });

  $("#sceneSelect").addEventListener("change", renderConsumer);
  $("#partySelect").addEventListener("change", renderConsumer);

  $("#claimCouponBtn").addEventListener("click", () => {
    points += 80;
    $("#pointsValue").textContent = points;
    showToast("已领取冰饮一夏券包，会员积分 +80");
  });

  $("#scrollStoresBtn").addEventListener("click", () => {
    $("#storeSection").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("#cloudStoreBtn").addEventListener("click", () => {
    showToast("已进入云店：冰饮尝鲜装、朋友聚饮装、城市风味推荐装");
  });

  $("#scanBtn").addEventListener("click", () => {
    $("#checkedBookings").textContent = Number($("#checkedBookings").textContent) + 1;
    points += 120;
    showToast("核销成功：已发放云店复购券，会员积分 +120");
  });

  $("#exportBtn").addEventListener("click", () => {
    showToast("已生成复盘摘要：城市表现、会员标签、云店转化和风险动作");
  });

  $("#confirmBookingBtn").addEventListener("click", (event) => {
    event.preventDefault();
    $("#bookingDialog").close();
    points += 188;
    $("#pointsValue").textContent = points;
    showToast("预约成功：核销码 BY2026 已生成，积分 +188");
  });
}

function switchView(viewId) {
  $$(".tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.view === viewId));
  $$(".view").forEach((view) => view.classList.toggle("is-active", view.id === viewId));
}

function renderCityOptions() {
  $("#citySelect").innerHTML = campaignData.cities
    .map((city) => `<option value="${city.id}">${city.name} · ${city.flavor}</option>`)
    .join("");
}

function renderConsumer() {
  const scene = $("#sceneSelect")?.value || "all";
  const stores = activeCity.stores.filter((store) => scene === "all" || store.scene === scene);
  $("#cityHeadline").textContent = `${activeCity.name} · ${activeCity.flavor}`;
  $("#storeCount").textContent = `${stores.length} 家参与门店`;
  renderMap(stores);
  renderCoupons();
  renderStores(stores);
  renderCreators();
}

function renderMap(stores) {
  const pins = stores
    .map(
      (store) =>
        `<button class="map-pin" style="left:${store.x}%;top:${store.y}%" aria-label="${store.name}" data-store="${store.name}"><span>${store.name}</span></button>`,
    )
    .join("");
  $("#cityMap").innerHTML = `<div class="map-route"></div>${pins}`;
  $$(".map-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      activeStore = activeCity.stores.find((store) => store.name === pin.dataset.store);
      openBooking(activeStore);
    });
  });
}

function renderCoupons() {
  $("#couponList").innerHTML = campaignData.coupons
    .map(([name, detail]) => `<div class="coupon"><strong>${name}</strong><span>${detail}</span></div>`)
    .join("");
}

function renderStores(stores) {
  const party = $("#partySelect")?.value || "2";
  $("#storeList").innerHTML = stores
    .map(
      (store) => `
      <article class="store-card">
        <div>
          <strong>${store.name}</strong>
          <span>${store.package} · ${store.pairing}</span>
          <div class="store-meta">
            <span>${store.distance}</span>
            <span>${party} 人可订</span>
            <span>￥${store.price} 起</span>
            <span>余 ${store.seats} 席</span>
          </div>
        </div>
        <div class="store-actions">
          <button class="mini-btn" data-book="${store.name}">预约套餐</button>
          <button class="secondary-btn" data-share="${store.name}">分享领券</button>
        </div>
      </article>`,
    )
    .join("");

  $$("[data-book]").forEach((button) => {
    button.addEventListener("click", () => {
      activeStore = activeCity.stores.find((store) => store.name === button.dataset.book);
      openBooking(activeStore);
    });
  });

  $$("[data-share]").forEach((button) => {
    button.addEventListener("click", () => showToast(`已生成 ${button.dataset.share} 分享卡，好友领券后双方得券`));
  });
}

function renderCreators() {
  $("#creatorList").innerHTML = activeCity.creators
    .map(
      ([type, detail]) => `
      <article class="creator-card">
        <strong>${type}</strong>
        <span>${detail}</span>
      </article>`,
    )
    .join("");
}

function openBooking(store) {
  $("#dialogTitle").textContent = store.package;
  $("#bookingSummary").innerHTML = `
    <strong>${store.name}</strong><br>
    ${store.pairing}<br>
    价格：￥${store.price} 起<br>
    权益：${store.benefit}
  `;
  $("#bookingDialog").showModal();
}

function renderOperator() {
  $("#bookingList").innerHTML = campaignData.bookings
    .map(
      ([time, store, packageName, status]) => `
      <div class="booking-item">
        <div>
          <strong>${time} · ${store}</strong><br>
          <span>${packageName}</span>
        </div>
        <button class="secondary-btn">${status}</button>
      </div>`,
    )
    .join("");

  $("#slotList").innerHTML = [
    ["冰镇浓香双人火锅套餐", 72],
    ["川味小聚四人套餐", 58],
    ["夏夜串串冰饮套餐", 41],
  ]
    .map(
      ([name, percent]) => `
      <div class="slot-item">
        <div>
          <strong>${name}</strong>
          <span>按日期、时段控制可售数量</span>
          <div class="progress"><i style="width:${percent}%"></i></div>
        </div>
        <button class="mini-btn">调整</button>
      </div>`,
    )
    .join("");
}

function renderAdmin() {
  $("#cityRank").innerHTML = campaignData.cities
    .map((city, index) => {
      const visits = [74200, 61800, 53600][index];
      const conversion = ["23.4%", "21.7%", "19.8%"][index];
      return `
      <div class="rank-item">
        <div>
          <strong>${index + 1}. ${city.name} · ${city.flavor}</strong><br>
          <span>${visits.toLocaleString()} 访问 · 到店核销率 ${conversion}</span>
        </div>
        <span class="pill">${city.stores.length} 家样板</span>
      </div>`;
    })
    .join("");

  $("#tagCloud").innerHTML = campaignData.tags.map((tag) => `<span>${tag}</span>`).join("");

  $("#riskList").innerHTML = [
    ["预约爽约偏高", "对连续爽约用户降低高峰时段预约优先级"],
    ["单店核销异常", "同设备短时间重复核销进入人工复查"],
    ["券包套利风险", "分享券与新人券限制同手机号、同 unionid 重复领取"],
    ["门店库存不足", "套餐余量低于 20% 时提醒城市运营补充名额"],
  ]
    .map(
      ([name, action]) => `
      <div class="risk-item">
        <div>
          <strong>${name}</strong><br>
          <span>${action}</span>
        </div>
        <button class="secondary-btn">处理</button>
      </div>`,
    )
    .join("");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

init();
