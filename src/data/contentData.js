import { 
  productGarmin, 
  productTrimble, 
  productLeica,
  printer4,
  nocai1,
  nocai2,
  nocai3,
  nocai4,
  iecho1,
  iecho2,
  iecho3,
  iecho4,
  iecho5,
  iecho6,
  iecho7
} from '../assets/images';



// Вспомогательные функции для работы с контентом
export const createSlide = (id, type, data) => ({
  id,
  type,
  ...data
});

export const createContentSlide = (id, content, backgroundImage = null) => 
  createSlide(id, 'content', { content, backgroundImage });

export const createImageSlide = (id, image, content) => 
  createSlide(id, 'image', { image, content });

export const createProductSlide = (id, product, image) => 
  createSlide(id, 'product', { product, image });

export const createServiceSlide = (id, service, backgroundImage = null) => 
  createSlide(id, 'service', { service, backgroundImage });

export const createCategory = (id, category) => ({
  id,
  ...category
});

// Основной контент приложения
export const gpsContent = {
  // Карусель на главной странице
  carousel: {
    slides: [
      createContentSlide('office-hero', {
        title: 'hero.office.title',
        subtitle: 'hero.office.subtitle',
        cta: 'hero.office.cta',
        ctaLink: '/catalog/office'
      }, {
        src: productLeica,
        alt: 'Office GPS Equipment Background'
      }),
      
      createImageSlide('professional-equipment', 
        {
          src: productGarmin,
          alt: 'Professional GPS Equipment'
        },
        {
          title: 'hero.professional.title',
          subtitle: 'hero.professional.subtitle',
          cta: 'hero.professional.cta',
          ctaLink: '/catalog/professional'
        }
      ),
      
      createImageSlide('industrial-solutions',
        {
          src: productTrimble,
          alt: 'Industrial GPS Solutions'
        },
        {
          title: 'hero.industrial.title',
          subtitle: 'hero.industrial.subtitle',
          cta: 'hero.industrial.cta',
          ctaLink: '/catalog/industrial'
        }
      ),
      
      createContentSlide('support-services', {
        title: 'hero.support.title',
        subtitle: 'hero.support.subtitle',
        cta: 'hero.support.cta',
        ctaLink: '/services'
      }, {
        src: printer4,
        alt: 'GPS Support Services Background'
      })
    ],
    autoPlay: true,
    autoPlayInterval: 5000,
    showDots: true,
    showArrows: true
  },

  // Секция продуктов
  products: {
    title: 'products.section.title',
    subtitle: 'products.section.subtitle',
    items: [
      createProductSlide('garmin-gps', {
        title: 'products.nocai.title',
        subtitle: 'products.nocai.subtitle',
        description: 'products.garmin.description',
        features: [
          'products.nocai.feature1',
          'products.nocai.feature2', 
          'products.nocai.feature3',
          'products.nocai.feature4',
          'products.nocai.feature5',
          'products.nocai.feature6',
          'products.nocai.feature7',
          'products.nocai.feature8'
        ],
        cta: 'products.nocai.cta',
        ctaLink: '/products/garmin-gps',
        price: 'products.garmin.price'
      }, {
        src: productGarmin,
        alt: 'Garmin GPS Device'
      }),
      
      createProductSlide('trimble-surveying', {
        title: 'products.iecho.title',
        subtitle: 'products.iecho.subtitle',
        description: 'products.iecho.description',
        features: [
          'products.iecho.feature1',
          'products.iecho.feature2',
          'products.iecho.feature3',
          'products.iecho.feature4',
          'products.iecho.feature5',
          'products.iecho.feature6',
          'products.iecho.feature7',
          'products.iecho.feature8'
        ],
        cta: 'products.iecho.cta',
        ctaLink: '/products/trimble-surveying',
        price: 'products.trimble.price'
      }, {
        src: productTrimble,
        alt: 'Trimble Surveying Equipment'
      })
    ],
    cta: {
      text: 'products.section.viewAll',
      link: '/catalog'
    }
  },

  // Секция услуг
  services: {
    title: 'services.section.title',
    subtitle: 'services.section.subtitle',
    items: [
      createServiceSlide('maintenance-service', {
        title: 'services.maintenance.title',
        subtitle: 'services.maintenance.subtitle',
        description: 'services.maintenance.description',
        features: [
          'services.maintenance.feature1',
          'services.maintenance.feature2',
          'services.maintenance.feature3'
        ],
        cta: 'services.maintenance.cta',
        ctaLink: '/services/maintenance',
        icon: 'MdBuild'
      }, {
        src: '/api/placeholder/600/400',
        alt: 'Equipment Maintenance Service'
      }),
      
      createServiceSlide('training-service', {
        title: 'services.training.title',
        subtitle: 'services.training.subtitle',
        description: 'services.training.description',
        features: [
          'services.training.feature1',
          'services.training.feature2',
          'services.training.feature3'
        ],
        cta: 'services.training.cta',
        ctaLink: '/services/training',
        icon: 'MdSchool'
      }, {
        src: '/api/placeholder/600/400',
        alt: 'Technical Training Service'
      }),
      
      createServiceSlide('consultation-service', {
        title: 'services.consultation.title',
        subtitle: 'services.consultation.subtitle',
        description: 'services.consultation.description',
        features: [
          'services.consultation.feature1',
          'services.consultation.feature2',
          'services.consultation.feature3'
        ],
        cta: 'services.consultation.cta',
        ctaLink: '/services/consultation',
        icon: 'MdSupportAgent'
      }, {
        src: '/api/placeholder/600/400',
        alt: 'Technical Consultation Service'
      })
    ],
    cta: {
      text: 'services.section.viewAll',
      link: '/services'
    }
  },

  // Секция About
  about: {
    title: 'about.section.title',
    description: 'about.section.description',
    cta: {
      text: 'about.section.learnMore',
      link: '/about'
    }
  },

  // Категории продуктов
  categories: {
    title: 'categories.section.title',
    subtitle: 'categories.section.subtitle',
    items: [
      createCategory('office-gps', {
        name: 'categories.office.name',
        description: 'categories.office.description',
        icon: 'MdLocationOn',
        link: '/catalog/office',
        image: {
          src: '/api/placeholder/300/200',
          alt: 'Office GPS Equipment'
        }
      }),
      
      createCategory('professional-equipment', {
        name: 'categories.professional.name',
        description: 'categories.professional.description',
        icon: 'MdEngineering',
        link: '/catalog/professional',
        image: {
          src: '/api/placeholder/300/200',
          alt: 'Professional GPS Equipment'
        }
      }),
      
      createCategory('industrial-solutions', {
        name: 'categories.industrial.name',
        description: 'categories.industrial.description',
        icon: 'MdPrecisionManufacturing',
        link: '/catalog/industrial',
        image: {
          src: '/api/placeholder/300/200',
          alt: 'Industrial GPS Solutions'
        }
      })
    ]
  },

  // Галерея продуктов с детальными характеристиками
  productGalleryFeatures: {
    title: 'product.gallery.title',
    subtitle: 'product.gallery.subtitle',
    items: [
      {
        id: 'garmin-gps-featured',
        product: {
          title: 'products.nocai.title',
          subtitle: 'products.nocai.subtitle',
          description: 'products.garmin.description',
          features: [
            'products.nocai.feature1',
            'products.nocai.feature2', 
            'products.nocai.feature3',
            'products.nocai.feature4',
            'products.nocai.feature5',
            'products.nocai.feature6',
            'products.nocai.feature7',
            'products.nocai.feature8'
          ],
          cta: 'products.nocai.cta',
          ctaLink: '/products/garmin-gps',
          price: 'products.garmin.price',
          discount: 'products.discount',
          code: 'products.code'
        },
        images: [
          {
            src: nocai1,
            alt: 'Nocai UV Printing'
          },
          {
            src: nocai2,
            alt: 'Nocai UV Printing'
          },
          {
            src: nocai3,
            alt: 'Nocai UV Printing'
          },
          {
            src: nocai4,
            alt: 'Nocai UV Printing'
          }
        ],
        specifications: {
          dimensions: 'product.specs.dimensions',
          weight: 'product.specs.weight',
          battery: 'product.specs.battery',
          connectivity: 'product.specs.connectivity',
          accuracy: 'product.specs.accuracy',
          warranty: 'product.specs.warranty'
        },
        category: 'new'
      },
      {
        id: 'trimble-surveying-featured',
        product: {
          title: 'products.iecho.title',
          subtitle: 'products.iecho.subtitle',
          description: 'products.iecho.description',
          features: [
            'products.iecho.feature1',
            'products.iecho.feature2',
            'products.iecho.feature3',
            'products.iecho.feature4',
            'products.iecho.feature5',
            'products.iecho.feature6',
            'products.iecho.feature7',
            'products.iecho.feature8'
          ],
          cta: 'products.iecho.cta',
          ctaLink: '/products/trimble-surveying',
          price: 'products.trimble.price',
          discount: 'products.discount',
          code: 'products.code'
        },
        images: [
          {
            src: iecho1,
            alt: 'iecho PK0604 Plus'
          },
          {
            src: iecho2,
            alt: 'iecho PK0604 Plus'
          },
          {
            src: iecho3,
            alt: 'iecho PK0604 Plus'
          },
          {
            src: iecho4,
            alt: 'iecho PK0604 Plus'
          },
          {
            src: iecho5,
            alt: 'iecho PK0604 Plus'
          },
          {
            src: iecho6,
            alt: 'iecho PK0604 Plus'
          },
          {
            src: iecho7,
            alt: 'iecho PK0604 Plus'
          }
        ],
        specifications: {
          dimensions: 'product.specs.dimensions',
          weight: 'product.specs.weight',
          battery: 'product.specs.battery',
          connectivity: 'product.specs.connectivity',
          accuracy: 'product.specs.accuracy',
          warranty: 'product.specs.warranty'
        },
        category: 'new'
      },
      {
        id: 'leica-professional-featured',
        product: {
          title: 'products.leica.title',
          subtitle: 'products.leica.subtitle',
          description: 'products.leica.description',
          features: [
            'products.leica.feature1',
            'products.leica.feature2',
            'products.leica.feature3',
            'products.leica.feature4',
            'products.leica.feature5',
            'products.leica.feature6'
          ],
          cta: 'products.leica.cta',
          ctaLink: '/products/leica-professional',
          price: 'products.leica.price',
          discount: 'products.discount',
          code: 'products.code'
        },
        images: [
          {
            src: productLeica,
            alt: 'Leica Professional GPS'
          },
          {
            src: productGarmin,
            alt: 'Leica Professional GPS'
          },
          {
            src: productTrimble,
            alt: 'Leica Professional GPS'
          }
        ],
        specifications: {
          dimensions: 'product.specs.dimensions',
          weight: 'product.specs.weight',
          battery: 'product.specs.battery',
          connectivity: 'product.specs.connectivity',
          accuracy: 'product.specs.accuracy',
          warranty: 'product.specs.warranty'
        },
        category: 'bestselling'
      },
      {
        id: 'konika-minolt-extra-demo',
        product: {
          title: 'products.leica.title',
          subtitle: 'products.leica.subtitle',
          description: 'products.leica.description',
          features: [
            'products.leica.feature1',
            'products.leica.feature2',
            'products.leica.feature3',
            'products.leica.feature4',
            'products.leica.feature5',
            'products.leica.feature6'
          ],
          cta: 'products.leica.cta',
          ctaLink: '/products/leica-professional',
          price: 'products.leica.price',
          discount: 'products.discount',
          code: 'products.code'
        },
        images: [
          {
            src: productLeica,
            alt: 'Leica Professional GPS'
          },
          {
            src: productGarmin,
            alt: 'Leica Professional GPS'
          },
          {
            src: productTrimble,
            alt: 'Leica Professional GPS'
          }
        ],
        specifications: {
          dimensions: 'product.specs.dimensions',
          weight: 'product.specs.weight',
          battery: 'product.specs.battery',
          connectivity: 'product.specs.connectivity',
          accuracy: 'product.specs.accuracy',
          warranty: 'product.specs.warranty'
        },
        category: 'discounts'
      },
      {
        id: 'konika-minolt-extra-demo',
        product: {
          title: 'products.leica.title',
          subtitle: 'products.leica.subtitle',
          description: 'products.leica.description',
          features: [
            'products.leica.feature1',
            'products.leica.feature2',
            'products.leica.feature3',
            'products.leica.feature4',
            'products.leica.feature5',
            'products.leica.feature6'
          ],
          cta: 'products.leica.cta',
          ctaLink: '/products/leica-professional',
          price: 'products.leica.price',
          discount: 'products.discount',
          code: 'products.code'
        },
        images: [
          {
            src: productLeica,
            alt: 'Leica Professional GPS'
          },
          {
            src: productGarmin,
            alt: 'Leica Professional GPS'
          },
          {
            src: productTrimble,
            alt: 'Leica Professional GPS'
          }
        ],
        specifications: {
          dimensions: 'product.specs.dimensions',
          weight: 'product.specs.weight',
          battery: 'product.specs.battery',
          connectivity: 'product.specs.connectivity',
          accuracy: 'product.specs.accuracy',
          warranty: 'product.specs.warranty'
        },
        category: 'new'
      }
    ]
  },

  // Секция специальных предложений
  specialOffers: {
    title: 'specialOffers.section.title',
    subtitle: 'specialOffers.section.subtitle',
    items: [
      // Акции
      {
        id: 'spring-gps-sale',
        type: 'promotion',
        category: 'promotions',
        title: 'specialOffers.promotions.springSale.title',
        subtitle: 'specialOffers.promotions.springSale.subtitle',
        description: 'specialOffers.promotions.springSale.description',
        discount: '25%',
        badge: 'specialOffers.promotions.springSale.badge',
        validUntil: '2024-05-31',
        image: {
          src: productGarmin,
          alt: 'Spring GPS Sale'
        },
        features: [
          'specialOffers.promotions.springSale.feature1',
          'specialOffers.promotions.springSale.feature2',
          'specialOffers.promotions.springSale.feature3'
        ],
        cta: 'specialOffers.promotions.springSale.cta',
        ctaLink: '/catalog?sale=spring-gps'
      },
      {
        id: 'surveying-equipment-promo',
        type: 'promotion',
        category: 'promotions',
        title: 'specialOffers.promotions.surveyingPromo.title',
        subtitle: 'specialOffers.promotions.surveyingPromo.subtitle',
        description: 'specialOffers.promotions.surveyingPromo.description',
        discount: '30%',
        badge: 'specialOffers.promotions.surveyingPromo.badge',
        validUntil: '2024-06-15',
        image: {
          src: productTrimble,
          alt: 'Surveying Equipment Promotion'
        },
        features: [
          'specialOffers.promotions.surveyingPromo.feature1',
          'specialOffers.promotions.surveyingPromo.feature2',
          'specialOffers.promotions.surveyingPromo.feature3'
        ],
        cta: 'specialOffers.promotions.surveyingPromo.cta',
        ctaLink: '/catalog?sale=surveying-promo'
      },

      // Скидки
      {
        id: 'bulk-discount-gps',
        type: 'discount',
        category: 'discounts',
        title: 'specialOffers.discounts.bulkDiscount.title',
        subtitle: 'specialOffers.discounts.bulkDiscount.subtitle',
        description: 'specialOffers.discounts.bulkDiscount.description',
        discount: '15%',
        badge: 'specialOffers.discounts.bulkDiscount.badge',
        minQuantity: 5,
        image: {
          src: productLeica,
          alt: 'Bulk Discount GPS Equipment'
        },
        features: [
          'specialOffers.discounts.bulkDiscount.feature1',
          'specialOffers.discounts.bulkDiscount.feature2',
          'specialOffers.discounts.bulkDiscount.feature3'
        ],
        cta: 'specialOffers.discounts.bulkDiscount.cta',
        ctaLink: '/contact?type=bulk-order'
      },
      {
        id: 'student-educator-discount',
        type: 'discount',
        category: 'discounts',
        title: 'specialOffers.discounts.studentDiscount.title',
        subtitle: 'specialOffers.discounts.studentDiscount.subtitle',
        description: 'specialOffers.discounts.studentDiscount.description',
        discount: '20%',
        badge: 'specialOffers.discounts.studentDiscount.badge',
        requirements: 'Educational institution verification required',
        image: {
          src: productGarmin,
          alt: 'Student and Educator Discount'
        },
        features: [
          'specialOffers.discounts.studentDiscount.feature1',
          'specialOffers.discounts.studentDiscount.feature2',
          'specialOffers.discounts.studentDiscount.feature3'
        ],
        cta: 'specialOffers.discounts.studentDiscount.cta',
        ctaLink: '/contact?type=educational-discount'
      },

      // Сезонные предложения
      {
        id: 'summer-field-kit',
        type: 'seasonal',
        category: 'seasonal',
        title: 'specialOffers.seasonal.summerKit.title',
        subtitle: 'specialOffers.seasonal.summerKit.subtitle',
        description: 'specialOffers.seasonal.summerKit.description',
        badge: 'specialOffers.seasonal.summerKit.badge',
        season: 'summer',
        validUntil: '2024-08-31',
        image: {
          src: productTrimble,
          alt: 'Summer Field Survey Kit'
        },
        features: [
          'specialOffers.seasonal.summerKit.feature1',
          'specialOffers.seasonal.summerKit.feature2',
          'specialOffers.seasonal.summerKit.feature3',
          'specialOffers.seasonal.summerKit.feature4'
        ],
        cta: 'specialOffers.seasonal.summerKit.cta',
        ctaLink: '/catalog?package=summer-field-kit'
      },
      {
        id: 'winter-indoor-solutions',
        type: 'seasonal',
        category: 'seasonal',
        title: 'specialOffers.seasonal.winterSolutions.title',
        subtitle: 'specialOffers.seasonal.winterSolutions.subtitle',
        description: 'specialOffers.seasonal.winterSolutions.description',
        badge: 'specialOffers.seasonal.winterSolutions.badge',
        season: 'winter',
        validUntil: '2024-12-31',
        image: {
          src: productLeica,
          alt: 'Winter Indoor GPS Solutions'
        },
        features: [
          'specialOffers.seasonal.winterSolutions.feature1',
          'specialOffers.seasonal.winterSolutions.feature2',
          'specialOffers.seasonal.winterSolutions.feature3'
        ],
        cta: 'specialOffers.seasonal.winterSolutions.cta',
        ctaLink: '/catalog?package=winter-indoor'
      },

      // Комплексные решения
      {
        id: 'complete-surveying-solution',
        type: 'bundle',
        category: 'bundles',
        title: 'specialOffers.bundles.completeSurveying.title',
        subtitle: 'specialOffers.bundles.completeSurveying.subtitle',
        description: 'specialOffers.bundles.completeSurveying.description',
        badge: 'specialOffers.bundles.completeSurveying.badge',
        savings: '€2,500',
        originalPrice: '€15,000',
        bundlePrice: '€12,500',
        image: {
          src: productGarmin,
          alt: 'Complete Surveying Solution Bundle'
        },
        includes: [
          'specialOffers.bundles.completeSurveying.include1',
          'specialOffers.bundles.completeSurveying.include2',
          'specialOffers.bundles.completeSurveying.include3',
          'specialOffers.bundles.completeSurveying.include4',
          'specialOffers.bundles.completeSurveying.include5'
        ],
        features: [
          'specialOffers.bundles.completeSurveying.feature1',
          'specialOffers.bundles.completeSurveying.feature2',
          'specialOffers.bundles.completeSurveying.feature3'
        ],
        cta: 'specialOffers.bundles.completeSurveying.cta',
        ctaLink: '/contact?type=complete-bundle'
      },
      {
        id: 'starter-gps-package',
        type: 'bundle',
        category: 'bundles',
        title: 'specialOffers.bundles.starterPackage.title',
        subtitle: 'specialOffers.bundles.starterPackage.subtitle',
        description: 'specialOffers.bundles.starterPackage.description',
        badge: 'specialOffers.bundles.starterPackage.badge',
        savings: '€800',
        originalPrice: '€3,500',
        bundlePrice: '€2,700',
        image: {
          src: productTrimble,
          alt: 'Starter GPS Package'
        },
        includes: [
          'specialOffers.bundles.starterPackage.include1',
          'specialOffers.bundles.starterPackage.include2',
          'specialOffers.bundles.starterPackage.include3',
          'specialOffers.bundles.starterPackage.include4'
        ],
        features: [
          'specialOffers.bundles.starterPackage.feature1',
          'specialOffers.bundles.starterPackage.feature2',
          'specialOffers.bundles.starterPackage.feature3'
        ],
        cta: 'specialOffers.bundles.starterPackage.cta',
        ctaLink: '/contact?type=starter-bundle'
      }
    ]
  }
};

