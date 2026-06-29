# StudyCost MVP

一个“留学生生活成本计算器 + SEO 内容站”的静态 MVP。

## 本地预览

```powershell
python -m http.server 4173
```

然后打开 `http://localhost:4173/`。

## 第一阶段页面

- `index.html`: 首页、生活成本计算器、城市入口、内容路线
- `articles/index.html`: 文章库入口
- `articles/*.html`: 第一批 12 个长尾 SEO 选题页
- `about.html`, `privacy.html`, `contact.html`: 基础信任页
- `sitemap.xml`, `robots.txt`: 基础 SEO 文件

## 下一步

1. 把 `https://example.com` 替换成正式域名。
2. 每篇文章补充真实数据来源、学校案例、FAQ 和内部链接。
3. 把城市预算数据从 `app.js` 拆成 JSON 或 CMS 数据源。
4. 接入统计、邮件订阅和联盟链接。
