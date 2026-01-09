import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { getNewsItemById } from '../../data/contentData';
import './NewsDetailPage.css';

const NewsDetailPage = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();

  const newsItem = useMemo(() => getNewsItemById(id), [id]);

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

            {newsItem.gallery && newsItem.gallery.length > 0 && (
              <div className="news-detail__gallery">
                {newsItem.gallery.map((img, idx) => (
                  <div className="news-detail__gallery-item" key={idx}>
                    <img src={img.src} alt={img.alt || `Gallery ${idx + 1}`} loading="lazy" />
                  </div>
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
    </div>
  );
};

export default NewsDetailPage;

