import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { inksProducts } from '../../data/inksData';
import CatalogHero from '../../components/CatalogHero/CatalogHero';
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import './InksPage.css';

const InksPage = () => {
  const { t, language } = useLanguage();

  return (
    <section className="inks-page">
      <div className="container">
        <CatalogHero
          title={t('catalog.inks')}
          description={t('inks.subtitle')}
          wide
        />

        <div className="catalog-cards">
          {inksProducts.map((product, index) => (
            <CatalogCard
              key={product.id}
              to={`/${language}/catalog/supplies/inks/${product.id}`}
              index={index}
              image={product.image}
              name={t(product.titleKey)}
              moreLabel={t('common.more')}
              cover
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InksPage;
