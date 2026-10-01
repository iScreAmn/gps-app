import React from 'react';
import { tonerProducts } from '../../data/tonerData';
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import './TonerPage.css';

const TonerPage = () => (
  <section className="toner-page">
    <div className="container">
      <div className="catalog-cards">
        {tonerProducts.map((product, index) => (
          <CatalogCard
            key={product.id}
            index={index}
            image={product.image}
            name={product.title}
          >
            <p className="catalog-card__note">
              <strong>თავსებადობა:</strong> {product.compatibility}
            </p>
          </CatalogCard>
        ))}
      </div>
    </div>
  </section>
);

export default TonerPage;
