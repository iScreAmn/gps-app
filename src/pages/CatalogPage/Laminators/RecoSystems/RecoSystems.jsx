import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
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
          <h1 className="catalog-page__found-count">
            {products.length} {t('catalog.products_found')}
          </h1>
          <div className="office-equipment__grid">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/${language}/cutting-systems/recosystems/${product.id}`}
                className="office-equipment__card"
              >
                <div className="office-equipment__card-image">
                  <img
                    src={imageMap[product.id]}
                    alt={product.name}
                  />
                  <div className="office-equipment__overlay">
                    <span className="office-equipment__more">{t('common.more')}</span>
                  </div>
                </div>
                <div className="office-equipment__card-content">
                  <h3 className="office-equipment__card-title">{product.name}</h3>
                  <div className="office-equipment__specs">
                    {product.cardSpecs?.map((spec) => (
                      <span key={`${product.id}-${spec.label}`} className="spec">
                        <strong>{spec.label}</strong> {spec.value}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoSystems;
