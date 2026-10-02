import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import ProductShowcase from '../../components/ProductShowcase/ProductShowcase';
import ProofLink from '../../components/ProofLink/ProofLink';
import { inksProducts } from '../../data/inksData';
import './InkModelPage.css';

// Cutting-mat panel with a dashed knife line; children are the <li> chips
const SpecPanel = ({ icon, title, badge, wide = false, children }) => (
  <section className="ink-model__compat">
    <header className="ink-model__compat-head">
      <span className="ink-model__compat-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">{icon}</svg>
      </span>
      <h2 className="ink-model__compat-title">{title}</h2>
      {badge && <span className="ink-model__compat-brand">{badge}</span>}
    </header>
    <ul className={`ink-model__compat-list${wide ? ' ink-model__compat-list--wide' : ''}`}>{children}</ul>
  </section>
);

// Also serves standalone supplies: pass `products={suppliesProducts}` on the :supplyId route
const InkModelPage = ({ products = inksProducts }) => {
  const { inkId, supplyId } = useParams();
  const { t, language } = useLanguage();

  const product = products.find((p) => p.id === (inkId ?? supplyId));

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
      title={t(product.titleKey)}
      images={[product.image]}
    >
      {product.descKey && (
        <section className="showcase__about">
          <h2 className="showcase__section-title">{t('product.product_description')}</h2>
          {/* Blank lines split paragraphs; **text** in the translation renders as bold */}
          {t(product.descKey).split('\n\n').map((paragraph, p) => (
            <p key={p} className="showcase__description">
              {paragraph.split('**').map((part, i) =>
                i % 2 ? <strong key={i}>{part}</strong> : part
              )}
            </p>
          ))}
          {/* Related machines, e.g. staples → RAPID staplers */}
          {product.link && (
            <ProofLink
              to={`/${language}/${product.link.path}`}
              label={t(product.link.labelKey)}
              className="ink-model__link"
            />
          )}
        </section>
      )}

      {product.compatible && (
        <SpecPanel
          icon={<path d="M20 6 9 17l-5-5" />}
          title={t('catalog.compatible')}
          badge={product.compatible.brand}
        >
          {product.compatible.models.map((model, i) => (
            <li key={model} className="ink-model__compat-model" style={{ '--i': i }}>
              <span className="ink-model__compat-model-label">{product.compatible.brand}</span>
              {model}
            </li>
          ))}
        </SpecPanel>
      )}

      {product.sizes && (
        <SpecPanel
          icon={<path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2" />}
          title={t(product.sizesTitleKey)}
          wide={product.sizesWide}
        >
          {/* [inch, mm] pairs or { main, sub?, subKey?, colorKey?, swatch? } variants */}
          {product.sizes.map((size, i) => {
            const [main, sub] = Array.isArray(size)
              ? [`${size[0]}"`, `${size[1]} ${t('catalog.mm')}`]
              : [
                  size.main,
                  [size.subKey ? t(size.subKey) : size.sub, size.colorKey && t(size.colorKey)]
                    .filter(Boolean)
                    .join(' · '),
                ];
            return (
              <li key={`${main}-${sub}`} className="ink-model__compat-model" style={{ '--i': i }}>
                {size.swatch && (
                  <span className="ink-model__compat-swatch" style={{ background: size.swatch }} aria-hidden="true" />
                )}
                {main}
                {sub && (
                  <span className="ink-model__compat-model-label ink-model__compat-model-label--below">{sub}</span>
                )}
              </li>
            );
          })}
        </SpecPanel>
      )}
    </ProductShowcase>
  );
};

export default InkModelPage;
