import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaWhatsapp,
  FaTelegramPlane,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { AiFillTikTok } from 'react-icons/ai';
import { useLanguage } from '../../hooks/useLanguage';
import contactsData from '../../data/contactsData';
import '../InfoPage/InfoPage.css';
import './ContactsPage.css';

const ContactsPage = () => {
  const { t, language } = useLanguage();
  const pageLang = language === 'en' ? 'en' : 'ka';

  const phoneHref = contactsData.phone.href;
  const phoneLabel = contactsData.phone.label;
  const emailHref = contactsData.email.href;
  const emailLabel = contactsData.email.label;

  const socials = [
    { icon: <FaFacebookSquare />, href: contactsData.socials?.facebook, label: 'Facebook' },
    { icon: <FaInstagram />, href: contactsData.socials?.instagram, label: 'Instagram' },
    { icon: <FaLinkedinIn />, href: contactsData.socials?.linkedin, label: 'LinkedIn' },
    { icon: <AiFillTikTok />, href: contactsData.socials?.tiktok, label: 'TikTok' },
    { icon: <FaYoutube />, href: contactsData.socials?.youtube, label: 'YouTube' },
    { icon: <FaWhatsapp />, href: contactsData.socials?.whatsapp, label: 'WhatsApp' },
    { icon: <FaTelegramPlane />, href: contactsData.socials?.telegram, label: 'Telegram' },
  ].filter((item) => Boolean(item.href));

  return (
    <div className="contacts-page">
      <div className="info-page" data-page-lang={pageLang}>
        <section className="info-section info-contact">
          <div className="info-container">
            <div className="info-contact-grid">
              <div className="info-contact-card-wrap">
                <div className="info-contact-card">
                  <a href={phoneHref} className="info-contact-row">
                    <span className="info-contact-row-icon"><FaPhoneAlt /></span>
                    <span className="info-contact-row-text">
                      <small>{t('infoPage.contact.phoneLabel')}</small>
                      <strong>{phoneLabel}</strong>
                    </span>
                    <FaArrowRight className="info-contact-row-arrow" />
                  </a>

                  <a href={emailHref} className="info-contact-row">
                    <span className="info-contact-row-icon"><FaEnvelope /></span>
                    <span className="info-contact-row-text">
                      <small>{t('infoPage.contact.emailLabel')}</small>
                      <strong>{emailLabel}</strong>
                    </span>
                    <FaArrowRight className="info-contact-row-arrow" />
                  </a>

                  <div className="info-contact-row info-contact-row-static">
                    <span className="info-contact-row-icon"><FaMapMarkerAlt /></span>
                    <span className="info-contact-row-text">
                      <small>{t('infoPage.contact.addressLabel')}</small>
                      <strong>{t('infoPage.contact.addressValue')}</strong>
                    </span>
                  </div>

                  <div className="info-contact-row info-contact-row-static">
                    <span className="info-contact-row-icon"><FaClock /></span>
                    <span className="info-contact-row-text">
                      <small>{t('infoPage.contact.hoursLabel')}</small>
                      <strong>{t('infoPage.contact.hoursValue')}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="info-map-wrap">
                <div className="info-map">
                  <iframe
                    title={t('infoPage.mapIframeTitle')}
                    src="https://www.google.com/maps?q=41.724653,44.786316&z=15&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen=""
                  />
                  <div className="info-map-overlay" />
                </div>
              </div>
            </div>

            {socials.length > 0 && (
              <div className="contacts-socials-wrap">
                <div className="overlay-socials">
                  {socials.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactsPage;
