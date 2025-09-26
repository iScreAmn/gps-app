import React from "react";
import Hero from "../../components/Hero/Hero";
import CategoryCards from "../../components/CategoryCards/CategoryCards";
import ProductGallery from "../../components/ProductGallery/ProductGallery";
import OnlineOrder from "../OnlineOrder/OnlineOrder";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <CategoryCards />
      <ProductGallery />
      <OnlineOrder />
    </div>
  );
};

export default HomePage;
