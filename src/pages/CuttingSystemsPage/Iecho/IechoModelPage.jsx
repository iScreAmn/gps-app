import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../../hooks/useLanguage';
import { PK0604, PK0604plus, PK0705, PK0705plus, PK1209 } from '../../../assets/images';
import iechoData from '../../../database/brands/iecho.json';
import { Modal, CallbackForm } from '../../../components/widgets/Modals';
import './IechoModelPage.css';

const IechoModelPage = () => {
  const { modelId } = useParams();
  const { language, t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  // Map product IDs to images
  const imageMap = {
    'pk0604': PK0604,
    'pk0604-plus': PK0604plus,
    'pk0705': PK0705,
    'pk0705-plus': PK0705plus,
    'pk1209-pro-max': PK1209
  };

  // Find the product
  const product = iechoData.products.find(p => p.id === modelId);

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
      <div className="iecho-model">
        <div className="container">
          <p>Model not found</p>
          <Link to={`/${language}/cutting-systems/iecho`}>Back to IECHO</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="iecho-model">
      <div className="container">
        <div className="iecho-model__wrapper">
          <div className="iecho-model__header">
            <div className="iecho-model__header-info">
              <Link to={`/${language}/cutting-systems/iecho`} className="iecho-model__back">
                ← Back to IECHO
              </Link>
              <h1 className="iecho-model__title">{product.name}</h1>
              <button 
                className="iecho-model__help-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenModal();
                }}
              >
                {t('products.iecho.needHelp')}
              </button>
            </div>
            <div className="iecho-model__image-wrapper">
              <img 
                src={imageMap[product.id]} 
                alt={product.name}
                className="iecho-model__image-big"
              />
            </div>
          </div>

          <div className="iecho-model__specs">
            <h2 className="iecho-model__specs-title">Specifications</h2>
            
            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Head Type:</span>
              <span className="iecho-model__spec-value">{product.cuttingHeadType}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Machine Type:</span>
              <span className="iecho-model__spec-value">{product.machineType}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Area (L×W):</span>
              <span className="iecho-model__spec-value">
                {product.cuttingArea.lengthMm}mm × {product.cuttingArea.widthMm}mm
              </span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Flooring Area (L×W×H):</span>
              <span className="iecho-model__spec-value">
                {product.flooringArea.lengthMm}mm × {product.flooringArea.widthMm}mm × {product.flooringArea.heightMm}mm
              </span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Tools:</span>
              <span className="iecho-model__spec-value">
                {product.tools.join(', ')}
              </span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Materials:</span>
              <span className="iecho-model__spec-value">
                {product.materials.join(', ')}
              </span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Thickness:</span>
              <span className="iecho-model__spec-value">{product.cuttingThicknessMm}mm</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Media:</span>
              <span className="iecho-model__spec-value">{product.media}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Max Cutting Speed:</span>
              <span className="iecho-model__spec-value">{product.maxCuttingSpeedMmPerS}mm/s</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Cutting Accuracy:</span>
              <span className="iecho-model__spec-value">±{product.cuttingAccuracyMm}mm</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Data Formats:</span>
              <span className="iecho-model__spec-value">{product.dataFormats.join(', ')}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Voltage:</span>
              <span className="iecho-model__spec-value">{product.voltage}</span>
            </div>

            <div className="iecho-model__spec-item">
              <span className="iecho-model__spec-label">Power:</span>
              <span className="iecho-model__spec-value">{product.powerKw}kW</span>
            </div>
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

export default IechoModelPage;

