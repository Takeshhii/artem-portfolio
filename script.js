/* ================================================================
   ⚙️ CONFIG — замени на свой ID формы с formspree.io
   1. Зайди на https://formspree.io → Sign up (бесплатно)
   2. New form → укажи свою почту tarasovao2005@gmail.com
   3. Скопируй ID из ссылки вида  https://formspree.io/f/ABCD1234
   4. Вставь его ниже вместо YOUR_FORM_ID
   ================================================================ */
const FORMSPREE_ID = 'mqejrlon';

/* ================================================================
   📷 ФОТО — сюда вписываешь пути к своим фотографиям.
   Как добавить фото:
     1. Положи файл в папку  images/  (например images/aira.jpg)
     2. Впиши путь в нужную строку ниже, например:  'images/aira.jpg'
     3. Сохрани файл и обнови страницу
   Пустая строка ''  = показывается иконка (как сейчас).
   Порядок строк = порядок карточек на сайте (сверху вниз).
   Фото подходят любые: jpg, png, webp.
   ================================================================ */
const PHOTOS = {
  // ── ПРОЕКТЫ (4 карточки) ──
  projects: [
    '',   // 1. AIRA — AI ассистент
    '',   // 2. SEO и digital-аудиты
    '',   // 3. Сайты и лендинги
    '',   // 4. B2B-материалы
  ],
  // ── КЕЙСЫ (6 карточек) ──
  cases: [
    'images/case-seo-projects.png',  // 1. 50+ SEO-проектов
    'images/case-websites.png',      // 2. 20+ сайтов и лендингов
    'images/case-ai-startups.png',   // 3. 2+ AI-стартапа
    'images/case-seo-briefs.png',    // 4. 100+ SEO-структур и ТЗ
    'images/case-b2b.png',           // 5. B2B-маркетинг
    'images/case-niches.png',        // 6. Опыт в разных нишах
  ],
  // ── ОПЫТ / МОЙ ПУТЬ (4 карточки) ──
  experience: [
    '',   // 1. Финансовый университет
    '',   // 2. Бизнес-инкубатор
    '',   // 3. SEO и веб-разработка
    '',   // 4. Стартапы и AI-продукты
  ],
  // ── ГАЛЕРЕЯ (6 карточек) ──
  gallery: [
    'images/gallery-aira.png',        // 1. Разработка AIRA (большая слева)
    'images/gallery-university.png',  // 2. Финансовый университет
    'images/gallery-incubator.png',   // 3. Бизнес-инкубатор (высокая)
    'images/gallery-traffic.png',     // 4. Поисковый трафик
    'images/gallery-code.png',        // 5. Код и интерфейсы
    'images/gallery-marketing.png',   // 6. Маркетинг и рост (большая)
  ],
};

/* ================================================================
   ICONS
   ================================================================ */
const I = {
  // ── duotone: полупрозрачная заливка (fill-opacity .2) + чёткий контур ──
  search:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="7" fill="currentColor" fill-opacity=".2"/><circle cx="10.5" cy="10.5" r="7"/><path d="m20 20-4.2-4.2"/></svg>`,
  code:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="16" rx="3" fill="currentColor" fill-opacity=".2"/><rect x="2.5" y="4" width="19" height="16" rx="3"/><path d="m9 10-2.5 2L9 14"/><path d="m15 10 2.5 2L15 14"/></svg>`,
  megaphone:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h3l11-5v16L7 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" fill="currentColor" fill-opacity=".2"/><path d="M4 9h3l11-5v16L7 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"/><path d="M7 15v3a1.5 1.5 0 0 0 1.5 1.5"/></svg>`,
  cpu:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="5.5" width="13" height="13" rx="2.5" fill="currentColor" fill-opacity=".2"/><rect x="5.5" y="5.5" width="13" height="13" rx="2.5"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3"/></svg>`,
  rocket:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c3.5 2 5.2 5.6 5.2 9.2L14.5 14h-5L6.8 11.2C6.8 7.6 8.5 4 12 2z" fill="currentColor" fill-opacity=".2"/><path d="M12 2c3.5 2 5.2 5.6 5.2 9.2L14.5 14h-5L6.8 11.2C6.8 7.6 8.5 4 12 2z"/><circle cx="12" cy="9" r="1.7"/><path d="M9.5 14c-1.5 1-2 3.2-2 4.5 1.3 0 3.5-.5 4.5-2M14.5 14c1.5 1 2 3.2 2 4.5-1.3 0-3.5-.5-4.5-2"/></svg>`,
  chart:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="11" width="3.2" height="6" rx="1" fill="currentColor" fill-opacity=".25"/><rect x="10.4" y="7" width="3.2" height="10" rx="1" fill="currentColor" fill-opacity=".25"/><rect x="14.8" y="13" width="3.2" height="4" rx="1" fill="currentColor" fill-opacity=".25"/><path d="M4 4v15a1 1 0 0 0 1 1h15"/></svg>`,
  monitor:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4" width="19" height="13" rx="2.5" fill="currentColor" fill-opacity=".2"/><rect x="2.5" y="4" width="19" height="13" rx="2.5"/><path d="M9 21h6M12 17v4"/></svg>`,
  mail:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="currentColor" fill-opacity=".2"/><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>`,
  sparkle:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l2.3 6.6a2 2 0 0 0 1.3 1.3l6.6 2.3-6.6 2.3a2 2 0 0 0-1.3 1.3L12 22.5l-2.3-6.6a2 2 0 0 0-1.3-1.3L1.8 12.3l6.6-2.3a2 2 0 0 0 1.3-1.3z" fill="currentColor" fill-opacity=".2"/><path d="M12 2.5l2.3 6.6a2 2 0 0 0 1.3 1.3l6.6 2.3-6.6 2.3a2 2 0 0 0-1.3 1.3L12 22.5l-2.3-6.6a2 2 0 0 0-1.3-1.3L1.8 12.3l6.6-2.3a2 2 0 0 0 1.3-1.3z"/></svg>`,
  layers:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 2 7l10 5 10-5z" fill="currentColor" fill-opacity=".2"/><path d="M12 2 2 7l10 5 10-5z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/></svg>`,
  file:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="currentColor" fill-opacity=".2"/><path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M13 2v5h5"/><path d="M8 13h7M8 17h5"/></svg>`,
  target:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity=".14"/><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/></svg>`,
  book:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2z" fill="currentColor" fill-opacity=".2"/><path d="M5 19V4a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2 2 2 0 0 0 2 2h12"/></svg>`,
  globe:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9.5" fill="currentColor" fill-opacity=".16"/><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5a15 15 0 0 1 0 19 15 15 0 0 1 0-19z"/></svg>`,
  presentation:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="12" rx="2" fill="currentColor" fill-opacity=".2"/><rect x="3" y="3" width="18" height="12" rx="2"/><path d="M12 15v4M8.5 21l3.5-2 3.5 2"/></svg>`,
  arrowRight:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  copy:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.4 4.3 2.9 11.4a.5.5 0 0 0 0 .94l4.6 1.5 1.7 5.3a.5.5 0 0 0 .9.13l2.4-2.9 4.5 3.3a.6.6 0 0 0 .94-.36l3-13.3a.6.6 0 0 0-.84-.7z" fill="currentColor" fill-opacity=".2"/><path d="M21.4 4.3 2.9 11.4a.5.5 0 0 0 0 .94l4.6 1.5 1.7 5.3a.5.5 0 0 0 .9.13l2.4-2.9 4.5 3.3a.6.6 0 0 0 .94-.36l3-13.3a.6.6 0 0 0-.84-.7z"/><path d="m8 13 9-5.5-6.5 6.8"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v8M7 7v.01M12 10v8m0-5a3 3 0 0 1 6 0v5"/></svg>`,
  github:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>`,
};

