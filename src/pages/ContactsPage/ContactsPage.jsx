import React from 'react';
import { useLanguage } from "../../hooks/useLanguage";
import './ContactsPage.css';

const ContactsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="contacts-page">
      <div className="container">
        <div className="contacts-header">
          <h1>{t('contacts.title')}</h1>
          <p>{t('contacts.subtitle')}</p>
        </div>

        <div className="contacts-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>📞 {t('contacts.phone')}</h3>
              <p>+995 32 230 81 77</p>
            </div>
            <div className="contact-item">
              <h3>✉️ {t('contacts.email')}</h3>
              <p>info@geopolser.ge</p>
            </div>
            <div className="contact-item">
              <h3>📍 {t('contacts.address')}</h3>
              <p>{t('contacts.tbilisi_georgia')}</p>
            </div>
          </div>

          <div className="contact-form">
            <h3>{t('contacts.contact_us')}</h3>
            <form>
              <input type="text" placeholder={t('contacts.name')} />
              <input type="email" placeholder={t('contacts.email')} />
              <textarea placeholder={t('contacts.message')}></textarea>
              <button type="submit" className="btn-primary">
                {t('contacts.send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
