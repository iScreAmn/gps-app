import React, { useMemo, useState } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import {
  FaClock,
  FaEnvelope,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { useLanguage } from "../../hooks/useLanguage";
import contactsData from "../../data/contactsData";
import './ContactsPage.css';
import { Modal, CallbackForm } from "../../components/widgets/Modals";

const ContactsPage = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setIsSuccessModal(true);
    setTimeout(() => setIsSuccessModal(false), 3000);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({ lat: 41.724653, lng: 44.786316 }), []);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      gestureHandling: "none",
      zoomControl: false,
      scrollwheel: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      disableDoubleClickZoom: true,
      keyboardShortcuts: false,
    }),
    []
  );

  const markerIcon = useMemo(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google) return undefined;
    const iconUrl = `${import.meta.env.BASE_URL}location.png`;
    return {
      url: iconUrl,
      scaledSize: new window.google.maps.Size(48, 54),
      anchor: new window.google.maps.Point(24, 54),
    };
  }, [isLoaded]);

  const highlightItems = [
    {
      icon: <FaPhoneAlt />,
      title: contactsData.phone.label,
      subtitle: t('contacts.phone'),
      href: contactsData.phone.href,
    },
    {
      icon: <FaEnvelope />,
      title: contactsData.email.label,
      subtitle: t('contacts.email'),
      href: contactsData.email.href,
    },
    {
      icon: <FaClock />,
      title: t('contacts.working_hours'),
      subtitle: t('contacts.working_hours_short'),
    },
  ];

  const socials = [
    {
      icon: <FaWhatsapp />,
      href: contactsData.socials?.whatsapp,
      label: "WhatsApp",
    },
    {
      icon: <FaTelegramPlane />,
      href: contactsData.socials?.telegram,
      label: "Telegram",
    },
    {
      icon: <FaFacebookSquare />,
      href: contactsData.socials?.facebook,
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      href: contactsData.socials?.instagram,
      label: "Instagram",
    },
    {
      icon: <FaLinkedinIn />,
      href: contactsData.socials?.linkedin,
      label: "LinkedIn",
    },
    {
      icon: <AiFillTikTok />,
      href: contactsData.socials?.tiktok,
      label: "TikTok",
    },
    {
      icon: <FaYoutube />,
      href: contactsData.socials?.youtube,
      label: "YouTube",
    },
  ].filter((item) => Boolean(item.href));

  return (
    <section className="contacts-page">
      <div className="container">
        <div className="contacts-overview">
          <div className="contacts-highlights">
            {highlightItems.map((item) => {
              const Wrapper = item.href ? "a" : "div";
              const wrapperProps = item.href
                ? {
                    href: item.href,
                    target: item.href.startsWith('http') ? "_blank" : undefined,
                    rel: item.href.startsWith('http') ? "noreferrer" : undefined,
                  }
                : {};

              return (
                <Wrapper
                  key={`${item.subtitle}-${item.title}`}
                  className="contacts-highlight"
                  {...wrapperProps}
                >
                  <span className="contacts-highlight-icon">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <span>{item.subtitle}</span>
                  </div>
                </Wrapper>
              );
            })}
          </div>
          <button
            type="button"
            className="btn-primary contacts-call"
            onClick={handleOpenModal}
          >
            {t('contacts.contact_us')}
          </button>
        </div>
      </div>

      <div className="contacts-map-section">
        <div className="contacts-map-overlay">
          <span className="overlay-label">{t('contacts.address')}</span>
          <h3>{t('contacts.company_name')}</h3>

          <div className="overlay-details">
            <div className="overlay-detail">
              <FaMapMarkerAlt />
              <span>{t('contacts.tbilisi_georgia')}</span>
            </div>
            <a className="overlay-detail" href={contactsData.phone.href}>
              <FaPhoneAlt />
              <span>{contactsData.phone.label}</span>
            </a>
            <a className="overlay-detail" href={contactsData.email.href}>
              <FaEnvelope />
              <span>{contactsData.email.label}</span>
            </a>
          </div>

          {socials.length > 0 && (
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
          )}

          <a
            className="overlay-route"
            href="https://www.google.com/maps/dir/?api=1&destination=41.724653,44.786316"
            target="_blank"
            rel="noreferrer"
          >
            {t('contacts.plan_route')}
          </a>
        </div>
        <div className="contacts-map-canvas">
          {isLoaded ? (
            <GoogleMap
              zoom={19}
              center={center}
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              options={mapOptions}
            >
              <MarkerF
                position={center}
                icon={markerIcon ?? undefined}
                title="Georgian Polygraph Services"
              />
            </GoogleMap>
          ) : (
            <div className="map-loading">{t('common.loading')}</div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={t('callback.title') || 'Заказать обратный звонок для записи'}
      >
        <CallbackForm onSuccess={handleFormSuccess} />
      </Modal>

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
    </section>
  );
};

export default ContactsPage;
