import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { getIdealProducts } from '../../../../data/searchableProducts';
import '../../CatalogPage.css';

const IdealProductsPage = () => {
  const { language, t } = useLanguage();
  const products = getIdealProducts(language, t);

  return (
    <div className="catalog-page">
      <div className="office-equipment">
        <div className="container">
          <h1 className="catalog-page__found-count">
            {products.length} {t('catalog.products_found')}
          </h1>
          <div className="office-equipment__grid">
            {products.map((product) => (
              <Link
                key={product.id}
                to={product.link}
                className="office-equipment__card"
              >
                <div className="office-equipment__card-image">
                  <img
                    src={product.image}
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
                        <strong>{spec.label}:</strong> <span className="spec__value">{spec.value}</span>
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

export default IdealProductsPage;
