import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import CatalogCard from '../../../components/CatalogCard/CatalogCard';
import { teneth1, teneth2 } from '../../../assets/images';
import { tenethData } from '../../../data/tenethData';
import '../Nocai/Nocai.css';

const imageMap = {
  teneth1,
  teneth2
};

const Teneth = () => {
  const { language, t } = useLanguage();

  return (
    <div className="office-equipment">
      <div className="container">
        <div className="catalog-cards">
          {tenethData.products.map((product, index) => (
            <CatalogCard
              key={product.id}
              to={`/${language}/plotter-catalog/teneth/${product.id}`}
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

export default Teneth;
