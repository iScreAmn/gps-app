import React from "react";
import Hero from "../../components/Hero/Hero";
import CategoryCards from "../../components/CategoryCards/CategoryCards";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import SpecialOffers from "../../components/SpecialOffers/SpecialOffers";
import OnlineOrder from "../OnlineOrder/OnlineOrder";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <CategoryCards />
      <ProductGallery />
      <SpecialOffers />
      <OnlineOrder />
    </div>
  );
};

export default HomePage;
