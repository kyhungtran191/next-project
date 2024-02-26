import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
i18n

  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'vi',
    backend: {
      /* translation file path */
      loadPath: '/locales/{{lng}}.json'
    },
    fallbackLng: 'vi',
    debug: false,
    keySeparator: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    }
  })

export default i18n

export const LANGUAGE_OPTIONS = [
  {
    lang: 'Tiếng việt',
    value: 'vi'
  },
  {
    lang: 'English',
    value: 'en'
  }
]
