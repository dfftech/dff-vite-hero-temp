import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AppStorage, { DIR, LANG, TRANS } from '@/utils/services/app.storage';

// Import JSON translation files
import enUS from './locales/en-US.json';
import teIN from './locales/te-IN.json';
import arSA from './locales/ar-SA.json';
import { RtlDir, SessionLang } from '../services/app.event';

export const languages = [
  {
    code: 'en-US',
    name: 'English',
    locale: 'English',
    dir: 'ltr',
  },
  {
    code: 'te-IN',
    name: 'Telugu',
    locale: 'తెలుగు',
    dir: 'ltr',
  },
  {
    code: 'ar-SA',
    name: 'Arabic',
    locale: 'العربية',
    dir: 'rtl',
  },
] as const;

type ResourceKey = typeof languages[number]['code'];

export const langDirection = (lang: string) => {
  return languages.find(l => l.code === lang)?.dir ?? 'ltr';
};

export const resources = {
  'en-US': {
    translation: enUS
  },
  'te-IN': {
    translation: teIN
  },
  'ar-SA': {
    translation: arSA
  }
} as const;

// Initialize with stored language if available
const storedLang = AppStorage.getData(LANG) || 'en-US';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLang,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Language change listener
i18n.on('languageChanged', (lng: string) => {
  try {
    const dir = langDirection(lng);
    AppStorage.setData(DIR, dir);
    AppStorage.setData(LANG, lng);
    RtlDir.value = dir === 'rtl';
    SessionLang.value = lng;
    if (lng in resources) {
      AppStorage.setData(TRANS, resources[lng as ResourceKey]);
    }
  } catch (error) {
    console.error('Error during language change:', error);
  }
});

export default i18n;


export const trans = (nameLang: { [key: string]: string }, defaultName: string) => {
    let val = nameLang[SessionLang.value];
    return val === undefined || val === null  || val.trim() === '' ? defaultName : val;
};