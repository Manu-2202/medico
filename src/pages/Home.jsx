import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, GraduationCap, Users, Globe, Building2, 
  CheckCircle, ArrowRight, Star, Heart, FileText, Phone, Mail, Send, Clock, BookOpen, ChevronRight, ChevronLeft, Check, Quote, Sparkles, UserCheck, RefreshCw, Stethoscope
} from 'lucide-react';
import EligibilityCalculator from '../components/EligibilityCalculator';

const Home = ({ onRequestCounselling }) => {
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

  // 6 Destination Country Cards for 3D Flip Card Animation
  const destinations = [
    {
      country: 'Russia',
      flag: '🇷🇺',
      slug: 'mbbs-in-russia',
      fee: 'From ₹3.5 Lakhs / Year',
      totalPackage: '₹18 Lakhs to ₹28 Lakhs Total',
      img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
      blurb: 'Top Russian Federal Universities with English medium instruction, modern simulation labs, and WHO recognition.',
      badge: 'Most Popular',
      highlights: [
        '100% English Medium Curriculum',
        'Direct Govt University Admissions',
        'On-Campus Indian Hostel & Mess'
      ],
      intake: 'Sept - Oct 2026'
    },
    {
      country: 'Georgia',
      flag: '🇬🇪',
      slug: 'mbbs-in-georgia',
      fee: 'From ₹4.5 Lakhs / Year',
      totalPackage: '₹22 Lakhs to ₹32 Lakhs Total',
      img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80',
      blurb: 'USMLE & WFME integrated European medical education with high FMGE passing rate and peaceful environment.',
      badge: 'High FMGE Pass %',
      highlights: [
        'USMLE & WFME European Syllabus',
        'Safe Peaceful Student Life',
        'No Entrance Test Required'
      ],
      intake: 'Sept - Oct 2026'
    },
    {
      country: 'Kyrgyzstan',
      flag: '🇰🇬',
      slug: 'mbbs-in-kyrgyzstan',
      fee: 'From ₹2.5 Lakhs / Year',
      totalPackage: '₹14 Lakhs to ₹18 Lakhs Total',
      img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      blurb: 'Most affordable MBBS package in Central Asia with 100% Indian mess food and comfortable hostel rooms.',
      badge: 'Lowest Package',
      highlights: [
        'Lowest Tuition & Living Budget',
        'Top Osh & Kyrgyz State Univ',
        '100% Indian Mess Cooks'
      ],
      intake: 'Sept 2026'
    },
    {
      country: 'Uzbekistan',
      flag: '🇺🇿',
      slug: 'mbbs-in-uzbekistan',
      fee: 'From ₹2.8 Lakhs / Year',
      totalPackage: '₹15 Lakhs to ₹20 Lakhs Total',
      img: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80',
      blurb: 'State-owned medical academies with rich clinical exposure, low living expenses, and direct flights from Delhi.',
      badge: 'Trending',
      highlights: [
        'State-Owned Tashkent Medical Academies',
        '3-Hour Flight from Delhi',
        'Rich Clinical Hospital Exposure'
      ],
      intake: 'Sept 2026'
    },
    {
      country: 'Armenia',
      flag: '🇦🇲',
      slug: 'mbbs-in-armenia',
      fee: 'From ₹3.2 Lakhs / Year',
      totalPackage: '₹18 Lakhs to ₹24 Lakhs Total',
      img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
      blurb: 'Historic European medical traditions, safe student life, and 6-year English medium MD program.',
      badge: 'European Degree',
      highlights: [
        'Yerevan State Medical Univ',
        '6-Year Integrated MD Degree',
        'High Clinical Standard Labs'
      ],
      intake: 'Sept 2026'
    },
    {
      country: 'Vietnam',
      flag: '🇻🇳',
      slug: 'mbbs-in-vietnam',
      fee: 'From ₹3.0 Lakhs / Year',
      totalPackage: '₹16 Lakhs to ₹22 Lakhs Total',
      img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
      blurb: 'Rapidly emerging Asian destination offering modern multi-specialty clinical training hospitals.',
      badge: 'New Destination',
      highlights: [
        'Modern Multi-Specialty Hospitals',
        'Affordable Asian Living Cost',
        'Can Tho Medical University'
      ],
      intake: 'Sept 2026'
    }
  ];

  // 5-Step Admission Roadmap Visual
  const roadmapSteps = [
    { step: '01', title: 'Consultation', desc: '1-on-1 career counselling with expert medical advisors to evaluate budget and eligibility.' },
    { step: '02', title: 'Documentation', desc: 'Document verification, 10th & 12th marksheets, NEET score card, and passport check.' },
    { step: '03', title: 'University Selection', desc: 'Selection of WHO & NMC approved university and issuance of direct admission letter.' },
    { step: '04', title: 'Visa Processing', desc: 'Invitation letter issuance, embassy student visa application, and MEA apostille stamping.' },
    { step: '05', title: 'Departure & Arrival', desc: 'Group travel from India with Medico team, airport reception, and hostel room allocation.' }
  ];

  // Testimonials Carousel Items
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      name: 'Dr. Rohan Deshmukh',
      role: 'Practicing Physician (FMGE Cleared)',
      college: 'Bashkir State Medical University, Russia',
      year: 'Batch of 2024',
      text: 'Medico Overseas made my dream of becoming a doctor a reality! From university selection to visa stamping and hostel setup, their team supported me at every single step.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Ananya Sharma',
      role: 'Student Parent',
      college: 'Tbilisi State Medical University, Georgia',
      year: 'Parent of 2nd Year Student',
      text: 'As a parent, safety was my biggest concern. Medico Overseas arranged continuous Indian hostel mess, separate girls hostels, and local Indian guardians in Georgia.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Dr. Mohammed Farhan',
      role: 'Medical Officer',
      college: 'Osh State University, Kyrgyzstan',
      year: 'Batch of 2023',
      text: 'No hidden charges or fake promises. The fee structure given during counselling matched 100% with the university fee counter. Highly recommend Medico Overseas!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Junior Resident Doctor',
      college: 'Tashkent Medical Academy, Uzbekistan',
      year: 'Batch of 2024 (FMGE Score 218)',
      text: 'The integrated FMGE test series and faculty mentorship provided alongside MBBS curriculum were game-changers. Passed FMGE on my very first attempt!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80'
    }
  ];

  // High Quality Blog Guidance Articles
  const blogArticles = [
    {
      title: 'Top 5 Medical Universities in Russia with Low Budget & High FMGE Pass Rate',
      slug: 'top-russia-medical-universities-low-budget',
      category: 'Destination Guide',
      excerpt: 'Comprehensive comparison of Bashkir State, Kazan Federal, and Crimea Federal Medical Universities for 2026 admissions.',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'NMC Gazette Guidelines 2026: Mandatory Checklist for MBBS Abroad',
      slug: 'nmc-gazette-guidelines-2026',
      category: 'NMC Updates',
      excerpt: 'Detailed breakdown of the 54-month course duration, 1-year internship, and English medium rules set by National Medical Commission.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'FMGE vs NEXT: Everything You Need to Know for 2026 Licensing Exam Strategy',
      slug: 'fmge-vs-next-exam-guide-2026',
      category: 'Exam Guide',
      excerpt: 'Key differences between the traditional FMGE screening test and the upcoming National Exit Test (NEXT) for foreign medical graduates.',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div>
      {/* 1. HERO BANNER SLIDER WITH REAL DOCTOR PHOTOS (FULL SCREEN WIDTH) */}
      <section style={{ padding: '0', background: '#f8fafc', position: 'relative', width: '100%', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>

          {/* SLIDE 1: Dark Navy Angled Split Banner */}
          {currentSlide === 0 && (
            <div style={{ background: '#ffffff', minHeight: '540px' }}>
              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', minHeight: '540px' }}>
                <div style={{ background: '#0e233a', color: '#ffffff', padding: '60px 48px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0 100%)', zIndex: 2 }} className="slide-content-navy">
                  <h1 style={{ color: '#ffffff', fontSize: '38px', fontWeight: '800', lineHeight: '1.2', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
                    EMPOWERING FUTURE DOCTORS WITH GLOBAL EDUCATION
                  </h1>
                  <p style={{ color: '#b2c7db', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px', maxWidth: '520px' }}>
                    Direct admissions into top WHO & NMC-approved medical universities with 100% transparent guidance & zero capitation fees.
                  </p>
                  
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#7ca5cc', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                      OUR SERVICES
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: '600' }}>
                        University Admissions
                      </span>
                      <span style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: '600' }}>
                        Visa & Documentation
                      </span>
                      <span style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: '600' }}>
                        Scholarship Guidance
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px', height: '100%', background: '#ffffff' }}>
                  <img 
                    src={slideDoctorPhotos[0].img} 
                    alt={slideDoctorPhotos[0].alt}
                    style={{ width: '100%', height: '100%', maxHeight: '440px', objectFit: 'cover', objectPosition: 'top center', borderRadius: '16px', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: Royal Sapphire & Indigo Blue Banner */}
          {currentSlide === 1 && (
            <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', minHeight: '540px' }}>
              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', padding: '50px 48px', minHeight: '540px' }}>
                <div style={{ color: '#ffffff' }}>
                  <h1 style={{ color: '#ffffff', fontSize: '40px', fontWeight: '800', lineHeight: '1.2', marginBottom: '18px' }}>
                    Transform Your Passion <br /> Into a <span style={{ color: '#f97316' }}>Global Medical Career</span>
                  </h1>

                  <div style={{ display: 'inline-block', background: '#ffffff', color: '#1e3a8a', padding: '6px 18px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', letterSpacing: '0.5px', marginBottom: '22px', textTransform: 'uppercase' }}>
                    NMC & WHO ACCREDITED UNIVERSITIES
                  </div>

                  <p style={{ color: '#93c5fd', fontSize: '15px', lineHeight: '1.7', marginBottom: '28px', maxWidth: '540px' }}>
                    Study MBBS in world-class government medical universities across Russia, Georgia, Kyrgyzstan, Uzbekistan, Armenia, and Vietnam.
                  </p>

                  <div style={{ marginBottom: '28px' }}>
                    <button className="btn-primary" onClick={onRequestCounselling} style={{ background: '#f97316', color: '#ffffff', padding: '14px 34px', fontSize: '15px', borderRadius: '30px', border: 'none', fontWeight: '700', boxShadow: '0 8px 25px rgba(249, 115, 22, 0.4)' }}>
                      Get Free Counselling
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', fontSize: '13px', color: '#93c5fd' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} color="#f97316" /> +91-800-123-4567</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} color="#f97316" /> info@medicooverseas.com</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} color="#f97316" /> medicooverseas.com</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <div style={{ width: '330px', height: '330px', borderRadius: '50%', background: '#eff6ff', border: '6px solid #ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
                    <img 
                      src={slideDoctorPhotos[1].img} 
                      alt={slideDoctorPhotos[1].alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: Warm Peach & Cream Banner */}
          {currentSlide === 2 && (
            <div style={{ background: 'linear-gradient(135deg, #fff3ee 0%, #ffe6da 100%)', minHeight: '540px' }}>
              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', padding: '50px 48px', minHeight: '540px' }}>
                <div>
                  <h1 style={{ color: '#102a43', fontSize: '42px', fontWeight: '800', lineHeight: '1.2', marginBottom: '18px' }}>
                    Your Gateway to Top <br /> <span style={{ color: '#f97316' }}>Foreign Medical Universities</span>
                  </h1>

                  <p style={{ color: '#486581', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', maxWidth: '520px' }}>
                    100% English medium instruction, European clinical simulation labs, and integrated FMGE / NEXT exam coaching from Year 1.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
                    <button className="btn-primary" onClick={onRequestCounselling} style={{ background: '#f97316', color: '#ffffff', padding: '14px 36px', fontSize: '15px', borderRadius: '10px', border: 'none', fontWeight: '700', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.35)' }}>
                      Get Started Today
                    </button>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#486581', fontWeight: '600' }}>
                      <Phone size={14} color="#486581" /> medicooverseas.com
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <div style={{ background: '#ffffff', padding: '10px', borderRadius: '24px', border: '4px solid #ffffff', boxShadow: '0 20px 40px rgba(16, 42, 67, 0.08)', width: '330px', height: '370px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img 
                      src={slideDoctorPhotos[2].img} 
                      alt={slideDoctorPhotos[2].alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: '18px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: Clean Modern White Banner */}
          {currentSlide === 3 && (
            <div style={{ background: '#ffffff', minHeight: '540px' }}>
              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', padding: '50px 48px', minHeight: '540px' }}>
                <div>
                  <div style={{ color: '#f97316', fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                    BEGIN YOUR MEDICAL JOURNEY
                  </div>

                  <h1 style={{ color: '#102a43', fontSize: '44px', fontWeight: '800', lineHeight: '1.18', marginBottom: '18px' }}>
                    World-Class MBBS <br /> <span style={{ color: '#f97316' }}>Without Heavy Capitation</span>
                  </h1>

                  <p style={{ color: '#627d98', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px', maxWidth: '520px' }}>
                    Complete end-to-end support from university selection, eligibility check, and MEA visa apostille to Indian hostel mess setup.
                  </p>

                  <div>
                    <button className="btn-primary" onClick={onRequestCounselling} style={{ background: '#f97316', color: '#ffffff', padding: '15px 42px', fontSize: '16px', borderRadius: '12px', border: 'none', fontWeight: '700', boxShadow: '0 10px 30px rgba(249, 115, 22, 0.4)' }}>
                      Get Free Counselling
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <div style={{ width: '320px', height: '320px', borderRadius: '50%', background: '#eef5fc', border: '6px solid #102a43', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 18px 40px rgba(16, 42, 67, 0.15)' }}>
                    <img 
                      src={slideDoctorPhotos[3].img} 
                      alt={slideDoctorPhotos[3].alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LEFT CAROUSEL ARROW BUTTON */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
            aria-label="Previous Slide"
            style={{
              position: 'absolute',
              left: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.65)',
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
            <ChevronLeft size={28} />
          </button>

          {/* RIGHT CAROUSEL ARROW BUTTON */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
            aria-label="Next Slide"
            style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.65)',
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
            <ChevronRight size={28} />
          </button>

          {/* SLIDE INDICATOR DOTS */}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '8px' }}>
            {[...Array(totalSlides)].map((_, sIdx) => (
              <button
                key={sIdx}
                onClick={() => setCurrentSlide(sIdx)}
                aria-label={`Go to slide ${sIdx + 1}`}
                style={{
                  width: currentSlide === sIdx ? '30px' : '10px',
                  height: '10px',
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


      {/* 2. QUICK-GLANCE TRUST BAR */}
      <section style={{ background: '#ffffff', padding: '30px 0', borderBottom: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
            
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--navy-primary)' }}>15+ Years</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>Excellence in Medical Admissions</div>
            </div>

            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--coral-accent)' }}>10,000+</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>Students Placed Worldwide</div>
            </div>

            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--cyan-info)' }}>50+ Universities</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>NMC / WHO Approved Universities</div>
            </div>

            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--emerald-success)' }}>6 Countries</div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>Global Study Destinations Covered</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. "WHY STUDY MBBS ABROAD" SECTION — 6 DYNAMIC COLOR HOVER CARDS */}
      <section style={{ padding: '85px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 54px auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(225, 91, 63, 0.1)', border: '1px solid rgba(225, 91, 63, 0.25)', padding: '6px 18px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', color: 'var(--coral-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
              <Sparkles size={14} /> Key Advantages
            </div>
            <h2 style={{ fontSize: '38px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Why Study MBBS Abroad?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.65' }}>
              Over 25,000+ Indian medical aspirants choose abroad medical universities every year due to limited seats and high private tuition fees in India.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            
            {/* Card 1: Rose/Pink Accent */}
            <div className="why-card why-card-rose">
              <div className="why-card-icon-wrapper">
                <Award size={28} />
              </div>
              <h3 className="why-card-title">Globally Recognized Degrees</h3>
              <p className="why-card-desc">
                Medical degrees (MD / MBBS) are fully accredited by WHO, NMC (India), USMLE (USA), PLAB (UK), and FAIMER.
              </p>
            </div>

            {/* Card 2: Emerald Green Accent */}
            <div className="why-card why-card-emerald">
              <div className="why-card-icon-wrapper">
                <Building2 size={28} />
              </div>
              <h3 className="why-card-title">Affordable Tuition & Zero Capitation</h3>
              <p className="why-card-desc">
                Complete 6-year MBBS cost ranges between ₹14 Lakhs to ₹30 Lakhs total — 70% lower than Indian private medical colleges.
              </p>
            </div>

            {/* Card 3: Purple Accent */}
            <div className="why-card why-card-purple">
              <div className="why-card-icon-wrapper">
                <GraduationCap size={28} />
              </div>
              <h3 className="why-card-title">100% English Medium Curriculum</h3>
              <p className="why-card-desc">
                All lectures, clinical lab practicals, exams, and bedside hospital rotations are conducted entirely in English.
              </p>
            </div>

            {/* Card 4: Sky Blue Accent */}
            <div className="why-card why-card-blue">
              <div className="why-card-icon-wrapper">
                <Stethoscope size={28} />
              </div>
              <h3 className="why-card-title">Advanced Clinical Training & Labs</h3>
              <p className="why-card-desc">
                Study in modern European & Asian medical university hospitals with high-tech simulation labs & rich clinical patient inflow.
              </p>
            </div>

            {/* Card 5: Warm Orange Accent */}
            <div className="why-card why-card-orange">
              <div className="why-card-icon-wrapper">
                <ShieldCheck size={28} />
              </div>
              <h3 className="why-card-title">Integral Hostels & NMC Compliance</h3>
              <p className="why-card-desc">
                On-campus hostels with Indian mess food, 24/7 security, central heating, and strict compliance with NMC Gazette rules.
              </p>
            </div>

            {/* Card 6: Deep Cyan Accent */}
            <div className="why-card why-card-cyan">
              <div className="why-card-icon-wrapper">
                <UserCheck size={28} />
              </div>
              <h3 className="why-card-title">Direct Admission & Visa Support</h3>
              <p className="why-card-desc">
                100% transparent admission process with zero donation, end-to-end visa assistance, local Indian guardians & pre-departure briefing.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DESTINATIONS PREVIEW GRID — 6 INTERACTIVE 3D FLIP CARDS */}
      <section id="destinations" style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <span className="badge-navy" style={{ marginBottom: '12px' }}>Interactive Country Explorer</span>
            <h2 style={{ fontSize: '36px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '16px' }}>
              Explore Top MBBS Destinations
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6' }}>
              Hover or tap any card below to flip and reveal full fee breakdown, intake dates, and university highlights!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {destinations.map((d, idx) => (
              <div key={idx} className="destination-flip-card">
                <div className="destination-flip-card-inner">
                  
                  {/* FRONT OF FLIP CARD */}
                  <div className="destination-flip-card-front">
                    <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                      <img src={d.img} alt={`MBBS in ${d.country}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span className="badge-coral" style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10px', padding: '3px 10px' }}>
                        {d.badge}
                      </span>
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(15,23,42,0.88)', backdropFilter: 'blur(4px)', color: '#ffffff', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '700' }}>
                        {d.fee}
                      </div>
                    </div>

                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{d.flag}</span> MBBS in {d.country}
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {d.blurb}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--coral-accent)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <RefreshCw size={12} /> Hover to Flip
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--navy-primary)' }}>
                          {d.intake}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK OF FLIP CARD (REVEALED ON 3D ROTATION) */}
                  <div className="destination-flip-card-back">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '18px', color: '#ffffff', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{d.flag}</span> {d.country} Details
                        </h3>
                        <span style={{ background: '#f97316', color: '#ffffff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '800' }}>
                          NMC OK
                        </span>
                      </div>

                      <div style={{ fontSize: '11px', color: '#93c5fd', fontWeight: '700', marginBottom: '12px', background: 'rgba(255,255,255,0.08)', padding: '6px 10px', borderRadius: '8px' }}>
                        Est. Budget: {d.totalPackage}
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#e2e8f0' }}>
                          {d.highlights.map((h, hIdx) => (
                            <li key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Check size={13} color="#f97316" /> {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <Link 
                        to={`/destinations/${d.slug}`} 
                        className="btn-primary"
                        style={{ 
                          width: '100%', 
                          background: '#f97316', 
                          color: '#ffffff', 
                          padding: '9px', 
                          borderRadius: '10px', 
                          fontWeight: '700', 
                          fontSize: '12px', 
                          textDecoration: 'none', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: '4px',
                          boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)'
                        }}
                      >
                        Explore Fees & Colleges <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ADMISSION PROCESS — SIMPLE 3-5 STEP VISUAL */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#ffffff' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <span className="badge-coral" style={{ marginBottom: '12px' }}>Hassle-Free Admission</span>
            <h2 style={{ color: '#ffffff', fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
              Simple 5-Step Admission Roadmap
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '16px' }}>
              From Consultation to Departure, Medico Overseas manages your complete admission journey with 100% transparency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', position: 'relative' }}>
            {roadmapSteps.map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '18px', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--coral-accent)', marginBottom: '12px' }}>
                  {item.step}
                </div>
                <h4 style={{ color: '#ffffff', fontSize: '18px', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button className="btn-primary" onClick={() => onRequestCounselling()} style={{ padding: '15px 36px', fontSize: '16px' }}>
              <GraduationCap size={20} /> Get Free Counselling Now
            </button>
          </div>

        </div>
      </section>

      {/* INTERACTIVE ELIGIBILITY & BUDGET CALCULATOR COMPONENT */}
      <EligibilityCalculator onRequestCounselling={onRequestCounselling} />

      {/* 6. EXAMS SECTION TEASER — LINKS TO FMGE & NMAT PAGES */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <span className="badge-coral" style={{ marginBottom: '12px' }}>Licensing & Entrance Prep</span>
            <h2 style={{ fontSize: '36px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '16px' }}>
              Licensing Exam Support (FMGE & NMAT)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
              We ensure our students are 100% prepared to pass medical licensing exams in India and abroad.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            
            <div className="glass-card" style={{ padding: '36px', borderRadius: '24px', borderLeft: '6px solid var(--coral-accent)' }}>
              <span className="badge-coral" style={{ marginBottom: '12px' }}>India Licensing</span>
              <h3 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '12px' }}>FMGE / NEXT Exam Coaching</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '20px' }}>
                Integrated FMGE test series, question banks, and live online lectures by senior Indian medical professors starting from Year 1 of MBBS.
              </p>
              <Link to="/exams/fmge-exam" style={{ color: 'var(--coral-accent)', fontWeight: '700', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Read Complete FMGE Guide <ArrowRight size={16} />
              </Link>
            </div>

            <div className="glass-card" style={{ padding: '36px', borderRadius: '24px', borderLeft: '6px solid var(--purple-exam)' }}>
              <span className="badge-navy" style={{ marginBottom: '12px' }}>Philippines Entry</span>
              <h3 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '12px' }}>NMAT Entrance Exam Guide</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '20px' }}>
                Complete syllabus breakdown, percentile scoring rules, and preparation strategy for National Medical Admission Test (NMAT).
              </p>
              <Link to="/exams/nmat-exam" style={{ color: 'var(--purple-exam)', fontWeight: '700', fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Read NMAT Exam Guide <ArrowRight size={16} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS CAROUSEL SECTION */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <span className="badge-navy" style={{ marginBottom: '12px' }}>Student & Parent Success Stories</span>
            <h2 style={{ fontSize: '36px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '16px' }}>
              Testimonials & Student Reviews
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>
              Hear directly from doctors who graduated abroad and parents who trusted Medico Overseas.
            </p>
          </div>

          {/* Dynamic Testimonial Carousel Card */}
          <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
            <div 
              className="glass-card" 
              style={{ 
                padding: '44px', 
                borderRadius: '24px', 
                background: '#ffffff', 
                boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                border: '1px solid #e2e8f0',
                position: 'relative' 
              }}
            >
              <Quote size={48} color="var(--coral-accent)" style={{ opacity: 0.25, position: 'absolute', top: '24px', right: '30px' }} />

              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={20} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>

              <p style={{ color: 'var(--navy-primary)', fontSize: '18px', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '30px' }}>
                "{testimonials[activeTestimonial].text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name} 
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--coral-accent)' }} 
                />
                <div>
                  <h4 style={{ fontSize: '18px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '2px' }}>
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <div style={{ fontSize: '13px', color: 'var(--coral-accent)', fontWeight: '700' }}>
                    {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].college}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {testimonials[activeTestimonial].year}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Buttons & Dots */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    style={{
                      width: activeTestimonial === idx ? '28px' : '10px',
                      height: '10px',
                      borderRadius: '10px',
                      background: activeTestimonial === idx ? 'var(--coral-accent)' : '#cbd5e1',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', border: '1px solid #cbd5e1', color: 'var(--navy-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', border: '1px solid #cbd5e1', color: 'var(--navy-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. BLOG HIGHLIGHTS — HIGH QUALITY CARDS */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="badge-coral" style={{ marginBottom: '8px' }}>Knowledge Hub</span>
              <h2 style={{ fontSize: '32px', color: 'var(--navy-primary)', fontWeight: '800' }}>Latest MBBS Guidance Articles</h2>
            </div>
            <Link to="/blogs" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '14px' }}>
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {blogArticles.map((b, idx) => (
              <div key={idx} className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={b.image} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge-navy" style={{ position: 'absolute', top: '14px', left: '14px', fontSize: '11px' }}>
                    {b.category}
                  </span>
                </div>
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px', lineHeight: '1.4' }}>
                      {b.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                      {b.excerpt}
                    </p>
                  </div>
                  <Link to={`/blogs/${b.slug}`} style={{ color: 'var(--coral-accent)', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Read Full Article <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
