import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../hooks/useLanguage';
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import './Calculator.css';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Calculator = () => {
  const { t, language } = useLanguage();
  const totalSteps = 4; // 3 questions + 1 contact form

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    printerType: '',
    brand: '',
    jobType: ''
  });
  const [contactMethod, setContactMethod] = useState('whatsapp');
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const displayedProgressRef = useRef(0);

  // Фиксированные значения прогресса для каждого шага
  const progressSteps = [0, 35, 65, 100];
  const progressPercentage = progressSteps[currentStep - 1] || 0;

  // Плавная анимация прогресс-бара и текста
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 50);

    // Анимация счетчика процентов
    const startValue = displayedProgressRef.current;
    const endValue = progressPercentage;
    const duration = 400; // длительность анимации в мс
    const steps = 20;
    const stepDuration = duration / steps;
    const increment = (endValue - startValue) / steps;

    let currentValue = startValue;
    let stepCount = 0;

    const counterInterval = setInterval(() => {
      stepCount++;
      currentValue += increment;
      
      if (stepCount >= steps) {
        const finalValue = endValue;
        setDisplayedProgress(finalValue);
        displayedProgressRef.current = finalValue;
        clearInterval(counterInterval);
      } else {
        const roundedValue = Math.round(currentValue);
        setDisplayedProgress(roundedValue);
        displayedProgressRef.current = roundedValue;
      }
    }, stepDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(counterInterval);
    };
  }, [currentStep, progressPercentage]);

  // Reset errors when moving between steps
  useEffect(() => {
    setErrors({});
  }, [currentStep]);

  // Handle option selection for questions
  const handleOptionSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1 && !answers.printerType) {
      newErrors.printerType = t('calculator.validation.required');
    }
    if (currentStep === 2 && !answers.brand) {
      newErrors.brand = t('calculator.validation.required');
    }
    if (currentStep === 3 && !answers.jobType) {
      newErrors.jobType = t('calculator.validation.required');
    }
    if (currentStep === 4) {
      // Validate name
      if (!contactData.name.trim()) {
        newErrors.name = t('calculator.validation.required');
      }
      
      // Validate phone
      if (!contactData.phone.trim()) {
        newErrors.phone = t('calculator.validation.required');
      } else {
        const phoneRegex = /^\+995\s?\d{3}\s?\d{3}\s?\d{3}$/;
        const cleanPhone = contactData.phone.replace(/\s/g, '');
        if (!phoneRegex.test(cleanPhone) && !/^\+995\d{9}$/.test(cleanPhone)) {
          newErrors.phone = t('calculator.validation.invalidPhone');
        }
      }
      
      // Validate email
      if (!contactData.email.trim()) {
        newErrors.email = t('calculator.validation.required');
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactData.email)) {
          newErrors.email = t('calculator.validation.invalidEmail');
        }
      }
      
      if (!consent) {
        newErrors.consent = t('calculator.validation.required');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate to next step
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setSubmitStatus(null);
  };

  // Handle contact field changes
  const handleContactFieldChange = (field, value) => {
    // Auto-format phone number
    if (field === 'phone') {
      value = value.replace(/[^\d+]/g, '');
      if (!value.startsWith('+995')) {
        if (value.startsWith('995')) {
          value = '+' + value;
        } else if (value.startsWith('5')) {
          value = '+995' + value;
        } else if (value) {
          value = '+995' + value.replace(/^\+/, '');
        }
      }
      // Format: +995 XXX XXX XXX
      if (value.length > 4) {
        value = value.slice(0, 4) + ' ' + value.slice(4);
      }
      if (value.length > 8) {
        value = value.slice(0, 8) + ' ' + value.slice(8);
      }
      if (value.length > 12) {
        value = value.slice(0, 12) + ' ' + value.slice(12, 15);
      }
    }
    
    setContactData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Prepare data for API
    const formData = {
      printer_type: answers.printerType,
      brand: answers.brand,
      job_type: answers.jobType,
      contact_method: contactMethod,
      name: contactData.name,
      phone: contactData.phone,
      email: contactData.email,
      language: language // Send current language
    };

    try {
      // Send to backend API
      const response = await fetch(`${API_URL}/api/calculator/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error submitting form');
      }

      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setCurrentStep(1);
        setAnswers({ printerType: '', brand: '', jobType: '' });
        setContactMethod('whatsapp');
        setContactData({ name: '', phone: '', email: '' });
        setConsent(false);
        setSubmitStatus(null);
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="calculator__step calculator__step--active">
            <h3 className="calculator__question">{t('calculator.step1.question')}</h3>
            <div className="calculator__options">
              {['office', 'pro', 'wideFormats'].map(option => (
                <button
                  key={option}
                  type="button"
                  className={`calculator__option ${answers.printerType === option ? 'calculator__option--selected' : ''}`}
                  onClick={() => handleOptionSelect('printerType', option)}
                  aria-pressed={answers.printerType === option}
                >
                  {t(`calculator.step1.options.${option}`)}
                </button>
              ))}
            </div>
            {errors.printerType && (
              <span className="calculator__error">{errors.printerType}</span>
            )}
          </div>
        );

      case 2:
        return (
          <div className="calculator__step calculator__step--active">
            <h3 className="calculator__question">{t('calculator.step2.question')}</h3>
            <div className="calculator__options">
              {['konicaMinolta', 'develop', 'nokaiUltra'].map(option => (
                <button
                  key={option}
                  type="button"
                  className={`calculator__option ${answers.brand === option ? 'calculator__option--selected' : ''}`}
                  onClick={() => handleOptionSelect('brand', option)}
                  aria-pressed={answers.brand === option}
                >
                  {t(`calculator.step2.options.${option}`)}
                </button>
              ))}
            </div>
            {errors.brand && (
              <span className="calculator__error">{errors.brand}</span>
            )}
          </div>
        );

      case 3:
        return (
          <div className="calculator__step calculator__step--active">
            <h3 className="calculator__question">{t('calculator.step3.question')}</h3>
            <div className="calculator__options">
              {['printing', 'service'].map(option => (
                <button
                  key={option}
                  type="button"
                  className={`calculator__option ${answers.jobType === option ? 'calculator__option--selected' : ''}`}
                  onClick={() => handleOptionSelect('jobType', option)}
                  aria-pressed={answers.jobType === option}
                >
                  {t(`calculator.step3.options.${option}`)}
                </button>
              ))}
            </div>
            {errors.jobType && (
              <span className="calculator__error">{errors.jobType}</span>
            )}
          </div>
        );

      case 4:
        return (
          <div className="calculator__step calculator__step--active">
            <h3 className="calculator__question">{t('calculator.contact.title')}</h3>
            
            <div className="calculator__contact">
              {/* Contact method selection */}
              <div className="calculator__contact-methods">
                <button
                  type="button"
                  className={`calculator__contact-method ${contactMethod === 'whatsapp' ? 'calculator__contact-method--active' : ''}`}
                  onClick={() => {
                    setContactMethod('whatsapp');
                    setErrors({});
                  }}
                  aria-pressed={contactMethod === 'whatsapp'}
                >
                  <FaWhatsapp /> {t('calculator.contact.methods.whatsapp')}
                </button>
                <button
                  type="button"
                  className={`calculator__contact-method ${contactMethod === 'telegram' ? 'calculator__contact-method--active' : ''}`}
                  onClick={() => {
                    setContactMethod('phone');
                    setErrors({});
                  }}
                  aria-pressed={contactMethod === 'phone'}
                >
                  <FaPhone /> {t('calculator.contact.methods.phone')}
                </button>
                <button
                  type="button"
                  className={`calculator__contact-method ${contactMethod === 'email' ? 'calculator__contact-method--active' : ''}`}
                  onClick={() => {
                    setContactMethod('email');
                    setErrors({});
                  }}
                  aria-pressed={contactMethod === 'email'}
                >
                  <MdOutlineEmail /> {t('calculator.contact.methods.email')}
                </button>
              </div>

              {/* Name input field */}
              <div className="calculator__input-group">
                <input
                  id="name-input"
                  type="text"
                  className={`calculator__input ${errors.name ? 'calculator__input--error' : ''}`}
                  value={contactData.name}
                  onChange={(e) => handleContactFieldChange('name', e.target.value)}
                  placeholder={t('calculator.contact.namePlaceholder') || 'Введите ваше имя'}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="calculator__error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Phone input field */}
              <div className="calculator__input-group">
                <input
                  id="phone-input"
                  type="tel"
                  className={`calculator__input ${errors.phone ? 'calculator__input--error' : ''}`}
                  value={contactData.phone}
                  onChange={(e) => handleContactFieldChange('phone', e.target.value)}
                  placeholder={t('calculator.contact.phonePlaceholder')}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <span id="phone-error" className="calculator__error" role="alert">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Email input field */}
              <div className="calculator__input-group">
                <input
                  id="email-input"
                  type="email"
                  className={`calculator__input ${errors.email ? 'calculator__input--error' : ''}`}
                  value={contactData.email}
                  onChange={(e) => handleContactFieldChange('email', e.target.value)}
                  placeholder={t('calculator.contact.emailPlaceholder')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="calculator__error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              

              {/* Consent checkbox */}
              <div className="calculator__checkbox-group">
                <label className="calculator__checkbox">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent) {
                        setErrors(prev => ({ ...prev, consent: '' }));
                      }
                    }}
                    aria-invalid={!!errors.consent}
                  />
                  <span className="calculator__checkbox-label">
                    {t('calculator.consent')}
                  </span>
                </label>
                {errors.consent && (
                  <span className="calculator__error" role="alert">{errors.consent}</span>
                )}
              </div>

              {/* Submit status messages */}
              {submitStatus === 'success' && (
                <div className="calculator__success" role="status" aria-live="polite">
                  {t('calculator.success')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="calculator__error-message" role="alert" aria-live="assertive">
                  {t('calculator.error')}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="calculator" aria-labelledby="calculator-title">
        <div className="calculator__wrapper">
          <header className="calculator__header">
            <h2 id="calculator-title" className="calculator__title">
              {t('calculator.title')}
            </h2>
            <p className="calculator__subtitle">{t('calculator.subtitle')}</p>
          </header>

        {/* Progress bar - показывается только после первого шага */}
        {currentStep > 1 && (
          <div className="calculator__progress" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100">
            <div className="calculator__progress-bar" style={{ width: `${animatedProgress}%` }} />
            <span className="calculator__progress-text">
              {displayedProgress}%
            </span>
          </div>
        )}

          {/* Form */}
          <form className="calculator__form" onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation buttons */}
            <div className="calculator__navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="calculator__btn calculator__btn--back"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  aria-label={t('calculator.buttons.back')}
                >
                  ←
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  className="calculator__btn calculator__btn--next"
                  onClick={handleNext}
                >
                  {t('calculator.buttons.next')} →
                </button>
              ) : (
                <button
                  type="submit"
                  className={`calculator__submit ${(!consent || isSubmitting) ? 'calculator__submit--disabled' : ''}`}
                  disabled={!consent || isSubmitting}
                >
                  {isSubmitting ? t('calculator.submitting') : t('calculator.submit')}
                </button>
              )}
            </div>
          </form>
        </div>
    </section>
  );
};

export default Calculator;
