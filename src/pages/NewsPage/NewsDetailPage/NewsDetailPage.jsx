import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { getNewsItemById } from '../../../data/contentData';
import { Modal } from '../../../components/widgets/Modals';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const newsItem = useMemo(() => getNewsItemById(id), [id]);
  const gallery = newsItem?.gallery || [];

  const closeLightbox = () => setLightboxIndex(null);
  const showPrevImage = () => setLightboxIndex((idx) => (idx - 1 + gallery.length) % gallery.length);
  const showNextImage = () => setLightboxIndex((idx) => (idx + 1) % gallery.length);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, gallery.length]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale = language === 'ka' ? 'ka-GE' : language === 'ru' ? 'ru-RU' : 'en-US';
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    // Extract video ID from various YouTube URL formats
    let videoId = null;
    
    // Standard YouTube watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (watchMatch) {
      videoId = watchMatch[1];
    }
    
    // If already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    return null;
  };

  const renderSpecLine = (text) => {
    const colonIndex = text.indexOf(':');
    if (colonIndex === -1) return text;

    return (
      <>
        <strong>{text.slice(0, colonIndex + 1)}</strong>
        {text.slice(colonIndex + 1)}
      </>
    );
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
            {newsItem.body && newsItem.body.length > 0 ? (
              <>
                <p className="news-detail__lead">{t(newsItem.body[0])}</p>
                {newsItem.body.slice(1).map((p, idx) => (
                  <p key={idx} className="news-detail__paragraph">
                    {t(p)}
                  </p>
                ))}
              </>
            ) : (
              <p className="news-detail__lead">{t(newsItem.subtitleKey)}</p>
            )}

            {newsItem.id === 'support-services' && (
              <>
                <h3 className="news-detail__steps-intro">
                  {t('news.supportServices.body3')}
                </h3>
                <div className="news-detail__steps">
                  <div className="news-detail__step">
                    <span className="news-detail__step-num">01</span>
                    <div className="news-detail__step-body">
                      <h4 className="news-detail__step-title">{t('news.supportServices.step1Title')}</h4>
                      <p className="news-detail__step-text">{t('news.supportServices.step1Text')}</p>
                    </div>
                  </div>
                  <div className="news-detail__step">
                    <span className="news-detail__step-num">02</span>
                    <div className="news-detail__step-body">
                      <h4 className="news-detail__step-title">{t('news.supportServices.step2Title')}</h4>
                      <p className="news-detail__step-text">{t('news.supportServices.step2Text')}</p>
                    </div>
                  </div>
                  <div className="news-detail__step">
                    <span className="news-detail__step-num">03</span>
                    <div className="news-detail__step-body">
                      <h4 className="news-detail__step-title">{t('news.supportServices.step3Title')}</h4>
                      <p className="news-detail__step-text">{t('news.supportServices.step3Text')}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {newsItem.specs?.items?.length > 0 && (
              <div className="news-detail__specs">
                {newsItem.specs.title && (
                  <h2 className="news-detail__specs-title">{t(newsItem.specs.title)}</h2>
                )}
                <ul className="news-detail__specs-list">
                  {newsItem.specs.items.map((itemKey, idx) => (
                    <li key={idx} className="news-detail__specs-item">
                      {renderSpecLine(t(itemKey))}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {newsItem.closing && (
              <p className="news-detail__paragraph">{t(newsItem.closing)}</p>
            )}

            {gallery.length > 1 && (
              <div className="news-detail__gallery">
                {gallery.map((image, idx) => (
                  <button
                    type="button"
                    className="news-detail__gallery-item"
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={image.alt || t(newsItem.titleKey)}
                  >
                    <img src={image.src} alt={image.alt || t(newsItem.titleKey)} loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            {newsItem.videoUrl && (() => {
              const embedUrl = getYouTubeEmbedUrl(newsItem.videoUrl);
              return embedUrl ? (
                <div className="news-detail__video">
                  <div className="news-detail__video-embed">
                    <iframe
                      src={embedUrl}
                      title={t(newsItem.titleKey)}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      </section>

      <Modal
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        className="news-detail__lightbox"
      >
        {lightboxIndex !== null && (
          <>
            <img
              className="news-detail__lightbox-image"
              src={gallery[lightboxIndex].src}
              alt={gallery[lightboxIndex].alt || t(newsItem.titleKey)}
            />
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  className="news-detail__lightbox-nav news-detail__lightbox-nav--prev"
                  onClick={showPrevImage}
                  aria-label={t('news.pagination.prev')}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="news-detail__lightbox-nav news-detail__lightbox-nav--next"
                  onClick={showNextImage}
                  aria-label={t('news.pagination.next')}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="news-detail__lightbox-counter">
                  {lightboxIndex + 1} / {gallery.length}
                </span>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default NewsDetailPage;
