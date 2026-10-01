import React from 'react';
import { useLanguage } from '../../../../hooks/useLanguage';
import CatalogCard from '../../../../components/CatalogCard/CatalogCard';
import { laminator5, laminator6, laminator7, laminator8, laminator9, laminator10 } from '../../../../assets/images';
import vividData from '../../../../database/brands/vivid.json';
import '../../CatalogPage.css';

const Vivid = () => {
  const { t, language } = useLanguage();
  const products = vividData.products;

  const imageMap = {
    'matrix-duo-md-460': laminator5,
    'matrix-duo-md-650': laminator5,
    'matrix-easymount-1200-double-hot': laminator6,
    'matrix-mx-530dp': laminator7,
    'matrix-omni-flow-370': laminator8,
    'matrix-omni-flow-460': laminator9,
    'matrix-take-up-unit': laminator10
  };

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <div className="catalog-cards">
            {products.map((product, index) => (
              <CatalogCard
                key={product.id}
                to={`/${language}/cutting-systems/vivid/${product.id}`}
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

export default Vivid;
