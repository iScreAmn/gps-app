import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../../hooks/useLanguage";
import './Hero.css';

const Hero = () => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      category: 'office',
      title: t('hero.office.title'),
      subtitle: t('hero.office.subtitle'),
      image: '/api/placeholder/1200/600',
      link: `/${language}/catalog/office`
    },
    {
      id: 2,
      category: 'professional',
      title: t('hero.professional.title'),
      subtitle: t('hero.professional.subtitle'),
      image: '/api/placeholder/1200/600',
      link: `/${language}/catalog/professional`
    },
    {
      id: 3,
      category: 'industrial',
      title: t('hero.industrial.title'),
      subtitle: t('hero.industrial.subtitle'),
      image: '/api/placeholder/1200/600',
      link: `/${language}/catalog/industrial`
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay">
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <Link to={slide.link} className="btn-primary hero-cta">
                    {t('hero.cta')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="hero-controls">
        <button className="hero-nav prev" onClick={prevSlide} aria-label="Previous slide">
          ‹
        </button>
        <button className="hero-nav next" onClick={nextSlide} aria-label="Next slide">
          ›
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