/* ================================================================
   TRANSLATIONS
   ================================================================ */
const T = {
  ru: {
    'nav.about':'Обо мне','nav.skills':'Навыки','nav.projects':'Проекты',
    'nav.gallery':'Галерея','nav.portfolio':'Кейсы','nav.experience':'Путь',
    'nav.contact':'Контакт','nav.cta':'Связаться',
    'hero.badge':'SEO-специалист · Веб-разработчик · Основатель AI-проектов',
    'hero.heading':'Создаю сайты, SEO-системы и AI-продукты для роста бизнеса',
    'hero.sub':'Работаю на стыке SEO, разработки, аналитики и продуктового мышления — от структуры сайта и трафика до интерфейсов, автоматизации и запуска digital-продуктов.',
    'hero.cta1':'Посмотреть портфолио','hero.cta2':'Обсудить проект',
    'hero.cv':'Скачать резюме',
    'hero.fact1':'Студент Финансового университета',
    'hero.fact2':'Резидент бизнес-инкубатора',
    'hero.fact3':'Основатель AI-проекта AIRA',
    'hero.name':'Артём Тарасов',
    'status.available':'Открыт к проектам',
    'label.about':'Обо мне','label.skills':'Что я умею','label.projects':'Проекты',
    'label.gallery':'Опыт и проекты','label.portfolio':'Кейсы','label.experience':'Мой путь',
    'label.services':'Услуги','label.contact':'Связь',
    'about.heading.line1':'Соединяю стратегию, код','about.heading.line2':'и digital-рост',
    'about.p1':'Я Артём Тарасов — студент Финансового университета при Правительстве РФ, резидент бизнес-инкубатора и digital-специалист. Работаю на стыке SEO, веб-разработки, маркетинга и AI-продуктов, помогая превращать идеи в понятные и работающие digital-решения.',
    'about.p2':'В проектах я совмещаю продуктовый подход, техническую реализацию и понимание digital-маркетинга — от SEO-аудитов, структуры сайта и аналитики до интерфейсов, автоматизации, контента и запуска новых продуктов.',
    'skills.heading.line1':'Навыки и','skills.heading.line2':'экспертиза',
    'projects.heading.line1':'Проекты и','projects.heading.line2':'направления',
    'gallery.heading.line1':'Опыт, проекты','gallery.heading.line2':'и digital-среда',
    'portfolio.heading.line1':'Проекты, опыт','portfolio.heading.line2':'и результаты',
    'exp.heading.line1':'Путь в digital,','exp.heading.line2':'SEO и AI-продуктах',
    'numbers.heading':'Проекты, опыт и результаты',
    'services.heading.line1':'Чем могу быть','services.heading.line2':'полезен бизнесу',
    'contact.heading.line1':'Давайте обсудим','contact.heading.line2':'ваш проект',
    'contact.sub':'Открыт к проектам, коллаборациям, стажировкам и стартап-возможностям. Могу помочь с SEO, сайтом, лендингом, аналитикой, AI-автоматизацией или digital-упаковкой проекта.',
    'form.name':'Имя','form.contact':'Email или Telegram','form.message':'Сообщение',
    'form.name.ph':'Ваше имя','form.contact.ph':'email@example.com или @username','form.message.ph':'Расскажите коротко о проекте, задаче или идее',
    'form.submit':'Отправить сообщение','form.sending':'Отправляем…','form.success':'Сообщение отправлено!',
    'footer.copy':'© 2026 Артём Тарасов. SEO · Веб-разработка · AI-продукты.',
    'footer.note':'Создаю сайты, SEO-системы и AI-продукты для роста бизнеса.',
    'filter.all':'Все','filter.seo':'SEO','filter.web':'Web','filter.ai':'AI','filter.mkt':'Marketing',
    'more':'Подробнее',
    'toast.copied':'Email скопирован!',
  },
  en: {
    'nav.about':'About','nav.skills':'Skills','nav.projects':'Projects',
    'nav.gallery':'Gallery','nav.portfolio':'Cases','nav.experience':'Journey',
    'nav.contact':'Contact','nav.cta':'Contact me',
    'hero.badge':'SEO Specialist · Web Developer · AI Startup Founder',
    'hero.heading':'I build websites, SEO systems and AI products that help businesses grow',
    'hero.sub':'I combine SEO, web development, analytics and product thinking — from website structure and traffic growth to interfaces, automation and digital product launches.',
    'hero.cta1':'View Portfolio','hero.cta2':'Discuss a Project',
    'hero.cv':'Download CV',
    'hero.fact1':'Financial University Student',
    'hero.fact2':'Business Incubator Resident',
    'hero.fact3':'Founder of the AIRA AI Project',
    'hero.name':'Artem Tarasov',
    'status.available':'Open to projects',
    'label.about':'About me','label.skills':'What I do','label.projects':'Projects',
    'label.gallery':'Experience & projects','label.portfolio':'Cases','label.experience':'My journey',
    'label.services':'Services','label.contact':'Get in touch',
    'about.heading.line1':'I connect strategy, code','about.heading.line2':'and digital growth',
    'about.p1':'I am Artem Tarasov — a Financial University student, business incubator resident and digital specialist. I work at the intersection of SEO, web development, marketing and AI products, helping turn ideas into clear and effective digital solutions.',
    'about.p2':'In my projects, I combine product thinking, technical execution and digital marketing expertise — from SEO audits, website structure and analytics to interfaces, automation, content and new product launches.',
    'skills.heading.line1':'Skills and','skills.heading.line2':'expertise',
    'projects.heading.line1':'Projects and','projects.heading.line2':'focus areas',
    'gallery.heading.line1':'Experience, projects','gallery.heading.line2':'and digital context',
    'portfolio.heading.line1':'Projects, experience','portfolio.heading.line2':'and results',
    'exp.heading.line1':'My path in digital,','exp.heading.line2':'SEO and AI products',
    'numbers.heading':'Projects, experience and results',
    'services.heading.line1':'How I can','services.heading.line2':'help your business',
    'contact.heading.line1':'Let’s discuss','contact.heading.line2':'your project',
    'contact.sub':'Open to projects, collaborations, internships and startup opportunities. I can help with SEO, websites, landing pages, analytics, AI automation and digital product presentation.',
    'form.name':'Name','form.contact':'Email or Telegram','form.message':'Message',
    'form.name.ph':'Your name','form.contact.ph':'email@example.com or @username','form.message.ph':'Tell me briefly about your project, task or idea',
    'form.submit':'Send message','form.sending':'Sending…','form.success':'Message sent!',
    'footer.copy':'© 2026 Artem Tarasov. SEO · Web Development · AI Products.',
    'footer.note':'I build websites, SEO systems and AI products that help businesses grow.',
    'filter.all':'All','filter.seo':'SEO','filter.web':'Web','filter.ai':'AI','filter.mkt':'Marketing',
    'more':'View more',
    'toast.copied':'Email copied!',
  },
};

