import React, { useState } from 'react';
import './CtaHome.css';
import { artPrinter1 } from "../../../assets/images";
import { useLanguage } from "../../../hooks/useLanguage";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Modal } from "../../widgets/Modals";
import { CallbackForm } from "../../widgets/CallbackForm";

const CtaHome = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModal(true);
    // Автоматически закрыть модалку успеха через 3 секунды
    setTimeout(() => {
      setIsSuccessModal(false);
    }, 3000);
  };

  return (
    <>
      <div className="online__order">
        <img className="order__img" src={artPrinter1} alt="" />
        <div className="order__content">
          <h2 className="order__content-title">{t("about.order.title")}</h2>
          <p className="order__content-subtitle">
            {t("about.order.description")}
          </p>
          <motion.button
            className="order__content-btn order__content-btn-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={handleOpenModal}
          >
            {t("about.order.cta")}
          </motion.button>
        </div>
      </div>

      {/* Модальное окно с формой */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t('callback.title') || 'Заказать обратный звонок для записи'}
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
            style={{ margin: '0 auto 1rem', display: 'block', color: 'var(--primary-red)' }}
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
    </>
  );
};

export default CtaHome;

