import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import { getRemainingTime } from '../../../../utils/countdown';
import './DiscountModal.css';

const CircularProgress = ({ progress, timer, content, color = '#FD743D' }) => {
  return (
    <div className="circular-progress-wrapper">
      <div
        className="circular-progress"
        style={{
          background: `conic-gradient(#D7D7D7 ${progress}%, ${color} 0)`,
        }}
      >
        <div className="circular-progress__inner">
          <div className="circular-progress__timer">{timer}</div>
        </div>
      </div>
      <div className="circular-progress__label">{content}</div>
    </div>
  );
};

const CountdownWithProgress = ({ targetDate }) => {
  // Инициализируем состояние сразу с правильными значениями
  const [remainingTime, setRemainingTime] = useState(() => 
    getRemainingTime(targetDate)
  );

  useEffect(() => {
    // Обновляем сразу при монтировании (на случай если прошла секунда)
    setRemainingTime(getRemainingTime(targetDate));
    
    const intervalID = setInterval(() => {
      const remaining = getRemainingTime(targetDate);
      setRemainingTime(remaining);
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [targetDate]);

  const { days, hours, minutes, seconds } = remainingTime;
  
  // Ограничиваем дни до максимум 30
  const displayDays = Math.min(Number(days), 30);
  const displayDaysStr = displayDays.toString().padStart(2, '0');

  return (
    <div className="countdown-container">
      <CircularProgress
        progress={100 - (displayDays / 30) * 100}
        timer={displayDaysStr}
        content="Days"
        color="#009BDE"
      />
      <CircularProgress
        progress={100 - (Number(hours) / 24) * 100}
        timer={hours}
        content="Hours"
        color="#FF6A4D"
      />
      <CircularProgress
        progress={100 - (Number(minutes) / 60) * 100}
        timer={minutes}
        content="Minutes"
        color="#7C5CAF"
      />
      <CircularProgress
        progress={100 - (Number(seconds) / 60) * 100}
        timer={seconds}
        content="Seconds"
        color="#009BDE"
      />
    </div>
  );
};

const DiscountModal = ({ isOpen, onClose, targetDate, description }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="discount-modal" title="Special Offer">
      <div className="discount-modal__content">
        {description && <p className="discount-modal__description">{description}</p>}
        
        <CountdownWithProgress targetDate={targetDate} />
        
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

