const campaignData = {
  cities: [
    {
      id: "multi",
      name: "多城覆盖",
      route: "全国冰饮门店",
      stores: [
        {
          name: "国窖1573餐酒品鉴门店A",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "高端餐酒/宴请",
          province: "四川省",
          city: "成都市",
          district: "锦江区",
          address: "示意地址：春熙路商圈合作门店",
          longitude: "104.0800",
          latitude: "30.6570",
          phone: "以活动页面及门店公示为准",
          hours: "11:30-22:30",
          product: "国窖1573",
          x: 28,
          y: 42,
        },
        {
          name: "国窖1573餐酒品鉴门店B",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "本帮/融合餐酒",
          province: "上海市",
          city: "上海市",
          district: "黄浦区",
          address: "示意地址：外滩周边合作门店",
          longitude: "121.4900",
          latitude: "31.2300",
          phone: "以活动页面及门店公示为准",
          hours: "11:00-23:00",
          product: "国窖1573",
          x: 58,
          y: 34,
        },
        {
          name: "特曲餐酒品鉴门店",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "大众聚餐/地方菜",
          province: "广东省",
          city: "广州市",
          district: "天河区",
          address: "示意地址：天河商圈合作门店",
          longitude: "113.3300",
          latitude: "23.1350",
          phone: "以活动页面及门店公示为准",
          hours: "10:30-22:30",
          product: "特曲",
          x: 74,
          y: 58,
        },
      ],
    },
    {
      id: "guojiao",
      name: "国窖1573",
      route: "高端餐酒品鉴门店",
      stores: [
        {
          name: "国窖1573餐酒品鉴门店A",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "高端餐酒/宴请",
          province: "四川省",
          city: "成都市",
          district: "锦江区",
          address: "示意地址：春熙路商圈合作门店",
          longitude: "104.0800",
          latitude: "30.6570",
          phone: "以活动页面及门店公示为准",
          hours: "11:30-22:30",
          product: "国窖1573",
          x: 32,
          y: 36,
        },
        {
          name: "国窖1573餐酒品鉴门店B",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "本帮/融合餐酒",
          province: "上海市",
          city: "上海市",
          district: "黄浦区",
          address: "示意地址：外滩周边合作门店",
          longitude: "121.4900",
          latitude: "31.2300",
          phone: "以活动页面及门店公示为准",
          hours: "11:00-23:00",
          product: "国窖1573",
          x: 55,
          y: 52,
        },
        {
          name: "国窖1573餐酒品鉴门店C",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "商务宴请/品鉴",
          province: "河北省",
          city: "石家庄市",
          district: "长安区",
          address: "示意地址：核心餐饮商圈合作门店",
          longitude: "114.5200",
          latitude: "38.0480",
          phone: "以活动页面及门店公示为准",
          hours: "11:00-22:00",
          product: "国窖1573",
          x: 76,
          y: 43,
        },
      ],
    },
    {
      id: "classic",
      name: "特曲/怀旧60/窖龄",
      route: "多产品餐饮品鉴门店",
      stores: [
        {
          name: "特曲餐酒品鉴门店",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "地方菜/朋友聚餐",
          province: "广东省",
          city: "广州市",
          district: "天河区",
          address: "示意地址：天河商圈合作门店",
          longitude: "113.3300",
          latitude: "23.1350",
          phone: "以活动页面及门店公示为准",
          hours: "10:30-22:30",
          product: "特曲",
          x: 26,
          y: 46,
        },
        {
          name: "怀旧60餐酒品鉴门店",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "宴席/家庭聚餐",
          province: "浙江省",
          city: "杭州市",
          district: "上城区",
          address: "示意地址：湖滨商圈合作门店",
          longitude: "120.1680",
          latitude: "30.2450",
          phone: "以活动页面及门店公示为准",
          hours: "11:00-22:00",
          product: "怀旧60",
          x: 52,
          y: 38,
        },
        {
          name: "窖龄餐酒品鉴门店",
          type: "dining",
          typeName: "餐饮门店",
          diningType: "品质餐酒/小聚",
          province: "重庆市",
          city: "重庆市",
          district: "渝中区",
          address: "示意地址：解放碑商圈合作门店",
          longitude: "106.5750",
          latitude: "29.5570",
          phone: "以活动页面及门店公示为准",
          hours: "11:30-23:30",
          product: "窖龄",
          x: 72,
          y: 56,
        },
      ],
    },
  ],
};

