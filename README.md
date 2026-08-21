# Artem Tarasov — Portfolio

`HTML` `CSS` `JavaScript` — no framework, no build step, no dependencies

My own site. I write SEO, build sites, and I'm working on an AI startup (AIRA),
and I wanted a portfolio that actually reads that way instead of looking like
every other "Hi, I'm a developer" template. Also I wanted it to open by just
double-clicking `index.html` — no `npm install`, no build pipeline, nothing to
break six months from now when I haven't touched it.

It's bilingual (RU/EN, toggle in the header) because half the people who look at
this are Russian-speaking clients and half aren't. Hero, skills as a bento grid,
case studies, a photo gallery, a timeline of how I actually got here, and a
résumé you can download as a clean PDF straight from the page (`Ctrl+P`, there's
dedicated print CSS for it).

## Running it

Just open `index.html`. That's it. For a real deploy, any static host works —
Netlify, Vercel, GitHub Pages, doesn't matter, there's no build command.

## How it's put together

Everything — every string of copy, in both languages — lives in JS data arrays
at the top of `script.js`, not scattered through the HTML. So updating the site
is editing an object, not hunting through markup. The rest is CSS custom
properties for a warm dark palette (I deliberately kept the shadows soft and
skipped the flashy infinite-loop animations — didn't want it to feel like a
template), a bento-style grid for the skills section, and an
`IntersectionObserver` for the scroll reveals.

```
index.html     markup for every section
styles.css     design tokens, layout, the print stylesheet for the résumé
script.js      all copy (T / DATA objects), card rendering, language switch,
               portfolio filtering, scroll-reveal, form validation, burger menu
images/        photos + case study screenshots
manifest.json  PWA manifest
```

## Known TODO

The contact form currently fakes a submit (there's a comment right where the
real fetch call needs to go in `initContactForm()`) — haven't wired it to
Formspree yet.

---

## Русская версия

Мой личный сайт. Занимаюсь SEO, веб-разработкой и AI-стартапом (AIRA), и
хотелось портфолио, которое это реально показывает, а не выглядит как очередной
шаблон «Привет, я разработчик». И чтобы открывался просто двойным кликом по
`index.html` — без сборки, без `npm install`, без риска что через полгода что-то
сломается, потому что я забыл, как это собирать.

Двуязычный (RU/EN, переключатель в шапке), потому что часть людей, которые сюда
заходят — русскоязычные клиенты, часть нет. Хиро, навыки в виде bento-сетки,
кейсы, галерея, таймлайн того, как я вообще к этому пришёл, и резюме, которое
скачивается чистым PDF прямо со страницы (`Ctrl+P`, под это отдельная печатная
вёрстка).

**Стек:** чистые HTML/CSS/JS, без фреймворка и сборщика. Весь текст (на обоих
языках) — в JS-объектах в начале `script.js`, а не размазан по вёрстке, так что
обновлять контент — это редактировать объект, а не искать по разметке.

**Запуск:** просто открой `index.html`. Для деплоя — любой статический хостинг,
команда сборки не нужна.

**Не доделано:** форма обратной связи пока имитирует отправку — реальный fetch
на Formspree ещё не подключил (место отмечено комментарием в
`initContactForm()`).
