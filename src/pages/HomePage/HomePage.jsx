import React from 'react';
import Hero from '../../components/Hero/Hero';
import CategoryCards from '../../components/CategoryCards/CategoryCards';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <CategoryCards />
    </div>
  );
};

export default HomePage;
