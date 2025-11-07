import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  className = '' 
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Save current focused element
      previousFocusRef.current = document.activeElement;
      
      // Focus modal content
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      
      // Restore focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Handle focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modalRef.current.addEventListener('keydown', handleTab);

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener('keydown', handleTab);
      }
    };
  }, [isOpen]);

  // Don't render if not open
  if (!isOpen) return null;

  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`modal modal--open ${className}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__overlay" />
      <div 
        className="modal__content"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
      >
        {(title || onClose) && (
          <div className="modal__header">
            {title && (
              <h2 className="modal__title" id="modal-title">
                {title}
              </h2>
            )}
            <button
              className="modal__close"
              onClick={onClose}
              aria-label="Закрыть модальное окно"
              type="button"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

