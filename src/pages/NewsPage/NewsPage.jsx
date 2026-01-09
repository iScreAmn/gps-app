import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import { getNewsItemsFromCarousel } from "../../data/contentData";
import './NewsPage.css';

const NewsPage = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const cardRefs = useRef({});

  const newsItems = useMemo(() => getNewsItemsFromCarousel(), []);

  useEffect(() => {
    const cards = document.querySelectorAll('.news-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [newsItems]);

  useEffect(() => {
    if (highlightId && cardRefs.current[highlightId]) {
      const el = cardRefs.current[highlightId];
      el.classList.add('is-highlighted');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const timeout = setTimeout(() => el.classList.remove('is-highlighted'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [highlightId, newsItems]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = language === 'ka' ? 'ka-GE' : language === 'ru' ? 'ru-RU' : 'en-US';
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="news-page">
        <div className="container">
          <p className="news-empty">{t('news.coming_soon') || 'News coming soon'}</p>
        </div>
      </div>
    );
  }

  const [mainNews, ...smallNews] = newsItems;

  const renderCard = (item, variant = 'small') => (
    <article
      key={item.id}
      className={`news-card ${variant === 'main' ? 'news-card--main' : ''}`}
      ref={(el) => { cardRefs.current[item.id] = el; }}
      id={item.id}
    >
      {item.image && (
        <div className="news-card__image">
          <img src={item.image} alt={item.alt} loading="lazy" />
        </div>
      )}
      <div className="news-card__content">
        <p className="news-card__date">
          <span className="news-card__dot" />
          {formatDate(item.date)}
        </p>
        <h3 className="news-card__title">
          {item.titleKey ? t(item.titleKey) : t('news.title')}
        </h3>
        {item.excerptKey && (
          <p className="news-card__excerpt">
            {t(item.excerptKey)}
          </p>
        )}
        <Link 
          className="news-card__link" 
          to={`/${language}${item.newsLink}`}
        >
          {`${t('hero.support.cta') || 'Read more'} ->`}
        </Link>
      </div>
    </article>
  );

  return (
    <div className="news-page">
      <div className="container">
        <div className="news-carousel">
          <div className="news-carousel__nav">
            <div>
              <h1 className="news-heading">{t('news.title') || 'News'}</h1>
              <p className="news-subheading">
                {t('hero.support.subtitle') || 'Latest highlights from our hero stories.'}
              </p>
            </div>
            <Link className="news-cta" to={`/${language}/news`}>
              {t('products.section.viewAll') || 'All news'}
            </Link>
          </div>
        </div>

        <section className="news-hero">
          <div className="news-hero__container">
            <div className="news-hero__main-card">
              {renderCard(mainNews, 'main')}
            </div>
            <div className="news-hero__small-cards">
              {smallNews.map(item => (
                <div className="news-hero__small-card" key={item.id}>
                  {renderCard(item, 'small')}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
