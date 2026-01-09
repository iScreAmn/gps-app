import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { getNewsItemById } from '../../data/contentData';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const newsItem = useMemo(() => getNewsItemById(id), [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = language === 'ka' ? 'ka-GE' : language === 'ru' ? 'ru-RU' : 'en-US';
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (!newsItem) {
    return (
      <div className="news-detail news-detail--empty">
        <div className="container">
          <div className="news-detail__empty-card">
            <p>{t('news.coming_soon') || 'News not found'}</p>
            <Link className="news-detail__back" to={`/${language}/news`}>
              {t('products.section.viewAll') || 'Back to news'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-detail">
      <section className="news-detail__hero">
        <div 
          className="news-detail__hero-bg" 
          style={{ backgroundImage: `url(${newsItem.image})` }}
          aria-label={newsItem.alt}
        />
        <div className="news-detail__hero-overlay" />
        <div className="container">
          <div className="news-detail__hero-content">
            <p className="news-detail__date">
              <span className="news-card__dot" />
              {formatDate(newsItem.date)}
            </p>
            <h1 className="news-detail__title">
              {t(newsItem.titleKey)}
            </h1>
          </div>
        </div>
      </section>

      <section className="news-detail__body">
        <div className="container">
          <div className="news-detail__content">
            <p className="news-detail__lead">
              {t(newsItem.subtitleKey)}
            </p>
            <p className="news-detail__paragraph">
              {t(newsItem.subtitleKey)}
            </p>
            <p className="news-detail__paragraph">
              {t(newsItem.subtitleKey)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;

