import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { createContext } from 'react';

import en from './locales/en.json';
import ka from './locales/ka.json';

const resources = {
  en: { translation: en },
  ka: { translation: ka },
};

// Get saved language from localStorage or default to 'ka'
const savedLanguage = localStorage.getItem('i18nextLng') || 'ka';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'ka',
    
    interpolation: {
      escapeValue: false, // react already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Save language to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
});

// React Context for language management
export const LanguageContext = createContext();

// Helper functions for language management
export const getCurrentLanguageFromPath = (pathname) => {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/ka')) return 'ka';
  return 'ka'; // default
};

export const buildPathWithLanguage = (currentPath, newLang) => {
  // Handle root path
  if (currentPath === '/') {
    return `/${newLang}`;
  }
  
  // Handle paths that start with language prefix
  if (currentPath.startsWith('/en')) {
    return currentPath.replace('/en', `/${newLang}`);
  } else if (currentPath.startsWith('/ka')) {
    return currentPath.replace('/ka', `/${newLang}`);
  } else {
    // If no language prefix, add it
    return `/${newLang}${currentPath}`;
  }
};

export const changeLanguage = (newLang) => {
  i18n.changeLanguage(newLang);
};

export default i18n;
