import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../../hooks/useLanguage';
import {
  shredder1,
  shredder2,
  shredder3,
  shredder4,
  shredder5,
  shredder6
} from '../../../../../assets/images';
import idealShredderData from '../../../../../database/brands/ideal-shredder.json';
import '../../../CatalogPage.css';

const IdealShredder = () => {
  const { language, t } = useLanguage();

  const imageMap = {
    'shredder-4606-cc': shredder1,
    'shredder-2220': shredder2,
    'shredder-2240': shredder3,
    'shredder-2240-cc': shredder4,
    'shredder-2260': shredder5,
    'shredder-2260-cc': shredder6
  };

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <div className="office-equipment__grid">
            {idealShredderData.products.map((product) => {
              const cardSpecs = language === 'en' && product.cardSpecsEn
                ? product.cardSpecsEn
                : product.cardSpecs;

              return (
                <Link
                  key={product.id}
                  to={`/${language}/shredder/${product.id}`}
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
                      {cardSpecs?.map((spec) => (
                        <span key={`${product.id}-${spec.label}`} className="spec">
                          <strong>{spec.label}:</strong> <span className="spec__value">{spec.value}</span>
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

export default IdealShredder;
