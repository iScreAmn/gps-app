import React from 'react';
import { useLanguage } from '../../../../hooks/useLanguage';
import { PK0604, PK0604plus, PK0705, PK0705plus, PK1209 } from '../../../../assets/images';
import CatalogHero from '../../../../components/CatalogHero/CatalogHero';
import CatalogCard from '../../../../components/CatalogCard/CatalogCard';
import iechoData from '../../../../database/brands/iecho.json';
import './Iecho.css';

const Iecho = () => {
  const { language, t } = useLanguage();

  // Map product IDs to images
  const imageMap = {
    'pk0604': PK0604,
    'pk0604-plus': PK0604plus,
    'pk0705': PK0705,
    'pk0705-plus': PK0705plus,
    'pk1209-pro-max': PK1209
  };

  return (
    <div className="iecho">
      <div className="container">
        <CatalogHero title={iechoData.displayName} wide />
        <div className="catalog-cards">
          {iechoData.products.map((product, index) => (
            <CatalogCard
              key={product.id}
              to={`/${language}/cutting-systems/iecho/${product.id}`}
              index={index}
              image={imageMap[product.id]}
              name={product.name}
              moreLabel={t('common.more')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Iecho;
