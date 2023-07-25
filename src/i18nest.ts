import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import XHR from "i18next-http-backend"
import { translationMergeEN, translationMergeRU } from './components/lib/locales/components/index'

i18n
.use(XHR) 
.use(LanguageDetector)
.use(initReactI18next)
.use(LanguageDetector)
.init({
  resources: {
    en: {translations: translationMergeEN,},
    ru: {translations: translationMergeRU,},
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: false,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  // react: {
  //   wait: true,
  // },
})

export default i18n
