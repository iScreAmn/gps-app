import React from 'react';
import Modal from '../Modal';
import CountdownTimer from '../../CountdownTimer/CountdownTimer';
import './DiscountModal.css';

const DiscountModal = ({ isOpen, onClose, description, countdown }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="discount-modal" title="Special Offer">
      <div className="discount-modal__content">
        {description && <p className="discount-modal__description">{description}</p>}
        
        {countdown && (
          <div className="discount-modal__countdown">
            <CountdownTimer {...countdown} />
          </div>
        )}
        
        <div className="discount-modal__phone-section">
          <h3 className="discount-modal__phone-title">
            დაგვიკავშირდით
          </h3>
          <a 
            href="tel:+995322308177" 
            className="discount-modal__phone-link"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            +995 (322) 308 177
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default DiscountModal;

