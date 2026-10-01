import React from 'react';
import { useLanguage } from '../../../../hooks/useLanguage';
import CatalogCard from '../../../../components/CatalogCard/CatalogCard';
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
          <div className="catalog-cards">
            {rapidData.products.map((product, index) => (
              <CatalogCard
                key={product.id}
                to={`/${language}/cutting-systems/rapid/${product.id}`}
                index={index}
                image={imageMap[product.id]}
                name={language === 'en' && product.nameEn ? product.nameEn : product.name}
                moreLabel={t('common.more')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rapid;
