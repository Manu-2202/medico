import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    navHome: 'Home',
    navAbout: 'About Us',
    navDestinations: 'Destinations',
    navExams: 'Exam Guides',
    navBlogs: 'Knowledge Hub',
    navGallery: 'Gallery',
    navFaqs: 'FAQs',
    navContact: 'Contact Us',
    navAdmin: 'Admin',
    applyNow: 'Apply Now 2026-27',
    bookConsultation: 'Book Free Consultation',
    callHelpline: 'Call Helpline',
    whatsappUs: 'WhatsApp Us',
    topAnnouncement: '🔥 Admissions Open 2026-27: Get Up to ₹1 Lakh Scholarship on MBBS Abroad Seats!',
    heroBadge: 'NMC & WHO Approved Universities',
    heroTitle: 'Your Trusted Gateway to NMC Approved MBBS Abroad',
    heroSubtitle: 'Direct admissions in Top Government Medical Universities in Russia, Georgia, Kazakhstan, Uzbekistan, Philippines, Kyrgyzstan & Vietnam.',
    checkEligibility: 'Check Eligibility Free',
    exploreDestinations: 'Explore Destinations',
    quickFacts: 'Quick Facts',
    feeStructure: 'Fee Structure',
    eligibilityCriteria: 'Eligibility Criteria',
    topUniversities: 'Top Universities',
    admissionProcess: 'Admission Process',
    documentsRequired: 'Documents Required',
    frequentlyAsked: 'Frequently Asked Questions',
    contactOffices: 'Our Head & Branch Offices',
    privacyTitle: 'Privacy Policy',
    termsTitle: 'Terms & Conditions',
    footerCopyright: '© 2026 Medico Overseas Consultancy. All Rights Reserved.'
  },
  hi: {
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navDestinations: 'विदेश में एमबीबीएस',
    navExams: 'परीक्षा गाइड',
    navBlogs: 'ब्लॉग व समाचार',
    navGallery: 'गैलरी',
    navFaqs: 'सामान्य प्रश्न (FAQs)',
    navContact: 'संपर्क करें',
    navAdmin: 'एडमिन पैनल',
    applyNow: 'आवेदन करें 2026-27',
    bookConsultation: 'निःशुल्क परामर्श बुक करें',
    callHelpline: 'हेल्पलाइन कॉल करें',
    whatsappUs: 'व्हाट्सएप करें',
    topAnnouncement: '🔥 प्रवेश प्रारंभ 2026-27: विदेश में एमबीबीएस सीट पर ₹1 लाख तक की छात्रवृत्ति प्राप्त करें!',
    heroBadge: 'एनएमसी एवं डब्ल्यूएचओ द्वारा मान्यता प्राप्त विश्वविद्यालय',
    heroTitle: 'विदेश में एनएमसी मान्यता प्राप्त एमबीबीएस का आपका विश्वसनीय माध्यम',
    heroSubtitle: 'रूस, जॉर्जिया, कजाकिस्तान, उज्बेकिस्तान, फिलीपींस, किर्गिस्तान और वियतनाम के शीर्ष सरकारी मेडिकल विश्वविद्यालयों में सीधा प्रवेश।',
    checkEligibility: 'योग्यता मुफ्त जांचें',
    exploreDestinations: 'देश देखें',
    quickFacts: 'मुख्य तथ्य',
    feeStructure: 'फीस संरचना',
    eligibilityCriteria: 'पात्रता मानदंड',
    topUniversities: 'शीर्ष विश्वविद्यालय',
    admissionProcess: 'प्रवेश प्रक्रिया',
    documentsRequired: 'आवश्यक दस्तावेज',
    frequentlyAsked: 'अक्सर पूछे जाने वाले प्रश्न',
    contactOffices: 'हमारे मुख्य एवं क्षेत्रीय कार्यालय',
    privacyTitle: 'गोपनीयता नीति',
    termsTitle: 'नियम एवं शर्तें',
    footerCopyright: '© 2026 मेडिको ओवरसीज कंसल्टेंसी। सर्वाधिकार सुरक्षित।'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('siteLanguage') || 'en');

  useEffect(() => {
    localStorage.setItem('siteLanguage', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
