# Artem Tarasov — Portfolio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No build step](https://img.shields.io/badge/Build%20step-none-2ea44f)
![Bilingual](https://img.shields.io/badge/i18n-RU%20%2F%20EN-blueviolet)

**Task:** a personal site that positions Artem at the intersection of SEO, web
development and AI product building — something that reads as a founder/specialist
portfolio, not a generic template, and works fully offline with zero build tooling.

**Result:** a single-page, bilingual (RU/EN) portfolio — hero, skills, case studies,
gallery, an interactive career timeline and a print-ready résumé (`Ctrl+P` renders a
clean CV via dedicated print styles) — built with vanilla HTML/CSS/JS so it opens by
double-clicking `index.html`, no `npm install` required.

---

## Live

Open `index.html` directly in a browser, or serve the folder with any static host
(Netlify, Vercel, GitHub Pages — no build command needed).

## Stack

- **Vanilla HTML + CSS + JavaScript** — no framework, no bundler, no dependencies
- CSS custom properties for theming (warm dark palette, soft shadows, no harsh
  animation), bento-style grid layout, glassmorphism accents, `prefers-reduced-motion`
  support
- All copy lives in editable JS data arrays (`script.js`) — content, including the
  RU/EN language switch, is data-driven rather than hardcoded into markup
- `window.print()` + `@media print` styles double as a one-click PDF résumé generator

## Structure

```
index.html     semantic markup for every section (hero, about, skills, projects,
               gallery, cases, experience timeline, numbers, services, contact)
styles.css     design tokens, layout, responsive rules, print stylesheet
script.js      content data (T / DATA objects), card renderers, i18n switch,
               portfolio filter, scroll-reveal (IntersectionObserver), form
               validation, burger menu
images/        photo, case-study and gallery assets
manifest.json  PWA manifest (installable, standalone display)
```

## Sections

Hero · About · Skills (bento grid) · Projects · Gallery · Case studies (with
discussion CTAs) · Experience timeline ("My Journey") · Key numbers · Services ·
Contact.

## Notes

- Bilingual by design — every string routes through the `T` i18n object in
  `script.js`, so adding a language means adding one more key set, not rewriting
  markup.
- The contact form currently simulates submission; wiring it to a real endpoint
  (Formspree or similar) is a one-line swap noted in `initContactForm()`.

---

## Русская версия

**Что это:** личный сайт-портфолио, который позиционирует Артёма на стыке SEO,
веб-разработки и AI-продуктов — не шаблон, а полноценная витрина специалиста и
фаундера. Открывается двойным кликом по `index.html`, без сборки и установки
зависимостей.

**Задача:** собрать двуязычный (RU/EN) лендинг-визитку с кейсами, галереей,
интерактивной лентой карьерного пути и резюме, которое можно скачать в PDF одной
кнопкой (`Ctrl+P` → чистая печатная вёрстка).

**Стек:** чистый HTML + CSS + JavaScript, без фреймворков и сборщика — весь
контент (включая переключение языка) вынесен в редактируемые JS-объекты
(`script.js`), поэтому обновление текста не требует правок вёрстки.

**Результат:** одностраничный сайт-визитка с bento-сеткой навыков, кейсами,
галереей, таймлайном опыта и скачиваемым резюме — готов к деплою на любой
статический хостинг (Netlify, Vercel, GitHub Pages) без команды сборки.

**Структура:** `index.html` — разметка всех секций, `styles.css` — дизайн-токены
и адаптив, `script.js` — контент, рендер карточек, i18n, фильтр портфолио,
scroll-reveal и валидация формы, `images/` — фото и графика кейсов.
