import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import ProductShowcase from './ProductShowcase';
import { SpecSheet } from './SpecSheet';

// Model page for data files shaped { displayName, products: [{ id, name, imageKey, specs: { label: value } }] }
// (Nocai / Audley / Teneth plotters, Develop Professional). `imageMap` maps product.imageKey → image(s)
const SpecsModelPage = ({ data, imageMap }) => {
  const { modelId } = useParams();
  const { t } = useLanguage();

  const product = data.products.find((p) => p.id === modelId);

  if (!product) {
    return (
      <div className="showcase">
        <div className="container">
          <p>{t('catalog.no_products')}</p>
        </div>
      </div>
    );
  }

  return (
    <ProductShowcase
      className="showcase--cutout"
      title={product.name}
      images={[imageMap[product.imageKey]].flat().filter(Boolean)}
    >
      <SpecSheet title={t('products.develop.systemSpecs', 'Specifications')} specs={Object.entries(product.specs)} />
    </ProductShowcase>
  );
};

export default SpecsModelPage;
