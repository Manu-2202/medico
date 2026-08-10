import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation & Global Header
    navHome: 'Home',
    navAbout: 'About Us',
    navDestinations: 'Destinations',
    navExams: 'Exam Guides',
    navBlogs: 'Blogs',
    navContact: 'Contact Us',
    navAdmin: 'Admin Portal',
    bookConsultation: 'Book Free Consultation',
    topAnnouncement: '🔥 Admissions Open 2026-27: Get Up to ₹1 Lakh Scholarship on MBBS Abroad Seats!',
    helplineText: 'Helpline:',
    certifiedBadge: 'ISO 9001:2015 Certified Consultancy',
    nmcBadge: '100% NMC & WHO Recognized Universities',

    // Hero Banner
    heroTitle0: 'EMPOWERING FUTURE DOCTORS WITH GLOBAL EDUCATION',
    heroSub0: 'Direct admissions into top WHO & NMC-approved medical universities with 100% transparent guidance & zero capitation fees.',
    heroTitle1: 'STUDY MBBS IN RUSSIA & GEORGIA WITH SCHOLARSHIPS',
    heroSub1: 'World-class European medical training with high FMGE passing rate, 100% English medium, and Indian hostel mess.',
    heroTitle2: 'NMC & WHO APPROVED MEDICAL UNIVERSITIES',
    heroSub2: 'Fully compliant with NMC Gazette guidelines for medical practice in India after graduation.',
    heroTitle3: 'START YOUR MEDICAL JOURNEY AT LOWEST TUITION FEES',
    heroSub3: 'Affordable MBBS abroad starting from ₹2.8 Lakhs/year. 0% Interest EMI & bank education loan support.',

    ourServices: 'OUR SERVICES',
    univAdmissions: 'University Admissions',
    visaDocs: 'Visa & Documentation',
    scholarshipGuidance: 'Scholarship Guidance',
    fmgePrep: 'FMGE & NEXT Coaching',

    // Trust Bar & Stats
    yearsExp: 'Years Experience',
    studentsPlaced: 'Students Placed',
    nmcUnivs: 'NMC Approved Universities',
    countriesServed: 'Study Destinations',

    // Why Study MBBS Abroad Section
    whyStudyAbroadTitle: 'Why Study MBBS Abroad with Medico Overseas?',
    whyStudyAbroadSubtitle: 'We provide end-to-end guidance from university selection to graduation and FMGE/NEXT licensing exams in India.',
    benefit1Title: '100% NMC & WHO Approved',
    benefit1Desc: 'All recommended universities are listed on WHO, WDOMS, and strictly follow NMC 2021 Gazette rules.',
    benefit2Title: '100% English Medium',
    benefit2Desc: 'Entire 6-year MBBS curriculum taught in English by senior professors with clinical practical rotation.',
    benefit3Title: 'Affordable Fee Structure',
    benefit3Desc: 'Low tuition fee starting from ₹2.8 Lakhs/year with zero capitation fee or hidden donation charges.',
    benefit4Title: 'Indian Mess & Hostel',
    benefit4Desc: 'Separate hostels for boys and girls with 24/7 security and authentic Indian food cooked by Indian chefs.',

    // Destinations Section
    topDestinationsTitle: 'Top MBBS Destinations for Indian Students',
    topDestinationsSubtitle: 'Explore affordable NMC-approved medical universities across Russia, Georgia, Kyrgyzstan, Uzbekistan, Armenia & Vietnam.',
    learnMore: 'Learn More',
    checkEligibility: 'Check Eligibility',

    // Admission Process Steps
    admissionProcessTitle: 'Simple 5-Step Admission Process',
    step1Title: 'Step 1: Free Counselling',
    step1Desc: 'Expert consultation to select the best university based on your NEET score and budget.',
    step2Title: 'Step 2: Documentation',
    step2Desc: 'Application submission, 10th/12th certificate verification, and passport processing.',
    step3Title: 'Step 3: Admission Letter',
    step3Desc: 'Receive official university admission letter within 7-10 working days.',
    step4Title: 'Step 4: Visa & Air Ticket',
    step4Desc: '100% visa guarantee, embassy stamping, and group air ticket booking.',
    step5Title: 'Step 5: Airport Pickup & Hostel',
    step5Desc: 'Our on-ground representative receives students at destination airport and settles hostel room.',

    // Calculator Tool
    calcTitle: 'MBBS Abroad Eligibility & Fee Calculator',
    calcSubtitle: 'Find out your eligible medical universities and fee packages in 30 seconds.',

    // Exams Teaser
    examsTeaserTitle: 'Medical Licensing Exam Support',
    fmgeTitle: 'FMGE / NEXT Exam Coaching',
    nmatTitle: 'NMAT Exam Guidance',

    // Testimonials
    testimonialsTitle: 'What Our Students & Parents Say',

    // Blogs Page
    blogJournalBadge: 'Official Medical Education Journal',
    blogHubTitle: 'Medico Overseas Blog',
    blogHubSub: 'Authoritative guides on NMC 2026 Gazette regulations, university fee structures, FMGE/NEXT exam roadmaps, and on-ground student experiences.',
    blogSearchPlaceholder: 'Search articles by country, fees, or exam (e.g. Russia, Fees, FMGE)...',
    blogFilterLabel: 'Filter:',
    catAll: 'All Articles',
    catRussia: 'Russia MBBS',
    catGeorgia: 'Georgia MBBS',
    catKazakhstan: 'Kazakhstan',
    catUzbekistan: 'Uzbekistan',
    catKyrgyzstan: 'Kyrgyzstan',
    catArmenia: 'Armenia',
    catFmge: 'FMGE / NEXT',
    catNmat: 'NMAT Prep',
    blogLatestTitle: 'Latest Medical Education Articles',
    blogShowing: 'Showing',
    blogArticles: 'articles',
    blogNoArticles: 'No articles found',
    blogTryDifferent: 'Try searching with a different keyword or category filter.',
    blogResetBtn: 'Reset All Filters',
    blogReadFull: 'Read Full Article',
    blogBy: 'By',

    // Footer
    footerDesc: 'Medico Overseas is India’s premier medical study consultancy. We guide aspirants to secure direct admissions in NMC & WHO-approved state medical universities with 100% transparent fee structures.',
    quickNav: 'Quick Navigation',
    navAboutFull: 'About Medico Overseas',
    navFaqsFull: 'Student FAQs',
    navBlogsFull: 'Medical News & Blogs',
    navExamsFull: 'FMGE / NEXT Exam Prep',
    navContactFull: 'Contact Office Branches',
    destinationsNav: 'MBBS Destinations',
    officeBranches: 'Head & Branch Offices',
    getAlerts: 'GET ADMISSION ALERTS',
    enterEmailPlaceholder: 'Enter your email',
    accreditedBy: 'RECOGNIZED & ACCREDITED BY',
    nmcApproved: 'NMC Approved',
    whoListed: 'WHO Listed',
    healthMinistry: 'Ministry of Health',
    usmleEligible: 'USMLE & WFME Eligible',
    copyrightText: '© 2026 Medico Overseas Educational Consultancy. All rights reserved.',

    // Admin Dashboard
    adminWelcome: 'Welcome back, Admin 👋',
    adminSub: 'Real-time MBBS lead conversions, country stats, and website content controls.',
    tabDashboard: 'Dashboard & Overview',
    tabLeads: 'Leads CRM',
    tabAnalytics: 'Graphs & Analytics',
    tabSettings: 'Lead Email Alerts',
    tabBlogs: 'Blogs CMS',
    tabCountries: 'Destinations CMS',
    tabTestimonials: 'Testimonials',
    statTotalLeads: 'Total Inquiries',
    statActiveCounseling: 'Active Counseling',
    statEnrolled: 'Enrolled Students',
    statAlertEmails: 'Alert Email Recipients',
    chartInquiryTrend: 'Monthly Lead Growth Trend',
    chartCountryShare: 'Country Share',
    tableHeaderStudent: 'Student',
    tableHeaderPhone: 'Phone',
    tableHeaderDestination: 'Destination',
    tableHeaderNeet: 'NEET Score',
    tableHeaderStatus: 'Status Pipeline',
    tableHeaderDate: 'Date',
    tableHeaderActions: 'Actions',
    btnExportCsv: 'Export CSV',
    btnRefreshData: 'Refresh Data'
  },
  hi: {
    // Navigation & Global Header
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navDestinations: 'विदेश में एमबीबीएस',
    navExams: 'परीक्षा गाइड',
    navBlogs: 'ज्ञान केंद्र (ब्लॉग)',
    navContact: 'संपर्क करें',
    navAdmin: 'एडमिन पोर्टल',
    bookConsultation: 'निःशुल्क परामर्श बुक करें',
    topAnnouncement: '🔥 प्रवेश प्रारंभ 2026-27: विदेश में एमबीबीएस सीट पर ₹1 लाख तक की छात्रवृत्ति प्राप्त करें!',
    helplineText: 'हेल्पलाइन:',
    certifiedBadge: 'ISO 9001:2015 प्रमाणित परामर्श',
    nmcBadge: '100% NMC और WHO द्वारा मान्यता प्राप्त विश्वविद्यालय',

    // Hero Banner
    heroTitle0: 'वैश्विक शिक्षा के साथ भविष्य के डॉक्टरों को सशक्त बनाना',
    heroSub0: '100% पारदर्शी मार्गदर्शन और शून्य डोनेशन के साथ शीर्ष डब्ल्यूएचओ और एनएमसी-अनुमोदित मेडिकल विश्वविद्यालयों में सीधा प्रवेश।',
    heroTitle1: 'छात्रवृत्ति के साथ रूस और जॉर्जिया में एमबीबीएस की पढ़ाई करें',
    heroSub1: 'उच्च एफएमजीई उत्तीर्ण दर, 100% अंग्रेजी माध्यम, और भारतीय हॉस्टल मेस के साथ विश्वस्तरीय यूरोपीय चिकित्सा प्रशिक्षण।',
    heroTitle2: 'एनएमसी एवं डब्ल्यूएचओ द्वारा अनुमोदित मेडिकल विश्वविद्यालय',
    heroSub2: 'स्नातक स्तर की पढ़ाई के बाद भारत में चिकित्सा अभ्यास के लिए एनएमसी गजट 2021 के दिशानिर्देशों का पूर्ण पालन।',
    heroTitle3: 'सबसे कम फीस में अपनी मेडिकल यात्रा शुरू करें',
    heroSub3: '₹2.8 लाख/वर्ष से शुरू होने वाली किफायती एमबीबीएस पढ़ाई। 0% ब्याज ईएमआई और बैंक शिक्षा ऋण सहायता उपलब्ध।',

    ourServices: 'हमारी सेवाएं',
    univAdmissions: 'विश्वविद्यालय प्रवेश',
    visaDocs: 'वीजा और दस्तावेज',
    scholarshipGuidance: 'छात्रवृत्ति मार्गदर्शन',
    fmgePrep: 'एफएमजीई और नेक्स्ट कोचिंग',

    // Trust Bar & Stats
    yearsExp: 'वर्षों का अनुभव',
    studentsPlaced: 'छात्रों को प्रवेश मिला',
    nmcUnivs: 'एनएमसी स्वीकृत विश्वविद्यालय',
    countriesServed: 'अध्ययन के देश',

    // Why Study MBBS Abroad Section
    whyStudyAbroadTitle: 'मेडिको ओवरसीज के साथ विदेश में एमबीबीएस क्यों पढ़ें?',
    whyStudyAbroadSubtitle: 'हम विश्वविद्यालय के चयन से लेकर स्नातक होने और भारत में एफएमजीई/नेक्स्ट परीक्षा तक पूर्ण मार्गदर्शन प्रदान करते हैं।',
    benefit1Title: '100% NMC और WHO स्वीकृत',
    benefit1Desc: 'सभी अनुशंसित विश्वविद्यालय WHO, WDOMS में सूचीबद्ध हैं और NMC 2021 गजट नियमों का कड़ाई से पालन करते हैं।',
    benefit2Title: '100% अंग्रेजी माध्यम',
    benefit2Desc: 'वरिष्ठ प्रोफेसरों द्वारा अंग्रेजी में पढ़ाया जाने वाला पूरा 6-वर्षीय एमबीबीएस पाठ्यक्रम क्लिनिकल प्रैक्टिकल रोटेशन के साथ।',
    benefit3Title: 'किफायती फीस संरचना',
    benefit3Desc: 'बिना किसी हिडन चार्ज या डोनेशन के ₹2.8 लाख/वर्ष से शुरू होने वाली कम ट्यूशन फीस।',
    benefit4Title: 'भारतीय मेस और हॉस्टल',
    benefit4Desc: '24/7 सुरक्षा और भारतीय रसोइयों द्वारा तैयार प्रामाणिक भारतीय भोजन के साथ लड़कों और लड़कियों के लिए अलग हॉस्टल।',

    // Destinations Section
    topDestinationsTitle: 'भारतीय छात्रों के लिए शीर्ष एमबीबीएस देश',
    topDestinationsSubtitle: 'रूस, जॉर्जिया, किर्गिस्तान, उज्बेकिस्तान, आर्मेनिया और वियतनाम में किफायती एनएमसी-स्वीकृत चिकित्सा विश्वविद्यालयों की खोज करें।',
    learnMore: 'अधिक जानें',
    checkEligibility: 'पात्रता जांचें',

    // Admission Process Steps
    admissionProcessTitle: 'सरल 5-चरणीय प्रवेश प्रक्रिया',
    step1Title: 'चरण 1: निःशुल्क परामर्श',
    step1Desc: 'आपके एनईईटी स्कोर और बजट के आधार पर सर्वश्रेष्ठ विश्वविद्यालय का चयन करने के लिए विशेषज्ञ परामर्श।',
    step2Title: 'चरण 2: दस्तावेज़ीकरण',
    step2Desc: 'आवेदन जमा करना, 10वीं/12वीं प्रमाण पत्र सत्यापन और पासपोर्ट प्रक्रिया।',
    step3Title: 'चरण 3: प्रवेश पत्र',
    step3Desc: '7-10 कार्य दिवसों के भीतर आधिकारिक विश्वविद्यालय प्रवेश पत्र प्राप्त करें।',
    step4Title: 'चरण 4: वीजा और हवाई टिकट',
    step4Desc: '100% वीजा गारंटी, दूतावास की मुहर, और समूह हवाई टिकट बुकिंग।',
    step5Title: 'चरण 5: एयरपोर्ट पिकअप और हॉस्टल',
    step5Desc: 'हमारा प्रतिनिधि गंतव्य हवाई अड्डे पर छात्रों का स्वागत करता है और हॉस्टल में कमरा दिलाता है।',

    // Calculator Tool
    calcTitle: 'विदेश में एमबीबीएस योग्यता एवं फीस कैलकुलेटर',
    calcSubtitle: '30 सेकंड में अपने पात्र मेडिकल विश्वविद्यालयों और फीस पैकेज का पता लगाएं।',

    // Exams Teaser
    examsTeaserTitle: 'मेडिकल लाइसेंसिंग परीक्षा सहायता',
    fmgeTitle: 'एफएमजीई / नेक्स्ट परीक्षा कोचिंग',
    nmatTitle: 'एनमैट परीक्षा मार्गदर्शन',

    // Testimonials
    testimonialsTitle: 'हमारे छात्रों और अभिभावकों की राय',

    // Blogs Page
    blogJournalBadge: 'आधिकारिक चिकित्सा शिक्षा पत्रिका',
    blogHubTitle: 'मेडिको ओवरसीज ज्ञान केंद्र (ब्लॉग)',
    blogHubSub: 'एनएमसी 2026 गजट नियमों, विश्वविद्यालय फीस संरचना, एफएमजीई/नेक्स्ट परीक्षा रोडमैप और वास्तविक छात्र अनुभवों पर आधिकारिक गाइड।',
    blogSearchPlaceholder: 'देश, फीस या परीक्षा द्वारा लेख खोजें (जैसे रूस, फीस, एफएमजीई)...',
    blogFilterLabel: 'फ़िल्टर:',
    catAll: 'सभी लेख',
    catRussia: 'रूस एमबीबीएस',
    catGeorgia: 'जॉर्जिया एमबीबीएस',
    catKazakhstan: 'कजाकिस्तान',
    catUzbekistan: 'उज्बेकिस्तान',
    catKyrgyzstan: 'किर्गिस्तान',
    catArmenia: 'आर्मेनिया',
    catFmge: 'एफएमजीई / नेक्स्ट',
    catNmat: 'एनमैट तैयारी',
    blogLatestTitle: 'नवीनतम चिकित्सा शिक्षा लेख',
    blogShowing: 'दिखा रहा है',
    blogArticles: 'लेख',
    blogNoArticles: 'कोई लेख नहीं मिला',
    blogTryDifferent: 'किसी भिन्न कीवर्ड या श्रेणी फ़िल्टर से खोजने का प्रयास करें।',
    blogResetBtn: 'सभी फ़िल्टर रीसेट करें',
    blogReadFull: 'पूरा लेख पढ़ें',
    blogBy: 'द्वारा',

    // Footer
    footerDesc: 'मेडिको ओवरसीज भारत की प्रमुख मेडिकल अध्ययन परामर्श संस्था है। हम 100% पारदर्शी फीस संरचना के साथ एनएमसी और डब्ल्यूएचओ अनुमोदित राज्य चिकित्सा विश्वविद्यालयों में सीधा प्रवेश दिलाते हैं।',
    quickNav: 'त्वरित नेविगेशन',
    navAboutFull: 'मेडिको ओवरसीज के बारे में',
    navFaqsFull: 'छात्रों के अक्सर पूछे जाने वाले प्रश्न',
    navBlogsFull: 'मेडिकल समाचार और ब्लॉग',
    navExamsFull: 'एफएमजीई / नेक्स्ट परीक्षा तैयारी',
    navContactFull: 'कार्यालय शाखाओं से संपर्क करें',
    destinationsNav: 'एमबीबीएस देश',
    officeBranches: 'मुख्य एवं शाखा कार्यालय',
    getAlerts: 'प्रवेश अलर्ट प्राप्त करें',
    enterEmailPlaceholder: 'अपना ईमेल दर्ज करें',
    accreditedBy: 'द्वारा मान्यता प्राप्त एवं संबद्ध',
    nmcApproved: 'एनएमसी अनुमोदित',
    whoListed: 'डब्ल्यूएचओ सूचीबद्ध',
    healthMinistry: 'स्वास्थ्य मंत्रालय',
    usmleEligible: 'यूएसएमएलई और डब्ल्यूएफएमई पात्र',
    copyrightText: '© 2026 मेडिको ओवरसीज एजुकेशनल कंसल्टेंसी। सर्वाधिकार सुरक्षित।',

    // Admin Dashboard
    adminWelcome: 'स्वागत है, एडमिन 👋',
    adminSub: 'रियल-टाइम एमबीबीएस लीड कन्वर्जन, देश के आंकड़े और वेबसाइट सामग्री नियंत्रण।',
    tabDashboard: 'डैशबोर्ड और अवलोकन',
    tabLeads: 'लीड्स सीआरएम',
    tabAnalytics: 'ग्राफ और विश्लेषण',
    tabSettings: 'लीड ईमेल अलर्ट',
    tabBlogs: 'ब्लॉग सीएमएस',
    tabCountries: 'देश डेस्टिनेशन सीएमएस',
    tabTestimonials: 'समीक्षाएं (टेस्टिमोनियल्स)',
    statTotalLeads: 'कुल पूछताछ',
    statActiveCounseling: 'सक्रिय परामर्श',
    statEnrolled: 'नामांकित छात्र',
    statAlertEmails: 'अलर्ट ईमेल प्राप्तकर्ता',
    chartInquiryTrend: 'मासिक लीड वृद्धि रुझान',
    chartCountryShare: 'देश वार शेयर',
    tableHeaderStudent: 'छात्र का नाम',
    tableHeaderPhone: 'फोन नंबर',
    tableHeaderDestination: 'पसंदीदा देश',
    tableHeaderNeet: 'नीट स्कोर',
    tableHeaderStatus: 'स्थिति पाइपलाइन',
    tableHeaderDate: 'दिनांक',
    tableHeaderActions: 'कार्रवाई',
    btnExportCsv: 'सीएसवी डाउनलोड करें',
    btnRefreshData: 'डेटा रिफ्रेश करें'
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
