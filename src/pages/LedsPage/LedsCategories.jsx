import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { leds1, power1 } from '../../assets/images';
import './LedsCategories.css';

/** Two entry points of the TMT range — each tile opens its own product page. */
const LedsCategories = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const langPrefix = pathname.match(/^\/(en|ka)(?=\/|$)/)?.[0] ?? '';

  const categories = [
    {
      id: 'modules',
      title: t('leds.categories.modules.title'),
      description: t('leds.categories.modules.description'),
      image: leds1,
      to: `${langPrefix}/leds/modules`
    },
    {
      id: 'power',
      title: t('leds.categories.power.title'),
      description: t('leds.categories.power.description'),
      image: power1,
      to: `${langPrefix}/leds/power`
    }
  ];

  return (
    <section className="leds-categories">
      <div className="container">
        <div className="leds-categories__head">
          <span className="leds-categories__eyebrow">{t('leds.categories.eyebrow')}</span>
          <h2 className="leds-categories__title">{t('leds.categories.title')}</h2>
          <p className="leds-categories__subtitle">{t('leds.categories.subtitle')}</p>
        </div>

        <div className="leds-categories__grid">
          {categories.map((category) => (
            <Link key={category.id} to={category.to} className="leds-category">
              <span className="leds-category__glow" aria-hidden />

              <div className="leds-category__media">
                <img
                  src={category.image}
                  alt={category.title}
                  className="leds-category__image"
                  loading="lazy"
                />
              </div>

              <div className="leds-category__body">
                <h3 className="leds-category__title">{category.title}</h3>
                <p className="leds-category__description">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LedsCategories;
