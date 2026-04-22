import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Modal, CallbackForm } from '../../components/widgets/Modals';
import { inksProducts } from '../../data/inksData';
import './InkModelPage.css';

const InkModelPage = () => {
  const { inkId } = useParams();
  const { language: lang, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const product = inksProducts.find((p) => p.id === inkId);

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
            <h2 className="ink-model__section-title">{t('product.product_description')}</h2>
            <p className="ink-model__description">{t(product.descKey)}</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={t('callback.title')}>
        <CallbackForm onSuccess={handleFormSuccess} />
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
