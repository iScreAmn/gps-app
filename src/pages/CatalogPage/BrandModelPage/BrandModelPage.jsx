import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import ProductShowcase from '../../../components/ProductShowcase/ProductShowcase';
import { SpecSheet, FeatureList } from '../../../components/ProductShowcase/SpecSheet';
import { splitLabelledLines } from '../../../utils/specLines';

// Model page for the database/brands/*.json catalogs (Rapid, Cyklos, Duplo, RecoSystems, Vivid, Ideal).
// Two data shapes are in use:
//   overview / specification[] / parameters[{label, value}] (+ …En)
//   descriptionLines[] "Label: value" strings (+ descriptionLinesEn, shortDescriptionKa/En)
const BrandModelPage = ({ data, imageMap }) => {
  const { modelId } = useParams();
  const { language, t } = useLanguage();

  const product = data.products.find((item) => item.id === modelId);

  if (!product) {
    return (
      <div className="showcase">
        <div className="container">
          <p>{t('catalog.no_products')}</p>
        </div>
      </div>
    );
  }

  const isEn = language === 'en';
  const pick = (ka, en) => (isEn && en ? en : ka);

  const name = pick(product.name, product.nameEn);
  const lead = pick(product.overview, product.overviewEn) ?? pick(product.shortDescriptionKa, product.shortDescriptionEn);
  const fromSpecification = splitLabelledLines(pick(product.specification, product.specificationEn));
  const fromLines = splitLabelledLines(pick(product.descriptionLines, product.descriptionLinesEn));

  const features = [...fromSpecification.features, ...fromLines.features];
  const specs = [
    ...(pick(product.parameters, product.parametersEn) ?? []).map(({ label, value }) => [label, value]),
    ...fromSpecification.specs,
    ...fromLines.specs,
  ];

  return (
    <ProductShowcase
      className="showcase--cutout"
      title={name}
      images={[imageMap[product.id]].flat().filter(Boolean)}
    >
      {lead && (
        <section className="showcase__about">
          <h2 className="showcase__section-title">{t('product.product_description')}</h2>
          <p className="showcase__description">{lead}</p>
        </section>
      )}
      <SpecSheet
        title={pick(product.parametersTitle, product.parametersTitleEn) || t('product.specifications')}
        specs={specs}
      />
      <FeatureList
        title={pick(product.specificationTitle, product.specificationTitleEn) || t('product.features')}
        items={features}
      />
    </ProductShowcase>
  );
};

export default BrandModelPage;
