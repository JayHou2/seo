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
let currentLang = localStorage.getItem("studycost-lang") || "en";

const lifestyleMultipliers = {
  lean: { label: { en: "Lean", zh: "节省型" }, multiplier: 0.86 },
  balanced: { label: { en: "Balanced", zh: "均衡型" }, multiplier: 1 },
  comfortable: { label: { en: "Comfortable", zh: "舒适型" }, multiplier: 1.22 }
};

const translations = {
  en: {
    pageTitle: "Student Cost of Living Calculator | StudyCost",
    metaDescription: "Use StudyCost to estimate monthly living costs in popular college cities, including rent, food, transit, insurance, phone plans, and starter expenses.",
    navCalculator: "Calculator",
    navCities: "City Guides",
    navArticles: "Articles",
    navSources: "Sources",
    navAbout: "About",
    heroEyebrow: "Before you accept an offer",
    heroTitle1: "Student Cost",
    heroTitle2: " of Living Calculator",
    heroLede: "Plan your monthly budget before choosing a college city. Estimate rent, food, transit, insurance, phone plans, and starter costs for international and out-of-state students.",
    heroPrimary: "Start Calculating",
    heroSecondary: "See Content Plan",
    toolEyebrow: "Core Tool",
    toolTitle: "Student Cost of Living Calculator",
    toolText: 'Budget data now lives in <code>data/cities.json</code>, so it can later move to a CMS, Google Sheets, or Airtable.',
    fieldCity: "City",
    fieldHousing: "Housing Type",
    housingShared: "Shared room",
    housingStudio: "Studio / private apartment",
    housingCampus: "On-campus housing",
    fieldLifestyle: "Lifestyle",
    lifestyleLean: "Lean",
    lifestyleBalanced: "Balanced",
    lifestyleComfortable: "Comfortable",
    fieldTuition: "Monthly tuition and fees allocation",
    fieldBuffer: "Emergency buffer",
    recalculate: "Recalculate",
    sourcePrefix: "Source:",
    loading: "Loading",
    annualPrefix: "About",
    annualSuffix: "/ year",
    rent: "Rent",
    living: "Food, supplies, and social life",
    tuition: "Tuition and fees allocation",
    buffer: "Emergency buffer",
    perMonth: "/ month",
    dataReference: "View data reference",
    affiliateLink: "Replace with affiliate link",
    citiesEyebrow: "First City Set",
    citiesTitle: "Start with cities people search for every year",
    citiesText: "Cover high-demand college cities first, then expand each city into housing areas, school neighborhoods, banking, transit, and safety guides.",
    planEyebrow: "SEO Content Plan",
    planTitle: "Publish 30-50 focused articles in month one, starting with long-tail questions.",
    planCostTitle: "Cost Guides",
    planCostText: "City living costs, rent budgets, groceries, insurance, and transit.",
    planDecisionTitle: "Decision Guides",
    planDecisionText: "City comparisons, on-campus vs off-campus housing, and car ownership.",
    planMonetizeTitle: "Monetization Guides",
    planMonetizeText: "Phone plans, banking, insurance, flights, rental platforms, and courses.",
    openArticles: "Open Article Library",
    newsletterEyebrow: "Newsletter",
    newsletterTitle: "Turn weekly city budget updates into an early email capture.",
    newsletterText: "This can later connect to Beehiiv, ConvertKit, Mailchimp, Buttondown, or a custom API. For now it keeps a no-backend form for copy testing.",
    emailLabel: "Email",
    subscribe: "Subscribe",
    newsletterDone: "Subscription intent recorded. Replace this with Beehiiv, ConvertKit, Mailchimp, or a custom form endpoint after launch.",
    footerText: "StudyCost is a planning tool for student living costs. Data is for budgeting only; always check the latest school, landlord, and provider prices.",
    footerPrivacy: "Privacy",
    footerContact: "Contact"
  },
  zh: {
    pageTitle: "留学生生活成本计算器 | StudyCost",
    metaDescription: "用 StudyCost 估算纽约、波士顿、伦敦、多伦多、墨尔本等热门留学城市的月度生活费，并阅读租房、医保、交通和银行卡指南。",
    navCalculator: "计算器",
    navCities: "城市指南",
    navArticles: "文章",
    navSources: "数据来源",
    navAbout: "关于",
    heroEyebrow: "留学预算第一步",
    heroTitle1: "留学生生活",
    heroTitle2: "成本计算器",
    heroLede: "算清一个城市，才知道 offer 的真实成本。输入城市、租房方式和生活习惯，快速估算留学生月度生活费。页面同时沉淀城市指南和 SEO 内容，适合持续扩展成工具 + 内容站。",
    heroPrimary: "开始计算",
    heroSecondary: "查看内容路线",
    toolEyebrow: "核心工具",
    toolTitle: "留学生生活成本计算器",
    toolText: '预算数据已拆到 <code>data/cities.json</code>，后续可以迁移到 CMS、Google Sheets 或 Airtable。',
    fieldCity: "城市",
    fieldHousing: "租房方式",
    housingShared: "合租卧室",
    housingStudio: "Studio / 单间",
    housingCampus: "校内宿舍",
    fieldLifestyle: "生活方式",
    lifestyleLean: "节省型",
    lifestyleBalanced: "均衡型",
    lifestyleComfortable: "舒适型",
    fieldTuition: "每月学杂费摊销",
    fieldBuffer: "应急储备比例",
    recalculate: "重新计算",
    sourcePrefix: "数据参考：",
    loading: "加载中",
    annualPrefix: "约",
    annualSuffix: "/ 年",
    rent: "租房",
    living: "饮食、日用品、社交",
    tuition: "学杂费摊销",
    buffer: "应急储备",
    perMonth: "/ 月",
    dataReference: "查看数据参考",
    affiliateLink: "替换为联盟链接",
    citiesEyebrow: "第一批城市",
    citiesTitle: "从搜索需求稳定的城市开始",
    citiesText: "先覆盖热门留学城市，每个城市都可以扩展租房区域、学校周边、银行卡、交通和安全指南。",
    planEyebrow: "SEO 内容路线",
    planTitle: "第一月发布 30-50 篇，先围绕明确问题抢长尾词。",
    planCostTitle: "成本类",
    planCostText: "城市生活费、租房预算、伙食费、医保和交通支出。",
    planDecisionTitle: "决策类",
    planDecisionText: "不同城市对比、校内宿舍 vs 校外租房、是否需要买车。",
    planMonetizeTitle: "变现类",
    planMonetizeText: "电话卡、银行卡、保险、机票、租房平台和语言课程推荐。",
    openArticles: "打开文章库",
    newsletterEyebrow: "订阅入口",
    newsletterTitle: "把“每周城市预算更新”做成早期留资钩子。",
    newsletterText: "上线后这里可以接 Beehiiv、ConvertKit、Mailchimp、Buttondown 或自建 API。现在先保留无后端表单，方便验证转化文案。",
    emailLabel: "邮箱",
    subscribe: "订阅更新",
    newsletterDone: "已记录订阅意向。上线后可替换为 Beehiiv、ConvertKit、Mailchimp 或自建表单接口。",
    footerText: "StudyCost 是一个留学生生活成本估算工具。数据仅供规划参考，请以学校、房东和服务商最新报价为准。",
    footerPrivacy: "隐私政策",
    footerContact: "联系"
  }
};

