import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import CatalogCard from '../../../components/CatalogCard/CatalogCard';
import { audleyEco1, audleyEco2 } from '../../../assets/images';
import { audleyData } from '../../../data/audleyData';
import '../Nocai/Nocai.css';

const imageMap = {
  audleyEco1,
  audleyEco2
};

const Audley = () => {
  const { language, t } = useLanguage();

  return (
    <div className="office-equipment">
      <div className="container">
        <div className="catalog-cards">
          {audleyData.products.map((product, index) => (
            <CatalogCard
              key={product.id}
              to={`/${language}/plotter-catalog/audley/${product.id}`}
              index={index}
              image={imageMap[product.imageKey]}
              name={product.name}
              moreLabel={t('common.more')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Audley;