export default gpsContent;

export const getCarouselSlides = () => {
  return gpsContent.carousel.slides;
};

export const getProductItems = () => {
  return gpsContent.products.items;
};

export const getServiceItems = () => {
  return gpsContent.services.items;
};

export const getCategoryItems = () => {
  return gpsContent.categories.items;
};

export const getProductGalleryFeatures = () => {
  return gpsContent.productGalleryFeatures.items;
};

export const getProductGalleryFeatureById = (id) => {
  return gpsContent.productGalleryFeatures.items.find(item => item.id === id);
};

export const getSectionContent = (sectionName) => {
  return gpsContent[sectionName] || {};
};

export const addCarouselSlide = (slide) => {
  gpsContent.carousel.slides.push(slide);
};

export const addProductItem = (product) => {
  gpsContent.products.items.push(product);
};

export const addServiceItem = (service) => {
  gpsContent.services.items.push(service);
};

export const addCategoryItem = (category) => {
  gpsContent.categories.items.push(category);
};

export const addProductGalleryFeature = (feature) => {
  gpsContent.productGalleryFeatures.items.push(feature);
};

export const removeContentById = (sectionName, itemId) => {
  const section = gpsContent[sectionName];
  if (section) {
    if (section.slides) {
      section.slides = section.slides.filter(item => item.id !== itemId);
    } else if (section.items) {
      section.items = section.items.filter(item => item.id !== itemId);
    }
  }
};

