import React from "react";
import Hero from "../../components/Hero/Hero";
import PartnersSection from "../../components/PartnersSection/PartnersSection";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import SpecialOffers from "../../components/SpecialOffers/SpecialOffers";
import TempContent from "../../components/TempContent/TempContent";
import OnlineOrder from "../../components/OnlineOrder/OnlineOrder";
import NewsletterCTA from "../../components/NewsletterCTA/NewsletterCTA";
import LedModules from "../../components/LedModules/LedModules";
import SpecialDiscounts from "../../components/SpecialDiscounts/SpecialDiscounts";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <PartnersSection />
      <OnlineOrder />
      <TempContent />
      <SpecialDiscounts />
      <LedModules />
      <ProductGallery />
      <NewsletterCTA />
    </div>
  );
};

export default HomePage;
