import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../contexts/ThemeContext";
import { mainLogo, mainLogoWhite } from "../../assets/images";
import contactsData from "../../data/contactsData";
import { FaPhoneAlt, FaFacebookSquare, FaInstagram, FaLinkedinIn, FaYoutube, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail, MdLocationPin } from "react-icons/md";
import { AiFillTikTok } from "react-icons/ai";
import "./Footer.css";

const Footer = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  // Determine logo based on theme
  const currentLogo = theme === "dark" ? mainLogoWhite : mainLogo;

  return (
    <footer className="footer">
      <div className="container-mini">
        <div className="footer-content">
          <div className="footer-section">
            <Link to={`/${language}`} className="logo-footer">
              <img
                src={currentLogo}
                alt="Georgian GPS Logo"
                className="footer-logo-image"
              />
            </Link>
            <p className="footer-description">{t("footer.description")}</p>
          </div>

          <div className="footer-section">
            <h4>{t("footer.contact")}</h4>
            <a
              href={contactsData.phone.href}
              className="footer-contact-item footer-contact-link"
            >
              <FaPhoneAlt />
              <span>{contactsData.phone.label}</span>
            </a>
            <a
              href={contactsData.email.href}
              className="footer-contact-item footer-contact-link"
            >
              <MdOutlineMail />
              <span>{contactsData.email.label}</span>
            </a>
            <div className="footer-contact-item">
              <MdLocationPin />
              <span>{t("contacts.tbilisi_georgia")}</span>
            </div>

            {/* Mobile-only socials under contacts */}
            <div className="footer-socials footer-socials--mobile">
              <a href={contactsData.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaWhatsapp />
              </a>
              <a href={contactsData.socials.telegram} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaTelegram />
              </a>
              <a href="https://facebook.com/GeorgianPolygraphServices" target="_blank" className="footer-social-link">
                <FaFacebookSquare />
              </a>
              <a href="https://instagram.com/geopolygraph" target="_blank" className="footer-social-link">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/georgian-polygraph-services" target="_blank" className="footer-social-link">
                <FaLinkedinIn />
              </a>
              <a href="https://tiktok.com/@georgian.polygrap" target="_blank" className="footer-social-link">
                <AiFillTikTok />
              </a>
              <a href="https://www.youtube.com/@geopolser" target="_blank" className="footer-social-link">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright-info">
            <p>
              &copy; {currentYear} Georgian Polygraph Services.{" "}
              {t("footer.all_rights")}.
            </p>
            <Link
              to={`/${language}/privacy-policy`}
              className="footer-bottom-link"
            >
              {t("footer.privacy_policy")}
            </Link>
          </div>
          <div className="copyright-socials">
            <a href={contactsData.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="copyright-social-link">
              <FaWhatsapp />
            </a>
            <a href={contactsData.socials.telegram} target="_blank" rel="noopener noreferrer" className="copyright-social-link">
              <FaTelegram />
            </a>
            <a href="https://facebook.com/GeorgianPolygraphServices" target="_blank" className="copyright-social-link">
              <FaFacebookSquare />
            </a>
            <a href="https://instagram.com/geopolygraph" target="_blank" className="copyright-social-link">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/georgian-polygraph-services" target="_blank" className="copyright-social-link">
              <FaLinkedinIn />
            </a>
            <a href="https://tiktok.com/@georgian.polygrap" target="_blank" className="copyright-social-link">
              <AiFillTikTok />
            </a>
            <a href="https://www.youtube.com/@geopolser" target="_blank" className="copyright-social-link">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
