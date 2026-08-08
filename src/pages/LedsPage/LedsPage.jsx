import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';
import { useLanguage } from '../../hooks/useLanguage';
import { ledProducts } from '../../data/ledsData';
import PageAmbientBackground from '../../components/PageAmbientBackground/PageAmbientBackground';
import LedModules from '../../components/LedModules/LedModules';
import LedsHero from './LedsHero';
import './LedsPage.css';

const HIGHLIGHT_DURATION = 1600;

const LedsPage = () => {
  const { t } = useLanguage();
  const [highlightedId, setHighlightedId] = useState(null);
  const highlightTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(highlightTimerRef.current), []);

  // Hero CTA jumps to the matching card in the range below
  const handleViewDetails = useCallback((id) => {
    const card = document.getElementById(`led-${id}`);
    if (!card) return;

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlightedId(id);

    clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => setHighlightedId(null), HIGHLIGHT_DURATION);
  }, []);

  return (
    <div className="leds-page page-ambient-shell">
      <PageAmbientBackground />

      <LedsHero onViewDetails={handleViewDetails} />

      <section className="leds-range">
        <div className="container">
          <div className="leds-range__head">
            <span className="leds-range__eyebrow">{t('leds.range.eyebrow')}</span>
            <h2 className="leds-range__title">{t('leds.range.title')}</h2>
            <p className="leds-range__subtitle">{t('leds.range.subtitle')}</p>
          </div>

          <div className="leds-grid">
            {ledProducts.map((product) => (
              <article
                key={product.id}
                id={`led-${product.id}`}
                className={`leds-card ${highlightedId === product.id ? 'is-highlighted' : ''}`}
              >
                <div className="leds-card__media">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="leds-card__image"
                    loading="lazy"
                  />
                </div>

                <div className="leds-card__body">
                  <h3 className="leds-card__title">{product.name}</h3>
                  <p className="leds-card__description">{t(product.description)}</p>

                  <ul className="leds-card__features">
                    {product.features.map((feature) => (
                      <li key={feature} className="leds-card__feature">
                        <MdOutlineDone className="leds-card__feature-icon" aria-hidden />
                        {t(feature)}
                      </li>
                    ))}
                  </ul>

                  <div className="leds-card__stats">
                    {product.stats.map((stat) => (
                      <span key={stat.label} className="leds-card__stat">
                        <strong className="leds-card__stat-value">{stat.value}</strong>
                        <span className="leds-card__stat-label">{t(stat.label)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LedModules />
    </div>
  );
};

export default LedsPage;
