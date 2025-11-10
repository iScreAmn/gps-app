import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CallbackForm.css';
import { useLanguage } from '../../../../hooks/useLanguage';

const CallbackForm = ({ onSuccess }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('callback.errors.nameRequired') || 'Введите имя';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('callback.errors.phoneRequired') || 'Введите номер телефона';
    } else if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = t('callback.errors.phoneInvalid') || 'Некорректный номер';
    }
    
    if (!formData.agreed) {
      newErrors.agreed = t('callback.errors.agreementRequired') || 'Необходимо согласие';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Симуляция отправки (замените на реальный API запрос)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      
      console.log('Form submitted:', formData);
      
      // Очистка формы
      setFormData({ name: '', phone: '', agreed: false });
      
      // Вызов колбэка успеха
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: t('callback.errors.submitError') || 'Ошибка отправки' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="callback-form" onSubmit={handleSubmit}>
      <div className="callback-form__group">
        <input
          type="text"
          name="name"
          className={`callback-form__input ${errors.name ? 'callback-form__input--error' : ''}`}
          placeholder={t('callback.namePlaceholder') || 'Ваше имя'}
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.name && (
          <span className="callback-form__error">{errors.name}</span>
        )}
      </div>

      <div className="callback-form__group">
        <input
          type="tel"
          name="phone"
          className={`callback-form__input ${errors.phone ? 'callback-form__input--error' : ''}`}
          placeholder={t('callback.phonePlaceholder') || 'Ваш номер телефона *'}
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <span className="callback-form__error">{errors.phone}</span>
        )}
      </div>

      <div className="callback-form__checkbox-group">
        <label className="callback-form__checkbox-label">
          <input
            type="checkbox"
            name="agreed"
            className="callback-form__checkbox"
            checked={formData.agreed}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <span className="callback-form__checkbox-custom"></span>
          <span className="callback-form__checkbox-text">
            {t('callback.agreement') || 'Я согласен(-на), на обработку'}{' '}
            <Link
              to={`/${language}/privacy-policy`}
              className="callback-form__checkbox-link"
            >
              {t('footer.privacy_policy')}
            </Link>
          </span>
        </label>
        {errors.agreed && (
          <span className="callback-form__error">{errors.agreed}</span>
        )}
      </div>

      <button
        type="submit"
        className="callback-form__submit"
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? (t('callback.submitting') || 'Отправка...') 
          : (t('callback.submit') || 'Жду звонка')
        }
      </button>

      {errors.submit && (
        <div className="callback-form__error callback-form__error--submit">
          {errors.submit}
        </div>
      )}

      <p className="callback-form__note">
        {t('callback.note') || 'Заявки, поступившие после 22:00, будут обработаны на следующий день после 8:00'}
      </p>

      <div className="callback-form__divider">
        <span>{t('callback.or') || 'или'}</span>
      </div>

      <div className="callback-form__phone-section">
        <h3 className="callback-form__phone-title">
          {t('callback.callTitle') || 'Записаться по телефону'}
        </h3>
        <a 
          href="tel:+995322123456" 
          className="callback-form__phone-link"
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
          +995 (322) 12-34-56
        </a>
        
      </div>
    </form>
  );
};

export default CallbackForm;

