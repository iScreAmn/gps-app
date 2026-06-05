import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../../../hooks/useLanguage';
import {
  guillotine1,
  guillotine2,
  guillotine3,
  guillotine4,
  guillotine5,
  guillotine6,
  guillotine7,
  guillotine8,
  guillotine9,
  guillotine10,
  guillotine11,
  guillotine12,
  guillotine13,
  guillotine14
} from '../../../../../assets/images';
import idealGuillotineData from '../../../../../database/brands/ideal-guillotine.json';
import { Modal, CallbackForm } from '../../../../../components/widgets/Modals';
import '../../../OfficeEquipment/DevelopModelPage.css';

const IdealGuillotineModelPage = () => {
  const { modelId } = useParams();
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const product = idealGuillotineData.products.find((item) => item.id === modelId);

  const imageMap = {
    'ideal-4300': [guillotine1],
    'ideal-4305': [guillotine2],
    'ideal-4315': [guillotine3],
    'ideal-4350': [guillotine4],
    'ideal-4705': [guillotine5],
    'ideal-4815': [guillotine6],
    'ideal-4850': [guillotine7],
    'ideal-4855': [guillotine14],
    'ideal-4860': [guillotine8],
    'ideal-5255': [guillotine9],
    'ideal-5260': [guillotine10],
    'ideal-6655': [guillotine11],
    'ideal-6660': [guillotine12],
    'ideal-7260': [guillotine13]
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

  const descriptionLines = language === 'en' && product.descriptionLinesEn
    ? product.descriptionLinesEn
    : product.descriptionLines;

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
            <h2 className="develop-model__specs-title">{language === 'ka' ? 'სპეციფიკაცია' : 'Specifications'}</h2>
            {descriptionLines.map((line) => {
              const colonIndex = line.indexOf(':');
              if (colonIndex > -1) {
                const label = line.slice(0, colonIndex).trim();
                const value = line.slice(colonIndex + 1).trim();
                return (
                  <div key={line} className="develop-model__spec-item">
                    <span className="develop-model__spec-label">{label}</span>
                    <span className="develop-model__spec-value">{value}</span>
                  </div>
                );
              }
              return (
                <div key={line} className="develop-model__spec-item develop-model__spec-item--full">
                  <span className="develop-model__spec-value">{line}</span>
                </div>
              );
            })}
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

export default IdealGuillotineModelPage;
