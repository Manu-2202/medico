import React, { useState } from 'react';
import {
  Award, ShieldCheck, Users, MapPin, Building2, CheckCircle2, Phone, Mail,
  Globe, Heart, BookOpen, Star, Sparkles, ChevronRight, GraduationCap, Compass,
  Calendar, Clock, Target, Eye, Lock, ThumbsUp, HelpCircle, ArrowRight, ExternalLink,
  UserCheck, Stethoscope, BadgeCheck, Utensils
} from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../utils/languageContext';

const AnimatedCounter = ({ target, duration = 1500, suffix = "", format = false }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const startValue = 0;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing: easeOutQuad
      const easedPercentage = percentage * (2 - percentage);
      const currentValue = Math.floor(startValue + easedPercentage * (target - startValue));

      setCount(currentValue);

      if (progress < duration) {
        animationFrameId = window.requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, target, duration]);

  const formattedValue = format ? count.toLocaleString('en-IN') : count;
  return <span ref={elementRef}>{formattedValue}{suffix}</span>;
};

const AboutUs = ({ onRequestCounselling }) => {
  const { lang } = useLanguage();
  const [activeMapTab, setActiveMapTab] = useState(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);


  // 2. Team & Counselor Profiles (Building Trust with Parents)
  const teamMembers = [
    {
      name: 'Dr. Ramesh Chandra',
      title: 'Founder & Managing Director',
      credentials: 'MBBS, MD (Alumnus - Bashkir State Medical Univ, Russia)',
      experience: '18+ Years Guidance',
      desc: 'Founded Medico Overseas after completing his foreign MBBS to protect Indian families from agent fraud and guarantee direct university payments.',
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      badge: 'Founder & MD',
      phone: '+91 98765 43210',
      email: 'md@medicooverseas.com'
    },
    {
      name: 'Dr. Priya Sundaram',
      title: 'Chief Academic Officer & FMGE Mentor',
      credentials: 'MBBS, DNB (General Medicine, New Delhi)',
      experience: '14+ Years Clinical & Academic',
      desc: 'Directs our FMGE / NEXT exam coaching cell, providing 1st-year MBBS students with live online lectures, test series, and standard Indian textbooks.',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      badge: 'Academic Head',
      phone: '+91 98765 43211',
      email: 'academics@medicooverseas.com'
    },
    {
      name: 'Vikramjit Singh',
      title: 'Head of International Logistics & Student Welfare',
      credentials: 'M.Sc International Relations (Delhi University)',
      experience: '12+ Years Embassy Relations',
      desc: 'Coordinates MEA visa apostille, embassy verification, direct group flights, and on-ground Indian hostel mess setup in Russia, Georgia, & Central Asia.',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      badge: 'Overseas Desk',
      phone: '+91 98765 43212',
      email: 'logistics@medicooverseas.com'
    },
    {
      name: 'Anjali Sharma',
      title: 'Senior Parent Liaison Counselor',
      credentials: 'M.A. Counseling Psychology',
      experience: '10+ Years Parent Guidance',
      desc: 'Dedicated liaison ensuring 24/7 parent updates, hostel safety checkups, quarterly academic progress reports, and emergency assistance.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      badge: 'Parent Support',
      phone: '+91 98765 43213',
      email: 'parents@medicooverseas.com'
    },
    {
      name: 'Dr. Alexey Ivanov',
      title: 'Director of On-Ground Student Operations',
      credentials: 'MD (Public Health), Moscow State Medical Univ',
      experience: '11+ Years Overseas Operation',
      desc: 'Stationed permanently in Eastern Europe to manage airport pick-up, local registration, SIM card setup, hostel check-ins, and medical insurance.',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      badge: 'Russia & CIS Support',
      phone: '+7 900 123 4567',
      email: 'russia@medicooverseas.com'
    },
    {
      name: 'Sunita Verma',
      title: 'Financial & Documentation Specialist',
      credentials: 'B.Com (Hons), CA Inter (Fintech & Forex Specialist)',
      experience: '9+ Years Forex & Visa',
      desc: 'Assists parents with education loans, transparent currency exchange, MEA embassy apostille, and direct bank transfers to university accounts.',
      img: 'https://images.unsplash.com/photo-1580894732468-9fe2909477eb?auto=format&fit=crop&w=400&q=80',
      badge: 'Forex & Visas',
      phone: '+91 98765 43214',
      email: 'forex@medicooverseas.com'
    }
  ];

  // 3. Accreditations & Recognitions
  const accreditations = [
    {
      name: 'NMC India (National Medical Commission)',
      tag: '54-Month Gazette Rules',
      desc: '100% compliant with 54-month core medical course + mandatory 12-month internship rules specified by NMC.',
      icon: ShieldCheck,
      color: '#f97316'
    },
    {
      name: 'WHO WDOMS Directory',
      tag: 'Global Recognition',
      desc: 'All partner universities are listed in the World Directory of Medical Schools for worldwide degree validity.',
      icon: Globe,
      color: '#0284c7'
    },
    {
      name: 'USMLE & ECFMG (USA)',
      tag: 'US Residency Matching',
      desc: 'Graduates are eligible to appear for USMLE Step 1, Step 2 CK, and practice medicine in the United States.',
      icon: Award,
      color: '#16a34a'
    },
    {
      name: 'WFME & FAIMER Certified',
      tag: 'International Accreditation',
      desc: 'Global accreditation allowing medical licensure practice in UK (PLAB), Canada, Europe, and Gulf countries.',
      icon: GraduationCap,
      color: '#7c3aed'
    }
  ];

  // 4. Partner Universities Data
  const partnerUniversities = [
    { name: 'Bashkir State Medical University', country: 'Russia 🇷🇺', category: 'russia', est: 'Est. 1932', students: '1,200+ Placed', fee: '₹3.8 L / Yr', highlight: 'Government Super Specialty Clinical Campus' },
    { name: 'Tbilisi State Medical University', country: 'Georgia 🇬🇪', category: 'georgia', est: 'Est. 1918', students: '850+ Placed', fee: '₹4.5 L / Yr', highlight: 'European Standard Medical Curriculum' },
    { name: 'Osh State University Medical Faculty', country: 'Kyrgyzstan 🇰🇬', category: 'asia', est: 'Est. 1992', students: '1,500+ Placed', fee: '₹2.8 L / Yr', highlight: 'Lowest Budget Option with 100% Indian Mess' },
    { name: 'Tashkent Medical Academy', country: 'Uzbekistan 🇺🇿', category: 'asia', est: 'Est. 1919', students: '900+ Placed', fee: '₹3.2 L / Yr', highlight: '3-Hour Flight from Delhi with Modern Labs' },
    { name: 'Yerevan State Medical University', country: 'Armenia 🇦🇲', category: 'asia', est: 'Est. 1920', students: '450+ Placed', fee: '₹3.5 L / Yr', highlight: '100+ Years Heritage & USMLE Aligned' },
    { name: 'Can Tho University of Medicine', country: 'Vietnam 🇻🇳', category: 'asia', est: 'Est. 1979', students: '300+ Placed', fee: '₹3.6 L / Yr', highlight: 'High Clinical Patient Flow & Tropical Medicine' }
  ];

  const filteredUniversities = activeCategoryTab === 'all'
    ? partnerUniversities
    : partnerUniversities.filter(u => u.category === activeCategoryTab);

  // 5. Office Branches & Embedded Maps
  const officeBranches = [
    {
      city: 'New Delhi (Head Office)',
      tag: 'Headquarters & Parent Desk',
      address: 'Suite 402, Medical Education Tower, MG Road, Connaught Place, New Delhi - 110001',
      landmark: 'Near Connaught Place Metro Station Gate 4',
      phone: '+91-800-123-4567 / +91-98765-43210',
      email: 'delhi@medicooverseas.com',
      hours: 'Mon - Sat: 9:30 AM - 7:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9978426034177!2d77.21672131508246!3d28.630043982417743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b8a0fc87%3A0x866164f89d38b4c5!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin'
    },
    {
      city: 'Hyderabad Branch Office',
      tag: 'South India Hub',
      address: 'Plot 12, Cyber Heights, Opposite Metro Pillar 145, Ameerpet, Hyderabad, Telangana - 500016',
      landmark: 'Next to Ameerpet Metro Junction',
      phone: '+91-800-123-4568 / +91-98765-43211',
      email: 'hyderabad@medicooverseas.com',
      hours: 'Mon - Sat: 9:30 AM - 7:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.495738549175!2d78.44828331487702!3d17.435773988049615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c1f5407cb5%3A0x6a2c2c06e30b1234!2sAmeerpet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1650000000001!5m2!1sen!2sin'
    },
    {
      city: 'Mumbai Representative Office',
      tag: 'West India Desk',
      address: 'Level 5, Horizon Business Park, Bandra Kurla Complex (BKC), Mumbai, Maharashtra - 400051',
      landmark: 'Near ICICI Tower BKC',
      phone: '+91-800-123-4569 / +91-98765-43212',
      email: 'mumbai@medicooverseas.com',
      hours: 'Mon - Sat: 9:30 AM - 6:30 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.796348123456!2d72.86828331490234!3d19.06677398709012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e234567890%3A0x1234567890abcdef!2sBandra%20Kurla%20Complex%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650000000002!5m2!1sen!2sin'
    },
    {
      city: 'Tashkent & CIS Overseas Desk',
      tag: 'On-Ground Overseas Office',
      address: 'Ulitsa Mukimi 42, Chilanzar District, Tashkent, Uzbekistan',
      landmark: 'Adjacent to Tashkent Medical Academy Hostel 2',
      phone: '+998 90 123 4567',
      email: 'tashkent@medicooverseas.com',
      hours: '24/7 Emergency Student Care Support',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47946.8530372439!2d69.240562!3d41.299496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sin!4v1650000000003!5m2!1sen!2sin'
    }
  ];

  // 7. Parent & Student FAQs
  const parentFaqs = [
    {
      q: 'Why should parents trust Medico Overseas over local admission agents?',
      a: 'Medico Overseas was founded by Dr. Ramesh Chandra, a foreign medical graduate doctor. We enforce 100% direct university fee payment, zero capitation fees, signed legal contracts, and maintain permanent on-ground Indian staff in host countries to support students throughout their 6-year MBBS journey.'
    },
    {
      q: 'Are the medical degrees compliant with NMC 54-Month & Gazette guidelines?',
      a: 'Yes! We only partner with government universities that strictly adhere to the NMC Gazette Regulations: 54 months of theoretical and practical medical education taught 100% in English, followed by a mandatory 12-month internship at the same university clinic.'
    },
    {
      q: 'How do parents pay tuition fees to foreign universities?',
      a: 'Parents transfer tuition fees directly to the official bank account of the respective government university via international wire transfer (TT/SWIFT). Medico Overseas provides complete invoice documentation to assist with education loan sanctioning.'
    },
    {
      q: 'What food and hostel facilities are provided for Indian students?',
      a: 'All our partnered universities provide campus hostels equipped with central heating, Wi-Fi, 24/7 security, and dedicated Indian mess canteens serving fresh Indian meals prepared by Indian cooks.'
    },
    {
      q: 'Does Medico Overseas assist with student visas and embassy stamping?',
      a: 'Absolutely. We handle the entire documentation process, including MEA (Ministry of External Affairs) apostille, translation, embassy invitation letters, student visa stamping, flight booking, and airport reception by our on-ground team.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', color: 'var(--text-body)', minHeight: '100vh' }}>
      {/* Dynamic SEO Meta Tags */}
      <SEO
        title="About Us | Company Story, Team & University Accreditations"
        description="Learn why Medico Overseas was founded. 15+ years of excellence, 10,000+ Indian medical students placed, doctor counselor profiles, NMC/WHO accreditations, and office branches."
        keywords="Medico Overseas about us, MBBS abroad consultancy story, NMC approved medical colleges, Dr Ramesh Chandra, MBBS guidance for Indian parents, foreign medical university accreditations"
      />

      {/* 1. HERO HEADER BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #0b132b 0%, #1f3864 50%, #0f172a 100%)',
        color: '#ffffff',
        padding: '85px 0 75px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Background Glow Elements */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(225, 91, 63, 0.15)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.15)', filter: 'blur(70px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="badge-coral" style={{ marginBottom: '18px', background: 'rgba(225, 91, 63, 0.2)', color: '#ff8a73', border: '1px solid rgba(225, 91, 63, 0.4)' }}>
            <Sparkles size={14} /> {lang === 'hi' ? '15+ वर्षों की अद्वितीय पारदर्शिता और विश्वास' : '15+ Years of Unmatched Transparency & Trust'}
          </span>
          <h1 style={{ color: '#ffffff', fontSize: '46px', fontWeight: '800', marginBottom: '22px', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
            Empowering Future Doctors With <span style={{ color: 'var(--coral-accent)' }}>Integrity & Care</span>
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '19px', maxWidth: '820px', margin: '0 auto 36px auto', lineHeight: '1.65', fontWeight: '400' }}>
            India’s premier foreign medical education advisory. Founded by doctors for aspiring medical students, we have successfully placed over 10,000+ Indian students in NMC & WHO recognized government state medical universities across 6 countries.
          </p>

          {/* Quick Hero Feature Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '10px 22px', borderRadius: '30px', fontSize: '14px', fontWeight: '600', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BadgeCheck color="var(--emerald-accent)" size={18} /> {lang === 'hi' ? '100% प्रत्यक्ष विश्वविद्यालय शुल्क भुगतान' : '100% Direct University Fee Remittance'}
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '10px 22px', borderRadius: '30px', fontSize: '14px', fontWeight: '600', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BadgeCheck color="var(--emerald-accent)" size={18} /> {lang === 'hi' ? 'एनएमसी 54-माह गजट अनुपालित' : 'NMC 54-Month Gazette Compliant'}
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '10px 22px', borderRadius: '30px', fontSize: '14px', fontWeight: '600', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BadgeCheck color="var(--emerald-accent)" size={18} /> {lang === 'hi' ? 'स्थायी भारतीय प्रतिनिधि' : 'Permanent On-Ground Indian Staff'}
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS & YEARS OF OPERATION BAR */}
      <section style={{ background: '#ffffff', padding: '42px 0', borderBottom: '1px solid #e2e8f0', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)', marginTop: '-2px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', textAlign: 'center' }}>

            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '42px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                <AnimatedCounter target={15} suffix="+ Years" />
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {lang === 'hi' ? 'संचालन के वर्ष' : 'Years of Operation'}
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{lang === 'hi' ? '2012 में स्थापित' : 'Established in 2012'}</p>
            </div>

            <div style={{ padding: '10px', borderLeft: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '42px', fontWeight: '800', color: 'var(--coral-accent)', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                <AnimatedCounter target={10000} suffix="+" format={true} />
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {lang === 'hi' ? 'छात्र प्रवेश' : 'Students Placed'}
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{lang === 'hi' ? 'शीर्ष विदेशी मेडिकल कॉलेजों में' : 'Across Top Foreign Medical Colleges'}</p>
            </div>

            <div style={{ padding: '10px', borderLeft: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '42px', fontWeight: '800', color: 'var(--cyan-accent)', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                <AnimatedCounter target={6} suffix=" Countries" />
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {lang === 'hi' ? 'देश' : 'Countries Served'}
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{lang === 'hi' ? 'रूस, जॉर्जिया, उज्बेकिस्तान, कजाकिस्तान, किर्गिस्तान और आर्मेनिया' : 'Russia, Georgia, Uzbekistan, Kazakhstan, Kyrgyzstan & Armenia'}</p>
            </div>

            <div style={{ padding: '10px', borderLeft: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '42px', fontWeight: '800', color: '#10b981', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                <AnimatedCounter target={50} suffix="+ Partnered" />
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {lang === 'hi' ? 'राज्य मेडिकल विश्वविद्यालय' : 'State Medical Universities'}
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{lang === 'hi' ? 'WHO और NMC सूचीबद्ध कॉलेज' : 'WHO & NMC Listed Colleges'}</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. COMPANY STORY & MISSION — WHY MEDICO OVERSEAS WAS FOUNDED */}
      <section style={{ padding: '90px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>

            <div>
              <span className="badge-coral" style={{ marginBottom: '14px' }}>{lang === 'hi' ? 'हमारी उत्पत्ति और दर्शन' : 'Our Genesis & Philosophy'}</span>
              <h2 style={{ fontSize: '38px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '22px', lineHeight: '1.2' }}>
                {lang === 'hi' ? 'मेडिको ओवरसीज की स्थापना क्यों हुई' : 'Why Medico Overseas Was Founded'}
              </h2>

              <p style={{ color: 'var(--text-body)', fontSize: '16px', lineHeight: '1.75', marginBottom: '20px' }}>
                In 2012, our founder <strong>Dr. Ramesh Chandra</strong> returned to India after graduating from Bashkir State Medical University, Russia. Upon his return, he witnessed how local admission agents manipulated hopeful Indian families with hidden fee markups, fake promises about private non-recognized institutes, and zero post-admission support.
              </p>

              <p style={{ color: 'var(--text-body)', fontSize: '16px', lineHeight: '1.75', marginBottom: '28px' }}>
                Driven by a personal commitment to safeguard aspiring doctors, <strong>Medico Overseas was established as a doctor-led consultancy</strong>. We abolished the sub-agent network and instituted a 100% direct university admission framework—ensuring every student pays tuition directly to university bank accounts with absolute price transparency and end-to-end guidance.
              </p>

              {/* Core Mission Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: '#f8fafc', padding: '24px', borderRadius: '18px', borderLeft: '4px solid var(--coral-accent)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: 'var(--coral-light)', color: 'var(--coral-accent)', padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '2px' }}>{lang === 'hi' ? 'शून्य छुपे शुल्क और प्रत्यक्ष बैंक भुगतान' : 'Zero Hidden Charges & Direct Bank Payments'}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'माता-पिता बिना किसी मध्यस्थ के सीधे विश्वविद्यालय खाते में ट्यूशन फीस जमा करते हैं।' : 'Parents pay tuition fees straight to the university bank account without middleman markup.'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: 'var(--cyan-light)', color: 'var(--cyan-accent)', padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '2px' }}>{lang === 'hi' ? 'स्थायी भारतीय प्रतिनिधि' : 'Permanent On-Ground Indian Representatives'}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'हॉस्टल चेक-इन और सुरक्षा की निगरानी के लिए मेजबान विश्वविद्यालयों में पूर्णकालिक भारतीय कर्मचारी।' : 'Full-time Indian staff present in host universities to supervise hostel check-ins and safety.'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ background: 'var(--purple-light)', color: 'var(--purple-accent)', padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '2px' }}>{lang === 'hi' ? 'एकीकृत एफएमजीई और नेक्स्ट परीक्षा कोचिंग' : 'Integrated FMGE & NEXT Exam Coaching'}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'शीर्ष भारतीय डॉक्टरों द्वारा पहले वर्ष एमबीबीएस से व्यापक मेडिकल लाइसेंसिंग तैयारी।' : 'Comprehensive medical licensing prep provided from 1st Year MBBS by top Indian doctors.'}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Visual Grid & Story Card */}
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(15, 23, 42, 0.15)', border: '1px solid #e2e8f0' }}>
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80"
                  alt="Medico Overseas Team & Doctors"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Highlight Card */}
              <div style={{
                position: 'absolute',
                bottom: '-28px',
                left: '-24px',
                background: 'linear-gradient(135deg, #0e233a, #1f3864)',
                color: '#ffffff',
                padding: '24px',
                borderRadius: '20px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.25)',
                maxWidth: '320px',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Award color="var(--gold-star)" size={28} />
                  <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--coral-accent)' }}>100%</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>NMC Gazette & Legal Protection</div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.4' }}>Signed student legal agreement ensuring zero fee escalation during the 6-year course.</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. TEAM / COUNSELLOR PROFILES — BUILDS TRUST WITH PARENTS */}
      <section style={{ padding: '90px 0', background: '#f8fafc' }}>
        <div className="container">

          <div className="section-header">
            <span className="badge-coral" style={{ marginBottom: '12px' }}>{lang === 'hi' ? 'डॉक्टर और काउंसलर प्रोफाइल' : 'Doctor & Counselor Profiles'}</span>
            <h2 className="section-title">
              {lang === 'hi' ? 'हमारे नेतृत्व और शैक्षणिक सलाहकारों से मिलें' : 'Meet Our Leadership & Academic Counselors'}
            </h2>
            <p className="section-desc">
              {lang === 'hi'
                ? 'हमारी टीम में चिकित्सा डॉक्टर, अंतरराष्ट्रीय शिक्षा वकील और वरिष्ठ अभिभावक संपर्क अधिकारी शामिल हैं।'
                : 'Our team consists of medical doctors, international education lawyers, and senior parent liaisons who provide transparent guidance to parents and students.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {teamMembers.map((member, idx) => (
              <div key={idx} className="glass-card" style={{ borderRadius: '24px', overflow: 'hidden', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden', background: '#0e233a' }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)' }} />

                  <span style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--navy-primary)', color: '#ffffff', padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                    {member.badge}
                  </span>

                  <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', color: '#ffffff' }}>
                    <div style={{ fontSize: '12px', color: 'var(--coral-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {member.experience}
                    </div>
                    <h3 style={{ fontSize: '22px', color: '#ffffff', fontWeight: '800', lineHeight: '1.2', marginTop: '2px' }}>
                      {member.name}
                    </h3>
                  </div>
                </div>

                <div style={{ padding: '26px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--navy-primary)', fontWeight: '700', marginBottom: '6px' }}>
                      {member.title}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid var(--cyan-accent)' }}>
                      {member.credentials}
                    </div>
                    <p style={{ fontSize: '14.5px', color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '20px' }}>
                      {member.desc}
                    </p>
                  </div>

                  <div style={{ paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', color: 'var(--navy-primary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={15} color="var(--coral-accent)" /> {member.phone}
                    </div>
                    <button
                      onClick={onRequestCounselling}
                      style={{ background: 'var(--coral-light)', color: 'var(--coral-accent)', border: 'none', padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                    >
                      {lang === 'hi' ? '1-ऑन-1 कॉल बुक करें' : 'Book 1-on-1 Call'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ACCREDITATIONS & PARTNERSHIPS WITH UNIVERSITIES */}
      <section style={{ padding: '90px 0', background: '#ffffff' }}>
        <div className="container">

          <div className="section-header">
            <span className="badge-navy" style={{ marginBottom: '12px' }}>{lang === 'hi' ? 'वैश्विक मान्यता और अनुपालन' : 'Global Recognitions & Compliance'}</span>
            <h2 className="section-title">
              {lang === 'hi' ? 'मान्यताएं और भागीदार विश्वविद्यालय' : 'Accreditations & Partner Universities'}
            </h2>
            <p className="section-desc">
              {lang === 'hi'
                ? 'हम केवल शीर्ष अंतर्राष्ट्रीय मेडिकल परिषदों और सूचीबद्ध संस्थाओं द्वारा मान्यता प्राप्त सरकारी मेडिकल अकादमियों के साथ साझेदारी करते हैं।'
                : 'We partner exclusively with government medical academies recognized by top international medical councils and listing bodies.'}
            </p>
          </div>

          {/* Accreditations Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '26px', marginBottom: '70px' }}>
            {accreditations.map((acc, idx) => {
              const IconComponent = acc.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: '30px', borderRadius: '20px', borderTop: `4px solid ${acc.color}`, background: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${acc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComponent size={28} color={acc.color} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '800', background: `${acc.color}15`, color: acc.color, padding: '4px 10px', borderRadius: '12px', textTransform: 'uppercase' }}>
                      {acc.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '19px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px' }}>{acc.name}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{acc.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Partner Universities Section Header & Filter */}
          <div style={{ background: 'linear-gradient(135deg, #0e233a 0%, #1f3864 100%)', borderRadius: '28px', padding: '48px 36px', color: '#ffffff', boxShadow: '0 20px 45px rgba(15, 23, 42, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
              <div>
                <span className="badge-coral" style={{ background: 'rgba(225, 91, 63, 0.2)', color: '#ff8a73', border: '1px solid rgba(225, 91, 63, 0.4)', marginBottom: '8px' }}>
                  Direct Partner Institutions
                </span>
                <h3 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '800' }}>
                  Official Government State Medical Universities
                </h3>
              </div>

              {/* Destination Filter Tabs */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveCategoryTab('all')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    border: 'none',
                    background: activeCategoryTab === 'all' ? 'var(--coral-accent)' : 'rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  All Countries
                </button>
                <button
                  onClick={() => setActiveCategoryTab('russia')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    border: 'none',
                    background: activeCategoryTab === 'russia' ? 'var(--coral-accent)' : 'rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Russia 🇷🇺
                </button>
                <button
                  onClick={() => setActiveCategoryTab('georgia')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    border: 'none',
                    background: activeCategoryTab === 'georgia' ? 'var(--coral-accent)' : 'rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Georgia 🇬🇪
                </button>
                <button
                  onClick={() => setActiveCategoryTab('asia')}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    border: 'none',
                    background: activeCategoryTab === 'asia' ? 'var(--coral-accent)' : 'rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Central Asia & East Asia
                </button>
              </div>
            </div>

            {/* University Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '22px' }}>
              {filteredUniversities.map((uni, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '13px', color: '#93c5fd', fontWeight: '700' }}>{uni.country} • {uni.est}</span>
                      <span style={{ background: 'rgba(249,115,22,0.25)', color: '#ff9a7b', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '800' }}>
                        {uni.students}
                      </span>
                    </div>
                    <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '800', marginBottom: '10px', lineHeight: '1.3' }}>
                      {uni.name}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '16px' }}>
                      {uni.highlight}
                    </p>
                  </div>

                  <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                      Tuition Approx: <span style={{ color: '#ffffff', fontWeight: '700' }}>{uni.fee}</span>
                    </div>
                    <button
                      onClick={onRequestCounselling}
                      style={{ background: 'transparent', color: 'var(--coral-accent)', border: 'none', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    >
                      Check Eligibility <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 6. OFFICE LOCATIONS WITH EMBEDDED MAPS */}
      <section style={{ padding: '90px 0', background: '#f8fafc' }}>
        <div className="container">

          <div className="section-header">
            <span className="badge-navy" style={{ marginBottom: '12px' }}>{lang === 'hi' ? 'भौतिक शाखाएं और विदेशी डेस्क' : 'Physical Branches & Overseas Desks'}</span>
            <h2 className="section-title">
              {lang === 'hi' ? 'हमारे पैन-इंडिया कार्यालय और वैश्विक छात्र हब' : 'Our Pan-India Offices & Global Student Hubs'}
            </h2>
            <p className="section-desc">
              {lang === 'hi'
                ? 'नई दिल्ली, हैदराबाद, या मुंबई में हमारे किसी भी परामर्श केंद्र में जाएं, या ताशकंद और मॉस्को में हमारे अंतर्राष्ट्रीय डेस्क से जुड़ें।'
                : 'Visit any of our counseling centers in New Delhi, Hyderabad, or Mumbai, or connect with our international operations desks in Tashkent and Moscow.'}
            </p>
          </div>

          {/* Location Selector Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {officeBranches.map((b, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMapTab(idx)}
                style={{
                  padding: '14px 28px',
                  borderRadius: '35px',
                  border: activeMapTab === idx ? 'none' : '1px solid #cbd5e1',
                  background: activeMapTab === idx ? 'var(--navy-primary)' : '#ffffff',
                  color: activeMapTab === idx ? '#ffffff' : 'var(--navy-primary)',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: activeMapTab === idx ? '0 8px 25px rgba(31, 56, 100, 0.25)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'

                }}
              >
                <MapPin size={16} color={activeMapTab === idx ? 'var(--coral-accent)' : 'var(--navy-primary)'} />
                {b.city}
              </button>
            ))}
          </div>

          {/* Active Location Info & Map Container */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', background: '#ffffff', borderRadius: '28px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 15px 40px rgba(15, 23, 42, 0.05)' }}>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="badge-coral" style={{ width: 'fit-content', marginBottom: '14px' }}>
                {officeBranches[activeMapTab].tag}
              </span>
              <h3 style={{ fontSize: '28px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '18px' }}>
                {officeBranches[activeMapTab].city}
              </h3>

              <div style={{ display: 'flex', gap: '14px', fontSize: '15px', color: 'var(--text-body)', marginBottom: '18px', lineHeight: '1.6' }}>
                <MapPin size={24} color="var(--coral-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--navy-primary)' }}>Address:</strong>
                  {officeBranches[activeMapTab].address}
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    📍 Landmark: {officeBranches[activeMapTab].landmark}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '700', marginBottom: '14px' }}>
                <Phone size={22} color="var(--coral-accent)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>Direct Helpline:</strong>
                  {officeBranches[activeMapTab].phone}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '700', marginBottom: '14px' }}>
                <Mail size={22} color="var(--coral-accent)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600' }}>Official Email:</strong>
                  {officeBranches[activeMapTab].email}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
                <Clock size={20} color="var(--cyan-accent)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Counseling Hours:</strong> {officeBranches[activeMapTab].hours}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={onRequestCounselling} style={{ padding: '14px 32px', fontSize: '15px' }}>
                  {lang === 'hi' ? 'कार्यालय यात्रा शेड्यूल करें' : 'Schedule Office Visit'}
                </button>
                <a
                  href={officeBranches[activeMapTab].mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: '12px 24px', fontSize: '14px' }}
                >
                  {lang === 'hi' ? 'दिशा खोलें' : 'Open Directions'} <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Embedded Google Map iframe */}
            <div style={{ height: '400px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1' }}>
              <iframe
                title={officeBranches[activeMapTab].city}
                src={officeBranches[activeMapTab].mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>
      </section>




    </div>
  );
};

export default AboutUs;
