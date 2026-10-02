import React, { useRef, useState } from 'react';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { useLanguage } from '../../hooks/useLanguage';
import { Modal, CallbackForm } from '../widgets/Modals';
import contactsData from '../../data/contactsData';
import './ProductShowcase.css';

const BADGE_CHARS = [...'GEORGIAN POLYGRAPH SERVICES '];

// Product page shell: ghost title marquee, hero title + CTAs, image stage on the left.
// The right column (description, specs…) comes in as children.
const ProductShowcase = ({ title, images = [], className = '', children }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const stageRef = useRef(null);

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModal(true);
    setTimeout(() => setIsSuccessModal(false), 3000);
  };

  // Image tilts toward the cursor; values feed CSS vars so the transform stays in CSS
  const handleStageMove = (e) => {
    const el = stageRef.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const handleStageLeave = () => {
    stageRef.current?.style.setProperty('--mx', 0);
    stageRef.current?.style.setProperty('--my', 0);
  };

  const helpLabel = t('products.develop.needHelp', 'Need Help?');
  const orderLabel = t('product.order_now');

  return (
    <div className={`showcase ${className}`.trim()}>
      {/* Oversized outlined product title drifting behind the page */}
      <div className="showcase__ghost" aria-hidden="true">
        <span>{title} — {title} — {title} — </span>
        <span>{title} — {title} — {title} — </span>
      </div>

      <div className="container">
        <header className="showcase__hero">
          <h1 className="showcase__title">
            {title.split(' ').map((word, i) => (
              <span key={i} className="showcase__title-word" style={{ '--w': i }}>
                <span>{word}</span>
              </span>
            ))}
          </h1>

          <div className="showcase__actions">
            <a
              href={contactsData.phone.href}
              className="showcase__btn showcase__btn--order"
              aria-label={`${orderLabel} ${contactsData.phone.label}`}
            >
              <span className="showcase__btn-label">{orderLabel}</span>
              <span className="showcase__btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
              </span>
            </a>
            <button type="button" className="showcase__btn showcase__btn--help" onClick={() => setIsModalOpen(true)}>
              <span className="showcase__btn-icon" aria-hidden="true">
                <IoMdHelpCircleOutline />
              </span>
              <span className="showcase__btn-label">{helpLabel}</span>
            </button>
          </div>
        </header>

        <div className="showcase__wrapper">
          <div className="showcase__media">
            <div
              ref={stageRef}
              className="showcase__stage"
              onPointerMove={handleStageMove}
              onPointerLeave={handleStageLeave}
            >
              {/* Printer's crop marks in the corners + CMYK registration strip */}
              <span className="showcase__crop showcase__crop--tl" aria-hidden="true" />
              <span className="showcase__crop showcase__crop--tr" aria-hidden="true" />
              <span className="showcase__crop showcase__crop--bl" aria-hidden="true" />
              <span className="showcase__crop showcase__crop--br" aria-hidden="true" />
              <span className="showcase__cmyk" aria-hidden="true">
                <i /><i /><i /><i />
              </span>

              {/* Each letter rotated to its own slot, so the lettering always closes into an even ring */}
              <svg className="showcase__badge" viewBox="0 0 120 120" aria-hidden="true">
                {BADGE_CHARS.map((char, i) => (
                  <text key={i} x="60" y="17" transform={`rotate(${(i * 360) / BADGE_CHARS.length} 60 60)`}>
                    {char}
                  </text>
                ))}
              </svg>

              {images[activeImage] && (
                <img key={activeImage} src={images[activeImage]} alt={title} className="showcase__image" />
              )}
            </div>

            {images.length > 1 && (
              <div className="showcase__thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`showcase__thumb${i === activeImage ? ' is-active' : ''}`}
                    onClick={() => setActiveImage(i)}
                    aria-label={`${title} ${i + 1}`}
                    aria-pressed={i === activeImage}
                  >
                    <img src={img} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="showcase__content">{children}</div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('callback.title')}
      >
        <CallbackForm onSuccess={handleFormSuccess} source={title} />
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

export default ProductShowcase;