/* ================================================================
   DATA
   ================================================================ */
const DATA = {
  marquee1:{
    ru:['SEO-специалист','Веб-разработчик','Основатель AI-проектов','AIRA','Финансовый университет','Бизнес-инкубатор','Digital-маркетинг','Открыт к проектам'],
    en:['SEO Specialist','Web Developer','AI Startup Founder','AIRA','Financial University','Business Incubator','Digital Marketing','Open to Work'],
  },
  marquee2:{
    ru:['SEO-аудит','Next.js','Технический SEO','Google Search Console','Яндекс.Метрика','Klaviyo','AI-автоматизация','E-E-A-T','B2B Marketing','UX/UI','Tailwind','AIRA'],
    en:['SEO Audit','Next.js','Technical SEO','Google Search Console','Yandex Metrica','Klaviyo','AI Automation','E-E-A-T','B2B Marketing','UX/UI','Tailwind','AIRA'],
  },
  aboutCards:{
    ru:[{icon:'search',title:'SEO и аналитика'},{icon:'code',title:'Веб-разработка'},{icon:'cpu',title:'AI и автоматизация'},{icon:'rocket',title:'Стартапы и продукты'}],
    en:[{icon:'search',title:'SEO & Analytics'},{icon:'code',title:'Web Development'},{icon:'cpu',title:'AI & Automation'},{icon:'rocket',title:'Startups & Products'}],
  },
  skills:{
    ru:[
      {icon:'search',title:'SEO и аналитика',tags:['SEO-аудиты','семантика','техническое SEO','Google Search Console','Яндекс.Метрика','метатеги H1–H3','SEO-ТЗ','robots.txt','E-E-A-T']},
      {icon:'code',title:'Веб-разработка',tags:['HTML / CSS / JS','Next.js / React','Tailwind CSS','адаптивная вёрстка','UX/UI','Tilda','Bitrix','лендинги']},
      {icon:'megaphone',title:'Digital-маркетинг',tags:['email-рассылки','Klaviyo','B2B outreach','product sheets','deliverability','контент','презентации','воронки']},
      {icon:'sparkle',title:'AI и визуальные материалы',tags:['промты','AI mockups','визуальные концепты','брендинг','презентации','автоматизация','генерация идей']},
      {icon:'rocket',title:'Стартапы и продукты',tags:['фаундер','MVP','бизнес-модель','unit-экономика','анализ рынка','AI SaaS','гранты','pitch deck']},
    ],
    en:[
      {icon:'search',title:'SEO & Analytics',tags:['SEO audits','keyword research','technical SEO','Google Search Console','Yandex Metrica','meta tags H1–H3','SEO briefs','robots.txt','E-E-A-T']},
      {icon:'code',title:'Web Development',tags:['HTML / CSS / JS','Next.js / React','Tailwind CSS','responsive layout','UX/UI','Tilda','Bitrix','landing pages']},
      {icon:'megaphone',title:'Digital Marketing',tags:['email campaigns','Klaviyo','B2B outreach','product sheets','deliverability','content','presentations','funnels']},
      {icon:'sparkle',title:'AI & Visual Content',tags:['prompt engineering','AI mockups','visual concepts','branding','presentations','automation','idea generation']},
      {icon:'rocket',title:'Startups & Products',tags:['founder','MVP','business model','unit economics','market research','AI SaaS','grants','pitch deck']},
    ],
  },
  projects:{
    ru:[
      {icon:'cpu',title:'AIRA — AI карьерный ассистент',desc:'AI-платформа для студентов и выпускников, которая помогает искать вакансии, анализировать карьерные возможности, готовиться к интервью и автоматизировать отклики.',tags:['AI','SaaS','HRTech','RAG','CareerTech','Startup']},
      {icon:'search',title:'SEO и digital-аудиты',desc:'Работаю с поисковым трафиком, техническими ошибками, индексацией, структурой страниц, аналитикой и контентной оптимизацией.',tags:['SEO','Analytics','GSC','Technical SEO','Яндекс.Метрика']},
      {icon:'monitor',title:'Сайты и лендинги',desc:'Создаю современные сайты-визитки, лендинги и интерфейсы с акцентом на UX, скорость загрузки, адаптивность и конверсию.',tags:['Next.js','React','Tailwind','UX/UI','Landing Pages']},
      {icon:'mail',title:'B2B-маркетинговые материалы',desc:'Готовлю email-шаблоны, product sheets, презентации, визуальные mockups и маркетинговые тексты для B2B-коммуникации.',tags:['Email','Klaviyo','B2B','Copywriting','Product Sheets']},
    ],
    en:[
      {icon:'cpu',title:'AIRA — AI Career Assistant',desc:'An AI platform for students and graduates that helps them find job opportunities, analyze career options, prepare for interviews and automate applications.',tags:['AI','SaaS','HRTech','RAG','CareerTech','Startup']},
      {icon:'search',title:'SEO & Digital Audits',desc:'I work with search traffic, technical issues, indexing, website structure, analytics and content optimization.',tags:['SEO','Analytics','GSC','Technical SEO','Yandex Metrica']},
      {icon:'monitor',title:'Websites & Landing Pages',desc:'I build modern portfolio websites, landing pages and interfaces focused on UX, loading speed, responsiveness and conversion.',tags:['Next.js','React','Tailwind','UX/UI','Landing Pages']},
      {icon:'mail',title:'B2B Marketing Materials',desc:'I create email templates, product sheets, presentations, visual mockups and marketing copy for B2B communication.',tags:['Email','Klaviyo','B2B','Copywriting','Product Sheets']},
    ],
  },
  gallery:{
    ru:[
      {cat:'AI / Startup',title:'Разработка AIRA',desc:'AI career assistant для студентов и выпускников — от идеи и бизнес-модели до MVP, RAG-логики и карьерной автоматизации.',icon:'cpu',bg:'g-clay',span:'wide',img:null},
      {cat:'Образование',title:'Финансовый университет',desc:'Учёба в сфере бизнес-информатики, digital-экономики, аналитики и предпринимательского мышления.',icon:'book',bg:'g-violet',span:'normal',img:null},
      {cat:'Стартапы',title:'Бизнес-инкубатор',desc:'Развитие стартап-проектов, работа над MVP, питчами, бизнес-моделями и продуктовой стратегией.',icon:'rocket',bg:'g-forest',span:'tall',img:null},
      {cat:'SEO / Аналитика',title:'Работа с поисковым трафиком',desc:'Анализирую GSC, Яндекс.Метрику, индексацию, позиции, структуру страниц и точки роста сайта.',icon:'chart',bg:'g-navy',span:'normal',img:null},
      {cat:'Разработка',title:'Код и интерфейсы',desc:'Создаю сайты, лендинги и интерфейсы с акцентом на UX, скорость, адаптивность и понятную структуру.',icon:'code',bg:'g-rose',span:'normal',img:null},
      {cat:'Digital',title:'Маркетинг и рост',desc:'Работаю с контентом, email-кампаниями, B2B-коммуникацией, визуальными материалами и digital-воронками.',icon:'target',bg:'g-amber',span:'wide',img:null},
    ],
    en:[
      {cat:'AI / Startup',title:'Building AIRA',desc:'An AI career assistant for students and graduates — from idea and business model to MVP, RAG logic and career automation.',icon:'cpu',bg:'g-clay',span:'wide',img:null},
      {cat:'Education',title:'Financial University',desc:'Studying business informatics, digital economy, analytics and entrepreneurial thinking.',icon:'book',bg:'g-violet',span:'normal',img:null},
      {cat:'Startups',title:'Business Incubator',desc:'Developing startup projects, MVPs, pitches, business models and product strategy.',icon:'rocket',bg:'g-forest',span:'tall',img:null},
      {cat:'SEO / Analytics',title:'Search traffic growth',desc:'I analyze GSC, Yandex Metrica, indexing, rankings, page structure and website growth points.',icon:'chart',bg:'g-navy',span:'normal',img:null},
      {cat:'Development',title:'Code and interfaces',desc:'I build websites, landing pages and interfaces focused on UX, speed, responsiveness and clear structure.',icon:'code',bg:'g-rose',span:'normal',img:null},
      {cat:'Digital',title:'Marketing and growth',desc:'I work with content, email campaigns, B2B communication, visual materials and digital funnels.',icon:'target',bg:'g-amber',span:'wide',img:null},
    ],
  },
  portfolio:{
    ru:[
      {id:'p1',cat:'seo',catLabel:'SEO',icon:'search',title:'50+ SEO-проектов',desc:'Работал с техническими аудитами, индексацией, структурой страниц, метатегами, семантикой и ростом поискового трафика.',cta:'Обсудить SEO-задачу'},
      {id:'p2',cat:'web',catLabel:'Web',icon:'monitor',title:'20+ сайтов и лендингов',desc:'Создавал сайты-визитки, посадочные страницы и интерфейсы с акцентом на UX, адаптивность, скорость и понятную структуру.',cta:'Обсудить сайт'},
      {id:'p3',cat:'ai',catLabel:'AI / Startup',icon:'cpu',title:'2+ собственных AI-стартапа',desc:'Развиваю проекты на стыке AI, автоматизации, карьерных сервисов, SaaS-моделей и продуктовой аналитики.',cta:'Обсудить идею'},
      {id:'p4',cat:'seo',catLabel:'Content / SEO',icon:'file',title:'100+ SEO-структур и ТЗ',desc:'Готовил структуры страниц, SEO-ТЗ, метатеги, H1–H3, FAQ-блоки и контентные планы под поисковое продвижение.',cta:'Обсудить контент'},
      {id:'p5',cat:'marketing',catLabel:'Marketing',icon:'mail',title:'B2B-маркетинг и email-кампании',desc:'Работал с email-шаблонами, контактными листами, B2B-коммуникацией, product sheets, визуальными материалами и рассылками.',cta:'Обсудить маркетинг'},
      {id:'p6',cat:'marketing',catLabel:'Digital',icon:'globe',title:'Опыт в разных нишах',desc:'Работал с проектами в IT, медицине, услугах, B2B, образовании, e-commerce и локальном SEO-продвижении.',cta:'Обсудить проект'},
    ],
    en:[
      {id:'p1',cat:'seo',catLabel:'SEO',icon:'search',title:'50+ SEO projects',desc:'Worked on technical audits, indexing, page structure, metadata, keyword research and organic traffic growth.',cta:'Discuss SEO'},
      {id:'p2',cat:'web',catLabel:'Web',icon:'monitor',title:'20+ websites and landing pages',desc:'Built portfolio websites, landing pages and interfaces focused on UX, responsiveness, speed and clear structure.',cta:'Discuss a website'},
      {id:'p3',cat:'ai',catLabel:'AI / Startup',icon:'cpu',title:'2+ own AI startups',desc:'Building projects at the intersection of AI, automation, career services, SaaS models and product analytics.',cta:'Discuss an idea'},
      {id:'p4',cat:'seo',catLabel:'Content / SEO',icon:'file',title:'100+ SEO briefs and structures',desc:'Created page structures, SEO briefs, metadata, H1–H3 headings, FAQ blocks and content plans for organic growth.',cta:'Discuss content'},
      {id:'p5',cat:'marketing',catLabel:'Marketing',icon:'mail',title:'B2B marketing and email campaigns',desc:'Worked with email templates, contact lists, B2B communication, product sheets, visual materials and campaigns.',cta:'Discuss marketing'},
      {id:'p6',cat:'marketing',catLabel:'Digital',icon:'globe',title:'Experience across niches',desc:'Worked with projects in IT, healthcare, services, B2B, education, e-commerce and local SEO.',cta:'Discuss a project'},
    ],
  },
  experience:{
    ru:[
      {label:'Образование',title:'Финансовый университет при Правительстве РФ',text:'Изучаю бизнес-информатику, digital-экономику, аналитику, управление проектами и предпринимательство. Это помогает мне смотреть на сайты и продукты не только как на дизайн или код, а как на полноценные бизнес-инструменты.',logo:null},
      {label:'Стартапы',title:'Резидент бизнес-инкубатора',text:'Развиваю стартап-проекты, работаю над MVP, бизнес-моделями, презентациями, unit-экономикой и стратегией выхода продукта на рынок.',logo:null},
      {label:'Практика',title:'SEO и веб-разработка',text:'Работаю с сайтами, лендингами, техническим SEO, аналитикой, структурой страниц, контентом, индексацией и улучшением поискового трафика.',logo:null},
      {label:'Продукт',title:'Стартапы и AI-продукты',text:'Создаю идеи и продукты на стыке AI, карьерных сервисов, автоматизации и SaaS. Один из ключевых проектов — AIRA, AI career assistant для студентов и выпускников.',logo:null},
    ],
    en:[
      {label:'Education',title:'Financial University under the Government of the Russian Federation',text:'I study business informatics, digital economy, analytics, project management and entrepreneurship. This helps me look at websites and products not only as design or code, but as complete business tools.',logo:null},
      {label:'Startups',title:'Business Incubator Resident',text:'I develop startup projects, work on MVPs, business models, presentations, unit economics and go-to-market strategy.',logo:null},
      {label:'Practice',title:'SEO and Web Development',text:'I work with websites, landing pages, technical SEO, analytics, page structure, content, indexing and organic traffic improvement.',logo:null},
      {label:'Product',title:'Startups and AI Products',text:'I create ideas and products at the intersection of AI, career services, automation and SaaS. One of my key projects is AIRA, an AI career assistant for students and graduates.',logo:null},
    ],
  },
  numbers:{
    ru:[
      {value:'50+',label:'успешных SEO-проектов',raw:50},
      {value:'20+',label:'сайтов и лендингов',raw:20},
      {value:'2+',label:'собственных AI-стартапа',raw:2},
      {value:'360°',label:'подход: стратегия, дизайн, код и рост',raw:360},
    ],
    en:[
      {value:'50+',label:'successful SEO projects',raw:50},
      {value:'20+',label:'websites and landing pages',raw:20},
      {value:'2+',label:'own AI startups',raw:2},
      {value:'360°',label:'approach: strategy, design, code and growth',raw:360},
    ],
  },
  services:{
    ru:[
      {icon:'search',title:'SEO-аудит сайта'},{icon:'monitor',title:'Сайт или лендинг'},
      {icon:'layers',title:'SEO-структура сайта'},{icon:'file',title:'SEO-ТЗ для контента'},
      {icon:'chart',title:'Анализ GSC и Яндекс.Метрики'},{icon:'target',title:'Улучшение UX и страниц'},
      {icon:'mail',title:'Email-шаблоны'},{icon:'cpu',title:'AI-автоматизация и промты'},
      {icon:'presentation',title:'Презентации и product materials'},
    ],
    en:[
      {icon:'search',title:'Website SEO audit'},{icon:'monitor',title:'Website or landing page'},
      {icon:'layers',title:'SEO website structure'},{icon:'file',title:'SEO content briefs'},
      {icon:'chart',title:'GSC and Yandex Metrica analysis'},{icon:'target',title:'UX and page improvement'},
      {icon:'mail',title:'Email templates'},{icon:'cpu',title:'AI automation and prompts'},
      {icon:'presentation',title:'Presentations and product materials'},
    ],
  },
  contacts:[
    {icon:'mail',    title:{ru:'Email',    en:'Email'    },sub:'tarasovao2005@gmail.com', href:'mailto:tarasovao2005@gmail.com', copyEmail:true},
    {icon:'telegram',title:{ru:'Telegram', en:'Telegram' },sub:'@natemeadmin',            href:'https://t.me/natemeadmin'},
  ],
};

