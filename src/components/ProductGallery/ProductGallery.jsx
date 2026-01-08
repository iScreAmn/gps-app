import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import { getProductItems, getProductsByCategory } from '../../data/contentData';
import { useLanguage } from '../../hooks/useLanguage';
import './ProductGallery.css';
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { productGarmin, aboutOrder } from '../../assets/images';

const ProductGallery = () => {
  const { t } = useLanguage();
  const productItems = getProductItems();

  // State for image gallery - must be at top level
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  // State for thumbnails slider
  const [thumbnailsStartIndex, setThumbnailsStartIndex] = useState(0);
  const [isThumbnailsDragging, setIsThumbnailsDragging] = useState(false);
  const [thumbnailsDragStart, setThumbnailsDragStart] = useState(0);
  const [thumbnailsDragOffset, setThumbnailsDragOffset] = useState(0);
  
  // State for category filtering
  const [activeCategory, setActiveCategory] = useState('new');
  const imageRef = useRef(null);
  const zoomRef = useRef(null);
  const thumbnailsRef = useRef(null);

  // Category definitions
  const categories = [
    { id: 'new', key: 'products.categories.new' },
    { id: 'bestselling', key: 'products.categories.bestselling' }
  ];

  // Filter products based on active category
  const getFilteredProducts = useCallback(() => {
    return getProductsByCategory(activeCategory);
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    setCurrentProductIndex(0); // Reset to first product
    setActiveImageIndex(0); // Reset to first image
    setIsZooming(false); // Disable zoom
    setThumbnailsStartIndex(0); // Reset thumbnails slider
  }, []);

  const filteredProducts = getFilteredProducts();

  // Check if device is mobile
  const isMobile = useCallback(() => {
    return window.innerWidth <= 767;
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = useCallback((index) => {
    if (index === activeImageIndex) return;
    
    setIsChangingImage(true);
    setIsZooming(false);
    
    // Small delay for smooth transition
    setTimeout(() => {
      setActiveImageIndex(index);
      setIsChangingImage(false);
    }, 150);
  }, [activeImageIndex]);


  // Handle product navigation
  const handleNextProduct = useCallback(() => {
    if (currentProductIndex < filteredProducts.length - 1) {
      setCurrentProductIndex(prev => prev + 1);
      setActiveImageIndex(0); // Reset to first image
      setIsZooming(false);
      setThumbnailsStartIndex(0); // Reset thumbnails slider
    }
  }, [currentProductIndex, filteredProducts.length]);

  const handlePrevProduct = useCallback(() => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(prev => prev - 1);
      setActiveImageIndex(0); // Reset to first image
      setIsZooming(false);
      setThumbnailsStartIndex(0); // Reset thumbnails slider
    }
  }, [currentProductIndex]);

  // Handle mouse enter on main image
  const handleMouseEnter = useCallback(() => {
    if (!isMobile()) {
      setIsZooming(true);
    }
  }, [isMobile]);

  // Handle mouse leave from main image
  const handleMouseLeave = useCallback(() => {
    setIsZooming(false);
  }, []);

  // Handle mouse move on main image
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current || !isZooming || isMobile()) return;

    // Get the image container rect for positioning
    const containerRect = imageRef.current.parentElement.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    
    // Get the actual image dimensions within the container
    const imageRect = imageRef.current.getBoundingClientRect();
    const imageX = e.clientX - imageRect.left;
    const imageY = e.clientY - imageRect.top;
    
    // Ensure coordinates are within image bounds
    const boundedX = Math.max(0, Math.min(imageX, imageRect.width));
    const boundedY = Math.max(0, Math.min(imageY, imageRect.height));
    
    // Calculate percentage position for zoom (0-100%)
    const xPercent = (boundedX / imageRect.width) * 100;
    const yPercent = (boundedY / imageRect.height) * 100;
    
    // For zoom overlay, we need to show a 2x zoomed portion of the image
    // The zoom overlay is 400x400px, so we need to show a 200x200px area from the original image
    // Position the background so the area under cursor appears in the center of the zoom overlay
    // Since we're using transform, we need to offset by half the zoom area to center it
    setZoomPosition({
      x: -xPercent + 25, // Offset by 25% to center the 50% zoom area
      y: -yPercent + 25
    });

    // Update mouse position for zoom indicator (relative to image container)
    setMousePosition({ 
      x: x, 
      y: y 
    });
  }, [isZooming, isMobile]);

  // Handle window resize to disable zoom on mobile
  useEffect(() => {
    const handleResize = () => {
      if (isMobile() && isZooming) {
        setIsZooming(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isZooming]);

  // Get the current featured product for detailed view
  const featuredProduct = filteredProducts[currentProductIndex];
  const productData = featuredProduct?.product;
  const images = featuredProduct?.images || [];
  const { language } = useLanguage();
  
  
  // Fallback images if no images are provided
  const fallbackImages = [
    { src: aboutOrder?.src || aboutOrder, alt: aboutOrder?.alt || 'Product image' },
    { src: productGarmin, alt: 'Product image 2' },
    { src: productGarmin, alt: 'Product image 3' },
    { src: productGarmin, alt: 'Product image 4' },
    { src: productGarmin, alt: 'Product image 5' },
    { src: productGarmin, alt: 'Product image 6' }
  ];
  
  const displayImages = images.length > 0 ? images : fallbackImages;
  
  // Thumbnails slider functions
  const maxVisibleThumbnails = 5;
  const showThumbnailsSlider = displayImages.length > maxVisibleThumbnails;
  const maxThumbnailsStartIndex = Math.max(0, displayImages.length - maxVisibleThumbnails);

  const handleThumbnailsPrev = useCallback(() => {
    setThumbnailsStartIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleThumbnailsNext = useCallback(() => {
    setThumbnailsStartIndex(prev => Math.min(maxThumbnailsStartIndex, prev + 1));
  }, [maxThumbnailsStartIndex]);

  // Touch/swipe handlers for mobile
  const handleThumbnailsTouchStart = useCallback((e) => {
    if (!isMobile()) return;
    setIsThumbnailsDragging(true);
    setThumbnailsDragStart(e.touches[0].clientX);
    setThumbnailsDragOffset(0);
  }, [isMobile]);

  const handleThumbnailsTouchMove = useCallback((e) => {
    if (!isThumbnailsDragging || !isMobile()) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const diff = thumbnailsDragStart - currentX;
    setThumbnailsDragOffset(diff);
  }, [isThumbnailsDragging, isMobile, thumbnailsDragStart]);

  const handleThumbnailsTouchEnd = useCallback(() => {
    if (!isThumbnailsDragging || !isMobile()) return;
    
    const threshold = 50; // Minimum swipe distance
    if (Math.abs(thumbnailsDragOffset) > threshold) {
      if (thumbnailsDragOffset > 0) {
        // Swipe left - show next thumbnails
        handleThumbnailsNext();
      } else {
        // Swipe right - show previous thumbnails
        handleThumbnailsPrev();
      }
    }
    
    setIsThumbnailsDragging(false);
    setThumbnailsDragOffset(0);
  }, [isThumbnailsDragging, isMobile, thumbnailsDragOffset, handleThumbnailsNext, handleThumbnailsPrev]);
  
  // Reset active image index if it's out of bounds
  useEffect(() => {
    if (activeImageIndex >= displayImages.length) {
      setActiveImageIndex(0);
    }
  }, [displayImages.length, activeImageIndex]);

  if (!productItems.length) {
    return (
      <section className="product-gallery">
        <div className="container">
          <div className="product-gallery-empty">
            <p>No products available</p>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no products in selected category
  if (!filteredProducts.length) {
    return (
      <section className="product-gallery">
        <div className="container">
          <h2 className='section-title'>{t('products.title')}</h2>
          <Carousel 
            slides={productItems}
            autoPlay={false}
            autoPlayInterval={6000}
            showDots={true}
            showArrows={true}
            className="product-carousel none"
          />

          {/* Category Filter Buttons */}
          <div className="product__category-filters">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`category-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {t(category.key)}
              </motion.button>
            ))}
          </div>

          <div className="product-gallery-empty">
            <p>{t('products.noProductsInCategory', 'No products available in this category')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-gallery">
      <div className="container">
        {/* <h2 className='section-title'>{t('products.title')}</h2> */}
        <Carousel 
          slides={productItems}
          autoPlay={false}
          autoPlayInterval={6000}
          showDots={true}
          showArrows={true}
          className="product-carousel none"
        />

        {/* Category Filter Buttons */}
        <div className="product__category-filters">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {t(category.key)}
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="product__gallery-features"
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="product__wrapper">
            <div className="product__image-section">
              <div className="product__thumbnails-container">
                {showThumbnailsSlider && (
                  <button 
                    className="thumbnails-nav-btn thumbnails-prev-btn"
                    onClick={handleThumbnailsPrev}
                    disabled={thumbnailsStartIndex === 0}
                    aria-label="Previous thumbnails"
                  >
                    ↑
                  </button>
                )}
                
                <div 
                  className="product__thumbnails"
                  ref={thumbnailsRef}
                  onTouchStart={handleThumbnailsTouchStart}
                  onTouchMove={handleThumbnailsTouchMove}
                  onTouchEnd={handleThumbnailsTouchEnd}
                  style={{
                    transform: isThumbnailsDragging ? `translateY(${thumbnailsDragOffset * 0.1}px)` : 'none',
                    transition: isThumbnailsDragging ? 'none' : 'transform 0.3s ease'
                  }}
                >
                  {displayImages
                    .slice(thumbnailsStartIndex, thumbnailsStartIndex + maxVisibleThumbnails)
                    .map((image, index) => {
                      const actualIndex = thumbnailsStartIndex + index;
                      return (
                        <div 
                          key={actualIndex} 
                          className={`product__thumbnail ${actualIndex === activeImageIndex ? 'active' : ''}`}
                          onClick={() => handleThumbnailClick(actualIndex)}
                        >
                          <img 
                            src={image.src} 
                            alt={image.alt || `Product image ${actualIndex + 1}`} 
                          />
                        </div>
                      );
                    })}
                </div>
                
                {showThumbnailsSlider && (
                  <button 
                    className="thumbnails-nav-btn thumbnails-next-btn"
                    onClick={handleThumbnailsNext}
                    disabled={thumbnailsStartIndex >= maxThumbnailsStartIndex}
                    aria-label="Next thumbnails"
                  >
                    ↓
                  </button>
                )}
              </div>
              <div className="product__main-image">
                <div 
                  className="product__image-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <motion.img 
                    ref={imageRef}
                    src={displayImages[activeImageIndex]?.src} 
                    alt={displayImages[activeImageIndex]?.alt || `Product image ${activeImageIndex + 1}`} 
                    className={`main-product-image ${isChangingImage ? 'changing' : ''}`}
                    key={`${activeCategory}-${activeImageIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  
                  {/* Zoom indicator square */}
                  {isZooming && (
                    <div 
                      className="zoom-indicator"
                      style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                      }}
                    />
                  )}
                  
                  {/* Zoomed image overlay */}
                  {isZooming && (
                    <div className="zoom-overlay">
                      <div 
                        ref={zoomRef}
                        className="zoomed-image"
                        style={{
                          backgroundImage: `url(${displayImages[activeImageIndex]?.src})`,
                          transform: `translate(${zoomPosition.x}%, ${zoomPosition.y}%)`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <motion.div 
              className="product__info"
              key={`${activeCategory}-info`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
            >
              
              <div className="product__header">
                <h1 className="product__title">{t(productData?.title)}</h1>
                <div className="product__brand">
                  <span className="brand-name">{t(productData?.subtitle)}</span>
                </div>
              </div>

              <div className="product__description">
                <div className="product__features">
                  <h4 className="features-title">{t('product.features', 'Key Features')}</h4>
                  <ul className="features-list">
                    {productData?.features?.slice(0, 6).map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">{t(feature)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="product__cta">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link 
                      to={`/${language}${productData?.ctaLink || '#'}`}
                      className="learn-more-btn learn-more-btn-primary"
                    >
                      {t(productData?.cta, 'Learn More')}
                    </Link>
                  </motion.div>
                </div>

                {/* Product Navigation */}
                {filteredProducts.length > 1 && (
                  <div className="product__navigation">
                    <button 
                      className="nav-btn prev-btn"
                      onClick={handlePrevProduct}
                      disabled={currentProductIndex === 0}
                    >
                      ← {t('product.navigation.previous', 'Previous')}
                    </button>
                    
                    <span className="product__counter">
                      {currentProductIndex + 1} / {filteredProducts.length}
                    </span>
                    
                    <button 
                      className="nav-btn next-btn"
                      onClick={handleNextProduct}
                      disabled={currentProductIndex === filteredProducts.length - 1}
                    >
                      {t('product.navigation.next', 'Next')} →
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default ProductGallery;
