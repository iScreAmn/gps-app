import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { developPrinter1, developPrinter2 } from '../../assets/images';
import developData from '../../database/brands/develop.json';
import { Modal, CallbackForm } from '../../components/widgets/Modals';
import './DevelopModelPage.css';

const DevelopModelPage = () => {
  const { modelId } = useParams();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Map product IDs to images
  const imageMap = {
    'ineo-550i': [developPrinter1, developPrinter2]
  };

  // Find the product
  const product = developData.products.find(p => p.id === modelId);
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

  const renderSpecValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return Object.entries(value).map(([key, val]) => `${key}: ${val}`).join(', ');
    }
    return value;
  };

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
            <h2 className="develop-model__specs-title">{t('products.develop.systemSpecs', 'System Specifications')}</h2>
            
            {Object.entries(product.systemSpecs).map(([key, value]) => (
              <div key={key} className="develop-model__spec-item">
                <span className="develop-model__spec-label">
                  {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                </span>
                <span className="develop-model__spec-value">{renderSpecValue(value)}</span>
              </div>
            ))}

            <h2 className="develop-model__specs-title" style={{ marginTop: '2rem' }}>
              {t('products.develop.printerSpecs', 'Printer Specifications')}
            </h2>
            
            {Object.entries(product.printerSpecs).map(([key, value]) => (
              <div key={key} className="develop-model__spec-item">
                <span className="develop-model__spec-label">
                  {key.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
                </span>
                <span className="develop-model__spec-value">{renderSpecValue(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно с формой */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t('callback.title') || 'Заказать обратный звонок'}
      >
        <CallbackForm onSuccess={handleFormSuccess} />
      </Modal>

      {/* Модальное окно успеха */}
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

export default DevelopModelPage;

