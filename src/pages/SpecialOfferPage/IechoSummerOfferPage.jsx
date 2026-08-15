import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import contactsData from '../../data/contactsData';
import { iechoSummerOffer2, iechoSummerOffer3 } from '../../assets/images';
import iechoData from '../../database/brands/iecho.json';
import Modal from '../../components/widgets/Modals/Modal';
import './IechoSummerOfferPage.css';

const IechoSummerOfferPage = () => {
  const { t } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState(null);

  const features = [
    t('iechoSummerOffer.features.feature1'),
    t('iechoSummerOffer.features.feature2'),
    t('iechoSummerOffer.features.feature3'),
  ];

  const product = iechoData.products.find((p) => p.id === 'pk0705-plus');
  const label = (key) => t(`products.iecho.specLabels.${key}`);
  const value = (item) => t(`products.iecho.specValues.${item}`, { defaultValue: item });
  const mm = t('products.iecho.specUnits.mm');
  const mmPerS = t('products.iecho.specUnits.mmPerS');
  const kw = t('products.iecho.specUnits.kw');

  const specs = product
    ? [
        { label: label('machineType'), value: product.machineType },
        { label: label('cuttingHeadType'), value: value(product.cuttingHeadType) },
        {
          label: label('cuttingArea'),
          value: `${product.cuttingArea.lengthMm}${mm} × ${product.cuttingArea.widthMm}${mm}`,
        },
        {
          label: label('flooringArea'),
          value: `${product.flooringArea.lengthMm}${mm} × ${product.flooringArea.widthMm}${mm} × ${product.flooringArea.heightMm}${mm}`,
        },
        { label: label('tools'), value: product.tools.map(value).join(', ') },
        { label: label('materials'), value: product.materials.map(value).join(', ') },
        { label: label('cuttingThickness'), value: `${product.cuttingThicknessMm}${mm}` },
        { label: label('media'), value: value(product.media) },
        { label: label('maxCuttingSpeed'), value: `${product.maxCuttingSpeedMmPerS}${mmPerS}` },
        { label: label('cuttingAccuracy'), value: `±${product.cuttingAccuracyMm}${mm}` },
        { label: label('dataFormats'), value: product.dataFormats.join(', ') },
        { label: label('voltage'), value: product.voltage },
        { label: label('power'), value: `${product.powerKw}${kw}` },
      ]
    : [];

  return (
    <div className="iecho-offer">
      <div className="container">
        <div className="iecho-offer__grid">
          <div className="iecho-offer__content">
            <span className="iecho-offer__badge">{t('iechoSummerOffer.badge')}</span>
            <h1 className="iecho-offer__title">{t('iechoSummerOffer.title')}</h1>
            <p className="iecho-offer__subtitle">
              <Trans i18nKey="iechoSummerOffer.subtitle" components={{ 1: <strong />, 2: <strong /> }} />
            </p>

            <ul className="iecho-offer__list">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <p className="iecho-offer__closing">{t('iechoSummerOffer.closingText')}</p>

            <ul className="iecho-offer__list">
              <li>{t('iechoSummerOffer.contactNote')}</li>
            </ul>

            <a href={contactsData.phone.href} className="iecho-offer__button">
              {t('iechoSummerOffer.callButton')}
            </a>
          </div>

          <div className="iecho-offer__media">
            <div className="iecho-offer__video">
              <iframe
                src="https://www.youtube.com/embed/necBylq7zYk"
                title="IECHO PK0705 Plus"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {product && (
          <div className="iecho-offer__specs">
            <div className="iecho-offer__specs-image">
              <button
                type="button"
                className="iecho-offer__specs-photo"
                onClick={() => setLightboxImage(iechoSummerOffer2)}
                aria-label={t('iechoSummerOffer.zoomImage')}
              >
                <img src={iechoSummerOffer2} alt={product.name} />
              </button>
              <button
                type="button"
                className="iecho-offer__specs-photo"
                onClick={() => setLightboxImage(iechoSummerOffer3)}
                aria-label={t('iechoSummerOffer.zoomImage')}
              >
                <img src={iechoSummerOffer3} alt={product.name} />
              </button>
            </div>
            <div className="iecho-offer__specs-content">
              <h2 className="iecho-offer__specs-title">{t('products.iecho.specsTitle')}</h2>
              <dl className="iecho-offer__specs-list">
                {specs.map((spec) => (
                  <div className="iecho-offer__specs-row" key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        className="iecho-offer__lightbox"
      >
        {lightboxImage && (
          <img className="iecho-offer__lightbox-img" src={lightboxImage} alt={product?.name} />
        )}
      </Modal>
    </div>
  );
};

export default IechoSummerOfferPage;
