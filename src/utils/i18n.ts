import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    common: {
      home: 'Home',
      settings: 'Settings',
      about: 'About'
    }
  },
  zh: {
    common: {
      home: '首页',
      settings: '设置',
      about: '关于'
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: 'zh', // default locale
  fallbackLocale: 'en',
  messages
})