import React, { useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useLanguage } from "../../hooks/useLanguage";
import { getNewsItemsFromCarousel } from "../../data/contentData";
import './NewsPage.css';

const PAGE_SIZE = 5;

const buildPageList = (totalPages, currentPage) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push('gap-start');
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < totalPages - 1) pages.push('gap-end');
  pages.push(totalPages);

  return pages;
};

const NewsPage = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightId = searchParams.get('highlight');
  const cardRefs = useRef({});
  const sectionRef = useRef(null);

  const newsItems = useMemo(() => getNewsItemsFromCarousel(), []);

  const totalPages = Math.max(1, Math.ceil(newsItems.length / PAGE_SIZE));

  const requestedPage = parseInt(searchParams.get('page'), 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);

  const pageItems = useMemo(
    () => newsItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [newsItems, currentPage]
  );

  useEffect(() => {
    const cards = document.querySelectorAll('.news-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => {
      // Cards of a freshly switched page are usually already on screen —
      // reveal those right away instead of waiting for the observer.
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        card.classList.add('is-visible');
      }
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [pageItems]);

  useEffect(() => {
    if (!highlightId) return;

    const index = newsItems.findIndex(item => item.id === highlightId);
    if (index === -1) return;

    const targetPage = Math.floor(index / PAGE_SIZE) + 1;
    if (targetPage !== currentPage) {
      const next = new URLSearchParams(searchParams);
      next.set('page', String(targetPage));
      setSearchParams(next, { replace: true });
      return;
    }

    const el = cardRefs.current[highlightId];
    if (!el) return;

    el.classList.add('is-highlighted');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const timeout = setTimeout(() => el.classList.remove('is-highlighted'), 2000);
    return () => clearTimeout(timeout);
  }, [highlightId, newsItems, currentPage, searchParams, setSearchParams]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    const next = new URLSearchParams(searchParams);
    next.delete('highlight');
    if (page === 1) {
      next.delete('page');
    } else {
      next.set('page', String(page));
    }
    setSearchParams(next);

    if (sectionRef.current) {
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    }
  };

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

  const [mainNews, ...smallNews] = pageItems;

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
        {variant === 'main' && (
          <p className="news-card__date">
            <span className="news-card__dot" />
            {formatDate(item.date)}
          </p>
        )}
        <h3 className="news-card__title">
          {item.titleKey ? t(item.titleKey) : t('news.title')}
        </h3>
        {variant === 'main' && item.excerptKey && (
          <p className="news-card__excerpt">
            {t(item.excerptKey)}
          </p>
        )}
        <Link
          className="news-card__link"
          to={`/${language}${item.newsLink}`}
        >
          {t('news.readMore')}
          <MdKeyboardArrowRight aria-hidden />
        </Link>
      </div>
    </article>
  );

  const pageList = buildPageList(totalPages, currentPage);
  const prevLabel = t('news.pagination.prev');
  const nextLabel = t('news.pagination.next');

  return (
    <div className="news-page">
      <div className="container">
        <section className="news-hero" ref={sectionRef}>
          <div className="news-hero__container">
            <div className="news-hero__main-card">
              {mainNews && renderCard(mainNews, 'main')}
            </div>
            <div className="news-hero__small-cards">
              {smallNews.map(item => (
                <div className="news-hero__small-card" key={item.id}>
                  {renderCard(item, 'small')}
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <nav className="news-pagination" aria-label={t('news.pagination.label')}>
              <button
                type="button"
                className="news-pagination__arrow"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label={prevLabel}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="news-pagination__arrow-text">{prevLabel}</span>
              </button>

              <ul className="news-pagination__list">
                {pageList.map((page) => (
                  typeof page === 'number' ? (
                    <li key={page}>
                      <button
                        type="button"
                        className={`news-pagination__page ${page === currentPage ? 'is-active' : ''}`}
                        onClick={() => goToPage(page)}
                        aria-current={page === currentPage ? 'page' : undefined}
                        aria-label={`${t('news.pagination.page')} ${page}`}
                      >
                        <span>{page}</span>
                      </button>
                    </li>
                  ) : (
                    <li key={page} className="news-pagination__ellipsis" aria-hidden="true">
                      &#8230;
                    </li>
                  )
                ))}
              </ul>

              <button
                type="button"
                className="news-pagination__arrow"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label={nextLabel}
              >
                <span className="news-pagination__arrow-text">{nextLabel}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
};

export default NewsPage;
