import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { powerProducts } from '../../data/powerData';
import PageAmbientBackground from '../../components/PageAmbientBackground/PageAmbientBackground';
import LedsHelpCta from '../../components/LedsHelpCta/LedsHelpCta';
import './LedsPage.css';
import './PowerSuppliesPage.css';

const PowerSuppliesPage = () => {
  const { t } = useLanguage();

  return (
    <div className="leds-page power-page page-ambient-shell">
      <PageAmbientBackground />

      <section className="power-page__intro">
        <div className="container">
          <span className="power-page__eyebrow">{t('leds.powerPage.eyebrow')}</span>
          <h1 className="power-page__title">{t('leds.powerPage.title')}</h1>
          <p className="power-page__subtitle">{t('leds.powerPage.subtitle')}</p>
        </div>
      </section>

      <section className="power-page__list">
        <div className="container">
          {powerProducts.map((product) => (
            <article key={product.id} id={`power-${product.id}`} className="power-item">
              <div className="power-item__content">
                <h2 className="power-item__title">{product.name}</h2>

                <dl className="power-item__specs">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="power-item__spec">
                      <dt className="power-item__spec-label">{t(spec.label)}</dt>
                      <dd className="power-item__spec-value">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="power-item__media">
                <span className="power-item__glow" aria-hidden />
                <img
                  src={product.image}
                  alt={product.name}
                  className="power-item__image"
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

export default PowerSuppliesPage;
