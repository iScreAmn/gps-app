import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageContext, getCurrentLanguageFromPath, buildPathWithLanguage, changeLanguage as changeI18nLanguage } from '../i18n';

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const language = getCurrentLanguageFromPath(location.pathname);

  useEffect(() => {
    // Sync i18n language with URL language
    changeI18nLanguage(language);
  }, [language]);

  const changeLanguage = (newLang) => {
    const newPath = buildPathWithLanguage(location.pathname, newLang);
    navigate(newPath);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage, 
      t,
      isGeorgian: language === 'ka',
      isEnglish: language === 'en'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
