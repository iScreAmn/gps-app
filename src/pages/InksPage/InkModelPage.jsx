import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Modal, CallbackForm } from '../../components/widgets/Modals';
import { inksProducts } from '../../data/inksData';
import contactsData from '../../data/contactsData';
import './InkModelPage.css';

const BADGE_CHARS = [...'GEORGIAN POLYGRAPH SERVICES '];

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
  const stageRef = useRef(null);

  const product = products.find((p) => p.id === (inkId ?? supplyId));

  const handleOpenModal = () => setIsModalOpen(true);

  // Image tilts toward the cursor; values feed CSS vars so the transform stays in CSS
  const handleStageMove = (e) => {
    const el = stageRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const handleStageLeave = () => {
    stageRef.current?.style.setProperty('--mx', 0);
    stageRef.current?.style.setProperty('--my', 0);
  };
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

  const title = t(product.titleKey);
  const brand = product.brand ?? product.compatible?.brand ?? 'GPS';

  return (
    <div className="ink-model">
      {/* Oversized outlined brand name drifting behind the page */}
      <div className="ink-model__ghost" aria-hidden="true">
        <span>{brand} — {brand} — {brand} — </span>
        <span>{brand} — {brand} — {brand} — </span>
      </div>

      <div className="container">
        <header className="ink-model__hero">
          <h1 className="ink-model__title">
            {title.split(' ').map((word, i) => (
              <span key={i} className="ink-model__title-word" style={{ '--w': i }}>
                <span>{word}</span>
              </span>
            ))}
          </h1>

          <div className="ink-model__actions">
            <button type="button" className="ink-model__btn ink-model__btn--order" onClick={handleOpenModal}>
              <span className="ink-model__btn-label">{t('product.order_now')}</span>
              <span className="ink-model__btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </span>
            </button>
            <a
              href={contactsData.phone.href}
              className="ink-model__btn ink-model__btn--help"
              aria-label={`${t('products.develop.needHelp', 'Need Help?')} ${contactsData.phone.label}`}
            >
              <span className="ink-model__btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
              </span>
              <span className="ink-model__btn-label">{t('products.develop.needHelp', 'Need Help?')}</span>
            </a>
          </div>
        </header>

        <div className="ink-model__wrapper">
          <div className="ink-model__media">
            <div
              ref={stageRef}
              className="ink-model__stage"
              onPointerMove={handleStageMove}
              onPointerLeave={handleStageLeave}
            >
              {/* Printer's crop marks in the corners + CMYK registration strip */}
              <span className="ink-model__crop ink-model__crop--tl" aria-hidden="true" />
              <span className="ink-model__crop ink-model__crop--tr" aria-hidden="true" />
              <span className="ink-model__crop ink-model__crop--bl" aria-hidden="true" />
              <span className="ink-model__crop ink-model__crop--br" aria-hidden="true" />
              <span className="ink-model__cmyk" aria-hidden="true">
                <i /><i /><i /><i />
              </span>

              {/* Each letter rotated to its own slot, so the lettering always closes into an even ring */}
              <svg className="ink-model__badge" viewBox="0 0 120 120" aria-hidden="true">
                {BADGE_CHARS.map((char, i) => (
                  <text key={i} x="60" y="17" transform={`rotate(${(i * 360) / BADGE_CHARS.length} 60 60)`}>
                    {char}
                  </text>
                ))}
              </svg>

              <img src={product.image} alt={title} className="ink-model__image" />
            </div>
          </div>

          <div className="ink-model__content">
            {product.descKey && (
              <section className="ink-model__about">
                <h2 className="ink-model__section-title">
                  {t('product.product_description')}
                </h2>
                <p className="ink-model__description">
                  {/* **text** in the translation renders as bold */}
                  {t(product.descKey).split('**').map((part, i) =>
                    i % 2 ? <strong key={i}>{part}</strong> : part
                  )}
                </p>
              </section>
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${t('product.order_title')} — ${title}`}
      >
        <CallbackForm
          onSuccess={handleFormSuccess}
          source={`${t('product.order_title')}: ${title}`}
        />
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
