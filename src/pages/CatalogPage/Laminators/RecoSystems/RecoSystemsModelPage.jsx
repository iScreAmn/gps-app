import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { laminator1 } from '../../../../assets/images';
import recosystemsData from '../../../../database/brands/recosystems.json';
import { Modal, CallbackForm } from '../../../../components/widgets/Modals';
import '../../OfficeEquipment/DevelopModelPage.css';

const RecoSystemsModelPage = () => {
  const { modelId } = useParams();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const product = recosystemsData.products.find((item) => item.id === modelId);

  const imageMap = {
    'rl-39s': [laminator1]
  };

  const images = product ? imageMap[product.id] || [] : [];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModal(true);
    setTimeout(() => {
      setIsSuccessModal(false);
    }, 3000);
  };

  if (!product) {
    return (
      <div className="develop-model">
        <div className="container">
          <p>Model not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="develop-model">
      <div className="container">
        <div className="develop-model__wrapper">
          <div className="develop-model__header">
            <div className="develop-model__header-info">
              <h1 className="develop-model__title">{product.name}</h1>
              <button
                className="develop-model__help-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenModal();
                }}
              >
                {t('products.develop.needHelp', 'Need Help?')}
              </button>
            </div>
            <div className="develop-model__image-wrapper">
              {images.length > 0 && (
                <img
                  src={images[0]}
                  alt={product.name}
                  className="develop-model__image-big"
                />
              )}
            </div>
          </div>

          <div className="develop-model__specs">
            <h2 className="develop-model__specs-title">Specifications</h2>
            {product.descriptionLines.map((line) => (
              <div key={line} className="develop-model__spec-item">
                <span className="develop-model__spec-value">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t('callback.title') || 'Заказать обратный звонок'}
      >
        <CallbackForm onSuccess={handleFormSuccess} />
      </Modal>

      <Modal
        isOpen={isSuccessModal}
        onClose={() => setIsSuccessModal(false)}
        title={t('callback.successTitle') || 'Заявка отправлена'}
      >
        <div className="success-message">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: '0 auto 1rem', display: 'block', color: '#DC2626' }}
          >
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p style={{ textAlign: 'center', fontSize: '1.125rem', margin: 0 }}>
            {t('callback.successMessage') || 'Мы свяжемся с вами в ближайшее время!'}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default RecoSystemsModelPage;