/* ================================================================
   STATE
   ================================================================ */
let currentLang = 'ru';
function t(key) { return T[currentLang][key] || T.ru[key] || key; }

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = T[currentLang][el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = T[currentLang][el.dataset.i18nPh];
    if (v !== undefined) el.setAttribute('placeholder', v);
  });
  document.documentElement.lang = currentLang;
}

function el(tag, attrs={}, html='') {
  const e = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)) {
    if (k==='class') e.className=v; else e.setAttribute(k,v);
  }
  if (html) e.innerHTML=html;
  return e;
}

/* ================================================================
   VANTA BACKGROUND
   ================================================================ */
let vantaEffect = null;
function initVanta() {
  if (typeof VANTA === 'undefined') return;
  try {
    vantaEffect = VANTA.FOG({
      el: '#vanta-bg',
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      highlightColor: 0x7b9bd1,   /* muted sapphire — soft wisps */
      midtoneColor:   0x141c2b,   /* deep blue midtone */
      lowlightColor:  0x0c0f16,   /* deep blue-charcoal */
      baseColor:      0x0c0f16,   /* matches --bg */
      blurFactor: 0.70,           /* softer, more diffuse fog */
      speed: 0.9,                 /* calm, premium movement */
      zoom: 0.72,
    });
  } catch(e) { /* CDN blocked — degrade silently */ }
}

