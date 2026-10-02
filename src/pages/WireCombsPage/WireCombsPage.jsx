import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { wirecombsProducts } from '../../data/wirecombsData';
import CatalogHero from '../../components/CatalogHero/CatalogHero';
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import '../InksPage/InksPage.css';
import './WireCombsPage.css';

const WireCombsPage = () => {
  const { t, language } = useLanguage();

  return (
    <section className="inks-page wirecombs-page">
      <div className="container">
        <CatalogHero title={t('catalog.wirecombs')} wide />

        <div className="catalog-cards">
          {wirecombsProducts.map((product, index) => (
            <CatalogCard
              key={product.id}
              to={`/${language}/catalog/supplies/wirecombs/${product.id}`}
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

export default WireCombsPage;
