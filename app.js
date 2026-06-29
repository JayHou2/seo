const fallbackCities = [
  {
    id: "new-york",
    name: "New York",
    country: "美国",
    currency: "USD",
    rent: { shared: 1550, studio: 2850, campus: 1900 },
    base: { groceries: 520, dining: 260, transit: 132, health: 180, phone: 45, supplies: 120 },
    sourceLabel: "NYU cost of attendance and NYC student rent benchmarks",
    sourceUrl: "https://www.nyu.edu/admissions/financial-aid-and-scholarships/managing-your-aid/cost-of-attendance.html",
    affiliateCategory: "renters-insurance",
    note: "纽约搜索量高、广告价值高，但竞争也强。适合优先写租房区域、地铁通勤和校外合租内容。"
  },
  {
    id: "boston",
    name: "Boston",
    country: "美国",
    currency: "USD",
    rent: { shared: 1300, studio: 2400, campus: 1750 },
    base: { groceries: 480, dining: 230, transit: 90, health: 170, phone: 45, supplies: 115 },
    sourceLabel: "Boston University cost of attendance and local student housing ranges",
    sourceUrl: "https://www.bu.edu/finaid/aid-basics/cost-of-attendance/",
    affiliateCategory: "student-banking",
    note: "波士顿学校密集，适合做学校周边预算、冬季生活成本和学生医保指南。"
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    country: "美国",
    currency: "USD",
    rent: { shared: 1250, studio: 2200, campus: 1600 },
    base: { groceries: 470, dining: 250, transit: 80, health: 170, phone: 45, supplies: 130 },
    sourceLabel: "UCLA cost of attendance and Los Angeles commuter assumptions",
    sourceUrl: "https://admission.ucla.edu/tuition-aid/tuition-fees",
    affiliateCategory: "cheap-flights",
    note: "洛杉矶要强调通勤半径和是否买车，租房区域指南有很强 SEO 空间。"
  },
  {
    id: "london",
    name: "London",
    country: "英国",
    currency: "GBP",
    rent: { shared: 950, studio: 1700, campus: 1200 },
    base: { groceries: 320, dining: 190, transit: 165, health: 80, phone: 20, supplies: 95 },
    sourceLabel: "UCL and Imperial student cost guidance",
    sourceUrl: "https://www.ucl.ac.uk/students/fees-and-funding/living-costs",
    affiliateCategory: "student-phone",
    note: "伦敦适合做 Zone 通勤、学生 Oyster、NHS 和校内宿舍对比内容。"
  },
  {
    id: "toronto",
    name: "Toronto",
    country: "加拿大",
    currency: "CAD",
    rent: { shared: 1150, studio: 2050, campus: 1450 },
    base: { groceries: 420, dining: 220, transit: 156, health: 90, phone: 55, supplies: 115 },
    sourceLabel: "University of Toronto planning budgets and local rental ranges",
    sourceUrl: "https://future.utoronto.ca/finances/fees/",
    affiliateCategory: "student-banking",
    note: "多伦多可以围绕租房、电话卡、银行卡、冬季装备和兼职成本做内容簇。"
  },
  {
    id: "melbourne",
    name: "Melbourne",
    country: "澳洲",
    currency: "AUD",
    rent: { shared: 1050, studio: 1900, campus: 1450 },
    base: { groceries: 420, dining: 210, transit: 170, health: 70, phone: 35, supplies: 110 },
    sourceLabel: "University of Melbourne and Study Australia cost guidance",
    sourceUrl: "https://students.unimelb.edu.au/student-support/international-student-support/living-in-melbourne/cost-of-living",
    affiliateCategory: "health-insurance",
    note: "墨尔本留学生需求稳定，OSHC、Myki、合租和打工税号都是可持续选题。"
  }
];

const fallbackPartners = [
  { id: "student-banking", label: "学生银行卡", headline: "预留学生银行卡/信用记录推荐位", description: "适合放银行开户注册、无月费账户或信用卡入门联盟链接。", url: "#" },
  { id: "student-phone", label: "电话卡", headline: "预留电话卡推荐位", description: "适合放 eSIM、当地电话卡、国际流量包和开学季折扣。", url: "#" },
  { id: "health-insurance", label: "医保/保险", headline: "预留医保和租客保险推荐位", description: "适合放 OSHC、租客保险、旅行保险或学校保险替代方案。", url: "#" },
  { id: "cheap-flights", label: "学生机票", headline: "预留机票比价推荐位", description: "适合放学生票、行李额度、比价平台和转机风险说明。", url: "#" },
  { id: "renters-insurance", label: "租房服务", headline: "预留租房和租客保险推荐位", description: "适合放租房平台、押金保险、家具租赁和搬家服务。", url: "#" }
];

let cities = fallbackCities;
let partners = fallbackPartners;

