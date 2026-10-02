import React from 'react';
import { useLanguage } from '../../../../hooks/useLanguage';
import CatalogCard from '../../../../components/CatalogCard/CatalogCard';
import { laminator1, laminator2, laminator3, laminator4, laminator11, laminator12 } from '../../../../assets/images';
import recosystemsData from '../../../../database/brands/recosystems.json';
import '../../CatalogPage.css';

const RecoSystems = () => {
  const { t, language } = useLanguage();
  const products = recosystemsData.products;

  const imageMap = {
    'rl-39s': laminator1,
    'rl-68s': laminator2,
    'rl-69s': laminator3,
    'rl-106': laminator4,
    'reco-lam-321-a3': laminator11,
    'royal-sovereign-es-400': laminator12
  };

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <div className="catalog-cards">
            {products.map((product, index) => (
              <CatalogCard
                key={product.id}
                to={`/${language}/cutting-systems/recosystems/${product.id}`}
                index={index}
                image={imageMap[product.id]}
                name={product.name}
                moreLabel={t('common.more')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoSystems;
