import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import { cyklos1, cyklos2, cyklos3, cyklos4, cyklos5, cyklos6 } from '../../../../assets/images';
import cyklosData from '../../../../database/brands/cyklos.json';
import { Modal, CallbackForm } from '../../../../components/widgets/Modals';
import '../../OfficeEquipment/DevelopModelPage.css';
import './CyklosModelPage.css';

const CyklosModelPage = () => {
  const { modelId } = useParams();
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const product = cyklosData.products.find((item) => item.id === modelId);

  const imageMap = {
    'cyklos-ksl-435': [cyklos1],
    'cyklos-ksl-320': [cyklos2],
    'cyklos-gpm-320': [cyklos3],
    'cyklos-gpm-315': [cyklos4],
    'cyklos-ucr-9': [cyklos5],
    'cyklos-ccr-40': [cyklos6]
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

  const isEn = language === 'en';
  const productName = isEn && product.nameEn ? product.nameEn : product.name;
  const overview = isEn && product.overviewEn ? product.overviewEn : product.overview;
  const specification = isEn && product.specificationEn ? product.specificationEn : product.specification;
  const parameters = isEn && product.parametersEn ? product.parametersEn : product.parameters;

  const overviewTitle = isEn ? 'Product Overview' : 'პროდუქტის მიმოხილვა';
  const specificationTitle = isEn ? 'Specification' : 'პროდუქტის სპეციფიკაცია';
  const parametersTitle = isEn ? 'Parameters' : 'პროდუქტის პარამეტრები';

  return (
    <div className="develop-model">
      <div className="container">
        <div className="develop-model__wrapper">
          <div className="develop-model__header">
            <div className="develop-model__header-info">
              <h1 className="develop-model__title">{productName}</h1>
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
                  alt={productName}
                  className="develop-model__image-big"
                />
              )}
            </div>
          </div>

          <div className="develop-model__specs cyklos-model__sections">
            {overview && (
              <section className="cyklos-model__section">
                <h2 className="develop-model__specs-title">{overviewTitle}</h2>
                <p className="cyklos-model__overview">{overview}</p>
              </section>
            )}

            {specification?.length > 0 && (
              <section className="cyklos-model__section">
                <h2 className="develop-model__specs-title">{specificationTitle}</h2>
                <ul className="cyklos-model__spec-list">
                  {specification.map((item) => (
                    <li key={item} className="cyklos-model__spec-list-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {parameters?.length > 0 && (
              <section className="cyklos-model__section">
                <h2 className="develop-model__specs-title">{parametersTitle}</h2>
                {parameters.map((param) => (
                  <div key={`${param.label}-${param.value}`} className="develop-model__spec-item">
                    <span className="develop-model__spec-label">{param.label}</span>
                    <span className="develop-model__spec-value">{param.value}</span>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t('callback.title') || 'Заказать обратный звонок'}
      >
        <CallbackForm onSuccess={handleFormSuccess} source={productName} />
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

export default CyklosModelPage;
