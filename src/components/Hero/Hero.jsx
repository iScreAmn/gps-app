import React from 'react';
import Carousel from '../Carousel/Carousel';
import SidebarCategory from '../SidebarCategory/SidebarCategory';
import BestDeals from '../BestDeals/BestDeals';
import ServiceSupport from '../ServiceSupport/ServiceSupport';
import { getCarouselSlides } from '../../data/contentData';
import './Hero.css';

const Hero = () => {
  const carouselSlides = getCarouselSlides();

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-layout">
          {/* Left Sidebar - Category List */}
          <div className="hero-sidebar hero-sidebar-left">
            <SidebarCategory />
          </div>
          
          {/* Center - Original Carousel */}
          <div className="hero-main">
            <Carousel 
              slides={carouselSlides}
              autoPlay={true}
              autoPlayInterval={5000}
              showDots={true}
              showArrows={true}
              className="hero-carousel"
            />
          </div>
          
          {/* Right Sidebar - Best Deals & Service Support */}
          <div className="hero-sidebar hero-sidebar-right">
            <div className="hero-sidebar-sections">
              <BestDeals />
              <ServiceSupport />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
