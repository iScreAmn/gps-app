import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../../hooks/useLanguage';
import {
  guillotine1,
  guillotine2,
  guillotine3,
  guillotine4,
  guillotine5,
  guillotine6,
  guillotine7,
  guillotine8,
  guillotine9,
  guillotine10,
  guillotine11,
  guillotine12,
  guillotine13,
  guillotine14
} from '../../../../../assets/images';
import idealGuillotineData from '../../../../../database/brands/ideal-guillotine.json';
import '../../../CatalogPage.css';

const IdealGuillotine = () => {
  const { language, t } = useLanguage();

  const imageMap = {
    'ideal-4300': guillotine1,
    'ideal-4305': guillotine2,
    'ideal-4315': guillotine3,
    'ideal-4350': guillotine4,
    'ideal-4705': guillotine5,
    'ideal-4815': guillotine6,
    'ideal-4850': guillotine7,
    'ideal-4855': guillotine14,
    'ideal-4860': guillotine8,
    'ideal-5255': guillotine9,
    'ideal-5260': guillotine10,
    'ideal-6655': guillotine11,
    'ideal-6660': guillotine12,
    'ideal-7260': guillotine13
  };

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <div className="office-equipment__grid">
            {idealGuillotineData.products.map((product) => {
              const cardSpecs = language === 'en' && product.cardSpecsEn
                ? product.cardSpecsEn
                : product.cardSpecs;

              return (
                <Link
                  key={product.id}
                  to={`/${language}/cutting-systems/ideal/guillotine/${product.id}`}
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

export default IdealGuillotine;