const localizedCountries = {
  en: { 美国: "United States", 英国: "United Kingdom", 加拿大: "Canada", 澳洲: "Australia" },
  zh: { 美国: "美国", 英国: "英国", 加拿大: "加拿大", 澳洲: "澳洲" }
};

const cityNotes = {
  en: {
    "new-york": "New York has strong search demand and high advertiser value, but competition is intense. Start with neighborhood rent, subway commute, and off-campus housing guides.",
    boston: "Boston is packed with universities, making it ideal for school-area budgets, winter costs, and student insurance guides.",
    "los-angeles": "Los Angeles content should emphasize commute radius and whether a student needs a car. Neighborhood housing guides have strong SEO potential.",
    london: "London is a good fit for Zone-based commute guides, student Oyster cards, NHS topics, and on-campus vs private housing comparisons.",
    toronto: "Toronto can support content clusters around rent, phone plans, bank accounts, winter gear, and part-time work costs.",
    melbourne: "Melbourne has stable international student demand. OSHC, Myki, shared housing, and tax file number guides can all grow into useful articles."
  },
  zh: {
    "new-york": "纽约搜索量高、广告价值高，但竞争也强。适合优先写租房区域、地铁通勤和校外合租内容。",
    boston: "波士顿学校密集，适合做学校周边预算、冬季生活成本和学生医保指南。",
    "los-angeles": "洛杉矶要强调通勤半径和是否买车，租房区域指南有很强 SEO 空间。",
    london: "伦敦适合做 Zone 通勤、学生 Oyster、NHS 和校内宿舍对比内容。",
    toronto: "多伦多可以围绕租房、电话卡、银行卡、冬季装备和兼职成本做内容簇。",
    melbourne: "墨尔本留学生需求稳定，OSHC、Myki、合租和打工税号都是可持续选题。"
  }
};

