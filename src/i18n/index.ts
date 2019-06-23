import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from './locales/en.json';
import de from './locales/de.json';

Vue.use(VueI18n);

const links: any = {
  en,
  de,
};

const i18n = new VueI18n({
  messages: links,
});

const DEFAULT_LOCALE = localStorage.getItem('language') || 'en';
const loadedLanguages: any = [];
const locales = ['en', 'de'];

const loadLanguage = (lang: any) => Promise.resolve(links[lang]);

const ensureLoadLanguage = (lang: any) => {
  if (!loadedLanguages.includes(lang)) {
    return loadLanguage(lang).then((messages) => {
      i18n.mergeLocaleMessage(lang, messages);
      loadedLanguages.push(lang);

      return lang;
    });
  }

  return Promise.resolve(lang);
};

const persistLanguage = (lang: any) => {
  localStorage.setItem('language', lang);
  i18n.locale = lang;
};

const setLanguage = (lang = DEFAULT_LOCALE) => ensureLoadLanguage(lang).then(persistLanguage);

export {
  i18n,
  setLanguage,
  locales,
  DEFAULT_LOCALE,
};
