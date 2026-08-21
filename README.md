# tarasov-artem.netlify.app

Source for my personal site — case studies, projects and writing.
Built with Astro, deployed on Netlify.

**Live:** [tarasov-artem.netlify.app](https://tarasov-artem.netlify.app)

## Stack

Astro 5 with MDX and sitemap integrations, self-hosted fonts, no client-side
framework. Ships almost no JavaScript — the only scripts are the mobile menu and
a scroll-reveal observer, both of which no-op under `prefers-reduced-motion`.

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview
```

## Adding an article

Copy `src/content/writing/template.md` to
`src/content/writing/your-slug.md`, fill in the frontmatter, write the body, set
`draft: false`. The filename becomes the URL (`/writing/your-slug`) and the
article appears on the index, the homepage and in the sitemap automatically.

Frontmatter is schema-validated in `src/content.config.ts` — the build fails
loudly on a typo rather than shipping a broken page.

## Structure

```
src/
  config.ts              site metadata, links, nav — edit links in one place
  content.config.ts      writing collection schema
  content/writing/       articles (Markdown/MDX)
  layouts/
    Base.astro           head, meta, OG, JSON-LD, scroll reveal
    Work.astro           case study layout
  pages/
    index.astro          homepage
    work/*.astro         case studies
    writing/             index + [...slug]
    404.astro
  components/            Nav, Footer, WorkItem, BrowserFrame, FlowDiagram
  styles/global.css      design tokens and primitives
scripts/
  og.mjs                 regenerates the social preview image
  verify.mjs             build verification (see below)
public/images/           project screenshots
```

## Verification

`scripts/verify.mjs` checks every route against a running preview server:
console errors, failed requests, broken images, missing alt text, heading
structure, canonical and meta tags, horizontal overflow on desktop and mobile,
and that every internal link resolves.

```bash
npm run build
npm run preview -- --port 4399     # in one terminal
node scripts/verify.mjs http://localhost:4399 ./shots
```

Exits non-zero if anything fails, so it can gate a deploy.

## Notes

- `src/config.ts` holds the LinkedIn URL. It is currently empty, and every
  LinkedIn link on the site is conditional — set the value and the links appear
  in the nav, footer and connect block automatically.
- Social preview image: edit `scripts/og.mjs` and re-run it.
- Deploy config is in `netlify.toml` (build command, publish dir, cache headers
  for hashed assets).

---

## Русская версия

Исходник моего личного сайта — кейсы, проекты и статьи. Astro, деплой на Netlify.

**Стек:** Astro 5 с интеграциями MDX и sitemap, самохостящиеся шрифты, без
клиентского фреймворка. JavaScript почти не отгружается — только мобильное меню
и scroll-reveal, оба отключаются при `prefers-reduced-motion`.

**Запуск:** `npm install` → `npm run dev` (http://localhost:4321), сборка —
`npm run build` в `dist/`.

**Как добавить статью:** скопировать `src/content/writing/template.md` в
`src/content/writing/твой-slug.md`, заполнить frontmatter, написать текст,
поставить `draft: false`. Имя файла становится адресом (`/writing/твой-slug`),
статья сама появляется в списке, на главной и в sitemap. Frontmatter
валидируется по схеме — при опечатке сборка падает с понятной ошибкой, а не
выкладывает сломанную страницу.

**Проверка:** `scripts/verify.mjs` прогоняет все страницы на запущенном
preview-сервере: ошибки консоли, упавшие запросы, битые картинки, отсутствующие
alt, структура заголовков, canonical и мета-теги, горизонтальные переполнения на
десктопе и мобильных, и что все внутренние ссылки открываются. Возвращает
ненулевой код при любой проблеме — можно использовать как гейт перед деплоем.

**Ссылка на LinkedIn** лежит в `src/config.ts` и сейчас пустая. Все ссылки на
LinkedIn на сайте условные — как только впишешь URL, они появятся в шапке,
подвале и блоке контактов сами.
