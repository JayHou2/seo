const cities = [
  {
    id: "new-york",
    name: "New York",
    country: "美国",
    currency: "USD",
    rent: { shared: 1550, studio: 2850, campus: 1900 },
    base: { groceries: 520, dining: 260, transit: 132, health: 180, phone: 45, supplies: 120 },
    note: "纽约搜索量高、广告价值高，但竞争也强。适合优先写租房区域、地铁通勤和校外合租内容。"
  },
  {
    id: "boston",
    name: "Boston",
    country: "美国",
    currency: "USD",
    rent: { shared: 1300, studio: 2400, campus: 1750 },
    base: { groceries: 480, dining: 230, transit: 90, health: 170, phone: 45, supplies: 115 },
    note: "波士顿学校密集，适合做学校周边预算、冬季生活成本和学生医保指南。"
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    country: "美国",
    currency: "USD",
    rent: { shared: 1250, studio: 2200, campus: 1600 },
    base: { groceries: 470, dining: 250, transit: 80, health: 170, phone: 45, supplies: 130 },
    note: "洛杉矶要强调通勤半径和是否买车，租房区域指南有很强 SEO 空间。"
  },
  {
    id: "london",
    name: "London",
    country: "英国",
    currency: "GBP",
    rent: { shared: 950, studio: 1700, campus: 1200 },
    base: { groceries: 320, dining: 190, transit: 165, health: 80, phone: 20, supplies: 95 },
    note: "伦敦适合做 Zone 通勤、学生 Oyster、NHS 和校内宿舍对比内容。"
  },
  {
    id: "toronto",
    name: "Toronto",
    country: "加拿大",
    currency: "CAD",
    rent: { shared: 1150, studio: 2050, campus: 1450 },
    base: { groceries: 420, dining: 220, transit: 156, health: 90, phone: 55, supplies: 115 },
    note: "多伦多可以围绕租房、电话卡、银行卡、冬季装备和兼职成本做内容簇。"
  },
  {
    id: "melbourne",
    name: "Melbourne",
    country: "澳洲",
    currency: "AUD",
    rent: { shared: 1050, studio: 1900, campus: 1450 },
    base: { groceries: 420, dining: 210, transit: 170, health: 70, phone: 35, supplies: 110 },
    note: "墨尔本留学生需求稳定，OSHC、Myki、合租和打工税号都是可持续选题。"
  }
];

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

function money(value, currency) {
  return `${symbols[currency] || ""}${Math.round(value).toLocaleString("en-US")}`;
}

function getSelectedCity() {
  return cities.find((city) => city.id === citySelect.value) || cities[0];
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

  resultCity.textContent = `${city.name}, ${city.country} · ${lifestyleChoice.label}`;
  monthlyTotal.textContent = money(total, city.currency);
  annualTotal.textContent = `约 ${money(total * 12, city.currency)} / 年`;
  cityNote.textContent = city.note;

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
      const minimum = city.rent.shared + Object.values(city.base).reduce((sum, value) => sum + value, 0) * 0.86;
      const maximum = city.rent.studio + Object.values(city.base).reduce((sum, value) => sum + value, 0) * 1.22;
      return `
        <article class="city-card">
          <h3>${city.name}</h3>
          <p>${city.note}</p>
          <div class="city-meta">
            <span class="tag">${city.country}</span>
            <span class="tag">${money(minimum, city.currency)}-${money(maximum, city.currency)} / 月</span>
          </div>
        </article>
      `;
    })
    .join("");
}

buffer.addEventListener("input", () => {
  bufferValue.textContent = buffer.value;
  calculate();
});

[citySelect, housingType, lifestyle, tuition].forEach((input) => {
  input.addEventListener("input", calculate);
});

costForm.addEventListener("submit", calculate);

renderCities();
calculate();
