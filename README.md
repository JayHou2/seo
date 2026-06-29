# StudyCost MVP

一个“留学生生活成本计算器 + SEO 内容站”的静态 MVP。

## 本地预览

```powershell
python -m http.server 4173
```

然后打开 `http://localhost:4173/`。如果本机没有 Python，可以直接打开 `index.html`，脚本会使用内置兜底数据。

## 当前页面

- `index.html`: 首页、生活成本计算器、城市入口、订阅入口和联盟位占位
- `data/cities.json`: 城市预算数据源
- `data/partners.json`: 联盟推荐位配置
- `resources.html`: 数据来源与更新方法
- `articles/index.html`: 文章库入口
- `articles/*.html`: 第一批 12 个长尾 SEO 选题页
- `about.html`, `privacy.html`, `contact.html`: 基础信任页
- `sitemap.xml`, `robots.txt`: 基础 SEO 文件

## 下一步

1. 如果绑定自定义域名，把 `https://jayhou2.github.io/seo/` 替换为正式域名。
2. 在 `index.html` 的 `analyticsMeasurementId` 填入 GA4 Measurement ID，例如 `G-XXXXXXXXXX`。
3. 将订阅表单替换为 Beehiiv、ConvertKit、Mailchimp、Buttondown 或自建 API。
4. 将 `data/cities.json` 迁移到 CMS、Google Sheets 或 Airtable。
5. 给每篇文章继续补充真实租房样本、学校案例截图、FAQ schema 和联盟链接。

## Google Search Console

1. 打开 Google Search Console，添加 URL prefix: `https://jayhou2.github.io/seo/`。
2. 用 HTML file 或 meta tag 完成验证。
3. 提交 sitemap: `https://jayhou2.github.io/seo/sitemap.xml`。
4. 等待 Google 抓取，再观察 Coverage、Queries 和 Pages。
