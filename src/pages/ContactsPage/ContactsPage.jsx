import React, { useMemo } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { useLanguage } from "../../hooks/useLanguage";
import contactsData from "../../data/contactsData";
import './ContactsPage.css';

const ContactsPage = () => {
  const { t } = useLanguage();
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
      caption: t('contacts.phone'),
      href: contactsData.phone.href,
    },
    {
      icon: <FaEnvelope />,
      title: contactsData.email.label,
      caption: t('contacts.email'),
      href: contactsData.email.href,
    },
    {
      icon: <FaClock />,
      title: "Mon–Fri 10:00 – 19:00",
      caption: t('contacts.subtitle'),
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
                  key={`${item.caption}-${item.title}`}
                  className="contacts-highlight"
                  {...wrapperProps}
                >
                  <span className="contacts-highlight-icon">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <span>{item.caption}</span>
                  </div>
                </Wrapper>
              );
            })}
          </div>
          <a href={contactsData.phone.href} className="btn-primary contacts-call">
            {t('contacts.contact_us')}
          </a>
        </div>
      </div>

      <div className="contacts-map-section">
        <div className="contacts-map-overlay">
          <span className="overlay-label">{t('contacts.address')}</span>
          <h3>Georgian Polygraph Services</h3>

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
            <div className="overlay-detail">
              <FaClock />
              <span>Mon–Fri 10:00 – 19:00</span>
            </div>
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
            Plan route
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
    </section>
  );
};

export default ContactsPage;
