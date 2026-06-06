import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { rapid1, rapid2 } from '../../../../assets/images';
import rapidData from '../../../../database/brands/rapid.json';
import '../../CatalogPage.css';

const Rapid = () => {
  const { language, t } = useLanguage();

  const imageMap = {
    'rapid-106e': rapid1,
    'rapid-r2-106e': rapid2
  };

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <div className="office-equipment__grid">
            {rapidData.products.map((product) => {
              const cardSpecs = language === 'en' && product.cardSpecsEn
                ? product.cardSpecsEn
                : product.cardSpecs;
              const productName = language === 'en' && product.nameEn
                ? product.nameEn
                : product.name;

              return (
                <Link
                  key={product.id}
                  to={`/${language}/cutting-systems/rapid/${product.id}`}
                  className="office-equipment__card"
                >
                  <div className="office-equipment__card-image">
                    <img
                      src={imageMap[product.id]}
                      alt={productName}
                    />
                    <div className="office-equipment__overlay">
                      <span className="office-equipment__more">{t('common.more')}</span>
                    </div>
                  </div>
                  <div className="office-equipment__card-content">
                    <h3 className="office-equipment__card-title">{productName}</h3>
                    <div className="office-equipment__specs">
                      {cardSpecs?.map((spec) => (
                        <span key={`${product.id}-${spec.label}`} className="spec">
                          <strong>{spec.label}:</strong>{' '}
                          <span className="spec__value">{spec.value}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rapid;
