import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enUi from './locales/en/ui.json'

// Languages the UI offers in the switcher. To add one: create
// src/content/<code>/*.json + src/i18n/locales/<code>/ui.json, then add it here
// and register both bundles (config below + src/content/index.ts).
export const languages = [{ code: 'en', label: 'English' }] as const

export type LanguageCode = (typeof languages)[number]['code']

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enUi },
    },
    fallbackLng: 'en',
    supportedLngs: languages.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

export default i18n
