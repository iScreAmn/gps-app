import React from 'react';
import Carousel from '../Carousel/Carousel';
import { getCarouselSlides } from '../../data/contentData';
import './Hero.css';

const Hero = () => {
  const carouselSlides = getCarouselSlides();

  return (
    <section className="hero">
      <Carousel 
        slides={carouselSlides}
        autoPlay={true}
        autoPlayInterval={5000}
        showDots={true}
        showArrows={true}
        className="hero-carousel"
      />
    </section>
  );
};

export default Hero;
