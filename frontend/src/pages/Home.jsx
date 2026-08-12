import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Shield, Award, GraduationCap, Users, Globe, Building2, Stethoscope,
  CheckCircle, ArrowRight, Star, Heart, FileText, Phone, Mail, Send, Clock, BookOpen, ChevronRight, ChevronLeft, Check, Quote, Sparkles, UserCheck, RefreshCw, MapPin, Navigation
} from 'lucide-react';
import AdmissionTracker from '../components/AdmissionTracker';
import VirtualTourModal from '../components/VirtualTourModal';
import VoiceAssistant from '../components/VoiceAssistant';
import SEO from '../components/SEO';
import TrustBar from '../components/TrustBar';
import AnimatedCounter from '../components/AnimatedCounter';
import { useLanguage } from '../utils/languageContext';
import { playAlertSound } from '../utils/soundNotification';

const Home = ({ onRequestCounselling }) => {
  const { lang, t } = useLanguage();
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [selectedTourCountry, setSelectedTourCountry] = useState('');
  // Hero Banner Slider State (4 Unique Slides with Real Doctor Photos)
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  // 100% Reliable Real Doctor Photos
  const slideDoctorPhotos = [
    {
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      alt: 'Real Doctor - Indian Medical Graduate'
    },
    {
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
      alt: 'Real Physician - MBBS Degree Abroad'
    },
    {
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      alt: 'Real Female Doctor - Global Medical Education'
    },
    {
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
      alt: 'Real Senior Doctor - Foreign Medical University'
    }
  ];

  // Auto slide hero banner every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // 6 Primary Destination Country Cards
  const defaultDestinations = [
    {
      country: 'Russia',
      country_hi: 'रूस में एमबीबीएस',
      flag: '🇷🇺',
      slug: 'mbbs-in-russia',
      fee: 'From ₹3.5 Lakhs / Year',
      fee_hi: '₹3.5 लाख / वर्ष से',
      totalPackage: '₹18 Lakhs to ₹28 Lakhs Total',
      totalPackage_hi: 'कुल ₹18 लाख से ₹28 लाख',
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
      blurb: 'Top Russian Federal Universities with English medium instruction, modern simulation labs, and WHO recognition.',
      blurb_hi: 'अंग्रेजी माध्यम, आधुनिक सिमुलेशन लैब और डब्ल्यूएचओ मान्यता प्राप्त शीर्ष रूसी संघीय विश्वविद्यालय।',
      badge: 'Most Popular',
      badge_hi: 'सर्वाधिक लोकप्रिय',
      highlights: [
        '100% English Medium Curriculum',
        'Direct Govt University Admissions',
        'On-Campus Indian Hostel & Mess'
      ],
      highlights_hi: [
        '100% अंग्रेजी माध्यम पाठ्यक्रम',
        'सीधा सरकारी विश्वविद्यालय प्रवेश',
        'कैंपस में भारतीय हॉस्टल व मेस'
      ],
      intake: 'Sept - Oct 2026',
      intake_hi: 'सितंबर - अक्टूबर 2026'
    },
    {
      country: 'Georgia',
      country_hi: 'जॉर्जिया में एमबीबीएस',
      flag: '🇬🇪',
      slug: 'mbbs-in-georgia',
      fee: 'From ₹4.5 Lakhs / Year',
      fee_hi: '₹4.5 लाख / वर्ष से',
      totalPackage: '₹22 Lakhs to ₹32 Lakhs Total',
      totalPackage_hi: 'कुल ₹22 लाख से ₹32 लाख',
      img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80',
      blurb: 'USMLE & WFME integrated European medical education with high FMGE passing rate and peaceful environment.',
      blurb_hi: 'यूएसएमएलई एवं डब्ल्यूएफएमई एकीकृत यूरोपीय चिकित्सा शिक्षा, उच्च एफएमजीई उत्तीर्ण दर और सुरक्षित वातावरण।',
      badge: 'High FMGE Pass %',
      badge_hi: 'उच्च FMGE उत्तीर्ण %',
      highlights: [
        'European Quality Standards',
        'USMLE & NEXT Focused Training',
        '100% Safety Ranking in Europe'
      ],
      highlights_hi: [
        'यूरोपीय गुणवत्ता मानक',
        'USMLE एवं NEXT आधारित प्रशिक्षण',
        'यूरोप में 100% सुरक्षा रैंकिंग'
      ],
      intake: 'Sept 2026',
      intake_hi: 'सितंबर 2026'
    },
    {
      country: 'Kazakhstan',
      country_hi: 'कजाकिस्तान में एमबीबीएस',
      flag: '🇰🇿',
      slug: 'mbbs-in-kazakhstan',
      fee: 'From ₹3.2 Lakhs / Year',
      fee_hi: '₹3.2 लाख / वर्ष से',
      totalPackage: '₹16 Lakhs to ₹22 Lakhs Total',
      totalPackage_hi: 'कुल ₹16 लाख से ₹22 लाख',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
      blurb: 'Affordable 5-year MBBS course in top Central Asian medical academies with low living costs.',
      blurb_hi: 'मध्य एशिया की शीर्ष मेडिकल अकादमियों में किफायती 5-वर्षीय एमबीबीएस पाठ्यक्रम और कम रहने का खर्च।',
      badge: 'Budget Friendly',
      badge_hi: 'किफायती बजट',
      highlights: [
        '5-Year MBBS Course Duration',
        'WHO & NMC Approved Colleges',
        'Low Living & Food Costs'
      ],
      highlights_hi: [
        '5-वर्षीय एमबीबीएस पाठ्यक्रम अवधि',
        'WHO एवं NMC अनुमोदित कॉलेज',
        'कम आवास व भोजन खर्च'
      ],
      intake: 'Sept 2026',
      intake_hi: 'सितंबर 2026'
    },
    {
      country: 'Uzbekistan',
      country_hi: 'उज्बेकिस्तान में एमबीबीएस',
      flag: '🇺🇿',
      slug: 'mbbs-in-uzbekistan',
      fee: 'From ₹2.8 Lakhs / Year',
      fee_hi: '₹2.8 लाख / वर्ष से',
      totalPackage: '₹14 Lakhs to ₹20 Lakhs Total',
      totalPackage_hi: 'कुल ₹14 लाख से ₹20 लाख',
      img: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80',
      blurb: 'State-owned medical academies with rich clinical exposure, low living expenses, and direct flights from Delhi.',
      blurb_hi: 'सरकारी मेडिकल अकादमियों में समृद्ध क्लिनिकल अनुभव, कम खर्च और दिल्ली से मात्र 3 घंटे की सीधी उड़ान।',
      badge: 'Trending',
      badge_hi: 'ट्रेंडिंग',
      highlights: [
        'State-Owned Tashkent Medical Academies',
        '3-Hour Flight from Delhi',
        'Rich Clinical Hospital Exposure'
      ],
      highlights_hi: [
        'सरकारी ताशकंद मेडिकल अकादमी',
        'दिल्ली से 3 घंटे की सीधी उड़ान',
        'समृद्ध क्लिनिकल अस्पताल अनुभव'
      ],
      intake: 'Sept 2026',
      intake_hi: 'सितंबर 2026'
    },
    {
      country: 'Kyrgyzstan',
      country_hi: 'किर्गिस्तान में एमबीबीएस',
      flag: '🇰🇬',
      slug: 'mbbs-in-kyrgyzstan',
      fee: 'From ₹2.5 Lakhs / Year',
      fee_hi: '₹2.5 लाख / वर्ष से',
      totalPackage: '₹14 Lakhs to ₹18 Lakhs Total',
      totalPackage_hi: 'कुल ₹14 लाख से ₹18 लाख',
      img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      blurb: 'Most affordable MBBS package in Central Asia with 100% Indian mess food and comfortable hostel rooms.',
      blurb_hi: 'मध्य एशिया में सबसे किफायती एमबीबीएस पैकेज, 100% भारतीय मेस भोजन और आरामदायक हॉस्टल।',
      badge: 'Lowest Package',
      badge_hi: 'न्यूनतम बजट',
      highlights: [
        'Lowest Tuition & Living Budget',
        'Top Osh & Kyrgyz State Univ',
        '100% Indian Mess Cooks'
      ],
      highlights_hi: [
        'न्यूनतम ट्यूशन व रहने का खर्च',
        'शीर्ष ओश व किर्गिज़ स्टेट यूनिवर्सिटी',
        '100% भारतीय रसोइये'
      ],
      intake: 'Sept 2026',
      intake_hi: 'सितंबर 2026'
    },
    {
      country: 'Armenia',
      country_hi: 'आर्मेनिया में एमबीबीएस',
      flag: '🇦🇲',
      slug: 'mbbs-in-armenia',
      fee: 'From ₹3.2 Lakhs / Year',
      fee_hi: '₹3.2 लाख / वर्ष से',
      totalPackage: '₹18 Lakhs to ₹24 Lakhs Total',
      totalPackage_hi: 'कुल ₹18 लाख से ₹24 लाख',
      img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
      blurb: 'Historic European medical traditions, safe student life, and 6-year English medium MD program.',
      blurb_hi: 'ऐतिहासिक यूरोपीय चिकित्सा परंपराएं, सुरक्षित छात्र जीवन और 6-वर्षीय अंग्रेजी माध्यम एमडी डिग्री।',
      badge: 'European Degree',
      badge_hi: 'यूरोपीय डिग्री',
      highlights: [
        'Yerevan State Medical Univ',
        '6-Year Integrated MD Degree',
        'High Clinical Standard Labs'
      ],
      highlights_hi: [
        'येरेवन स्टेट मेडिकल यूनिवर्सिटी',
        '6-वर्षीय एकीकृत एमडी डिग्री',
        'उच्च क्लिनिकल मानक लैब्स'
      ],
      intake: 'Sept 2026',
      intake_hi: 'सितंबर 2026'
    },
    {
      country: 'Vietnam',
      country_hi: 'वियतनाम में एमबीबीएस',
      flag: '🇻🇳',
      slug: 'mbbs-in-vietnam',
      fee: 'From ₹3.0 Lakhs / Year',
      fee_hi: '₹3.0 लाख / वर्ष से',
      totalPackage: '₹16 Lakhs to ₹22 Lakhs Total',
      totalPackage_hi: 'कुल ₹16 लाख से ₹22 लाख',
      img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      blurb: 'Rapidly emerging Asian destination offering modern multi-specialty clinical training hospitals.',
      blurb_hi: 'आधुनिक मल्टी-स्पेशियलिटी क्लिनिकल प्रशिक्षण अस्पतालों के साथ तेजी से उभरता एशियाई मेडिकल गंतव्य।',
      badge: 'New Destination',
      badge_hi: 'नया गंतव्य',
      highlights: [
        'Modern Multi-Specialty Hospitals',
        'Affordable Asian Living Cost',
        'Can Tho Medical University'
      ],
      highlights_hi: [
        'आधुनिक मल्टी-स्पेशियलिटी अस्पताल',
        'किफायती एशियाई जीवन यापन खर्च',
        'कैन थो मेडिकल यूनिवर्सिटी'
      ],
      intake: 'Sept 2026',
      intake_hi: 'सितंबर 2026'
    }
  ];

  const [destinations, setDestinations] = useState(defaultDestinations);

  useEffect(() => {
    const saved = localStorage.getItem('custom_destinations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const defaultSlugs = defaultDestinations.map(d => d.slug);
          const customAdds = parsed.filter(d => !defaultSlugs.includes(d.slug));
          setDestinations([...defaultDestinations, ...customAdds]);
        }
      } catch (err) {}
    }
  }, []);

  // Icon Mapping Helper
  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'UserCheck': return UserCheck;
      case 'FileText': return FileText;
      case 'Building2': return Building2;
      case 'ShieldCheck': return ShieldCheck;
      case 'Send': return Send;
      default: return GraduationCap;
    }
  };

  const defaultRoadmapSteps = [
    { 
      step: '01', 
      title: 'Consultation', 
      title_hi: 'व्यक्तिगत परामर्श',
      desc: '1-on-1 career counselling with expert medical advisors to evaluate budget, NEET score, and target country.', 
      desc_hi: 'बजट, नीट स्कोर और पसंदीदा देश के आधार पर सर्वश्रेष्ठ विश्वविद्यालय चुनने के लिए 1-ऑन-1 विशेषज्ञ परामर्श।',
      iconName: 'UserCheck', 
      color: '#f97316' 
    },
    { 
      step: '02', 
      title: 'Documentation Verification', 
      title_hi: 'दस्तावेज़ सत्यापन',
      desc: 'Strict verification of 10th & 12th board marksheets, NEET qualification scorecard, and passport check.', 
      desc_hi: '10वीं और 12वीं की मार्कशीट, नीट योग्यता स्कोरकार्ड और पासपोर्ट का पारदर्शी सत्यापन।',
      iconName: 'FileText', 
      color: '#0ea5e9' 
    },
    { 
      step: '03', 
      title: 'University Selection & Offer', 
      title_hi: 'विश्वविद्यालय चयन एवं ऑफर लेटर',
      desc: 'Direct seat allocation in top WHO & NMC approved university and issuance of official admission letter.', 
      desc_hi: 'शीर्ष डब्ल्यूएचओ और एनएमसी मान्यता प्राप्त कॉलेज में सीधा सीट आवंटन और 7-10 दिनों में आधिकारिक प्रवेश पत्र।',
      iconName: 'Building2', 
      color: '#10b981' 
    },
    { 
      step: '04', 
      title: 'Visa & Embassy Stamping', 
      title_hi: 'वीजा और दूतावास मुहर',
      desc: 'Embassy invitation letter issuance, student visa application, MEA apostille, and forex currency exchange.', 
      desc_hi: 'दूतावास निमंत्रण पत्र, छात्र वीजा आवेदन, विदेश मंत्रालय अपोस्टिल और विदेशी मुद्रा विनिमय सहायता।',
      iconName: 'ShieldCheck', 
      color: '#8b5cf6' 
    },
    { 
      step: '05', 
      title: 'Departure & On-Ground Care', 
      title_hi: 'प्रस्थान और विदेशी कैंपस सहायता',
      desc: 'Group flight departure from India with Medico team, airport reception, and hostel room allocation.', 
      desc_hi: 'मेडिको टीम के साथ भारत से समूह उड़ान, गंतव्य हवाई अड्डे पर स्वागत और सुरक्षित हॉस्टल कमरा आवंटन।',
      iconName: 'Send', 
      color: '#e15b3f' 
    }
  ];

  const [admissionSteps, setAdmissionSteps] = useState(defaultRoadmapSteps);

  // Footer Lead Capture Form State
  const [footerLeadForm, setFooterLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'Russia',
    neetScore: ''
  });
  const [footerLeadSuccess, setFooterLeadSuccess] = useState('');
  const [footerLeadError, setFooterLeadError] = useState('');
  const [footerLeadLoading, setFooterLeadLoading] = useState(false);

  const handleFooterLeadSubmit = async (e) => {
    e.preventDefault();
    setFooterLeadLoading(true);
    setFooterLeadError('');
    setFooterLeadSuccess('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...footerLeadForm, sourcePage: 'Homepage Pre-Footer Form' })
      });
      const data = await res.json();
      if (data.success) {
        playAlertSound();
        setFooterLeadSuccess(lang === 'hi'
          ? '🎉 आदरणीय छात्र एवं अभिभावक, धन्यवाद! आपका परामर्श अनुरोध प्राप्त हो गया है। एक पुष्टिकरण आपके ईमेल पर भेजा गया है, और हमारे वरिष्ठ सलाहकार 15-30 मिनट में आपसे संपर्क करेंगे।'
          : '🎉 Respected Student & Parents, thank you! Your counseling request is received. A confirmation has been sent to your email, and our senior advisor will call you within 15–30 minutes.');
        setFooterLeadForm({ name: '', phone: '', email: '', country: 'Russia', neetScore: '' });
      } else {
        setFooterLeadError(data.message || (lang === 'hi' ? 'आवेदन जमा करने में त्रुटि हुई।' : 'Error submitting application.'));
      }
    } catch (err) {
      setFooterLeadError(lang === 'hi' ? 'सर्वर से कनेक्ट नहीं हो सका। कृपया पुनः प्रयास करें या सीधे कॉल करें।' : 'Could not connect to server. Please try again or call directly.');
    } finally {
      setFooterLeadLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/admission-steps')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setAdmissionSteps(data.data);
        }
      })
      .catch(err => {
        console.log('Using default admission steps:', err.message);
      });
  }, []);

  // Testimonials Carousel Items (6 Doctors for Smooth Multi-Card 1-by-1 Carousel)
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  const defaultTestimonials = [
    {
      name: 'Dr. Rohan Deshmukh',
      role: 'Practicing Physician (FMGE Cleared)',
      role_hi: 'अभ्यासी चिकित्सक (FMGE उत्तीर्ण)',
      college: 'Bashkir State Medical University, Russia',
      college_hi: 'बशकिर स्टेट मेडिकल यूनिवर्सिटी, रूस',
      year: 'Batch of 2024',
      text: 'Medico Overseas made my dream of becoming a doctor a reality! From university selection to visa stamping and hostel setup, their team supported me at every single step.',
      text_hi: 'मेडिको ओवरसीज ने डॉक्टर बनने के मेरे सपने को सच कर दिखाया! विश्वविद्यालय चयन से लेकर वीजा स्टाम्पिंग और हॉस्टल आवंटन तक, उनकी टीम ने हर कदम पर पूरा सहयोग दिया।',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Dr. Ananya Roy',
      role: 'Intern Doctor (NEXT Prep Phase)',
      role_hi: 'इंटर्न डॉक्टर (NEXT तैयारी चरण)',
      college: 'Tbilisi State Medical University, Georgia',
      college_hi: 'त्बिलिसी स्टेट मेडिकल यूनिवर्सिटी, जॉर्जिया',
      year: 'Batch of 2025',
      text: 'Extremely transparent process! No hidden costs, direct university fees payment, and 24/7 student support in Georgia made my MBBS journey completely smooth.',
      text_hi: 'अत्यंत पारदर्शी प्रक्रिया! कोई छुपा शुल्क नहीं, सीधे विश्वविद्यालय काउंटर पर फीस भुगतान और 24/7 स्थानीय छात्र सहायता ने मेरी यात्रा को बेहद सुगम बनाया।',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Dr. Sarthak Patel',
      role: 'Resident Physician',
      role_hi: 'रेजिडेंट फिजिशियन',
      college: 'Tashkent Medical Academy, Uzbekistan',
      college_hi: 'ताशकंद मेडिकल एकेडमी, उज्बेकिस्तान',
      year: 'Batch of 2023',
      text: 'No hidden charges or fake promises. The fee structure given during counselling matched 100% with the university fee counter. Highly recommend Medico Overseas!',
      text_hi: 'कोई छुपा शुल्क या झूठे वादे नहीं। काउंसलिंग के समय बताई गई फीस संरचना विश्वविद्यालय के शुल्क काउंटर से 100% मेल खाती थी। अत्यधिक अनुशंसित!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Junior Resident Doctor',
      role_hi: 'जूनियर रेजिडेंट डॉक्टर',
      college: 'Astana Medical University, Kazakhstan',
      college_hi: 'अस्ताना मेडिकल यूनिवर्सिटी, कजाकिस्तान',
      year: 'Batch of 2024 (FMGE Score 218)',
      text: 'The integrated FMGE test series and faculty mentorship provided alongside MBBS curriculum were game-changers. Passed FMGE on my very first attempt!',
      text_hi: 'एमबीबीएस के साथ प्रदान की गई एकीकृत एफएमजीई टेस्ट सीरीज़ और फैकल्टी मेंटरशिप ने बहुत मदद की। मैंने पहले ही प्रयास में एफएमजीई पास किया!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      name: 'Dr. Vikram Mehta',
      role: 'Medical Officer',
      role_hi: 'चिकित्सा अधिकारी',
      college: 'Osh State University, Kyrgyzstan',
      college_hi: 'ओश स्टेट यूनिवर्सिटी, किर्गिस्तान',
      year: 'Batch of 2023',
      text: 'Prompt Indian mess facility arrangement and continuous on-ground guardianship throughout my 5.5 years in Osh gave my parents complete peace of mind.',
      text_hi: 'भारतीय मेस व्यवस्था और ओश में मेरे 5.5 वर्षों के दौरान निरंतर स्थानीय सहायता ने मेरे माता-पिता को पूर्ण मानसिक शांति दी।',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
    }
  ];

  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          const apiItems = data.data.map(item => ({
            name: item.name || 'Dr. Medical Student',
            role: item.role || 'MBBS Student',
            college: item.university || 'Medical University',
            year: 'Batch of 2026',
            text: item.quote || item.content || 'Great experience studying MBBS abroad with Medico Overseas.',
            rating: item.rating || 5,
            avatar: item.avatar || item.image || 'https://randomuser.me/api/portraits/men/45.jpg'
          }));
          setDynamicTestimonials(apiItems);
        }
      })
      .catch(() => {});
  }, []);

  const testimonials = [...dynamicTestimonials, ...defaultTestimonials];

  // Auto slide testimonials carousel every 2.5 seconds moving 1-by-1 unless hovered
  useEffect(() => {
    if (isTestimonialPaused) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isTestimonialPaused, testimonials.length]);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  // Dynamic Blog Guidance Articles State (Fetched from REST API, latest inserted first)
  const defaultBlogArticles = [
    {
      _id: 'blog-1',
      title: 'Complete Guide to MBBS in Russia 2026: Fee Structure, Eligibility & NMC Guidelines',
      title_hi: 'रूस में एमबीबीएस पूर्ण गाइड 2026: फीस संरचना, पात्रता और एनएमसी दिशानिर्देश',
      slug: 'guide-to-mbbs-in-russia-2026',
      category: 'Russia',
      category_hi: 'रूस 🇷🇺',
      excerpt: 'Everything Indian students need to know before applying for MBBS in top Russian medical universities including Bashkir State & Kazan Federal.',
      excerpt_hi: 'बशकिर स्टेट और कजान फेडरल सहित शीर्ष रूसी विश्वविद्यालयों में आवेदन करने से पहले भारतीय छात्रों के लिए सभी आवश्यक जानकारी।',
      image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2026-08-01'
    },
    {
      _id: 'blog-2',
      title: 'How to Crack FMGE / NEXT Exam on First Attempt: Preparation Roadmap for Abroad Graduates',
      title_hi: 'पहले प्रयास में एफएमजीई / नेक्स्ट परीक्षा कैसे क्रैक करें: विदेश स्नातकों के लिए तैयारी रोडमैप',
      slug: 'crack-fmge-next-exam-first-attempt',
      category: 'FMGE',
      category_hi: 'एफएमजीई',
      excerpt: 'Step-by-step strategy for foreign medical graduates to excel in FMGE and NEXT licensing exams with high passing scores.',
      excerpt_hi: 'विदेशी मेडिकल स्नातकों के लिए एफएमजीई और नेक्स्ट लाइसेंसिंग परीक्षाओं में उच्च अंक प्राप्त करने की चरणबद्ध रणनीति।',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2026-07-28'
    },
    {
      _id: 'blog-3',
      title: 'Why Georgia is Becoming the #1 Medical Education Hub for Indian Students',
      title_hi: 'जॉर्जिया भारतीय छात्रों के लिए नंबर 1 मेडिकल एजुकेशन हब क्यों बन रहा है',
      slug: 'georgia-number-1-medical-hub',
      category: 'Georgia',
      category_hi: 'जॉर्जिया 🇬🇪',
      excerpt: 'Explore European standards of education, high FMGE pass rate, safe environment, and clinical rotations in Georgia.',
      excerpt_hi: 'यूरोपीय शिक्षा मानक, उच्च एफएमजीई उत्तीर्ण दर, सुरक्षित वातावरण और जॉर्जिया में क्लिनिकल रोटेशन का अन्वेषण करें।',
      image: 'https://images.unsplash.com/photo-1527631746610-1da099419574?auto=format&fit=crop&w=800&q=80',
      publishedAt: '2026-07-20'
    }
  ];

  const [blogArticles, setBlogArticles] = useState(defaultBlogArticles);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          const sorted = [...data.data].sort((a, b) => new Date(b.publishedAt || b.createdAt || Date.now()) - new Date(a.publishedAt || a.createdAt || Date.now()));
          setBlogArticles(sorted.slice(0, 3));
        }
      })
      .catch(err => {
        console.log('Using default blog articles fallback:', err.message);
      });
  }, []);

  return (
    <div>

      {/* 1. HERO BANNER SLIDER WITH REAL DOCTOR PHOTOS (FULL SCREEN WIDTH) */}
      <section className="hero-section" style={{ margin: 0, padding: 0, background: '#f8fafc', position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>

          {/* SLIDE 1: Deep Navy Mesh Gradient with Floating Orbs */}
          {currentSlide === 0 && (
            <div style={{ 
              background: 'linear-gradient(135deg, #0B1426 0%, #0e233a 45%, #1a0b2e 100%)',
              minHeight: '540px', position: 'relative', overflow: 'hidden'
            }}>
              {/* Floating decorative orbs */}
              <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(225,91,63,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '40%', left: '40%', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
              {/* Grid mesh overlay */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
              
              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', minHeight: '540px', padding: '16px 70px 40px 70px', position: 'relative', zIndex: 2 }}>
                <div style={{ color: '#ffffff' }}>
                  {/* Badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(225,91,63,0.2)', border: '1px solid rgba(225,91,63,0.5)', padding: '6px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', color: '#ff8a73', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
                    🎓 {t('ourServices')}
                  </div>

                  <h1 style={{ color: '#ffffff', fontSize: '46px', fontWeight: '900', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-1px' }}>
                    {t('heroTitle0')}
                  </h1>
                  <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px', maxWidth: '520px' }}>
                    {t('heroSub0')}
                  </p>

                  {/* Service Pills */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[t('univAdmissions'), t('visaDocs'), t('scholarshipGuidance')].map((s, i) => (
                      <span key={i} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', color: '#e2e8f0', padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: '600' }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  {/* Glassmorphism image frame */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '-14px', borderRadius: '28px', background: 'linear-gradient(135deg, rgba(225,91,63,0.4), rgba(59,130,246,0.3))', filter: 'blur(20px)' }} />
                    <div style={{ position: 'relative', width: '330px', height: '380px', borderRadius: '24px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.15)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                      <img src={slideDoctorPhotos[0].img} alt={slideDoctorPhotos[0].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,20,38,0.5) 0%, transparent 60%)' }} />
                    </div>
                    {/* Floating badge on image */}
                    <div style={{ position: 'absolute', bottom: '20px', left: '-20px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', padding: '12px 18px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#fff' }}>✓</div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>NMC Approved</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>100% Recognized</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: Royal Electric Blue with Diagonal Stripes */}
          {currentSlide === 1 && (
            <div style={{ 
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)',
              minHeight: '540px', position: 'relative', overflow: 'hidden'
            }}>
              {/* Diagonal accent stripes */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 80px)', pointerEvents: 'none' }} />
              {/* Glow blobs */}
              <div style={{ position: 'absolute', top: '-100px', left: '30%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-80px', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 65%)', pointerEvents: 'none' }} />

              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', padding: '16px 70px 40px 70px', minHeight: '540px', position: 'relative', zIndex: 2 }}>
                <div style={{ color: '#ffffff' }}>
                  <div style={{ display: 'inline-block', background: 'linear-gradient(90deg, #f97316, #ef4444)', color: '#ffffff', padding: '6px 18px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '22px', textTransform: 'uppercase', boxShadow: '0 4px 15px rgba(249,115,22,0.4)' }}>
                    {lang === 'hi' ? '🌍 एनएमसी एवं डब्ल्यूएचओ मान्यता प्राप्त' : '🌍 NMC & WHO ACCREDITED UNIVERSITIES'}
                  </div>

                  <h1 style={{ color: '#ffffff', fontSize: '46px', fontWeight: '900', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-0.5px' }}>
                    {lang === 'hi' ? (
                      <>अपने जुनून को बदलें <br /> एक <span style={{ color: '#f97316', textShadow: '0 0 30px rgba(249,115,22,0.5)' }}>वैश्विक मेडिकल करियर</span> में</>
                    ) : (
                      <>Transform Your Passion <br /> Into a <span style={{ color: '#f97316', textShadow: '0 0 30px rgba(249,115,22,0.5)' }}>Global Medical Career</span></>
                    )}
                  </h1>

                  <p style={{ color: '#93c5fd', fontSize: '16px', lineHeight: '1.7', marginBottom: '32px', maxWidth: '520px' }}>
                    {lang === 'hi'
                      ? 'रूस, जॉर्जिया, किर्गिस्तान, उज्बेकिस्तान, आर्मेनिया और वियतनाम के शीर्ष सरकारी मेडिकल विश्वविद्यालयों में एमबीबीएस की पढ़ाई करें।'
                      : 'Study MBBS in world-class government medical universities across Russia, Georgia, Kyrgyzstan, Uzbekistan, Armenia, and Vietnam.'}
                  </p>

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
                    <button className="btn-primary" onClick={onRequestCounselling} style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#ffffff', padding: '14px 34px', fontSize: '15px', borderRadius: '30px', border: 'none', fontWeight: '700', boxShadow: '0 8px 25px rgba(249,115,22,0.5)' }}>
                      {lang === 'hi' ? 'निःशुल्क परामर्श प्राप्त करें' : 'Get Free Counselling'}
                    </button>
                    <a href="tel:+919876543210" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff', padding: '14px 24px', borderRadius: '30px', fontSize: '14px', fontWeight: '700', backdropFilter: 'blur(10px)' }}>
                      <Phone size={16} /> Call Now
                    </a>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#93c5fd' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} color="#f97316" /> info@medicooverseas.com</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} color="#f97316" /> medicooverseas.com</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <div style={{ position: 'relative' }}>
                    {/* Glowing ring */}
                    <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', background: 'conic-gradient(from 0deg, #f97316, #6366f1, #10b981, #f97316)', filter: 'blur(3px)', opacity: 0.8 }} />
                    <div style={{ width: '330px', height: '330px', borderRadius: '50%', background: '#eff6ff', border: '8px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative' }}>
                      <img src={slideDoctorPhotos[1].img} alt={slideDoctorPhotos[1].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
                    </div>
                    {/* Floating country flags */}
                    <div style={{ position: 'absolute', top: '-10px', right: '-30px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 14px', borderRadius: '12px', fontSize: '22px' }}>🇷🇺🇬🇪🇰🇿</div>
                    <div style={{ position: 'absolute', bottom: '20px', left: '-30px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 14px', borderRadius: '12px', fontSize: '22px' }}>🇺🇿🇦🇲🇻🇳</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: Executive Sapphire & Gold Luxury Theme */}
          {currentSlide === 2 && (
            <div style={{ 
              background: 'linear-gradient(135deg, #0b1727 0%, #112240 50%, #1e3a8a 100%)',
              minHeight: '540px', position: 'relative', overflow: 'hidden'
            }}>
              {/* Geometric Grid Mesh + Ambient Lighting */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '-100px', right: '20%', width: '550px', height: '550px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-80px', left: '-50px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 65%)', pointerEvents: 'none' }} />

              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', padding: '16px 70px 40px 70px', minHeight: '540px', position: 'relative', zIndex: 2 }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '6px 18px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '22px' }}>
                    🏆 {lang === 'hi' ? 'भारत का अग्रणी परामर्श' : "India's Premier Consultancy"}
                  </div>

                  <h1 style={{ color: '#ffffff', fontSize: '46px', fontWeight: '900', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-0.5px' }}>
                    {lang === 'hi' ? (
                      <>शीर्ष विदेशी मेडिकल <br /> <span style={{ color: '#fbbf24', textShadow: '0 0 25px rgba(251,191,36,0.4)' }}>विश्वविद्यालयों का प्रवेश द्वार</span></>
                    ) : (
                      <>Your Gateway to Top <br /> <span style={{ color: '#fbbf24', textShadow: '0 0 25px rgba(251,191,36,0.4)' }}>Foreign Medical Universities</span></>
                    )}
                  </h1>

                  <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: '1.7', marginBottom: '36px', maxWidth: '520px' }}>
                    {lang === 'hi'
                      ? '100% अंग्रेजी माध्यम, यूरोपीय क्लिनिकल सिमुलेशन लैब और प्रथम वर्ष से ही एकीकृत एफएमजीई/नेक्स्ट परीक्षा कोचिंग।'
                      : '100% English medium instruction, European clinical simulation labs, and integrated FMGE / NEXT exam coaching from Year 1.'}
                  </p>

                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button className="btn-primary" onClick={onRequestCounselling} style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', color: '#ffffff', padding: '16px 40px', fontSize: '15px', borderRadius: '50px', border: 'none', fontWeight: '800', boxShadow: '0 10px 30px rgba(249,115,22,0.45)' }}>
                      {lang === 'hi' ? 'आज ही शुरुआत करें' : 'Get Started Today'}
                    </button>
                    <a href="tel:+919876543210" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '14px', fontWeight: '700', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '14px 24px', borderRadius: '50px', backdropFilter: 'blur(10px)' }}>
                      <Phone size={16} /> +91 98765 43210
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '-16px', borderRadius: '28px', background: 'linear-gradient(135deg, rgba(245,158,11,0.3), rgba(59,130,246,0.3))', filter: 'blur(25px)' }} />
                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px', borderRadius: '28px', border: '2px solid rgba(255,255,255,0.18)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', width: '340px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backdropFilter: 'blur(12px)', position: 'relative' }}>
                      <img src={slideDoctorPhotos[2].img} alt={slideDoctorPhotos[2].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: '20px' }} />
                    </div>
                    <div style={{ position: 'absolute', top: '20px', right: '-20px', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.15)', padding: '12px 18px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: '900', color: '#fbbf24' }}>
                        5,000+
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>Students Placed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: Modern Vector Wave Curved Poster Banner */}
          {currentSlide === 3 && (
            <div style={{ 
              background: '#ffffff',
              minHeight: '540px', position: 'relative', overflow: 'hidden'
            }}>
              {/* SVG Layered Curved Waves (Orange Ribbon, Silver Separator, and Deep Navy Base) */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
                <svg viewBox="0 0 1440 600" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <linearGradient id="orangeWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff7849" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                    <linearGradient id="silverStripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#cbd5e1" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="navyWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a" />
                      <stop offset="40%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#0b132b" />
                    </linearGradient>
                  </defs>

                  {/* Layer 1: Vibrant Orange Vector Curve */}
                  <path fill="url(#orangeWaveGrad)" d="M -100,390 Q 250,330 500,450 T 1100,410 T 1540,470 L 1540,650 L -100,650 Z" />
                  
                  {/* Layer 2: Silver Metallic Separator Line */}
                  <path fill="url(#silverStripeGrad)" d="M -100,420 Q 250,360 500,475 T 1100,435 T 1540,495 L 1540,510 Q 1100,450 500,490 T -100,420 Z" opacity="0.95" />

                  {/* Layer 3: Deep Royal Navy Wave Base */}
                  <path fill="url(#navyWaveGrad)" d="M -100,435 Q 250,375 500,490 T 1100,450 T 1540,510 L 1540,650 L -100,650 Z" />
                </svg>
              </div>

              {/* Main Content Grid */}
              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', padding: '16px 70px 50px 70px', minHeight: '540px', position: 'relative', zIndex: 2 }}>
                
                {/* Left Text Column - Pure Clean White Area for 100% Readability */}
                <div>
                  <div style={{ color: '#ea580c', fontSize: '13px', fontWeight: '900', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '22px', height: '3px', background: '#ea580c', borderRadius: '3px' }} />
                    {lang === 'hi' ? 'अपनी मेडिकल यात्रा शुरू करें' : 'BEGIN YOUR MEDICAL JOURNEY'}
                  </div>

                  <h1 style={{ color: '#0f172a', fontSize: '46px', fontWeight: '900', lineHeight: '1.15', marginBottom: '18px', letterSpacing: '-1px' }}>
                    {lang === 'hi' ? (
                      <>विश्वस्तरीय एमबीबीएस <br /><span style={{ color: '#f97316' }}>बिना भारी डोनेशन के</span></>
                    ) : (
                      <>World-Class MBBS <br /><span style={{ color: '#f97316' }}>Without Heavy Capitation</span></>
                    )}
                  </h1>

                  <p style={{ color: '#1e293b', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px', maxWidth: '480px', fontWeight: '600' }}>
                    {lang === 'hi'
                      ? 'विश्वविद्यालय चयन, पात्रता जांच, और एमईए वीजा अपोस्टिल से लेकर भारतीय हॉस्टल मेस तक पूर्ण सहायता।'
                      : 'Complete end-to-end support from university selection, eligibility check, and MEA visa apostille to Indian hostel mess setup.'}
                  </p>

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button 
                      className="btn-primary" 
                      onClick={onRequestCounselling} 
                      style={{ 
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', 
                        color: '#ffffff', 
                        padding: '14px 34px', 
                        fontSize: '15px', 
                        borderRadius: '50px', 
                        border: 'none', 
                        fontWeight: '800', 
                        boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {lang === 'hi' ? 'निःशुल्क परामर्श प्राप्त करें' : 'Get Free Counselling'} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Right Column: Doctor Photo in Navy Ring Frame */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '-10px', borderRadius: '50%', background: 'rgba(15, 23, 42, 0.12)', filter: 'blur(12px)' }} />
                    
                    <div style={{ 
                      width: '270px', 
                      height: '270px', 
                      borderRadius: '50%', 
                      background: '#ffffff', 
                      border: '6px solid #0f172a', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      overflow: 'hidden', 
                      boxShadow: '0 16px 36px rgba(15, 23, 42, 0.2)', 
                      position: 'relative' 
                    }}>
                      <img 
                        src={slideDoctorPhotos[3].img} 
                        alt={slideDoctorPhotos[3].alt} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} 
                      />
                    </div>

                    {/* Floating Trust Card */}
                    <div style={{ position: 'absolute', bottom: '8px', right: '-12px', background: '#ffffff', border: '1px solid #e2e8f0', padding: '8px 14px', borderRadius: '14px', boxShadow: '0 8px 20px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: '900', fontSize: '14px' }}>✓</div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a' }}>100% Direct</div>
                        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>Govt University</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Dark Navy Bar Credentials */}
              <div style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', color: '#93c5fd', fontSize: '11px', fontWeight: '700', flexWrap: 'wrap', padding: '0 24px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><ShieldCheck size={13} color="#f97316" /> NMC & WHO Approved</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Award size={13} color="#f97316" /> Direct Fee Deposit</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><GraduationCap size={13} color="#f97316" /> FMGE / NEXT Coaching</span>
              </div>
            </div>
          )}

          {/* LEFT CAROUSEL ARROW BUTTON */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
            aria-label="Previous Slide"
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(6px)',
              color: '#ffffff',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
              transition: 'all 0.25s ease'
            }}
            className="carousel-arrow-btn"
          >
            <ChevronLeft size={24} />
          </button>

          {/* RIGHT CAROUSEL ARROW BUTTON */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
            aria-label="Next Slide"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(6px)',
              color: '#ffffff',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
              transition: 'all 0.25s ease'
            }}
            className="carousel-arrow-btn"
          >
            <ChevronRight size={24} />
          </button>

          {/* SLIDE INDICATOR DOTS */}
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '8px' }}>
            {[...Array(totalSlides)].map((_, sIdx) => (
              <button
                key={sIdx}
                onClick={() => setCurrentSlide(sIdx)}
                aria-label={`Go to slide ${sIdx + 1}`}
                style={{
                  width: currentSlide === sIdx ? '28px' : '9px',
                  height: '9px',
                  borderRadius: '10px',
                  background: currentSlide === sIdx ? '#f97316' : 'rgba(255,255,255,0.6)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 2. QUICK-GLANCE TRUST BAR (AUTOSCROLL ANIMATED COUNTERS) */}
      <TrustBar />

      {/* 3. "WHY STUDY MBBS ABROAD" SECTION — 6 EXTRACTED BENEFIT CARDS WITH COMPACT SPACING & GRAY HOVER */}
      <section style={{ padding: '20px 0', background: '#f8fafc' }}>
        <style>{`
          .why-mbbs-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 18px;
            padding: 24px;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          }
          .why-mbbs-card:hover {
            background: #e2e8f0 !important;
            border-color: #cbd5e1 !important;
            transform: translateY(-4px);
            box-shadow: 0 14px 28px rgba(31, 56, 100, 0.1) !important;
          }
        `}</style>
        <div className="container">

          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 16px auto' }}>
            <span className="badge-coral" style={{ marginBottom: '8px' }}>
              {lang === 'hi' ? 'मुख्य लाभ' : 'Key Benefits'}
            </span>
            <h2 style={{ fontSize: '28px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '8px' }}>
              {lang === 'hi' ? 'विदेश में एमबीबीएस क्यों करें?' : 'Why Study MBBS Abroad?'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: '1.5' }}>
              {lang === 'hi'
                ? 'हर साल 25,000 से अधिक भारतीय चिकित्सा छात्र शीर्ष डब्ल्यूएचओ और एनएमसी-अनुमोदित विदेशी विश्वविद्यालयों को चुनते हैं। यहां 6 प्राथमिक कारण दिए गए हैं:'
                : 'Over 25,000 Indian medical aspirants choose top WHO & NMC-approved foreign medical universities every year. Here are 6 primary reasons:'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>

            {/* Card 1 */}
            <div className="why-study-card theme-coral">
              <div className="card-icon-box" style={{ background: '#fff4f1', color: '#e15b3f' }}>
                <Award size={28} />
              </div>
              <h3 className="card-title">
                {lang === 'hi' ? 'विश्व स्तर पर मान्यता प्राप्त डिग्रियां' : 'Globally Recognized Degrees'}
              </h3>
              <p className="card-desc">
                {lang === 'hi'
                  ? 'मेडिकल डिग्रियां (एमडी/एमबीबीएस) एनएमसी 2021 गजट के नियमों का पूरी तरह पालन करती हैं और डब्ल्यूएचओ में सूचीबद्ध हैं।'
                  : 'Medical degrees (MD/MBBS) strictly comply with NMC 2021 Gazette guidelines and are listed in WHO WDOMS, making graduates eligible for FMGE, NEXT, USMLE, and PLAB.'}
              </p>
            </div>

            {/* Card 2 */}
            <div className="why-study-card theme-blue">
              <div className="card-icon-box" style={{ background: '#f0f9ff', color: '#0284c7' }}>
                <Building2 size={28} />
              </div>
              <h3 className="card-title">
                {lang === 'hi' ? 'सस्ती ट्यूशन फीस और शून्य डोनेशन' : 'Affordable Tuition & Zero Capitation'}
              </h3>
              <p className="card-desc">
                {lang === 'hi'
                  ? 'भारत के निजी मेडिकल कॉलेजों की तुलना में 70% तक बचत करें, बिना किसी डोनेशन या छिपे शुल्क के। कुल 6-वर्षीय खर्च ₹14 लाख से ₹30 लाख तक है।'
                  : 'Save up to 70% compared to private medical colleges in India with zero donation or hidden fees. Total 6-year tuition & hostel cost ranges from ₹14 Lakhs to ₹30 Lakhs.'}
              </p>
            </div>

            {/* Card 3 */}
            <div className="why-study-card theme-emerald">
              <div className="card-icon-box" style={{ background: '#ecfdf5', color: '#10b981' }}>
                <Globe size={28} />
              </div>
              <h3 className="card-title">
                {lang === 'hi' ? '100% अंग्रेजी माध्यम पाठ्यक्रम' : '100% English Medium Curriculum'}
              </h3>
              <p className="card-desc">
                {lang === 'hi'
                  ? 'सभी 6 साल की मेडिकल पढ़ाई (5 साल थ्योरी + 1 साल इंटर्नशिप) पूरी तरह से अंग्रेजी माध्यम में वरिष्ठ अंतरराष्ट्रीय प्रोफेसरों द्वारा कराई जाती है।'
                  : 'All 6 years of medical studies (5 years theory + 1 year clinical internship) are taught entirely in English by experienced European & international faculty.'}
              </p>
            </div>

            {/* Card 4 */}
            <div className="why-study-card theme-orange">
              <div className="card-icon-box" style={{ background: '#fff7ed', color: '#f97316' }}>
                <Stethoscope size={28} />
              </div>
              <h3 className="card-title">
                {lang === 'hi' ? 'उन्नत क्लिनिकल प्रशिक्षण और आधुनिक लैब' : 'Advanced Clinical Training & Labs'}
              </h3>
              <p className="card-desc">
                {lang === 'hi'
                  ? 'उच्च रोगी प्रवाह वाले सरकारी अस्पतालों में व्यावहारिक बेडसाइड क्लिनिकल रोटेशन और आधुनिक सिमुलेशन लैब।'
                  : 'Practical bedside clinical rotations in government-affiliated hospitals with high patient flow, modern anatomical simulation labs, and diagnostic tools.'}
              </p>
            </div>

            {/* Card 5 */}
            <div className="why-study-card theme-purple">
              <div className="card-icon-box" style={{ background: '#faf5ff', color: '#7c3aed' }}>
                <BookOpen size={28} />
              </div>
              <h3 className="card-title">
                {lang === 'hi' ? 'एकीकृत एफएमजीई और नेक्स्ट परीक्षा तैयारी' : 'Integrated FMGE & NEXT Exam Prep'}
              </h3>
              <p className="card-desc">
                {lang === 'hi'
                  ? 'एमबीबीएस के पहले वर्ष से ही भारत के वरिष्ठ चिकित्सा प्रोफेसरों द्वारा लाइव ऑनलाइन कक्षाएं और विषयवार मॉक टेस्ट श्रृंखला।'
                  : 'Early licensing exam preparation starting from Year 1 with access to subject-wise question banks, live online faculty lectures, and FMGE mock test series.'}
              </p>
            </div>

            {/* Card 6 */}
            <div className="why-study-card theme-teal">
              <div className="card-icon-box" style={{ background: '#f0fdfa', color: '#0d9488' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 className="card-title">
                {lang === 'hi' ? 'सीधा प्रवेश और 100% वीजा सहायता' : 'Direct Admission & Visa Support'}
              </h3>
              <p className="card-desc">
                {lang === 'hi'
                  ? 'नीट योग्यता के आधार पर आधिकारिक सीट आवंटन, आसान वीजा स्वीकृति और विदेश में 6 वर्षों तक पूर्ण स्थानीय सहायता।'
                  : '100% transparent admission process with official university seat booking based on NEET qualification, hassle-free visa approval, and 6-year local student care.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DESTINATIONS PREVIEW GRID — 6 INTERACTIVE 3D FLIP CARDS */}
      <section id="destinations" style={{ padding: '20px 0', background: '#ffffff' }}>
        <div className="container">

          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 16px auto' }}>
            <span className="badge-navy" style={{ marginBottom: '8px' }}>
              {lang === 'hi' ? 'इंटरैक्टिव देश खोजकर्ता' : 'Interactive Country Explorer'}
            </span>
            <h2 style={{ fontSize: '28px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px' }}>
              {lang === 'hi' ? 'शीर्ष एमबीबीएस अध्ययन देशों का अन्वेषण करें' : 'Explore Top MBBS Destinations'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: '1.5' }}>
              {lang === 'hi'
                ? 'पूरी फीस विवरण, प्रवेश तिथियां और मुख्य विशेषताएं देखने के लिए नीचे दिए गए कार्ड पर क्लिक करें!'
                : 'Hover or tap any card below to flip and reveal full fee breakdown, intake dates, and university highlights!'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '22px' }}>
            {destinations.map((d, idx) => (
              <div key={idx} className="destination-flip-card" style={{ height: '280px' }}>
                <div className="destination-flip-card-inner">

                  {/* FRONT OF FLIP CARD (Full-Bleed Country Landmark Background Image) */}
                  <div className="destination-flip-card-front" style={{ position: 'relative', height: '280px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(15, 23, 42, 0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <img src={d.img} alt={`MBBS in ${d.country}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.65) 50%, rgba(15, 23, 42, 0.95) 100%)' }}></div>

                    {/* Top Left Badge */}
                    <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
                      <span style={{
                        background: d.badge === 'Most Popular' ? '#2563eb' : d.badge === 'Budget Friendly' ? '#10b981' : d.badge === 'Trending' ? '#ea580c' : '#7c3aed',
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}>
                        {lang === 'hi' ? (d.badge_hi || d.badge) : d.badge}
                      </span>
                    </div>

                    {/* Content Overlay at Bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', zIndex: 2, color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                        <span>{d.flag}</span> {lang === 'hi' ? (d.country_hi || d.country) : `MBBS in ${d.country}`}
                      </h3>
                      
                      <p style={{ fontSize: '12.5px', color: '#e2e8f0', lineHeight: '1.4', margin: '2px 0 8px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                        {lang === 'hi' ? (d.blurb_hi || d.blurb) : d.blurb}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                          {lang === 'hi' ? (d.fee_hi || d.fee) : d.fee}
                        </span>

                        <Link
                          to={`/destinations/${d.slug}`}
                          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
                          style={{
                            background: 'rgba(15, 23, 42, 0.88)',
                            backdropFilter: 'blur(8px)',
                            color: '#ffffff',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '800',
                            border: '1px solid rgba(255,255,255,0.3)',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                            transition: 'all 0.2s ease'
                          }}
                          className="explore-btn-pill"
                        >
                          {lang === 'hi' ? 'एक्सप्लोर' : 'Explore'} <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* BACK OF FLIP CARD (Revealed on 3D Rotation) */}
                  <div className="destination-flip-card-back" style={{ height: '280px', boxSizing: 'border-box', padding: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '19px', color: '#ffffff', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{d.flag}</span> {lang === 'hi' ? (d.country_hi || d.country) : `${d.country}`}
                        </h3>
                        <span style={{ background: '#f97316', color: '#ffffff', padding: '3px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '800' }}>
                          NMC Gazette
                        </span>
                      </div>

                      <div style={{ fontSize: '11px', color: '#93c5fd', fontWeight: '700', marginBottom: '10px', background: 'rgba(255,255,255,0.08)', padding: '6px 10px', borderRadius: '8px' }}>
                        {lang === 'hi' ? 'अनुमानित बजट:' : 'Est. Budget:'} {lang === 'hi' ? (d.totalPackage_hi || d.totalPackage) : d.totalPackage}
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px', color: '#e2e8f0' }}>
                          {(lang === 'hi' && d.highlights_hi ? d.highlights_hi : d.highlights).map((h, hIdx) => (
                            <li key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Check size={13} color="#f97316" /> {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative', zIndex: 20 }}>
                      <Link
                        to={`/destinations/${d.slug}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                        }}
                        className="btn-primary"
                        style={{
                          width: '100%',
                          background: 'linear-gradient(135deg, #E15B3F 0%, #C9452B 100%)',
                          color: '#ffffff',
                          padding: '9px',
                          borderRadius: '12px',
                          fontWeight: '800',
                          fontSize: '12px',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 12px rgba(225, 91, 63, 0.4)',
                          position: 'relative',
                          zIndex: 20,
                          pointerEvents: 'auto',
                          cursor: 'pointer'
                        }}
                      >
                        {lang === 'hi' ? 'कॉलेज और फीस देखें' : 'Explore Fees & Colleges'} <ArrowRight size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedTourCountry(d.country);
                          setTourModalOpen(true);
                        }}
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.16)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.35)',
                          padding: '7px',
                          borderRadius: '10px',
                          fontWeight: '700',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          position: 'relative',
                          zIndex: 20,
                          pointerEvents: 'auto'
                        }}
                      >
                        <Globe size={13} /> {lang === 'hi' ? '360° वर्चुअल्व टूर देखें' : 'View 360° Campus Tour'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ADMISSION PROCESS — SIMPLE & HIGH-IMPACT 5-STEP JOURNEY */}
      <section style={{ padding: '20px 0', background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', color: '#1e293b', position: 'relative', overflow: 'hidden' }}>
        <style>{`
          .admission-step-card {
            background: #ffffff;
            border-radius: 18px;
            padding: 22px 18px;
            border: 1px solid #fed7aa;
            box-shadow: 0 8px 24px rgba(234, 88, 12, 0.08);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .admission-step-card:hover {
            transform: translateY(-5px);
            background: #ffffff;
            border-color: #ea580c;
            box-shadow: 0 16px 36px rgba(234, 88, 12, 0.18);
          }
          .admission-step-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
            position: relative;
          }
          .continuous-progress-line {
            position: absolute;
            top: 40px;
            left: 5%;
            right: 5%;
            height: 4px;
            background: linear-gradient(90deg, #f97316 0%, #0ea5e9 25%, #10b981 50%, #8b5cf6 75%, #e15b3f 100%);
            box-shadow: 0 0 14px rgba(249, 115, 22, 0.45);
            border-radius: 4px;
            z-index: 1;
          }
          @media (max-width: 1024px) {
            .admission-step-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            .continuous-progress-line {
              display: none !important;
            }
          }
          @media (max-width: 640px) {
            .admission-step-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
        
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 24px auto' }}>
            <span className="badge-coral" style={{ marginBottom: '8px', fontSize: '11px', padding: '3px 10px' }}>
              {lang === 'hi' ? '⚡ सुचारू एवं पारदर्शी प्रक्रिया' : '⚡ Smooth & Transparent Process'}
            </span>
            <h2 style={{ color: '#7c2d12', fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
              {lang === 'hi' ? 'आसान 5-चरणीय प्रवेश यात्रा' : 'Simple 5-Step Admission Journey'}
            </h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.5', margin: 0 }}>
              {lang === 'hi'
                ? 'शुरुआती परामर्श से लेकर विदेशी कैंपस हॉस्टल तक, मेडिको ओवरसीज 100% पारदर्शिता के साथ हर कदम पर आपका मार्गदर्शन करता है।'
                : 'From initial consultation to foreign campus hostel arrival, Medico Overseas manages every step with 100% transparency.'}
            </p>
          </div>

          {/* 5 Step Cards Grid with Continuous Colored Progress Line */}
          <div className="admission-step-grid">
            <div className="continuous-progress-line" />

            {admissionSteps.map((item, idx) => {
              const StepIcon = getStepIcon(item.iconName);
              const color = item.color || '#f97316';

              return (
                <div 
                  key={idx} 
                  className="admission-step-card"
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', position: 'relative', zIndex: 3 }}>
                      <span style={{ fontSize: '11px', fontWeight: '900', background: '#1e293b', color: '#ffffff', padding: '4px 12px', borderRadius: '12px', border: `1.5px solid ${color}`, boxShadow: `0 2px 8px ${color}33` }}>
                        {lang === 'hi' ? `चरण ${item.step}` : `STEP ${item.step}`}
                      </span>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${color}15`, border: `1px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
                        <StepIcon size={18} />
                      </div>
                    </div>

                    <h3 style={{ color: '#1e293b', fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>
                      {lang === 'hi' ? (item.title_hi || item.title) : item.title}
                    </h3>
                    
                    <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                      {lang === 'hi' ? (item.desc_hi || item.desc) : item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>



        </div>
      </section>

      {/* 6. EXAMS SECTION TEASER — LINKS TO FMGE & NMAT PAGES */}
      <section style={{ padding: '28px 0', background: '#ffffff' }}>
        <style>{`
          .exam-teaser-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 22px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 20px rgba(31, 56, 100, 0.05);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .exam-teaser-card-fmge:hover {
            transform: translateY(-5px);
            box-shadow: 0 16px 36px rgba(225, 91, 63, 0.15);
          }
          .exam-teaser-card-nmat:hover {
            transform: translateY(-5px);
            box-shadow: 0 16px 36px rgba(124, 58, 237, 0.15);
          }
          .btn-exam-fmge {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 16px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 13px;
            text-decoration: none;
            background: linear-gradient(135deg, #e15b3f 0%, #c84327 100%);
            color: #ffffff !important;
            box-shadow: 0 4px 15px rgba(225, 91, 63, 0.35);
            transition: all 0.3s ease;
          }
          .btn-exam-fmge:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(225, 91, 63, 0.45);
          }
          .btn-exam-nmat {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 16px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 13px;
            text-decoration: none;
            background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
            color: #ffffff !important;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.35);
            transition: all 0.3s ease;
          }
          .btn-exam-nmat:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(124, 58, 237, 0.45);
          }
        `}</style>
        <div className="container">

          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 18px auto' }}>
            <span className="badge-coral" style={{ marginBottom: '6px' }}>
              {lang === 'hi' ? 'लाइसेंसिंग एवं प्रवेश परीक्षा तैयारी' : 'Licensing & Entrance Preparation'}
            </span>
            <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '8px' }}>
              {lang === 'hi' ? 'मेडिकल लाइसेंसिंग परीक्षा मार्गदर्शन (FMGE & NMAT)' : 'Licensing Exam Support (FMGE & NMAT)'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
              {lang === 'hi'
                ? 'हम सुनिश्चित करते हैं कि मेडिको ओवरसीज के छात्र भारत में लाइसेंसिंग परीक्षा और अंतरराष्ट्रीय प्रवेश परीक्षाओं में 100% उत्तीर्ण हों।'
                : 'We ensure Medico Overseas students are 100% prepared to pass medical licensing exams in India and international entrance tests.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>

            {/* FMGE / NEXT Exam Teaser Card */}
            <div className="exam-teaser-card exam-teaser-card-fmge">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="badge-coral" style={{ fontSize: '11px', padding: '4px 12px' }}>
                    {lang === 'hi' ? '🇮🇳 भारत मेडिकल लाइसेंसिंग' : '🇮🇳 India Medical Licensing'}
                  </span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(225, 91, 63, 0.12)', color: 'var(--coral-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Stethoscope size={22} />
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '8px' }}>
                  {lang === 'hi' ? 'एफएमजीई / नेक्स्ट परीक्षा कोचिंग' : 'FMGE / NEXT Exam Coaching'}
                </h3>
                
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '14px' }}>
                  {lang === 'hi'
                    ? 'एमबीबीएस के प्रथम वर्ष से ही एकीकृत टेस्ट सीरीज़, क्लिनिकल प्रश्न बैंक और वरिष्ठ भारतीय प्रोफेसरों द्वारा लाइव व्याख्यान।'
                    : 'Integrated FMGE test series, clinical question banks, and live online lectures by senior Indian medical professors starting from Year 1 of MBBS.'}
                </p>

                {/* FMGE Highlight Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--navy-primary)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={13} color="var(--coral-accent)" /> {lang === 'hi' ? 'प्रथम वर्ष से एकीकृत तैयारी' : 'Year 1 Integrated Prep'}
                  </span>
                  <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--navy-primary)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={13} color="var(--coral-accent)" /> {lang === 'hi' ? '15,000+ एमसीक्यू प्रश्न बैंक' : '15,000+ MCQs & Question Bank'}
                  </span>
                  <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--navy-primary)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={13} color="var(--coral-accent)" /> {lang === 'hi' ? 'लाइव फैकल्टी मार्गदर्शन' : 'Live Faculty Mentorship'}
                  </span>
                </div>
              </div>

              <Link to="/exams/fmge-exam" className="btn-exam-fmge">
                {lang === 'hi' ? 'संपूर्ण एफएमजीई / नेक्स्ट गाइड पढ़ें' : 'Read Complete FMGE / NEXT Guide'} <ArrowRight size={16} />
              </Link>
            </div>

            {/* NMAT Entrance Exam Teaser Card */}
            <div className="exam-teaser-card exam-teaser-card-nmat">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="badge-navy" style={{ fontSize: '11px', padding: '4px 12px' }}>
                    {lang === 'hi' ? '🇵🇭 फिलीपींस प्रवेश परीक्षा' : '🇵🇭 Philippines Entry Test'}
                  </span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.12)', color: 'var(--purple-exam)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={22} />
                  </div>
                </div>

                <h3 style={{ fontSize: '18px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '8px' }}>
                  {lang === 'hi' ? 'एनमैट प्रवेश परीक्षा गाइड' : 'NMAT Entrance Exam Guide'}
                </h3>
                
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '14px' }}>
                  {lang === 'hi'
                    ? 'फिलिपिंस नेशनल मेडिकल एडमिशन टेस्ट (NMAT) के लिए पूरा पाठ्यक्रम, पर्सेंटाइल स्कोरिंग और पंजीकरण रणनीति।'
                    : 'Complete syllabus breakdown, percentile scoring rules, registration steps, and preparation strategy for National Medical Admission Test (NMAT).'}
                </p>

                {/* NMAT Highlight Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--navy-primary)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={13} color="var(--purple-exam)" /> {lang === 'hi' ? 'भाग I और II का पाठ्यक्रम' : 'Part I & Part II Syllabus'}
                  </span>
                  <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--navy-primary)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={13} color="var(--purple-exam)" /> {lang === 'hi' ? 'पर्सेंटाइल स्कोर नियम' : 'Percentile Score Rules'}
                  </span>
                  <span style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: 'var(--navy-primary)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={13} color="var(--purple-exam)" /> {lang === 'hi' ? 'पंजीकरण एवं तिथियां' : 'Registration & Dates'}
                  </span>
                </div>
              </div>

              <Link to="/exams/nmat-exam" className="btn-exam-nmat">
                {lang === 'hi' ? 'संपूर्ण एनमैट गाइड पढ़ें' : 'Read Complete NMAT Guide'} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section style={{ padding: '36px 0', background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">

          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 18px auto' }}>
            <span className="badge-navy" style={{ marginBottom: '10px' }}>
              {lang === 'hi' ? '🌟 प्रमाणित छात्र एवं अभिभावक समीक्षाएं' : '🌟 Authentic Student & Parent Reviews'}
            </span>
            <h2 style={{ fontSize: '32px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px' }}>
              {lang === 'hi' ? 'भारत भर के 5,000+ डॉक्टरों और अभिभावकों द्वारा विश्वसनीय' : 'Trusted by 5,000+ Doctors & Parents Across India'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.5', margin: 0 }}>
              {lang === 'hi'
                ? 'उन डॉक्टरों और अभिभावकों से सीधे सुनें जिन्होंने मेडिको ओवरसीज पर भरोसा किया।'
                : 'Hear directly from doctors who graduated abroad and parents who trusted Medico Overseas.'}
            </p>
          </div>

          {/* Testimonials 3-Card Side-by-Side Sliding Carousel Container */}
          <div 
            style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto' }}
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
          >

            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrevTestimonial}
              aria-label="Previous Testimonial"
              style={{
                position: 'absolute',
                left: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                boxShadow: '0 8px 24px rgba(31, 56, 100, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--navy-primary)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNextTestimonial}
              aria-label="Next Testimonial"
              style={{
                position: 'absolute',
                right: '-20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                boxShadow: '0 8px 24px rgba(31, 56, 100, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--navy-primary)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <ChevronRight size={22} />
            </button>

            {/* 3 Visible Cards Grid (Shift 1-by-1) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }} className="testimonial-multi-grid">
              {[
                testimonials[activeTestimonial % testimonials.length],
                testimonials[(activeTestimonial + 1) % testimonials.length],
                testimonials[(activeTestimonial + 2) % testimonials.length]
              ].map((t, idx) => (
                <div 
                  key={idx} 
                  className="glass-card" 
                  style={{ 
                    borderRadius: '20px', 
                    padding: '28px 24px', 
                    background: '#ffffff', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 10px 28px rgba(31, 56, 100, 0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <div>
                    {/* Top Rating & Verified Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} size={16} color="#f59e0b" fill="#f59e0b" />
                        ))}
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', background: '#dcfce7', padding: '3px 9px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={12} /> {lang === 'hi' ? 'सत्यापित स्नातक डॉक्टर' : 'Verified Graduate'}
                      </span>
                    </div>

                    <Quote size={30} color="var(--coral-accent)" style={{ opacity: 0.18, marginBottom: '8px' }} />

                    <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '22px' }}>
                      "{lang === 'hi' ? (t.text_hi || t.text) : t.text}"
                    </p>
                  </div>

                  {/* Author Details */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--coral-accent)' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '800', margin: 0 }}>
                        {t.name}
                      </h4>
                      <div style={{ fontSize: '12px', color: 'var(--coral-accent)', fontWeight: '700', marginTop: '2px' }}>
                        {lang === 'hi' ? (t.role_hi || t.role) : t.role}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {lang === 'hi' ? (t.college_hi || t.college) : t.college} ({t.year})
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '26px' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  style={{
                    width: activeTestimonial === idx ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '10px',
                    background: activeTestimonial === idx ? 'var(--coral-accent)' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 8. BLOG HIGHLIGHTS */}
      <section style={{ padding: '48px 0', background: '#ffffff' }}>
        <div className="container">

          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px auto' }}>
            <span className="badge-coral" style={{ marginBottom: '8px' }}>
              {lang === 'hi' ? 'ब्लॉग' : 'Blogs'}
            </span>
            <h2 style={{ fontSize: '32px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px' }}>
              {lang === 'hi' ? 'नवीनतम मेडिकल मार्गदर्शन लेख' : 'Latest MBBS Guidance Articles'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', margin: 0 }}>
              {lang === 'hi'
                ? 'एनएमसी दिशानिर्देशों, विश्वविद्यालय फीस संरचनाओं और परीक्षा रोडमैप पर प्रामाणिक गाइड से अपडेट रहें।'
                : 'Stay updated with authentic guides on NMC guidelines, university fee structures, and FMGE/NEXT exam roadmaps.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="latest-blogs-grid">
            {blogArticles.map((b, idx) => (
              <div key={b._id || idx} className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(31, 56, 100, 0.06)' }}>
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge-navy" style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '11px', background: '#0f172a', color: '#ffffff' }}>
                    {lang === 'hi' ? (b.category_hi || b.category) : b.category}
                  </span>
                  {idx === 0 && (
                    <span style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '11px', fontWeight: '800', background: 'var(--coral-accent)', color: '#ffffff', padding: '4px 10px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(225,91,63,0.3)' }}>
                      {lang === 'hi' ? '🔥 नवीनतम लेख' : '🔥 NEWEST POST'}
                    </span>
                  )}
                </div>
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '17px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px', lineHeight: '1.4' }}>
                      {lang === 'hi' ? (b.title_hi || b.title) : b.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                      {lang === 'hi' ? (b.excerpt_hi || b.excerpt) : b.excerpt}
                    </p>
                  </div>
                  <Link to={`/blogs/${b.slug}`} style={{ color: 'var(--coral-accent)', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {lang === 'hi' ? 'पूरा लेख पढ़ें' : 'Read Full Article'} <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Centered View All Articles Button */}
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/blogs" className="btn-primary" style={{ padding: '12px 32px', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '30px' }}>
              {lang === 'hi' ? 'सभी लेख देखें' : 'View All Articles'} <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* 9. PRE-FOOTER INLINE LEAD-CAPTURE FORM SECTION */}
      <section style={{ padding: '32px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-130px', right: '-100px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(224, 82, 56, 0.14) 0%, transparent 60%)', pointerEvents: 'none', filter: 'blur(48px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-120px', left: '-80px', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, transparent 60%)', pointerEvents: 'none', filter: 'blur(40px)' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div 
            className="glass-card-container"
            style={{ 
              maxWidth: '1180px', 
              margin: '0 auto', 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              overflow: 'hidden'
            }}
          >
            
            {/* Left Content Side: ACCEPTING 2026 + Request Callback Form */}
            <div className="glass-panel-left" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(224, 82, 56, 0.14)', border: '1px solid rgba(224, 82, 56, 0.28)', padding: '6px 14px', borderRadius: '28px', color: '#e15b3f', fontSize: '11px', fontWeight: '800', marginBottom: '14px', width: 'fit-content', letterSpacing: '0.5px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)' }}></span>
                {lang === 'hi' ? '2026 सत्र के लिए आवेदन प्रारंभ' : 'ACCEPTING 2026 APPLICATIONS'}
              </div>
              
              <h2 style={{ color: '#ffffff', fontSize: '26px', fontWeight: '800', lineHeight: '1.25', marginBottom: '6px', letterSpacing: '-0.4px' }}>
                {lang === 'hi' ? 'कॉल-बैक का अनुरोध करें' : 'Request a Callback'}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '18px' }}>
                {lang === 'hi' ? 'हमारे वरिष्ठ सलाहकार 15–30 मिनट में आपसे संपर्क करेंगे।' : 'Our senior medical advisor will contact you within 15 mins.'}
              </p>

              {footerLeadSuccess ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#4ade80', padding: '14px', borderRadius: '14px', textAlign: 'center', fontWeight: '700', fontSize: '14px' }}>
                  {footerLeadSuccess}
                </div>
              ) : (
                <form onSubmit={handleFooterLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {footerLeadError && (
                    <div style={{ background: 'rgba(248, 113, 113, 0.15)', border: '1px solid rgba(248, 113, 113, 0.3)', color: '#fca5a5', padding: '12px', borderRadius: '12px', fontSize: '13px' }}>
                      {footerLeadError}
                    </div>
                  )}

                  <div className="grid-2col-mobile-1col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="premium-label">{lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}</label>
                      <input 
                        type="text" 
                        required 
                        placeholder={lang === 'hi' ? 'जैसे राहुल शर्मा' : 'e.g. Rahul Sharma'}
                        value={footerLeadForm.name}
                        onChange={(e) => setFooterLeadForm({ ...footerLeadForm, name: e.target.value })}
                        className="premium-input"
                      />
                    </div>
                    <div>
                      <label className="premium-label">{lang === 'hi' ? 'फोन नंबर *' : 'Phone Number *'}</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210"
                        value={footerLeadForm.phone}
                        onChange={(e) => setFooterLeadForm({ ...footerLeadForm, phone: e.target.value })}
                        className="premium-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="premium-label">{lang === 'hi' ? 'ईमेल पता *' : 'Email Address *'}</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="student@gmail.com"
                      value={footerLeadForm.email}
                      onChange={(e) => setFooterLeadForm({ ...footerLeadForm, email: e.target.value })}
                      className="premium-input"
                    />
                  </div>

                  <div className="grid-2col-mobile-1col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="premium-label">{lang === 'hi' ? 'पसंदीदा देश *' : 'Target Country *'}</label>
                      <select
                        value={footerLeadForm.country}
                        onChange={(e) => setFooterLeadForm({ ...footerLeadForm, country: e.target.value })}
                        className="premium-input"
                      >
                        <option value="Russia">{lang === 'hi' ? 'रूस 🇷🇺' : 'Russia 🇷🇺'}</option>
                        <option value="Georgia">{lang === 'hi' ? 'जॉर्जिया 🇬🇪' : 'Georgia 🇬🇪'}</option>
                        <option value="Kazakhstan">{lang === 'hi' ? 'कजाकिस्तान 🇰🇿' : 'Kazakhstan 🇰🇿'}</option>
                        <option value="Uzbekistan">{lang === 'hi' ? 'उज्बेकिस्तान 🇺🇿' : 'Uzbekistan 🇺🇿'}</option>
                        <option value="Kyrgyzstan">{lang === 'hi' ? 'किर्गिस्तान 🇰🇬' : 'Kyrgyzstan 🇰🇬'}</option>
                        <option value="Armenia">{lang === 'hi' ? 'आर्मेनिया 🇦🇲' : 'Armenia 🇦🇲'}</option>
                        <option value="Vietnam">{lang === 'hi' ? 'वियतनाम 🇻🇳' : 'Vietnam 🇻🇳'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="premium-label">{lang === 'hi' ? 'नीट स्कोर (अपेक्षित)' : 'NEET Score (Est.)'}</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 280"
                        value={footerLeadForm.neetScore}
                        onChange={(e) => setFooterLeadForm({ ...footerLeadForm, neetScore: e.target.value })}
                        className="premium-input"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={footerLeadLoading}
                    style={{ 
                      width: '100%', 
                      padding: '13px', 
                      borderRadius: '14px', 
                      fontSize: '14.5px', 
                      fontWeight: '700', 
                      background: 'linear-gradient(135deg, #e15b3f 0%, #c84327 100%)', 
                      color: '#ffffff', 
                      border: 'none', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px', 
                      boxShadow: '0 10px 25px rgba(225, 91, 63, 0.4)', 
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      marginTop: '4px'
                    }}
                  >
                    {footerLeadLoading 
                      ? (lang === 'hi' ? 'जमा किया जा रहा है...' : 'Submitting...') 
                      : (lang === 'hi' ? 'तत्काल प्रवेश विवरण प्राप्त करें' : 'Get Instant Admission Details')} <ArrowRight size={18} />
                  </button>
                  
                  <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Shield size={12} /> {lang === 'hi' ? '🔒 आपकी जानकारी 100% सुरक्षित और गोपनीय है।' : 'Your information is 100% secure.'}
                  </div>
                </form>
              )}

            </div>

            {/* Right Content Side: Track Your MBBS Abroad Admission Live Tracker */}
            <div className="glass-panel-right" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <AdmissionTracker isCompact={true} />
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE 360° VIRTUAL TOUR SHOWCASE MODAL */}
      <VirtualTourModal
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
        countryName={selectedTourCountry}
      />

    </div>
  );
};

export default Home;
