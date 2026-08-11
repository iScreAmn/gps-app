import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdOutlineDone } from 'react-icons/md';
import { useReducedMotion } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import { ledProducts } from '../../data/ledsData';
import './LedsHero.css';

/** Slides advance on their own every 10s — hover and focus never interrupt it. */
const AUTO_SCROLL_INTERVAL = 90000;
const HERO_FEATURES_LIMIT = 5;

const LedsHero = ({ onViewDetails }) => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef([]);

  const total = ledProducts.length;
  const autoScroll = !prefersReducedMotion && total > 1;

  const goTo = useCallback(
    (index) => setActiveIndex(((index % total) + total) % total),
    [total]
  );

  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!autoScroll) return undefined;

    const timer = setTimeout(
      () => setActiveIndex((prev) => (prev + 1) % total),
      AUTO_SCROLL_INTERVAL
    );
    return () => clearTimeout(timer);
  }, [activeIndex, autoScroll, total]);

  const product = ledProducts[activeIndex];

  return (
    <section
      className="leds-hero"
      aria-roledescription="carousel"
      aria-label={t('leds.hero.region')}
    >
      <div className="container">
        <div className="leds-hero__layout">
          {/* Left column — copy */}
          <div className="leds-hero__copy" key={`copy-${product.id}`}>
            <span className="leds-hero__eyebrow">{t('leds.hero.eyebrow')}</span>
            <h1 className="leds-hero__title">{product.name}</h1>
            <p className="leds-hero__description">{t(product.description)}</p>

            <ul className="leds-hero__features">
              {product.features.slice(0, HERO_FEATURES_LIMIT).map((feature) => (
                <li key={feature} className="leds-hero__feature">
                  <MdOutlineDone className="leds-hero__feature-icon" aria-hidden />
                  {t(feature)}
                </li>
              ))}
            </ul>

            <div className="leds-hero__actions">
              <button
                type="button"
                className="btn-primary leds-hero__btn"
                onClick={() => onViewDetails(product.id)}
              >
                {t('leds.hero.ctaDetails')}
              </button>
            </div>
          </div>

          {/* Right column — layered module composition */}
          <div className="leds-hero__stage">
            <span className="leds-hero__glow" aria-hidden />

            <div className="leds-hero__stack" key={`stack-${product.id}`}>
              <span className="leds-hero__ring leds-hero__ring--outer" aria-hidden />
              <span className="leds-hero__ring leds-hero__ring--inner" aria-hidden />
              <img
                src={product.image}
                alt={product.name}
                className="leds-hero__image"
              />
            </div>

            <div className="leds-hero__chips">
              {product.stats.map((stat) => (
                <span key={stat.label} className="leds-hero__chip">
                  <strong className="leds-hero__chip-value">{stat.value}</strong>
                  <span className="leds-hero__chip-label">{t(stat.label)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Slider controls */}
        <div className="leds-hero__controls">
          <button
            type="button"
            className="leds-hero__arrow"
            onClick={() => goTo(activeIndex - 1)}
            aria-label={t('leds.hero.prev')}
          >
            <FaChevronLeft />
          </button>

          <ul className="leds-hero__thumbs">
            {ledProducts.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  ref={(el) => { thumbRefs.current[index] = el; }}
                  className={`leds-hero__thumb ${index === activeIndex ? 'is-active' : ''}`}
                  onClick={() => goTo(index)}
                  aria-label={t('leds.hero.goTo', { name: item.name })}
                  aria-current={index === activeIndex}
                >
                  <img src={item.image} alt="" aria-hidden />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="leds-hero__arrow"
            onClick={() => goTo(activeIndex + 1)}
            aria-label={t('leds.hero.next')}
          >
            <FaChevronRight />
          </button>
        </div>

        {!prefersReducedMotion && (
          <div className="leds-hero__progress">
            <span
              key={activeIndex}
              className="leds-hero__progress-bar"
              style={{ animationDuration: `${AUTO_SCROLL_INTERVAL}ms` }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default LedsHero;
