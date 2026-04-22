import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { developPro1, developPro2, developPro3, developPro4 } from '../../../assets/images';
import { professionalData } from '../../../data/professionalData';
import { Modal, CallbackForm } from '../../../components/widgets/Modals';
import './ProfessionalModelPage.css';

const imageMap = {
  developPro1,
  developPro2,
  developPro3,
  developPro4
};

const ProfessionalModelPage = () => {
  const { modelId } = useParams();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = professionalData.products.find((p) => p.id === modelId);
  const images = product
    ? (Array.isArray(imageMap[product.imageKey])
      ? imageMap[product.imageKey]
      : [imageMap[product.imageKey]])
    : [];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModal(true);
    setTimeout(() => setIsSuccessModal(false), 3000);
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
                <>
                  <img
                    src={images[activeImageIndex]}
                    alt={product.name}
                    className="develop-model__image-big"
                  />
                  {images.length > 1 && (
                    <div className="develop-model__thumbnails">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          className={`develop-model__thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                          onClick={() => setActiveImageIndex(index)}
                        >
                          <img src={img} alt={`${product.name} ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="develop-model__specs">
            <h2 className="develop-model__specs-title">
              {t('products.develop.systemSpecs', 'Specifications')}
            </h2>
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="develop-model__spec-item">
                <span className="develop-model__spec-label">{key}:</span>
                <span className="develop-model__spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t('callback.title') || 'Request a callback'}
      >
        <CallbackForm onSuccess={handleFormSuccess} />
      </Modal>

      <Modal
        isOpen={isSuccessModal}
        onClose={() => setIsSuccessModal(false)}
        title={t('callback.successTitle') || 'Request sent'}
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
            {t('callback.successMessage') || 'We will contact you shortly!'}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ProfessionalModelPage;
