import React from 'react';
import { useLanguage } from "../../hooks/useLanguage";
import './NewsPage.css';
import { underConstruction } from "../../assets/images";

const NewsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="news-page">
      <div className="container">
        <img src={underConstruction} alt="Under Construction" className="under-construction" />
        <div className="news-header none">
          <h1>{t('news.title')}</h1>
          <p>{t('news.coming_soon')}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
