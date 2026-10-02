import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { PK0604, PK0604plus, PK0705, PK0705plus, PK1209 } from '../../../../assets/images';
import iechoData from '../../../../database/brands/iecho.json';
import ProductShowcase from '../../../../components/ProductShowcase/ProductShowcase';
import { SpecSheet } from '../../../../components/ProductShowcase/SpecSheet';

const imageMap = {
  'pk0604': PK0604,
  'pk0604-plus': PK0604plus,
  'pk0705': PK0705,
  'pk0705-plus': PK0705plus,
  'pk1209-pro-max': PK1209
};

const IechoModelPage = () => {
  const { modelId } = useParams();
  const { t } = useLanguage();

  const product = iechoData.products.find((p) => p.id === modelId);

  if (!product) {
    return (
      <div className="showcase">
        <div className="container">
          <p>{t('catalog.no_products')}</p>
        </div>
      </div>
    );
  }

  // Translated labels carry a trailing colon for the old inline layout — the spec sheet has its own columns
  const label = (key, fallback) => t(`products.iecho.specLabels.${key}`, fallback).replace(/:\s*$/, '');
  const value = (item) => t(`products.iecho.specValues.${item}`, item);
  const mm = t('products.iecho.specUnits.mm', 'mm');
  const mmPerS = t('products.iecho.specUnits.mmPerS', 'mm/s');
  const kw = t('products.iecho.specUnits.kw', 'kW');
  const { cuttingArea, flooringArea } = product;

  const specs = [
    [label('cuttingArea', 'Cutting Area (L×W)'), `${cuttingArea.lengthMm}${mm} × ${cuttingArea.widthMm}${mm}`],
    [label('cuttingThickness', 'Cutting Thickness'), `${product.cuttingThicknessMm}${mm}`],
    [label('maxCuttingSpeed', 'Max Cutting Speed'), `${product.maxCuttingSpeedMmPerS}${mmPerS}`],
    [label('power', 'Power'), `${product.powerKw}${kw}`],
    [label('machineType', 'Machine Type'), product.machineType],
    [label('flooringArea', 'Flooring Area (L×W×H)'), `${flooringArea.lengthMm}${mm} × ${flooringArea.widthMm}${mm} × ${flooringArea.heightMm}${mm}`],
    [label('tools', 'Cutting Tools'), product.tools.map(value).join(', ')],
    [label('materials', 'Cutting Materials'), product.materials.map(value).join(', ')],
    [label('media', 'Media'), value(product.media)],
    [label('cuttingAccuracy', 'Cutting Accuracy'), `±${product.cuttingAccuracyMm}${mm}`],
    [label('dataFormats', 'Data Formats'), product.dataFormats.join(', ')],
    [label('voltage', 'Voltage'), product.voltage],
  ];

  return (
    <ProductShowcase className="showcase--cutout" title={product.name} images={[imageMap[product.id]]}>
      <SpecSheet title={t('products.iecho.specsTitle', 'Specifications')} specs={specs} />
    </ProductShowcase>
  );
};

export default IechoModelPage;
