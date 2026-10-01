import React from 'react';
import { useLanguage } from '../../../../../hooks/useLanguage';
import CatalogCard from '../../../../../components/CatalogCard/CatalogCard';
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
          <div className="catalog-cards">
            {idealGuillotineData.products.map((product, index) => (
              <CatalogCard
                key={product.id}
                to={`/${language}/cutting-systems/ideal/guillotine/${product.id}`}
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

export default IdealGuillotine;