/* ================================================================
   LOADER
   ================================================================ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  // Reduced motion: skip instantly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.style.display = 'none';
    return;
  }
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => { loader.style.display = 'none'; }, 600);
  }, 2200);
}

/* ================================================================
   PAGE PROGRESS
   ================================================================ */
function initProgress() {
  const bar = document.getElementById('page-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100, 100);
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', Math.round(pct));
  }, { passive: true });
}

/* ================================================================
   BACK TO TOP
   ================================================================ */
function initBackToTop() {
  const btn  = document.getElementById('back-to-top');
  const fill = document.querySelector('.btt-fill');
  if (!btn) return;
  const C = 131.95; // 2π × 21
  if (fill) { fill.style.strokeDasharray = C; fill.style.strokeDashoffset = C; }
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    if (fill) fill.style.strokeDashoffset = C - pct * C;
    btn.classList.toggle('visible', window.scrollY > 350);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* ================================================================
   TOAST
   ================================================================ */
function showToast(msg, type='success', ms=3200) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = el('div', { class:`toast toast-${type}` }, msg);
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 420);
  }, ms);
}

/* ================================================================
   MOSCOW TIME
   ================================================================ */
function initMoscowTime() {
  const el = document.getElementById('moscow-time');
  if (!el) return;
  function update() {
    const d = new Date(new Date().toLocaleString('en-US', { timeZone:'Europe/Moscow' }));
    el.textContent = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} МСК`;
  }
  update();
  setInterval(update, 30000);
}

/* ================================================================
   CURSOR — comet trail with color gradient
   ================================================================ */
const TRAIL_COLORS = ['#A8C0E4','#9BB4DC','#8EA8D4','#819CCC','#7490C4','#6784BB','#5C78AE','#5170A0'];

function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const TRAIL = 8;
  const pos = Array.from({ length: TRAIL+1 }, () => ({ x:-200, y:-200 }));
  let mx = -200, my = -200;

  const dot = el('div', { class:'cursor-main' });
  document.body.appendChild(dot);

  const trailDots = TRAIL_COLORS.map(color => {
    const d = el('div', { class:'cursor-trail' });
    d.style.background = color;
    document.body.appendChild(d);
    return d;
  });

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity='0'; trailDots.forEach(d=>d.style.opacity='0'); });
  document.addEventListener('mouseenter', () => { dot.style.opacity='1'; });

  // Expand on interactive elements — event delegation, no per-element binding
  document.addEventListener('mouseover', e => {
    const isInteractive = e.target.closest('a,button,[data-magnetic],[data-tilt],input,textarea,.filter-btn,.lang-opt,.gallery-card,.portfolio-card');
    dot.classList.toggle('hovered', !!isInteractive);
  });

  function animate() {
    pos[0].x = mx; pos[0].y = my;
    for (let i=1; i<=TRAIL; i++) {
      pos[i].x += (pos[i-1].x - pos[i].x) * 0.5;
      pos[i].y += (pos[i-1].y - pos[i].y) * 0.5;
    }
    trailDots.forEach((d,i) => {
      const p = pos[i+1];
      const f = 1 - (i+1)/(TRAIL+1);
      d.style.left    = p.x + 'px';
      d.style.top     = p.y + 'px';
      d.style.opacity = f * 0.58;
      d.style.width   = (f * 6.5 + 1) + 'px';
      d.style.height  = (f * 6.5 + 1) + 'px';
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ================================================================
   MAGNETIC
   ================================================================ */
function initMagnetic() {
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * .2;
      const y = (e.clientY - r.top  - r.height/2) * .2;
      btn.style.transform = `translate(${x}px,${y}px)`;
      btn.style.transition = 'transform .1s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
    });
  });
}

/* ================================================================
   CARD TILT
   ================================================================ */
function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--ry', `${((e.clientX-r.left)/r.width-.5)*6}deg`);
      card.style.setProperty('--rx', `${-((e.clientY-r.top)/r.height-.5)*6}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--ry','0deg');
      card.style.setProperty('--rx','0deg');
    });
  });
}

