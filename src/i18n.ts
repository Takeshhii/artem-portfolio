/**
 * Two locales, English canonical. Russian pages live under /ru/.
 * Every user-facing string in the shell lives here so a page never
 * hardcodes one language.
 */
export type Lang = 'en' | 'ru';

export const LANGS: Lang[] = ['en', 'ru'];
export const DEFAULT_LANG: Lang = 'en';

/** URL prefix for a locale: '' for English, '/ru' for Russian. */
export function prefix(lang: Lang): string {
  return lang === DEFAULT_LANG ? '' : `/${lang}`;
}

/** Build a locale-aware path: path('/writing', 'ru') -> '/ru/writing' */
export function path(p: string, lang: Lang): string {
  const clean = p === '/' ? '' : p;
  return `${prefix(lang)}${clean}` || '/';
}

/** The <html lang> value. */
export const htmlLang: Record<Lang, string> = {
  en: 'en',
  ru: 'ru',
};

/** hreflang value used in alternate links. */
export const hrefLang: Record<Lang, string> = {
  en: 'en',
  ru: 'ru',
};

export const t = {
  en: {
    nav: {
      work: 'Work',
      writing: 'Writing',
      about: 'About',
      projects: 'Projects',
    },
    writing: {
      label: 'Writing',
      title: 'Notes on automation, growth and building products.',
      lead: "Working notes rather than tutorials — what I'm building, what broke, and what turned out to be worth automating.",
      all: 'All writing',
      back: 'Writing',
      empty: 'No articles published yet — the first pieces are in progress.',
      readingTime: (m: number) => `${m} min read`,
    },
    about: {
      label: 'About',
    },
    footer: {
      label: 'Connect',
      head: 'Open to AI, growth and product work.',
      lead: "If you're building something at the intersection of growth, automation and product — or want to talk about a role — I'd like to hear about it.",
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      profile: 'Profile',
    },
    langSwitch: 'Русский',
    skip: 'Skip to content',
  },
  ru: {
    nav: {
      work: 'Работы',
      writing: 'Статьи',
      about: 'Обо мне',
      projects: 'Проекты',
    },
    writing: {
      label: 'Статьи',
      title: 'Заметки об автоматизации, росте и продуктах.',
      lead: 'Рабочие заметки, а не туториалы — что строю, что при этом ломается и что в итоге стоило автоматизировать.',
      all: 'Все статьи',
      back: 'Статьи',
      empty: 'Пока ничего не опубликовано — первые тексты в работе.',
      readingTime: (m: number) => `${m} мин чтения`,
    },
    about: {
      label: 'Обо мне',
    },
    footer: {
      label: 'Контакты',
      head: 'Открыт к работе в AI, growth и продукте.',
      lead: 'Если вы строите что-то на стыке роста, автоматизации и продукта — или хотите обсудить вакансию — напишите.',
      email: 'Почта',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      profile: 'Профиль',
    },
    langSwitch: 'English',
    skip: 'Перейти к содержимому',
  },
} as const;

/** Date formatting per locale. */
export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