let activeCity = campaignData.cities[0];
let toastTimer;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function init() {
  renderCityOptions();
  detectCity();
  bindEvents();
}

function bindEvents() {
  $("#citySelect").addEventListener("change", (event) => {
    activeCity = campaignData.cities.find((city) => city.id === event.target.value);
    $("#locationStatus").textContent = `已切换至 ${activeCity.name}`;
    render();
  });

  $("#memberBtn").addEventListener("click", openMemberCenter);
  $("#dialogMemberBtn").addEventListener("click", (event) => {
    event.preventDefault();
    $("#storeDialog").close();
    openMemberCenter();
  });
}

function renderCityOptions() {
  $("#citySelect").innerHTML = campaignData.cities
    .map((city) => `<option value="${city.id}">${city.name}</option>`)
    .join("");
}

function detectCity() {
  activeCity = campaignData.cities[0];
  $("#citySelect").value = activeCity.id;
  $("#locationStatus").textContent = "已进入多城覆盖地图";
  render();
}

function render() {
  $("#cityHeadline").textContent = `${activeCity.name} · ${activeCity.route}`;
  $("#storeCount").textContent = `${activeCity.stores.length} 家示意门店`;
  renderMap();
  renderStores();
}

function renderMap() {
  const pins = activeCity.stores
    .map(
      (store) => `
      <button class="map-pin ${store.type}" style="left:${store.x}%;top:${store.y}%" data-store="${store.name}" aria-label="${store.name}">
        <span>${store.name}</span>
      </button>`,
    )
    .join("");

  $("#cityMap").innerHTML = `<div class="map-route"></div>${pins}`;
  $$(".map-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const store = activeCity.stores.find((item) => item.name === pin.dataset.store);
      openStoreDialog(store);
    });
  });
}

function renderStores() {
  $("#storeList").innerHTML = activeCity.stores
    .map(
      (store) => `
      <article class="store-card">
        <div>
          <div class="store-title">
            <strong>${store.name}</strong>
            <span class="store-type ${store.type}">${store.product}</span>
          </div>
          <p>${store.diningType} · ${store.city}${store.district}</p>
          <p>${store.address}</p>
          <p>${store.hours} · ${store.phone}</p>
        </div>
        <button class="detail-btn" data-store="${store.name}">查看信息</button>
      </article>`,
    )
    .join("");

  $$(".detail-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const store = activeCity.stores.find((item) => item.name === button.dataset.store);
      openStoreDialog(store);
    });
  });
}

function openStoreDialog(store) {
  $("#dialogType").textContent = `${store.typeName} · ${store.product}`;
  $("#dialogTitle").textContent = store.name;
  $("#dialogDetails").innerHTML = `
    ${detailItem("餐饮类型", store.diningType)}
    ${detailItem("所在省/市/区县", `${store.province} · ${store.city} · ${store.district}`)}
    ${detailItem("详细地址", store.address)}
    ${detailItem("经纬度", `${store.longitude}, ${store.latitude}`)}
    ${detailItem("联系电话", store.phone)}
    ${detailItem("营业时间", store.hours)}
  `;
  $("#storeDialog").showModal();
}

function detailItem(label, value) {
  return `<div class="detail-item"><span>${label}</span><strong>${value}</strong></div>`;
}

function openMemberCenter() {
  showToast("示意跳转：会员中心小程序");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

init();
