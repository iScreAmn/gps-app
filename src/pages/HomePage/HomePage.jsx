import React from "react";
import Hero from "../../components/Hero/Hero";
import PartnersSection from "../../components/PartnersSection/PartnersSection";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import SpecialOffers from "../../components/SpecialOffers/SpecialOffers";
import TempContent from "../../components/TempContent/TempContent";
import PlotterCuttingSection from "../../components/PlotterCuttingSection/PlotterCuttingSection";
import OnlineOrder from "../../components/OnlineOrder/OnlineOrder";
import ClickService from "../../components/ClickService/ClickService";
import HomeCta from "../../components/HomeCta/HomeCta";
import LedModules from "../../components/LedModules/LedModules";
import SpecialDiscounts from "../../components/SpecialDiscounts/SpecialDiscounts";
import PageAmbientBackground from "../../components/PageAmbientBackground/PageAmbientBackground";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page page-ambient-shell">
      <PageAmbientBackground />
      <Hero />
      <PartnersSection />
      <ClickService />
      <LedModules />
      <SpecialDiscounts />
      <OnlineOrder />
      <PlotterCuttingSection />
      <TempContent />
      <ProductGallery />
      <HomeCta />
    </div>
  );
};

export default HomePage;