const lifestyleMultipliers = {
  lean: { label: "节省型", multiplier: 0.86 },
  balanced: { label: "均衡型", multiplier: 1 },
  comfortable: { label: "舒适型", multiplier: 1.22 }
};

const symbols = {
  USD: "$",
  GBP: "£",
  CAD: "C$",
  AUD: "A$"
};

const citySelect = document.querySelector("#citySelect");
const housingType = document.querySelector("#housingType");
const lifestyle = document.querySelector("#lifestyle");
const tuition = document.querySelector("#tuition");
const buffer = document.querySelector("#buffer");
const bufferValue = document.querySelector("#bufferValue");
const costForm = document.querySelector("#costForm");
const breakdown = document.querySelector("#breakdown");
const resultCity = document.querySelector("#resultCity");
const monthlyTotal = document.querySelector("#monthlyTotal");
const annualTotal = document.querySelector("#annualTotal");
const cityNote = document.querySelector("#cityNote");
const cityGrid = document.querySelector("#cityGrid");
const sourceLink = document.querySelector("#sourceLink");
const partnerBox = document.querySelector("#partnerBox");
const newsletterForm = document.querySelector("#newsletterForm");
const newsletterStatus = document.querySelector("#newsletterStatus");

function money(value, currency) {
  return `${symbols[currency] || ""}${Math.round(value).toLocaleString("en-US")}`;
}

function getSelectedCity() {
  return cities.find((city) => city.id === citySelect.value) || cities[0];
}

function getPartner(city) {
  return partners.find((partner) => partner.id === city.affiliateCategory) || partners[0];
}

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`Unable to load ${path}`);
    return await response.json();
  } catch (error) {
    return fallback;
  }
}

function calculate(event) {
  if (event) event.preventDefault();

  const city = getSelectedCity();
  const lifestyleChoice = lifestyleMultipliers[lifestyle.value];
  const rent = city.rent[housingType.value];
  const variableBase = Object.values(city.base).reduce((sum, value) => sum + value, 0);
  const adjustedLiving = variableBase * lifestyleChoice.multiplier;
  const monthlyTuition = Number(tuition.value || 0);
  const subtotal = rent + adjustedLiving + monthlyTuition;
  const reserve = subtotal * (Number(buffer.value) / 100);
  const total = subtotal + reserve;
  const partner = getPartner(city);

  resultCity.textContent = `${city.name}, ${city.country} · ${lifestyleChoice.label}`;
  monthlyTotal.textContent = money(total, city.currency);
  annualTotal.textContent = `约 ${money(total * 12, city.currency)} / 年`;
  cityNote.textContent = city.note;
  sourceLink.href = city.sourceUrl;
  sourceLink.textContent = city.sourceLabel;
  partnerBox.innerHTML = `
    <span class="tag">${partner.label}</span>
    <h3>${partner.headline}</h3>
    <p>${partner.description}</p>
    <a class="text-link" href="${partner.url}" rel="sponsored nofollow">替换为联盟链接</a>
  `;

  const rows = [
    ["租房", rent],
    ["饮食、日用品、社交", adjustedLiving],
    ["学杂费摊销", monthlyTuition],
    [`应急储备 ${buffer.value}%`, reserve]
  ];

  breakdown.innerHTML = rows
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${money(value, city.currency)}</dd></div>`)
    .join("");
}

function renderCities() {
  citySelect.innerHTML = cities
    .map((city) => `<option value="${city.id}">${city.name}, ${city.country}</option>`)
    .join("");

  cityGrid.innerHTML = cities
    .map((city) => {
      const livingBase = Object.values(city.base).reduce((sum, value) => sum + value, 0);
      const minimum = city.rent.shared + livingBase * 0.86;
      const maximum = city.rent.studio + livingBase * 1.22;
      return `
        <article class="city-card">
          <h3>${city.name}</h3>
          <p>${city.note}</p>
          <div class="city-meta">
            <span class="tag">${city.country}</span>
            <span class="tag">${money(minimum, city.currency)}-${money(maximum, city.currency)} / 月</span>
          </div>
          <a class="text-link" href="${city.sourceUrl}">查看数据参考</a>
        </article>
      `;
    })
    .join("");
}

function initNewsletter() {
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterStatus.textContent = "已记录订阅意向。上线后可替换为 Beehiiv、ConvertKit、Mailchimp 或自建表单接口。";
    newsletterForm.reset();
  });
}

async function init() {
  cities = await loadJson("data/cities.json", fallbackCities);
  partners = await loadJson("data/partners.json", fallbackPartners);
  renderCities();
  calculate();
  initNewsletter();
}

buffer.addEventListener("input", () => {
  bufferValue.textContent = buffer.value;
  calculate();
});

[citySelect, housingType, lifestyle, tuition].forEach((input) => {
  input.addEventListener("input", calculate);
});

costForm.addEventListener("submit", calculate);
init();
