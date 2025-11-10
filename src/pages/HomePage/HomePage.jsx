import React, { useState, useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import PartnersSection from "../../components/PartnersSection/PartnersSection";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import SpecialOffers from "../../components/SpecialOffers/SpecialOffers";
import OnlineOrder from "../../components/OnlineOrder/OnlineOrder";
import NewsletterCTA from "../../components/NewsletterCTA/NewsletterCTA";
import { Modal } from "../../components/widgets/Modals";
import Construction from "../../components/widgets/Modals/Popup/Construction/Construction";
import { useLanguage } from "../../hooks/useLanguage";
import "./HomePage.css";

const HomePage = () => {
  const [isConstructionModalOpen, setIsConstructionModalOpen] = useState(false);
  const { t } = useLanguage();

  // Auto-open construction modal after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConstructionModalOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseConstructionModal = () => {
    setIsConstructionModalOpen(false);
  };

  return (
    <div className="home-page">
      <Hero />
      <PartnersSection />
      <OnlineOrder />
      <ProductGallery />
      <SpecialOffers />
      <NewsletterCTA />

      {/* Construction Modal */}
      <Modal
        isOpen={isConstructionModalOpen}
        onClose={handleCloseConstructionModal}
        className="construction-modal"
        title={t("construction.title")}
      >
        <Construction />
      </Modal>
    </div>
  );
};

export default HomePage;
