import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Modal, CallbackForm } from '../../components/widgets/Modals';
import { inksProducts } from '../../data/inksData';
import './InkModelPage.css';

// Cutting-mat panel with a dashed knife line; children are the <li> chips
const SpecPanel = ({ icon, title, badge, count, countLabel, wide = false, children }) => (
  <section className="ink-model__compat">
    <header className="ink-model__compat-head">
      <span className="ink-model__compat-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">{icon}</svg>
      </span>
      <h2 className="ink-model__compat-title">{title}</h2>
      {badge && <span className="ink-model__compat-brand">{badge}</span>}
      <span className="ink-model__compat-count">
        <strong>{count}</strong> {countLabel}
      </span>
    </header>
    <ul className={`ink-model__compat-list${wide ? ' ink-model__compat-list--wide' : ''}`}>{children}</ul>
  </section>
);

// Also serves standalone supplies: pass `products={suppliesProducts}` on the :supplyId route
const InkModelPage = ({ products = inksProducts }) => {
  const { inkId, supplyId } = useParams();
  const { language: lang, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const product = products.find((p) => p.id === (inkId ?? supplyId));

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModal(true);
    setTimeout(() => setIsSuccessModal(false), 3000);
  };

  if (!product) {
    return (
      <div className="ink-model">
        <div className="container">
          <p>{t('catalog.no_products')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ink-model">
      <div className="container">
        <div className="ink-model__wrapper">
          <div className="ink-model__header">
            <div className="ink-model__header-info">
              <h1 className="ink-model__title">{t(product.titleKey)}</h1>
              <button className="ink-model__help-btn" onClick={handleOpenModal}>
                {t('products.develop.needHelp', 'Need Help?')}
              </button>
            </div>
            <div className="ink-model__image-wrapper">
              <img
                src={product.image}
                alt={t(product.titleKey)}
                className="ink-model__image"
              />
            </div>
          </div>

          <div className="ink-model__content">
            {product.descKey && (
              <>
                <h2 className="ink-model__section-title">{t('product.product_description')}</h2>
                <p className="ink-model__description">
                  {/* **text** in the translation renders as bold */}
                  {t(product.descKey).split('**').map((part, i) =>
                    i % 2 ? <strong key={i}>{part}</strong> : part
                  )}
                </p>
              </>
            )}

            {product.compatible && (
              <SpecPanel
                icon={<path d="M20 6 9 17l-5-5" />}
                title={t('catalog.compatible')}
                badge={product.compatible.brand}
                count={product.compatible.models.length}
                countLabel={t('catalog.models')}
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
                count={product.sizes.length}
                countLabel={t(Array.isArray(product.sizes[0]) ? 'catalog.sizes' : 'catalog.options')}
                wide={!Array.isArray(product.sizes[0])}
              >
                {/* [inch, mm] pairs or { main, sub } variants */}
                {product.sizes.map((size, i) => {
                  const [main, sub] = Array.isArray(size)
                    ? [`${size[0]}"`, `${size[1]} ${t('catalog.mm')}`]
                    : [size.main, size.sub];
                  return (
                    <li key={`${main}-${sub}`} className="ink-model__compat-model" style={{ '--i': i }}>
                      {main}
                      <span className="ink-model__compat-model-label ink-model__compat-model-label--below">{sub}</span>
                    </li>
                  );
                })}
              </SpecPanel>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={t('callback.title')}>
        <CallbackForm onSuccess={handleFormSuccess} source={t(product.titleKey)} />
      </Modal>
      <Modal isOpen={isSuccessModal} onClose={() => setIsSuccessModal(false)} title={t('callback.successTitle')}>
        <div className="success-message">
          <p style={{ textAlign: 'center', fontSize: '1.125rem', margin: 0 }}>
            {t('callback.successMessage')}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default InkModelPage;
