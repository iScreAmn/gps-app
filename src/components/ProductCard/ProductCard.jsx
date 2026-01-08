import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { language, t } = useLanguage();
  
  // Use custom link if provided, otherwise use default product page
  const productLink = product.link || `/${language}/product/${product.id}`;

  return (
    <div className="product-card">
      <Link to={productLink} className="product-card-link">
        <div className="product-card-image">
          <img src={product.image} alt={product.name} />
          <div className="product-card-overlay">
            <span className="view-details">
              {t('common.more')}
            </span>
          </div>
        </div>
        
        <div className="product-card-content">
          <h3 className="product-card-title">{product.name}</h3>
          
          <div className="product-card-specs">
            <span className="spec">
              <strong>{t('product.speed')}</strong> {product.speed} {t('common.ppm')}
            </span>
            <span className="spec">
              <strong>{t('product.format')}</strong> {product.format}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
