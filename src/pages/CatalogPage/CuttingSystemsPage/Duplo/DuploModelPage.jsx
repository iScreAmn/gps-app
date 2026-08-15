import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../../hooks/useLanguage';
import {
  duplo1,
  duplo2,
  duplo3,
  duplo4,
  duplo5,
  duplo6,
  duplo7,
  duplo8,
  duplo9,
  duplo10
} from '../../../../assets/images';
import duploData from '../../../../database/brands/duplo.json';
import { Modal, CallbackForm } from '../../../../components/widgets/Modals';
import '../../OfficeEquipment/DevelopModelPage.css';
import '../Cyklos/CyklosModelPage.css';

const DuploModelPage = () => {
  const { modelId } = useParams();
  const { t, language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const product = duploData.products.find((item) => item.id === modelId);

  const imageMap = {
    'duplo-df-1200': [duplo1],
    'duplo-df-980': [duplo2],
    'duplo-df-970': [duplo3],
    'duplo-dc-646': [duplo4],
    'duplo-dpb-500': [duplo5],
    'duplo-kb-4000': [duplo6],
    'duplo-dsc-10-60il': [duplo7],
    'duplo-dsc-10-20': [duplo8],
    'duplo-dc-446': [duplo9],
    'duplo-dfc-101': [duplo10]
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
  const specificationTitle = isEn
    ? (product.specificationTitleEn || 'Specification')
    : (product.specificationTitle || 'პროდუქტის სპეციფიკაცია');
  const parametersTitle = isEn
    ? (product.parametersTitleEn || 'Parameters')
    : (product.parametersTitle || 'პროდუქტის პარამეტრები');

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

          {(overview || specification?.length > 0 || parameters?.length > 0) && (
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
          )}
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

export default DuploModelPage;
