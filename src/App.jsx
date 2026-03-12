import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from './layouts/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductPage from './pages/ProductPage/ProductPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import NewsPage from './pages/NewsPage/NewsPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import NewsDetailPage from './pages/NewsPage/NewsDetailPage/NewsDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage/PrivacyPolicyPage';
import CuttingSystemsPage from './pages/CatalogPage/CuttingSystemsPage/CuttingSystemsPage';
import PlotterCatalogPage from './pages/PlotterCatalogPage/PlotterCatalogPage';
import Nocai from './pages/PlotterCatalogPage/Nocai/Nocai';
import NocaiModelPage from './pages/PlotterCatalogPage/Nocai/NocaiModelPage';
import InksPage from './pages/InksPage/InksPage';
import InkModelPage from './pages/InksPage/InkModelPage';
import Iecho from './pages/CatalogPage/CuttingSystemsPage/Iecho/Iecho';
import IechoModelPage from './pages/CatalogPage/CuttingSystemsPage/Iecho/IechoModelPage';
import OfficeEquipment from './pages/CatalogPage/OfficeEquipment/OfficeEquipment';
import DevelopModelPage from './pages/CatalogPage/OfficeEquipment/DevelopModelPage';
import ProfessionalEquipment from './pages/CatalogPage/ProfessionalEquipment/ProfessionalEquipment';
import ProfessionalModelPage from './pages/CatalogPage/ProfessionalEquipment/ProfessionalModelPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <LanguageProvider>
          <Layout>
            <Routes>
              {/* Georgian routes */}
              <Route path="/ka" element={<HomePage />} />
              <Route path="/ka/catalog" element={<CatalogPage />} />
              <Route path="/ka/catalog/:category" element={<CatalogPage />} />
              <Route path="/ka/cutting-systems" element={<CuttingSystemsPage />} />
              <Route path="/ka/cutting-systems/iecho" element={<Iecho />} />
              <Route path="/ka/cutting-systems/iecho/:modelId" element={<IechoModelPage />} />
              <Route path="/ka/cutting-systems/:brand" element={<CatalogPage />} />
              <Route path="/ka/office-equipment/develop" element={<OfficeEquipment />} />
              <Route path="/ka/office-equipment/develop/:modelId" element={<DevelopModelPage />} />
              <Route path="/ka/professional-equipment/develop" element={<ProfessionalEquipment />} />
              <Route path="/ka/professional-equipment/develop/:modelId" element={<ProfessionalModelPage />} />
              <Route path="/ka/product/:id" element={<ProductPage />} />
              <Route path="/ka/about" element={<AboutPage />} />
              <Route path="/ka/services" element={<ServicesPage />} />
              <Route path="/ka/news" element={<NewsPage />} />
              <Route path="/ka/news/:id" element={<NewsDetailPage />} />
              <Route path="/ka/contacts" element={<ContactsPage />} />
              <Route path="/ka/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/ka/plotter-catalog" element={<PlotterCatalogPage />} />
              <Route path="/ka/plotter-catalog/nocai" element={<Nocai />} />
              <Route path="/ka/plotter-catalog/nocai/:modelId" element={<NocaiModelPage />} />
              <Route path="/ka/catalog/supplies/inks" element={<InksPage />} />
              <Route path="/ka/catalog/supplies/inks/:inkId" element={<InkModelPage />} />
              
              {/* English routes */}
              <Route path="/en" element={<HomePage />} />
              <Route path="/en/catalog" element={<CatalogPage />} />
              <Route path="/en/catalog/:category" element={<CatalogPage />} />
              <Route path="/en/cutting-systems" element={<CuttingSystemsPage />} />
              <Route path="/en/cutting-systems/iecho" element={<Iecho />} />
              <Route path="/en/cutting-systems/iecho/:modelId" element={<IechoModelPage />} />
              <Route path="/en/cutting-systems/:brand" element={<CatalogPage />} />
              <Route path="/en/office-equipment/develop" element={<OfficeEquipment />} />
              <Route path="/en/office-equipment/develop/:modelId" element={<DevelopModelPage />} />
              <Route path="/en/professional-equipment/develop" element={<ProfessionalEquipment />} />
              <Route path="/en/professional-equipment/develop/:modelId" element={<ProfessionalModelPage />} />
              <Route path="/en/product/:id" element={<ProductPage />} />
              <Route path="/en/about" element={<AboutPage />} />
              <Route path="/en/services" element={<ServicesPage />} />
              <Route path="/en/news" element={<NewsPage />} />
              <Route path="/en/news/:id" element={<NewsDetailPage />} />
              <Route path="/en/contacts" element={<ContactsPage />} />
              <Route path="/en/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/en/plotter-catalog" element={<PlotterCatalogPage />} />
              <Route path="/en/plotter-catalog/nocai" element={<Nocai />} />
              <Route path="/en/plotter-catalog/nocai/:modelId" element={<NocaiModelPage />} />
              <Route path="/en/catalog/supplies/inks" element={<InksPage />} />
              <Route path="/en/catalog/supplies/inks/:inkId" element={<InkModelPage />} />

              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/cutting-systems" element={<CuttingSystemsPage />} />
              <Route path="/cutting-systems/iecho" element={<Iecho />} />
              <Route path="/cutting-systems/iecho/:modelId" element={<IechoModelPage />} />
              <Route path="/cutting-systems/:brand" element={<CatalogPage />} />
              <Route path="/office-equipment/develop" element={<OfficeEquipment />} />
              <Route path="/office-equipment/develop/:modelId" element={<DevelopModelPage />} />
              <Route path="/professional-equipment/develop" element={<ProfessionalEquipment />} />
              <Route path="/professional-equipment/develop/:modelId" element={<ProfessionalModelPage />} />
              
              {/* Default route - show Georgian homepage */}
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </LanguageProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;