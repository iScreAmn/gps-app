import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdOutlineDone } from 'react-icons/md';
import { useLanguage } from '../../hooks/useLanguage';
import { ledProducts } from '../../data/ledsData';
import PageAmbientBackground from '../../components/PageAmbientBackground/PageAmbientBackground';
import LedsHelpCta from '../../components/LedsHelpCta/LedsHelpCta';
import './LedsPage.css';
import './LedModulesPage.css';

const HIGHLIGHT_DURATION = 1600;
/** Layout scrolls to top on every route change — wait it out before jumping to the anchor. */
const ANCHOR_DELAY = 120;

const LedModulesPage = () => {
  const { t } = useLanguage();
  const { hash } = useLocation();
  const [highlightedId, setHighlightedId] = useState(null);
  const highlightTimerRef = useRef(null);

  // The hero CTA on /leds links here with #led-<id>
  useEffect(() => {
    if (!hash) return undefined;

    const anchorTimer = setTimeout(() => {
      const row = document.getElementById(hash.slice(1));
      if (!row) return;

      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedId(hash.slice(1));
      highlightTimerRef.current = setTimeout(() => setHighlightedId(null), HIGHLIGHT_DURATION);
    }, ANCHOR_DELAY);

    return () => {
      clearTimeout(anchorTimer);
      clearTimeout(highlightTimerRef.current);
    };
  }, [hash]);

  return (
    <div className="leds-page led-modules-page page-ambient-shell">
      <PageAmbientBackground />

      <section className="led-modules-page__intro">
        <div className="container">
          <span className="led-modules-page__eyebrow">{t('leds.modulesPage.eyebrow')}</span>
          <h1 className="led-modules-page__title">{t('leds.modulesPage.title')}</h1>
          <p className="led-modules-page__subtitle">{t('leds.modulesPage.subtitle')}</p>
        </div>
      </section>

      <section className="led-modules-page__list">
        <div className="container">
          {ledProducts.map((product) => (
            <article
              key={product.id}
              id={`led-${product.id}`}
              className={`led-item ${highlightedId === `led-${product.id}` ? 'is-highlighted' : ''}`}
            >
              <div className="led-item__content">
                <h2 className="led-item__title">{product.name}</h2>
                <p className="led-item__description">{t(product.description)}</p>

                <ul className="led-item__features">
                  {product.features.map((feature) => (
                    <li key={feature} className="led-item__feature">
                      <MdOutlineDone className="led-item__feature-icon" aria-hidden />
                      {t(feature)}
                    </li>
                  ))}
                </ul>

                <div className="led-item__stats">
                  {product.stats.map((stat) => (
                    <span key={stat.label} className="led-item__stat">
                      <strong className="led-item__stat-value">{stat.value}</strong>
                      <span className="led-item__stat-label">{t(stat.label)}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="led-item__media">
                <span className="led-item__glow" aria-hidden />
                <img
                  src={product.image}
                  alt={product.name}
                  className="led-item__image"
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <LedsHelpCta />
    </div>
  );
};

export default LedModulesPage;
