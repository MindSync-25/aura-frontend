import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en';
import hi from './hi';
import kn from './kn';
import te from './te';
import ta from './ta';
import ml from './ml';

export type Language = 'en' | 'hi' | 'kn' | 'te' | 'ta' | 'ml';

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  kn: { translation: kn },
  te: { translation: te },
  ta: { translation: ta },
  ml: { translation: ml },
};

// Get saved language or default to English
let savedLanguage: Language = 'en';
AsyncStorage.getItem('language').then((lang) => {
  if (lang) {
    savedLanguage = lang as Language;
    i18n.changeLanguage(savedLanguage);
  }
});

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

export async function saveLanguage(language: Language) {
  await AsyncStorage.setItem('language', language);
  i18n.changeLanguage(language);
}

export function getLanguage(): Language {
  return (i18n.language as Language) || 'en';
}

export default i18n;
