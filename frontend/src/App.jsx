import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import LeadFormModal from './components/LeadFormModal';
import FloatingActionButtons from './components/FloatingActionButtons';
import Chatbot from './components/Chatbot';
import { initGA4, trackPageView } from './utils/analytics';
import { LanguageProvider } from './utils/languageContext';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import DestinationDetail from './pages/DestinationDetail';
import ExamDetail from './pages/ExamDetail';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(window.location.href, document.title);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedCountryForModal, setSelectedCountryForModal] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    initGA4();
  }, []);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenLeadModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsLeadModalOpen(true);
        sessionStorage.setItem('hasSeenLeadModal', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenLeadModal = (country = '') => {
    setSelectedCountryForModal(country);
    setIsLeadModalOpen(true);
  };

  const handleCloseLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  return (
    <>
      <ScrollToTop />
      <Preloader />
      <Navbar onRequestCounselling={() => handleOpenLeadModal()} />

      <main>
        <Routes>
          <Route path="/" element={<Home onRequestCounselling={() => handleOpenLeadModal()} />} />
          <Route path="/about" element={<AboutUs onRequestCounselling={() => handleOpenLeadModal()} />} />
          <Route path="/destinations/:countrySlug" element={<DestinationDetail onRequestCounselling={() => handleOpenLeadModal()} />} />
          <Route path="/exams/:examSlug" element={<ExamDetail onRequestCounselling={() => handleOpenLeadModal()} />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost onRequestCounselling={() => handleOpenLeadModal()} />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/faqs" element={<FAQs onRequestCounselling={() => handleOpenLeadModal()} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
        </Routes>
      </main>

      <Footer onRequestCounselling={() => handleOpenLeadModal()} />

      <FloatingActionButtons 
        onToggleChatbot={() => setIsChatbotOpen(prev => !prev)} 
        isChatbotOpen={isChatbotOpen}
      />

      <Chatbot 
        isOpen={isChatbotOpen} 
        setIsOpen={setIsChatbotOpen} 
        onRequestCounselling={() => handleOpenLeadModal()} 
      />

      <LeadFormModal 
        isOpen={isLeadModalOpen} 
        onClose={handleCloseLeadModal} 
        defaultCountry={selectedCountryForModal}
      />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