/* ================================================================
   SPARK PARTICLES (bento hover) — fixed position on body
   ================================================================ */
function spawnSparks(clientX, clientY) {
  const n = 12 + Math.floor(Math.random() * 6);
  const colors = ['#A8C0E4','#C2D4EE','#7B9BD1','#D0DEF2','#8EA8D4'];
  for (let i=0; i<n; i++) {
    const s = document.createElement('div');
    s.className = 'spark-particle';
    const angle = Math.random() * Math.PI * 2;
    const dist  = 32 + Math.random() * 55;
    const size  = 3 + Math.random() * 4;
    s.style.cssText = `
      left:${clientX}px; top:${clientY}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --tx:${Math.cos(angle)*dist}px;
      --ty:${Math.sin(angle)*dist}px;
      --size:${size}px;
      --delay:${Math.random()*0.06}s;
    `;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 780);
  }
}

function initBentoSparks() {
  document.addEventListener('mouseenter', e => {
    const card = e.target.closest('.bento-card');
    if (!card) return;
    spawnSparks(e.clientX, e.clientY);
  }, true);
}

/* ================================================================
   RIPPLE ON CLICK
   ================================================================ */
function initRipple() {
  document.addEventListener('click', e => {
    if (e.target.closest('input, textarea, select, .lang-toggle, .burger')) return;
    const r = el('div', { class:'ripple-effect' });
    r.style.left = e.clientX + 'px';
    r.style.top  = e.clientY + 'px';
    document.body.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  });
}

/* ================================================================
   NUMBER COUNTER ANIMATION
   ================================================================ */
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const valEl  = entry.target.querySelector('.number-value');
      const raw    = Number(entry.target.dataset.raw);
      const suffix = entry.target.dataset.suffix || '';
      if (!valEl || isNaN(raw)) return;
      const dur = 1800;
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts-start)/dur, 1);
        const e = 1 - Math.pow(1-p, 3);
        valEl.textContent = Math.floor(e*raw) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold:.6 });

  document.querySelectorAll('.number-card').forEach(c => obs.observe(c));
}

/* ================================================================
   COPY EMAIL
   ================================================================ */
function addCopyEmail() {
  const emailLink = document.querySelector('.contact-link[data-copy-email]');
  if (!emailLink) return;
  const btn = el('button', { class:'copy-email-btn', 'aria-label':'Copy email', type:'button' });
  btn.innerHTML = I.copy;
  emailLink.appendChild(btn);
  btn.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    const addr = emailLink.dataset.copyEmail;
    navigator.clipboard.writeText(addr).then(() => showToast(t('toast.copied'), 'success'));
  });
}

/* ================================================================
   PRINT CONTACT BAR — rendered from DATA.contacts
   ================================================================ */
function renderPrintContact() {
  const bar = document.getElementById('print-contact');
  if (!bar) return;
  bar.innerHTML = '';
  const shown = DATA.contacts.filter(c => c.sub && c.sub !== 'your@email.com' && !c.sub.includes('yourusername') && !c.sub.includes('/you'));
  const all = shown.length ? shown : DATA.contacts.slice(0, 3);
  all.forEach((c, i) => {
    const a = document.createElement('a');
    a.href = c.href;
    a.textContent = c.sub;
    if (c.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    bar.appendChild(a);
    if (i < all.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'print-contact-sep';
      sep.textContent = '·';
      bar.appendChild(sep);
    }
  });
}

/* ================================================================
   KONAMI CODE → Founder Mode
   ================================================================ */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
function triggerFounderFlash() {
  const flash = document.createElement('div');
  flash.className = 'founder-flash-el';
  document.body.appendChild(flash);
  flash.addEventListener('animationend', () => flash.remove());
  // launch golden sparks burst from center
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  for (let b = 0; b < 4; b++) {
    setTimeout(() => spawnSparks(cx + (Math.random()-.5)*200, cy + (Math.random()-.5)*150), b * 120);
  }
}
function initKonami() {
  document.addEventListener('keydown', e => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        document.body.classList.add('founder-mode');
        triggerFounderFlash();
        showToast('⚡ ' + (currentLang==='ru'?'Founder Mode активирован — 12 секунд!':'Founder Mode Activated — 12 seconds!'), 'special', 5000);
        setTimeout(() => document.body.classList.remove('founder-mode'), 12000);
      }
    } else { konamiIdx = 0; }
  });
}

/* ================================================================
   MARQUEE
   ================================================================ */
function buildMarquee(id, items) {
  const inner = document.getElementById(id);
  if (!inner) return;
  inner.innerHTML = '';
  const build = () => {
    const d = el('div', { class:'marquee-content', 'aria-hidden':'true' });
    items.forEach((item,i) => {
      d.appendChild(el('span', { class:`mq-item${i%3===0?' accent':''}` }, item));
      d.appendChild(el('span', { class:'mq-sep' }, '·'));
    });
    return d;
  };
  inner.appendChild(build());
  inner.appendChild(build());
}

function renderMarquees() {
  buildMarquee('marquee-inner-1', DATA.marquee1[currentLang]);
  buildMarquee('marquee-inner-2', DATA.marquee2[currentLang]);
}

/* ================================================================
   RENDER SECTIONS
   ================================================================ */
function renderAbout() {
  const c = document.getElementById('about-cards'); if (!c) return; c.innerHTML='';
  DATA.aboutCards[currentLang].forEach(card => {
    const d = el('article', { class:'about-card reveal', 'data-tilt':'' });
    const ico = el('div', { class:'about-card-icon', 'aria-hidden':'true' }); ico.innerHTML=I[card.icon]||''; d.appendChild(ico);
    d.appendChild(el('h3',{},card.title)); c.appendChild(d);
  });
}

function renderSkills() {
  const g = document.getElementById('skills-grid'); if (!g) return; g.innerHTML='';
  DATA.skills[currentLang].forEach(s => {
    const card = el('article', { class:'bento-card reveal', 'data-tilt':'' });
    card.innerHTML = '<div class="bento-accent" aria-hidden="true"></div>';
    const ico = el('div', { class:'bento-icon', 'aria-hidden':'true' }); ico.innerHTML=I[s.icon]||''; card.appendChild(ico);
    card.appendChild(el('h3',{},s.title));
    const tags = el('div', { class:'bento-tags' });
    s.tags.forEach(tag => tags.appendChild(el('span',{class:'bento-tag'},tag)));
    card.appendChild(tags); g.appendChild(card);
  });
}

