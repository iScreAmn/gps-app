import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { developPrinter1, developPrinter2, developPrinter3, developPrinter4, developPrinter5, developPrinter6 } from '../../../assets/images';
import developData from '../../../database/brands/develop.json';
import ProductShowcase from '../../../components/ProductShowcase/ProductShowcase';
import { SpecSheet } from '../../../components/ProductShowcase/SpecSheet';

const imageMap = {
  'ineo-550i': [developPrinter1, developPrinter2],
  'ineo-450i': [developPrinter3],
  'ineo-360i': [developPrinter4],
  'ineo-759': [developPrinter5],
  'ineo-4020i': [developPrinter6]
};

// systemSpecs / printerSpecs keys are camelCase ("paperInputCapacity" → "Paper Input Capacity")
const humanize = (key) => key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase());

const formatValue = (value) => {
  if (Array.isArray(value)) return value.join(', ');
  if (value && typeof value === 'object') {
    return Object.entries(value).map(([key, val]) => `${humanize(key)}: ${val}`).join(', ');
  }
  return String(value);
};

const toSpecs = (group = {}) => Object.entries(group).map(([key, value]) => [humanize(key), formatValue(value)]);

// Office (Develop ineo) model page — /catalog/office/:modelId
const DevelopModelPage = () => {
  const { modelId } = useParams();
  const { t } = useLanguage();

  const product = developData.products.find((p) => p.id === modelId);

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
    <ProductShowcase className="showcase--cutout" title={product.name} images={imageMap[product.id] ?? []}>
      <SpecSheet title={t('products.develop.systemSpecs', 'System Specifications')} specs={toSpecs(product.systemSpecs)} />
      <SpecSheet title={t('products.develop.printerSpecs', 'Printer Specifications')} specs={toSpecs(product.printerSpecs)} highlight={false} />
    </ProductShowcase>
  );
};

export default DevelopModelPage;
