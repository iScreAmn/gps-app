import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { guillotineAccessProducts } from '../../data/guillotineAccessData';
import CatalogHero from '../../components/CatalogHero/CatalogHero';
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import ProofLink from '../../components/ProofLink/ProofLink';
import '../InksPage/InksPage.css';

const GuillotineAccessPage = () => {
  const { t, language } = useLanguage();

  return (
    <section className="inks-page guillotine-access-page">
      <div className="container">
        <CatalogHero title={t('catalog.guillotine_access')} wide>
          <ProofLink
            to={`/${language}/cutting-systems/ideal/guillotine`}
            label={t('catalog.guillotine_access_link')}
          />
        </CatalogHero>

        <div className="catalog-cards">
          {guillotineAccessProducts.map((product, index) => (
            <CatalogCard
              key={product.id}
              to={`/${language}/catalog/supplies/guillotineaccess/${product.id}`}
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

export default GuillotineAccessPage;