function renderProjects() {
  const g = document.getElementById('projects-grid'); if (!g) return; g.innerHTML='';
  DATA.projects[currentLang].forEach((p, i) => {
    const card = el('article', { class:'project-card reveal', 'data-tilt':'' });
    if (PHOTOS.projects[i]) card.appendChild(buildCardPhoto(PHOTOS.projects[i], p.title));
    const ico = el('div', { class:'project-icon', 'aria-hidden':'true' }); ico.innerHTML=I[p.icon]||''; card.appendChild(ico);
    card.appendChild(el('h3',{},p.title)); card.appendChild(el('p',{},p.desc));
    const tags = el('div', { class:'project-tags' });
    p.tags.forEach(tag => tags.appendChild(el('span',{class:'project-tag'},tag)));
    card.appendChild(tags); g.appendChild(card);
  });
}

/* Build a photo block; hides itself if the image path is wrong/missing */
function buildCardPhoto(src, alt, extraClass='') {
  const wrap = el('div', { class:`card-photo ${extraClass}`.trim() });
  const img = el('img', { src, alt: alt || '', loading:'lazy' });
  img.setAttribute('onerror', "this.parentElement.style.display='none'");
  wrap.appendChild(img);
  return wrap;
}

function renderGallery() {
  const g = document.getElementById('gallery-grid'); if (!g) return; g.innerHTML='';
  DATA.gallery[currentLang].forEach((item, i) => {
    const card = el('article', {
      class:`gallery-card ${item.bg}${item.span==='wide'?' wide':''}${item.span==='tall'?' tall':''} reveal`,
      'data-tilt':'',
    });
    const vis = el('div', { class:'gallery-visual', 'aria-hidden':'true' }); vis.innerHTML=I[item.icon]||''; card.appendChild(vis);
    const galleryPhoto = PHOTOS.gallery[i] || item.img;
    if (galleryPhoto) {
      card.classList.add('has-photo');
      const img = el('img', { src:galleryPhoto, alt:item.title, class:'gallery-photo', loading:'lazy', style:'opacity:1' });
      img.setAttribute('onerror', "this.remove(); this.closest('.gallery-card').classList.remove('has-photo')");
      card.appendChild(img);
    }
    const ov = el('div', { class:'gallery-overlay' });
    ov.appendChild(el('div',{class:'gallery-cat'},item.cat));
    ov.appendChild(el('h3',{},item.title));
    ov.appendChild(el('p',{},item.desc));
    card.appendChild(ov); g.appendChild(card);
  });
}

function renderPortfolio() {
  const fw = document.getElementById('portfolio-filters');
  if (fw) {
    fw.innerHTML = '';
    [{k:'all',l:t('filter.all')},{k:'seo',l:'SEO'},{k:'web',l:'Web'},{k:'ai',l:'AI'},{k:'marketing',l:'Marketing'}].forEach(f => {
      fw.appendChild(el('button', { class:`filter-btn${f.k==='all'?' active':''}`, 'data-filter':f.k, 'aria-pressed':f.k==='all'?'true':'false' }, f.l));
    });
    initPortfolioFilter();
  }
  const g = document.getElementById('portfolio-grid'); if (!g) return; g.innerHTML='';
  DATA.portfolio[currentLang].forEach((item, i) => {
    const card = el('article', { class:'portfolio-card reveal', 'data-category':item.cat, 'data-tilt':'' });
    const imgBox = el('div', { class:'portfolio-img' });
    if (PHOTOS.cases[i]) {
      const img = el('img', { src:PHOTOS.cases[i], alt:item.title, class:'portfolio-photo', loading:'lazy' });
      img.setAttribute('onerror', "this.remove()");
      imgBox.appendChild(img);
    } else {
      const iw = el('div', { class:'portfolio-img-icon', 'aria-hidden':'true' }); iw.innerHTML=I[item.icon]||''; imgBox.appendChild(iw);
    }
    const body = el('div', { class:'portfolio-body' });
    body.appendChild(el('span',{class:'portfolio-cat'},item.catLabel));
    body.appendChild(el('h3',{},item.title));
    body.appendChild(el('p',{},item.desc));
    const cta = el('a', { href:'#contact', class:'portfolio-cta', 'aria-label':item.cta || t('more') });
    cta.innerHTML = `${item.cta || t('more')} <span aria-hidden="true" style="width:14px;height:14px;display:inline-flex">${I.arrowRight}</span>`;
    body.appendChild(cta);
    card.appendChild(imgBox); card.appendChild(body); g.appendChild(card);
  });
}

function renderExperience() {
  const l = document.getElementById('timeline'); if (!l) return; l.innerHTML='';
  DATA.experience[currentLang].forEach((item, i) => {
    const li = el('li', { class:'timeline-item reveal' });
    li.appendChild(el('div', { class:'timeline-dot', 'aria-hidden':'true' }));
    const c = el('div', { class:'timeline-content' });
    c.appendChild(el('div',{class:'timeline-label'},item.label));
    c.appendChild(el('h3',{class:'timeline-title'},item.title));
    c.appendChild(el('p',{class:'timeline-text'},item.text));
    if (PHOTOS.experience[i]) c.appendChild(buildCardPhoto(PHOTOS.experience[i], item.title, 'timeline-photo'));
    li.appendChild(c); l.appendChild(li);
  });
}

function renderNumbers() {
  const g = document.getElementById('numbers-grid'); if (!g) return; g.innerHTML='';
  DATA.numbers[currentLang].forEach(n => {
    const suffix = n.value.replace(/[0-9]/g,'').trim();
    const card = el('div', { class:'number-card reveal', 'data-raw':n.raw, 'data-suffix':suffix });
    card.appendChild(el('div',{class:'number-value'},n.value));
    card.appendChild(el('p',{class:'number-label'},n.label));
    g.appendChild(card);
  });
}

function renderServices() {
  const g = document.getElementById('services-grid'); if (!g) return; g.innerHTML='';
  DATA.services[currentLang].forEach(s => {
    const card = el('article', { class:'service-card reveal', 'data-tilt':'' });
    const ico = el('div', { class:'service-icon', 'aria-hidden':'true' }); ico.innerHTML=I[s.icon]||''; card.appendChild(ico);
    card.appendChild(el('h3',{},s.title)); g.appendChild(card);
  });
}

function renderContacts() {
  const l = document.getElementById('contact-links'); if (!l) return; l.innerHTML='';
  DATA.contacts.forEach(c => {
    const li = document.createElement('li');
    const attrs = { href:c.href, class:'contact-link', 'aria-label':c.title[currentLang] };
    if (c.copyEmail) attrs['data-copy-email'] = c.sub;
    if (c.href.startsWith('http')) { attrs.target='_blank'; attrs.rel='noopener noreferrer'; }
    const a = el('a', attrs);
    const ico = el('div', { class:'contact-link-icon', 'aria-hidden':'true' }); ico.innerHTML=I[c.icon]||''; a.appendChild(ico);
    const txt = el('div', { class:'contact-link-text' });
    txt.appendChild(el('span',{class:'contact-link-title'},c.title[currentLang]));
    txt.appendChild(el('span',{class:'contact-link-sub'},c.sub));
    a.appendChild(txt); li.appendChild(a); l.appendChild(li);
  });
  addCopyEmail();
}

function renderAll() {
  renderMarquees(); renderAbout(); renderSkills(); renderProjects();
  renderGallery(); renderPortfolio(); renderExperience();
  renderNumbers(); renderServices(); renderContacts();
  renderPrintContact();
  applyTranslations();
  reinitReveal(); initTilt(); initMagnetic();
  initCounters();
}

