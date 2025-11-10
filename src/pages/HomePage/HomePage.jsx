import React from "react";
import Hero from "../../components/Hero/Hero";
import PartnersSection from "../../components/PartnersSection/PartnersSection";
import CategoryCards from "../../components/CategoryCards/CategoryCards";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import SpecialOffers from "../../components/SpecialOffers/SpecialOffers";
import OnlineOrder from "../../components/OnlineOrder/OnlineOrder";
import NewsletterCTA from "../../components/NewsletterCTA/NewsletterCTA";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <PartnersSection />
      <OnlineOrder />
      <ProductGallery />
      <SpecialOffers />
      <NewsletterCTA />
    </div>
  );
};

export default HomePage;
