import React from 'react';
import { useLanguage } from "../../hooks/useLanguage";
import './NewsPage.css';

const NewsPage = () => {
  const { language, t } = useLanguage();

  return (
    <div className="news-page">
      <div className="container">
        <h1>{t('news.title')}</h1>
        <p>{t('news.coming_soon')}</p>
      </div>
    </div>
  );
};

export default NewsPage;
