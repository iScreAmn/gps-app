// Printers collection
export { default as printer1 } from './printers/pr_01.png';
export { default as printer2 } from './printers/pr_02.png';
export { default as printer3 } from './printers/pr_03.png';
export { default as printer4 } from './printers/pr_04.png';
export { default as printer5 } from './printers/pr_05.png';

// Hero backgrounds - placeholder images for now
export const heroOffice = '/api/placeholder/1200/600';
export const heroProfessional = '/api/placeholder/1200/600';
export const heroIndustrial = '/api/placeholder/1200/600';

// About section
export { default as aboutImage } from './about/about.webp';

// Product images - using actual printer images
export { default as productGarmin } from './printers/pr_01.png';
export { default as productTrimble } from './printers/pr_02.png';
export { default as productLeica } from './printers/pr_03.png';

// Service backgrounds
export const serviceMaintenance = '/api/placeholder/600/400';
export const serviceTraining = '/api/placeholder/600/400';
export const serviceConsultation = '/api/placeholder/600/400';

// Category images
export { default as categoryOffice } from './printers/sections/office.webp';
export { default as categoryProfessional } from './printers/sections/production.webp';
export { default as categoryIndustrial } from './printers/sections/industrial.webp';

// Image collections for easy management
export const images = {
  hero: {
    office: heroOffice,
    professional: heroProfessional,
    industrial: heroIndustrial
  },
  services: {
    maintenance: serviceMaintenance,
    training: serviceTraining,
    consultation: serviceConsultation
  },
};