export const updateContentById = (sectionName, itemId, updates) => {
  const section = gpsContent[sectionName];
  if (section) {
    const items = section.slides || section.items;
    if (items) {
      const itemIndex = items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        items[itemIndex] = { ...items[itemIndex], ...updates };
      }
    }
  }
};

export const removeProductGalleryFeature = (itemId) => {
  gpsContent.productGalleryFeatures.items = gpsContent.productGalleryFeatures.items.filter(item => item.id !== itemId);
};

export const updateProductGalleryFeature = (itemId, updates) => {
  const itemIndex = gpsContent.productGalleryFeatures.items.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    gpsContent.productGalleryFeatures.items[itemIndex] = { 
      ...gpsContent.productGalleryFeatures.items[itemIndex], 
      ...updates 
    };
  }
};

export const createProductGalleryFeature = (id, product, images, specifications = {}, category = 'new') => ({
  id,
  product,
  images,
  specifications,
  category
});

export const createProductImage = (src, alt) => ({
  src,
  alt
});

export const createProductSpecifications = (specs) => ({
  dimensions: specs.dimensions || 'product.specs.dimensions',
  weight: specs.weight || 'product.specs.weight',
  battery: specs.battery || 'product.specs.battery',
  connectivity: specs.connectivity || 'product.specs.connectivity',
  accuracy: specs.accuracy || 'product.specs.accuracy',
  warranty: specs.warranty || 'product.specs.warranty'
});

