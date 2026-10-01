import React from 'react';
import { useLanguage } from '../../../../../hooks/useLanguage';
import CatalogCard from '../../../../../components/CatalogCard/CatalogCard';
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
          <div className="catalog-cards">
            {idealShredderData.products.map((product, index) => (
              <CatalogCard
                key={product.id}
                to={`/${language}/shredder/${product.id}`}
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

export default IdealShredder;