/* ================================================================
   HERO HEADING — word reveal
   ================================================================ */
function revealHeroHeading() {
  const h = document.getElementById('hero-heading'); if (!h) return;
  const s = h.querySelector('[data-i18n="hero.heading"]'); if (!s) return;
  const words = T[currentLang]['hero.heading'].split(' ');
  s.innerHTML = '';
  words.forEach((word, i) => {
    const wrap  = el('span', { class:'word-wrap' });
    const inner = el('span', { class:'word-inner' }, word);
    wrap.appendChild(inner); s.appendChild(wrap);
    if (i < words.length-1) s.appendChild(document.createTextNode(' '));
  });
  requestAnimationFrame(() => {
    s.querySelectorAll('.word-inner').forEach((w,i) => setTimeout(() => w.classList.add('revealed'), 100+i*52));
  });
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
let revealObs = null;
function reinitReveal() {
  if (revealObs) revealObs.disconnect();
  revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), Math.min(idx*55, 280));
      revealObs.unobserve(entry.target);
    });
  }, { threshold:.1, rootMargin:'0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(e => { e.classList.remove('visible'); revealObs.observe(e); });
}

/* ================================================================
   PORTFOLIO FILTER
   ================================================================ */
function initPortfolioFilter() {
  const fw = document.getElementById('portfolio-filters');
  const g  = document.getElementById('portfolio-grid');
  if (!fw||!g) return;
  fw.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn'); if (!btn) return;
    const f = btn.dataset.filter;
    fw.querySelectorAll('.filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
    g.querySelectorAll('.portfolio-card').forEach(c => c.classList.toggle('hidden', f!=='all' && c.dataset.category!==f));
  });
}

/* ================================================================
   LANGUAGE
   ================================================================ */
function initLangSwitch() {
  const toggle = document.getElementById('lang-toggle'); if (!toggle) return;
  const update = () => toggle.querySelectorAll('.lang-opt').forEach(o => o.classList.toggle('active', o.dataset.lang===currentLang));
  update();
  toggle.addEventListener('click', e => {
    const opt = e.target.closest('.lang-opt'); if (!opt||opt.dataset.lang===currentLang) return;
    currentLang = opt.dataset.lang; update(); renderAll(); revealHeroHeading();
  });
}

/* ================================================================
   BURGER
   ================================================================ */
function initBurger() {
  const btn   = document.getElementById('burger-btn');
  const links = document.getElementById('nav-links');
  if (!btn||!links) return;
  const close = () => { btn.classList.remove('open'); links.classList.remove('open'); btn.setAttribute('aria-expanded','false'); };
  btn.addEventListener('click', () => { const o=links.classList.toggle('open'); btn.classList.toggle('open',o); btn.setAttribute('aria-expanded',String(o)); });
  links.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',close));
  document.addEventListener('click', e => { if (!btn.contains(e.target)&&!links.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape') close(); });
}

/* ================================================================
   HEADER SCROLL SHADOW
   ================================================================ */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const hero   = document.getElementById('hero');
  if (!header||!hero) return;
  new IntersectionObserver(([e]) => header.classList.toggle('scrolled',!e.isIntersecting), {threshold:.05}).observe(hero);
}

/* ================================================================
   CONTACT FORM
   ================================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form'); if (!form) return;
  const fields = {
    name:    { input:document.getElementById('f-name'),    err:document.getElementById('err-name') },
    contact: { input:document.getElementById('f-contact'), err:document.getElementById('err-contact') },
    message: { input:document.getElementById('f-msg'),     err:document.getElementById('err-msg') },
  };
  const btn = document.getElementById('submit-btn');
  const ok  = document.getElementById('form-success');

  function validate(f) {
    const {input,err} = fields[f]; const val = input.value.trim(); let msg='';
    if (!val) msg = currentLang==='ru'?'Обязательное поле':'Required';
    else if (f==='contact') { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)&&!/^@\w{3,}$/.test(val)) msg = currentLang==='ru'?'Введите email или @username':'Enter email or @username'; }
    else if (f==='message'&&val.length<10) msg = currentLang==='ru'?'Слишком коротко':'Too short';
    err.textContent=msg; input.classList.toggle('error',!!msg); return !msg;
  }

  Object.keys(fields).forEach(f => {
    fields[f].input.addEventListener('blur',()=>validate(f));
    fields[f].input.addEventListener('input',()=>{ if (fields[f].input.classList.contains('error')) validate(f); });
  });

  function resetBtn() {
    btn.disabled = false;
    btn.querySelector('.btn-text').style.display = 'inline';
    btn.querySelector('.btn-loading').style.display = 'none';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!Object.keys(fields).map(f=>validate(f)).every(Boolean)) {
      Object.values(fields).find(f=>f.input.classList.contains('error'))?.input.focus(); return;
    }
    btn.disabled=true;
    btn.querySelector('.btn-text').style.display='none';
    btn.querySelector('.btn-loading').style.display='inline';

    try {
      const nameVal    = fields.name.input.value.trim();
      const contactVal = fields.contact.input.value.trim();
      const isEmail    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);

      const payload = {
        name:    nameVal,
        contact: contactVal,
        message: fields.message.input.value.trim(),
        _subject: `Портфолио — новое сообщение от ${nameVal}`,
      };
      // If the visitor left an email, set it as reply-to so you can answer directly.
      // If they left a Telegram handle, it still arrives in the "contact" field.
      if (isEmail) payload.email = contactVal;

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Formspree responded ' + res.status);

      btn.style.display='none'; ok.style.display='flex'; form.reset();
      Object.values(fields).forEach(f=>f.input.classList.remove('error'));
      showToast(t('form.success'), 'success');
    } catch (err) {
      resetBtn();
      showToast(currentLang==='ru'
        ? 'Не удалось отправить. Напишите на email напрямую.'
        : 'Could not send. Please email directly.', 'error', 5000);
    }
  });
}

/* ================================================================
   DOWNLOAD CV / PRINT RESUME
   ================================================================ */
function initDownloadCV() {
  const btn = document.getElementById('cv-download-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    showToast(currentLang === 'ru' ? 'Открываем диалог печати — сохраните как PDF' : 'Opening print dialog — save as PDF', 'success', 4000);
    setTimeout(() => window.print(), 600);
  });
}

/* ================================================================
   SMOOTH SCROLL
   ================================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id=a.getAttribute('href'); if (!id||id==='#') return;
      const target=document.querySelector(id); if (!target) return;
      e.preventDefault();
      window.scrollTo({ top:target.getBoundingClientRect().top+window.scrollY-70, behavior:'smooth' });
    });
  });
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initVanta();
  renderAll();
  revealHeroHeading();

  initCursor();
  initLangSwitch();
  initBurger();
  initHeaderScroll();
  initProgress();
  initBackToTop();
  initBentoSparks();
  initRipple();
  initKonami();
  initContactForm();
  initDownloadCV();
  initSmoothScroll();
  initMoscowTime();
});