// Category management functions
export const getProductsByCategory = (category) => {
  return gpsContent.productGalleryFeatures.items.filter(item => item.category === category);
};

export const getAllCategories = () => {
  const categories = new Set(gpsContent.productGalleryFeatures.items.map(item => item.category));
  return Array.from(categories);
};

export const getCategoryCount = (category) => {
  return gpsContent.productGalleryFeatures.items.filter(item => item.category === category).length;
};

export const addProductToCategory = (product, category) => {
  const newProduct = { ...product, category };
  gpsContent.productGalleryFeatures.items.push(newProduct);
  return newProduct;
};

export const updateProductCategory = (productId, newCategory) => {
  const productIndex = gpsContent.productGalleryFeatures.items.findIndex(item => item.id === productId);
  if (productIndex !== -1) {
    gpsContent.productGalleryFeatures.items[productIndex].category = newCategory;
    return gpsContent.productGalleryFeatures.items[productIndex];
  }
  return null;
};

export const removeProductFromCategory = (productId) => {
  const productIndex = gpsContent.productGalleryFeatures.items.findIndex(item => item.id === productId);
  if (productIndex !== -1) {
    return gpsContent.productGalleryFeatures.items.splice(productIndex, 1)[0];
  }
  return null;
};

// Special Offers management functions
export const getSpecialOffers = () => {
  return gpsContent.specialOffers.items;
};

