import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//import XHR from "i18next-http-backend"
import {
  translationMergeEN,
  translationMergeRU,
} from './components/lib/locales/components/index';

i18n
  //.use(XHR)
  .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
  .use(LanguageDetector) // с помощью плагина определяем язык пользователя в браузере
  .init({
    resources: {
      // передаем переводы текстов интерфейса в формате JSON
      en: { translations: translationMergeEN },
      ru: { translations: translationMergeRU },
    },
    lng: 'ru',
    fallbackLng: 'en', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
    debug: false, // включение выключение дебагера

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // экранирование уже есть в React, поэтому отключаем
      formatSeparator: ',',
    },

    // react: {
    //   wait: true,
    // },
  });

export default i18n;