const partnerCopy = {
  en: {
    "student-banking": { label: "Student banking", headline: "Reserved student banking offer slot", description: "Use this for checking accounts, no-fee student banking, or beginner credit card affiliate links." },
    "student-phone": { label: "Phone plans", headline: "Reserved phone plan offer slot", description: "Use this for eSIMs, local phone plans, international data packs, and back-to-school discounts." },
    "health-insurance": { label: "Insurance", headline: "Reserved insurance offer slot", description: "Use this for OSHC, renters insurance, travel insurance, or school insurance alternatives." },
    "cheap-flights": { label: "Student flights", headline: "Reserved flight comparison offer slot", description: "Use this for student fares, baggage policies, fare comparison tools, and transfer-risk guidance." },
    "renters-insurance": { label: "Housing services", headline: "Reserved housing and renters insurance offer slot", description: "Use this for rental platforms, deposit protection, furniture rental, or moving services." }
  },
  zh: {
    "student-banking": { label: "学生银行卡", headline: "预留学生银行卡/信用记录推荐位", description: "适合放银行开户注册、无月费账户或信用卡入门联盟链接。" },
    "student-phone": { label: "电话卡", headline: "预留电话卡推荐位", description: "适合放 eSIM、当地电话卡、国际流量包和开学季折扣。" },
    "health-insurance": { label: "医保/保险", headline: "预留医保和租客保险推荐位", description: "适合放 OSHC、租客保险、旅行保险或学校保险替代方案。" },
    "cheap-flights": { label: "学生机票", headline: "预留机票比价推荐位", description: "适合放学生票、行李额度、比价平台和转机风险说明。" },
    "renters-insurance": { label: "租房服务", headline: "预留租房和租客保险推荐位", description: "适合放租房平台、押金保险、家具租赁和搬家服务。" }
  }
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
const languageButtons = document.querySelectorAll(".language-button");

function money(value, currency) {
  return `${symbols[currency] || ""}${Math.round(value).toLocaleString("en-US")}`;
}

function getSelectedCity() {
  return cities.find((city) => city.id === citySelect.value) || cities[0];
}

function getPartner(city) {
  return partners.find((partner) => partner.id === city.affiliateCategory) || partners[0];
}

function t(key) {
  return translations[currentLang][key] || translations.en[key] || key;
}

function countryName(country) {
  return localizedCountries[currentLang][country] || country;
}

function cityNoteText(city) {
  return cityNotes[currentLang][city.id] || city.note;
}

function getPartnerCopy(partner) {
  return partnerCopy[currentLang][partner.id] || partner;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", t("metaDescription"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.lang === currentLang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("studycost-lang", lang);
  applyStaticTranslations();
  renderCities();
  calculate();
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

  resultCity.textContent = `${city.name}, ${countryName(city.country)} · ${lifestyleChoice.label[currentLang]}`;
  monthlyTotal.textContent = money(total, city.currency);
  annualTotal.textContent = `${t("annualPrefix")} ${money(total * 12, city.currency)} ${t("annualSuffix")}`;
  cityNote.textContent = cityNoteText(city);
  sourceLink.href = city.sourceUrl;
  sourceLink.textContent = city.sourceLabel;
  const localizedPartner = getPartnerCopy(partner);
  partnerBox.innerHTML = `
    <span class="tag">${localizedPartner.label}</span>
    <h3>${localizedPartner.headline}</h3>
    <p>${localizedPartner.description}</p>
    <a class="text-link" href="${partner.url}" rel="sponsored nofollow">${t("affiliateLink")}</a>
  `;

  const rows = [
    [t("rent"), rent],
    [t("living"), adjustedLiving],
    [t("tuition"), monthlyTuition],
    [`${t("buffer")} ${buffer.value}%`, reserve]
  ];

  breakdown.innerHTML = rows
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${money(value, city.currency)}</dd></div>`)
    .join("");
}

function renderCities() {
  citySelect.innerHTML = cities
    .map((city) => `<option value="${city.id}">${city.name}, ${countryName(city.country)}</option>`)
    .join("");

  cityGrid.innerHTML = cities
    .map((city) => {
      const livingBase = Object.values(city.base).reduce((sum, value) => sum + value, 0);
      const minimum = city.rent.shared + livingBase * 0.86;
      const maximum = city.rent.studio + livingBase * 1.22;
      return `
        <article class="city-card">
          <h3>${city.name}</h3>
          <p>${cityNoteText(city)}</p>
          <div class="city-meta">
            <span class="tag">${countryName(city.country)}</span>
            <span class="tag">${money(minimum, city.currency)}-${money(maximum, city.currency)} ${t("perMonth")}</span>
          </div>
          <a class="text-link" href="${city.sourceUrl}">${t("dataReference")}</a>
        </article>
      `;
    })
    .join("");
}

function initNewsletter() {
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterStatus.textContent = t("newsletterDone");
    newsletterForm.reset();
  });
}

async function init() {
  cities = await loadJson("data/cities.json", fallbackCities);
  partners = await loadJson("data/partners.json", fallbackPartners);
  applyStaticTranslations();
  renderCities();
  calculate();
  initNewsletter();
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

buffer.addEventListener("input", () => {
  bufferValue.textContent = buffer.value;
  calculate();
});

[citySelect, housingType, lifestyle, tuition].forEach((input) => {
  input.addEventListener("input", calculate);
});

costForm.addEventListener("submit", calculate);
init();
