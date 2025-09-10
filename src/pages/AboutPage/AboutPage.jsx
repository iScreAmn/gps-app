import React from 'react';
import { useLanguage } from "../../hooks/useLanguage";
import { aboutImage } from '../../assets/images';
import './AboutPage.css';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>{t('about.title')}</h1>
          <p className="about-subtitle">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>{t('about.our_story')}</h2>
            <p>
              {t('about.story_text1')}
            </p>
            <p>
              {t('about.story_text2')}
            </p>
          </div>

          <div className="about-image">
            <img src={aboutImage} alt="Office" />
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>{t('about.experience')}</h3>
            <p>{t('about.experience_desc')}</p>
          </div>
          <div className="feature-card">
            <h3>{t('about.service')}</h3>
            <p>{t('about.service_desc')}</p>
          </div>
          <div className="feature-card">
            <h3>{t('about.quality')}</h3>
            <p>{t('about.quality_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
