import React from 'react';
import Carousel from '../Carousel/Carousel';
import { getProductItems } from '../../data/contentData';
import { useLanguage } from '../../hooks/useLanguage';
import './ProductGallery.css';

const ProductGallery = () => {
  const { t } = useLanguage();
  const productItems = getProductItems();

  if (!productItems.length) {
    return (
      <section className="product-gallery">
        <div className="container">
          <div className="product-gallery-empty">
            <p>No products available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-gallery">
      <div className="container">
        <h2 className='section-title'>{t('products.title')}</h2>
        <Carousel 
          slides={productItems}
          autoPlay={false}
          autoPlayInterval={6000}
          showDots={true}
          showArrows={true}
          className="product-carousel"
        />
      </div>
    </section>
  );
};

export default ProductGallery;