export const getSpecialOffersByCategory = (category) => {
  return gpsContent.specialOffers.items.filter(item => item.category === category);
};

export const getSpecialOfferById = (id) => {
  return gpsContent.specialOffers.items.find(item => item.id === id);
};

export const getSpecialOffersCategories = () => {
  const categories = new Set(gpsContent.specialOffers.items.map(item => item.category));
  return Array.from(categories);
};

export const addSpecialOffer = (offer) => {
  gpsContent.specialOffers.items.push(offer);
};

export const updateSpecialOffer = (offerId, updates) => {
  const offerIndex = gpsContent.specialOffers.items.findIndex(item => item.id === offerId);
  if (offerIndex !== -1) {
    gpsContent.specialOffers.items[offerIndex] = { 
      ...gpsContent.specialOffers.items[offerIndex], 
      ...updates 
    };
    return gpsContent.specialOffers.items[offerIndex];
  }
  return null;
};

export const removeSpecialOffer = (offerId) => {
  const offerIndex = gpsContent.specialOffers.items.findIndex(item => item.id === offerId);
  if (offerIndex !== -1) {
    return gpsContent.specialOffers.items.splice(offerIndex, 1)[0];
  }
  return null;
};

export const createSpecialOffer = (id, type, category, title, subtitle, description, image, features = [], cta = '', ctaLink = '', additionalData = {}) => ({
  id,
  type,
  category,
  title,
  subtitle,
  description,
  image,
  features,
  cta,
  ctaLink,
  ...additionalData
});

export const getActiveSpecialOffers = () => {
  const now = new Date();
  return gpsContent.specialOffers.items.filter(item => {
    if (item.validUntil) {
      const validUntil = new Date(item.validUntil);
      return validUntil > now;
    }
    return true; // Items without expiration are always active
  });
};

export const getPromotions = () => getSpecialOffersByCategory('promotions');
export const getDiscounts = () => getSpecialOffersByCategory('discounts');
export const getSeasonalOffers = () => getSpecialOffersByCategory('seasonal');
export const getBundles = () => getSpecialOffersByCategory('bundles');
