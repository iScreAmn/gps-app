import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdOutlineDone } from "react-icons/md";
import { useLanguage } from '../../hooks/useLanguage';
import './CompactCarousel.css';

const CompactCarousel = ({ 
  slides = [], 
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  pauseOnHover = true,
  enableKeyboard = true,
  enableTouch = true,
  lazyLoad = true,
  className = ''
}) => {
  const { language, t } = useLanguage();
  
  // Debug logging
  console.log('CompactCarousel slides:', slides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Preload images on component mount
  useEffect(() => {
    if (lazyLoad && slides.length > 0) {
      const initialImagesToLoad = new Set([0]);
      if (slides.length > 1) initialImagesToLoad.add(1);
      if (slides.length > 2) initialImagesToLoad.add(2);
      setLoadedImages(initialImagesToLoad);
    }
  }, [lazyLoad, slides.length]);

  // Auto play functionality
  const startAutoPlay = useCallback(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;
    
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, slides.length, isPaused]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    if (lazyLoad) {
      const imagesToLoad = new Set(loadedImages);
      imagesToLoad.add(index);
      if (index > 0) imagesToLoad.add(index - 1);
      if (index < slides.length - 1) imagesToLoad.add(index + 1);
      if (index < slides.length - 2) imagesToLoad.add(index + 2);
      setLoadedImages(imagesToLoad);
    }
  }, [slides.length, lazyLoad, loadedImages]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  }, [currentSlide, slides.length, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard, nextSlide, prevSlide]);

  // Auto play control
  useEffect(() => {
    if (autoPlay && !isPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [autoPlay, isPaused, startAutoPlay, stopAutoPlay]);

  // Touch/Drag functionality
  const handleTouchStart = (e) => {
    if (!enableTouch) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setStartX(clientX);
    stopAutoPlay();
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !enableTouch) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || !enableTouch) return;
    
    const threshold = 50;
    const diff = translateX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setIsDragging(false);
    setTranslateX(0);
    
    if (autoPlay && !isPaused) {
      startAutoPlay();
    }
  };

  // Mouse events for desktop drag
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleTouchStart(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    handleTouchMove(e);
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleTouchEnd();
    }
    if (pauseOnHover && autoPlay) {
      setIsPaused(false);
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover && autoPlay) {
      setIsPaused(true);
    }
  };

  // Lazy loading check
  const shouldLoadImage = (index) => {
    if (autoPlay) return true;
    return !lazyLoad || loadedImages.has(index);
  };

  // Render slide content based on type
  const renderSlideContent = (slide, index) => {
    const isActive = index === currentSlide;
    
    switch (slide.type) {
      case 'content':
        return (
          <div className="compact-slide-hero">
            <div className="hero-overlay">
              <div className="compact-hero-content">
                <div className="slide-image-container">
                  {shouldLoadImage(index) && slide.backgroundImage && (
                    <img 
                      src={slide.backgroundImage.src}
                      alt={slide.backgroundImage.alt}
                      className="slide-main-image"
                    />
                  )}
                </div>
                <div className={`hero-content ${isActive ? 'animate' : ''}`}>
                  <h1 className="hero-title">{t(slide.content.title)}</h1>
                  <div className="hero-subtitle-box">
                    <p className="hero-subtitle">{t(slide.content.subtitle)}</p>
                  </div>
                  {slide.content.ctaLink && (
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
        );

      case 'image':
        return (
          <div className="compact-slide-hero">
            <div className="hero-overlay">
              <div className="compact-hero-content">
                <div className="slide-image-container">
                  {shouldLoadImage(index) && (
                    <img 
                      src={slide.image.src}
                      alt={slide.image.alt}
                      className="slide-main-image"
                    />
                  )}
                </div>
                <div className={`hero-content ${isActive ? 'animate' : ''}`}>
                  <h1 className="hero-title">{t(slide.content.title)}</h1>
                  <div className="hero-subtitle-box">
                    <p className="hero-subtitle">{t(slide.content.subtitle)}</p>
                  </div>
                  {slide.content.ctaLink && (
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
        );

      default:
        return (
          <div className="compact-slide-default">
            <div className="default-content">
              {slide.content || 'Default slide content'}
            </div>
          </div>
        );
    }
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="carousel-empty">
        <p>No slides available</p>
      </div>
    );
  }

  return (
    <div 
      className={`compact-carousel ${className}`}
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      role="region"
      aria-label="Image carousel"
      tabIndex="0"
    >
      <div className="carousel-container">
        <div 
          className="carousel-track"
          style={{ 
            transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id || index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              role="tabpanel"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              aria-hidden={index !== currentSlide}
            >
              {renderSlideContent(slide, index)}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && slides.length > 1 && (
          <>
            <button 
              className="carousel-arrow carousel-arrow-prev"
              onClick={prevSlide}
              aria-label="Previous slide"
              type="button"
            >
              <FaChevronLeft />
            </button>
            <button 
              className="carousel-arrow carousel-arrow-next"
              onClick={nextSlide}
              aria-label="Next slide"
              type="button"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Navigation Dots */}
      {showDots && slides.length > 1 && (
        <div className="carousel-dots" role="tablist">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              role="tab"
              aria-selected={index === currentSlide}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompactCarousel;
