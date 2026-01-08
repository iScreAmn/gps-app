import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!targetDate) {
      console.warn('CountdownTimer: targetDate prop is required');
      return;
    }

    // Generate unique localStorage key based on targetDate
    const storageKey = `countdown_expired_${btoa(targetDate).slice(0, 20)}`;
    
    // Check if campaign already expired in localStorage
    const wasExpired = localStorage.getItem(storageKey);
    
    if (wasExpired === 'true') {
      setIsCompleted(true);
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    // Parse target time
    const targetTime = new Date(targetDate).getTime();
    
    // Check if target date is invalid
    if (isNaN(targetTime)) {
      console.error('CountdownTimer: Invalid targetDate format');
      return;
    }

    // Check if date already passed
    const now = new Date().getTime();
    if (targetTime <= now) {
      setIsCompleted(true);
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      localStorage.setItem(storageKey, 'true');
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setIsCompleted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Save to localStorage that campaign is expired (permanently)
        localStorage.setItem(storageKey, 'true');
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [targetDate]);

  // Calculate progress percentage for each circle
  const getProgress = (current, max) => {
    return (current / max) * 100;
  };

  const renderCircle = (value, max, label) => {
    const progress = getProgress(value, max);
    const radius = 90; // radius for 200px circle
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="countdown__item">
        <div className="countdown__circle">
          <svg className="countdown__circle-svg" width="200" height="200" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              className="countdown__circle-track"
              cx="100"
              cy="100"
              r={radius}
              strokeWidth="10"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              className="countdown__circle-progress"
              cx="100"
              cy="100"
              r={radius}
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="countdown__value">{value}</div>
        </div>
        <div className="countdown__label">{label}</div>
      </div>
    );
  };

  if (isCompleted) {
    return (
      <div className="countdown countdown--completed">
        <div className="countdown__expired">
          <div className="countdown__expired-text">{t('countdown.expired')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown">
      <div className="countdown__list">
        {renderCircle(timeLeft.days, 365, t('countdown.days'))}
        {renderCircle(timeLeft.hours, 24, t('countdown.hours'))}
        {renderCircle(timeLeft.minutes, 60, t('countdown.minutes'))}
        {renderCircle(timeLeft.seconds, 60, t('countdown.seconds'))}
      </div>
    </div>
  );
};

export default CountdownTimer;

