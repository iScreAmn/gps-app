import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { language, t } = useLanguage();

  return (
    <div className="product-card">
      <Link to={`/${language}/product/${product.id}`} className="product-card-link">
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
          
          <div className="product-card-footer">
            <span className="product-price">{product.price}</span>
            <button className="btn-primary product-cta">
              {t('common.request')}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
