import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../../hooks/useLanguage';
import './CompactCarousel.css';

const SimpleCompactCarousel = ({ slides = [] }) => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="compact-carousel">
        <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
          No slides available
        </div>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];

  return (
    <div className="compact-carousel">
      <div className="carousel-container">
        <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={slide.id || index} className="carousel-slide">
              <div className="compact-slide-hero">
                <div className="hero-overlay">
                  <div className="compact-hero-content">
                    <div className="slide-image-container">
                      {slide.backgroundImage && (
                        <img 
                          src={slide.backgroundImage.src}
                          alt={slide.backgroundImage.alt}
                          className="slide-main-image"
                        />
                      )}
                      {slide.image && (
                        <img 
                          src={slide.image.src}
                          alt={slide.image.alt}
                          className="slide-main-image"
                        />
                      )}
                    </div>
                    <div className="hero-content animate">
                      <h1 className="hero-title">
                        {slide.content?.title ? t(slide.content.title) : slide.title}
                      </h1>
                      <div className="hero-subtitle-box">
                        <p className="hero-subtitle">
                          {slide.content?.subtitle ? t(slide.content.subtitle) : slide.subtitle}
                        </p>
                      </div>
                      {slide.content?.ctaLink && (
                        <Link 
                          to={`/${language}${slide.content.ctaLink}`} 
                          className="btn-primary hero-cta"
                        >
                          {t(slide.content.cta)}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <button 
              className="carousel-arrow carousel-arrow-prev"
              onClick={prevSlide}
              type="button"
            >
              <FaChevronLeft />
            </button>
            <button 
              className="carousel-arrow carousel-arrow-next"
              onClick={nextSlide}
              type="button"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleCompactCarousel;
