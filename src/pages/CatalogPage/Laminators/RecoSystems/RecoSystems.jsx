import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { laminator1 } from '../../../../assets/images';
import recosystemsData from '../../../../database/brands/recosystems.json';
import '../../CatalogPage.css';

const RecoSystems = () => {
  const { t } = useLanguage();

  const imageMap = {
    'rl-39s': laminator1
  };

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <div className="office-equipment__grid">
            {recosystemsData.products.map((product) => (
              <Link
                key={product.id}
                to={`/recosystems/${product.id}`}
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
