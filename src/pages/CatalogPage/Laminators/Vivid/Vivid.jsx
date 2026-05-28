import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { laminator5, laminator6, laminator7, laminator8, laminator9, laminator10 } from '../../../../assets/images';
import vividData from '../../../../database/brands/vivid.json';
import '../../CatalogPage.css';

const Vivid = () => {
  const { t } = useLanguage();

  const imageMap = {
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
          <div className="office-equipment__grid">
            {vividData.products.map((product) => (
              <Link
                key={product.id}
                to={`/vivid/${product.id}`}
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
                    {product.cardSpecs?.map((spec) => (
                      <span key={`${product.id}-${spec.label}`} className="spec">
                        <strong>{spec.label}</strong> {spec.value}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vivid;
