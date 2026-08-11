import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, ChevronDown, Menu, X, GraduationCap, ShieldCheck, Search, Globe } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const Navbar = ({ onRequestCounselling }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [examsOpen, setExamsOpen] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    helplinePhone: '+91 98765 43210',
    helplineEmail: 'info@medicooverseas.com'
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(r => r.json())
      .then(d => { if (d.success) setSiteSettings(d.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDestinationsOpen(false);
    setExamsOpen(false);
    setSearchModalOpen(false);
  }, [location]);

  const searchItems = [
    { title: 'MBBS in Russia (Top Medical Universities)', type: 'Destination', link: '/destinations/mbbs-in-russia' },
    { title: 'MBBS in Georgia (European Curriculum)', type: 'Destination', link: '/destinations/mbbs-in-georgia' },
    { title: 'MBBS in Philippines (USMD Pattern)', type: 'Destination', link: '/destinations/mbbs-in-philippines' },
    { title: 'MBBS in Kazakhstan (Low Fee Structure)', type: 'Destination', link: '/destinations/mbbs-in-kazakhstan' },
    { title: 'MBBS in Uzbekistan (High Clinical Exposure)', type: 'Destination', link: '/destinations/mbbs-in-uzbekistan' },
    { title: 'MBBS in Kyrgyzstan (Budget Admissions)', type: 'Destination', link: '/destinations/mbbs-in-kyrgyzstan' },
    { title: 'MBBS in Vietnam (Warm Climate)', type: 'Destination', link: '/destinations/mbbs-in-vietnam' },
    { title: 'FMGE / NEXT Exam Coaching & Guidance', type: 'Exam Prep', link: '/exams/fmge-exam' },
    { title: 'NMAT Exam Preparation & Pattern', type: 'Exam Prep', link: '/exams/nmat-exam' },
    { title: 'Frequently Asked Questions & NEET Rules', type: 'FAQ', link: '/faqs' }
  ];

  const searchResults = searchQuery.trim() === '' ? [] : searchItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getNavTabStyle = (isActive) => ({
    fontWeight: isActive ? '800' : '600',
    color: isActive ? 'var(--coral-accent)' : 'var(--navy-primary)',
    background: isActive ? 'rgba(225, 91, 63, 0.12)' : 'transparent',
    border: isActive ? '1px solid rgba(225, 91, 63, 0.22)' : '1px solid transparent',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14.5px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: isActive ? '0 2px 8px rgba(225, 91, 63, 0.12)' : 'none'
  });

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', boxShadow: isScrolled ? '0 6px 24px rgba(31, 56, 100, 0.15)' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'all 0.3s ease' }}>
      
      {/* Top Utility Contact Bar */}
      <div className="top-utility-bar" style={{ background: 'var(--navy-primary)', color: '#ffffff', fontSize: '11px', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <a href={`tel:${siteSettings.helplinePhone}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#e2e8f0', fontWeight: '600', whiteSpace: 'nowrap' }}>
              <Phone size={12} color="var(--coral-accent)" /> {lang === 'hi' ? 'हेल्पलाइन:' : 'Helpline:'} {siteSettings.helplinePhone}
            </a>
            <a href={`mailto:${siteSettings.helplineEmail}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#e2e8f0', fontWeight: '500', whiteSpace: 'nowrap' }}>
              <Mail size={12} color="var(--coral-accent)" /> {siteSettings.helplineEmail}
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#cbd5e1', whiteSpace: 'nowrap', fontWeight: '600' }}>
              {lang === 'hi' ? '🏆 आईएसओ 9001:2015 प्रमाणित परामर्श' : '🏆 ISO 9001:2015 Certified Consultancy'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(225, 91, 63, 0.25)', color: 'var(--coral-accent)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>
              <ShieldCheck size={12} /> {lang === 'hi' ? '100% एनएमसी एवं डब्ल्यूएचओ मान्यता प्राप्त' : '100% NMC & WHO Recognized Universities'}
            </span>
            <button 
              onClick={toggleLanguage} 
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Globe size={11} /> {lang === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>

        </div>
      </div>

      {/* Main Header Container */}
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 16px', height: '64px' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
          <img 
            src="/logo.png" 
            alt="Medico Overseas Logo" 
            className="brand-logo-img"
            style={{ 
              height: '140px', 
              width: 'auto', 
              maxWidth: '320px',
              objectFit: 'contain',
              marginTop: '-35px',
              marginBottom: '-35px',
              filter: 'drop-shadow(0 4px 12px rgba(31, 56, 100, 0.18))',
              transition: 'all 0.3s ease'
            }} 
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="desktop-nav">
          <Link to="/" style={getNavTabStyle(location.pathname === '/')}>
            {t('navHome')}
          </Link>

          <Link to="/about" style={getNavTabStyle(location.pathname === '/about')}>
            {t('navAbout')}
          </Link>

          {/* Destinations Dropdown */}
          <div 
            style={{ position: 'relative', cursor: 'pointer' }}
            onMouseEnter={() => setDestinationsOpen(true)}
            onMouseLeave={() => setDestinationsOpen(false)}
          >
            <div style={getNavTabStyle(location.pathname.startsWith('/destinations'))}>
              {t('navDestinations')} <ChevronDown size={14} />
            </div>

            {destinationsOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, width: '230px', background: '#ffffff', borderRadius: '14px', boxShadow: '0 12px 36px rgba(31, 56, 100, 0.2)', border: '1px solid #e2e8f0', padding: '10px 0', zIndex: 100 }}>
                <Link to="/destinations/mbbs-in-russia" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  <span>🇷🇺</span> MBBS in Russia
                </Link>
                <Link to="/destinations/mbbs-in-georgia" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  <span>🇬🇪</span> MBBS in Georgia
                </Link>
                <Link to="/destinations/mbbs-in-kazakhstan" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  <span>🇰🇿</span> MBBS in Kazakhstan
                </Link>
                <Link to="/destinations/mbbs-in-uzbekistan" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  <span>🇺🇿</span> MBBS in Uzbekistan
                </Link>
                <Link to="/destinations/mbbs-in-kyrgyzstan" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  <span>🇰🇬</span> MBBS in Kyrgyzstan
                </Link>
                <Link to="/destinations/mbbs-in-armenia" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  <span>🇦🇲</span> MBBS in Armenia
                </Link>
                <Link to="/destinations/mbbs-in-vietnam" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  <span>🇻🇳</span> MBBS in Vietnam
                </Link>
              </div>
            )}
          </div>

          {/* Exams Dropdown */}
          <div 
            style={{ position: 'relative', cursor: 'pointer' }}
            onMouseEnter={() => setExamsOpen(true)}
            onMouseLeave={() => setExamsOpen(false)}
          >
            <div style={getNavTabStyle(location.pathname.startsWith('/exams'))}>
              {t('navExams')} <ChevronDown size={14} />
            </div>

            {examsOpen && (
              <div style={{ position: 'absolute', top: '100%', left: 0, width: '230px', background: '#ffffff', borderRadius: '14px', boxShadow: '0 12px 36px rgba(31, 56, 100, 0.2)', border: '1px solid #e2e8f0', padding: '10px 0', zIndex: 100 }}>
                <Link to="/exams/fmge-exam" style={{ display: 'block', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  🩺 FMGE / NEXT Exam
                </Link>
                <Link to="/exams/nmat-exam" style={{ display: 'block', padding: '10px 18px', color: 'var(--navy-primary)', fontWeight: '600', fontSize: '14px' }} className="dropdown-item">
                  📝 NMAT Exam
                </Link>
              </div>
            )}
          </div>

          <Link to="/blogs" style={getNavTabStyle(location.pathname.startsWith('/blogs'))}>
            {t('navBlogs')}
          </Link>

          <Link to="/contact" style={getNavTabStyle(location.pathname === '/contact')}>
            {t('navContact')}
          </Link>
        </nav>

        {/* CTA, Search & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setSearchModalOpen(true)}
            aria-label="Open Site Search"
            style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: 'var(--navy-primary)', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
            title="Search site-wide"
          >
            <Search size={18} />
          </button>

          <button className="btn-primary desktop-cta-btn" onClick={onRequestCounselling} style={{ padding: '10px 20px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            <GraduationCap size={16} /> {t('bookConsultation')}
          </button>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation"
            style={{ background: 'transparent', border: 'none', color: 'var(--navy-primary)', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* Site-Wide Live Search Modal Overlay */}
      {searchModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px 20px 20px' }}>
          <div style={{ background: '#ffffff', width: '100%', maxWidth: '650px', borderRadius: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <Search size={22} color="var(--coral-accent)" style={{ marginRight: '12px' }} />
              <input
                type="text"
                autoFocus
                placeholder="Search countries, exams, blogs, FAQs (e.g. Russia, NMAT)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', fontWeight: '600', color: 'var(--navy-primary)' }}
              />
              <button onClick={() => setSearchModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '12px 16px' }}>
              {searchQuery.trim() === '' ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '14px' }}>
                  Type to search across destinations, exams, blog articles, and FAQs...
                </div>
              ) : (
                <>
                  {searchResults.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px 10px 10px', color: '#94a3b8', fontSize: '14px' }}>
                      No site pages matched "{searchQuery}".
                    </div>
                  )}
                  {searchResults.map((res, i) => (
                    <Link
                      key={i}
                      to={res.link}
                      onClick={() => setSearchModalOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', transition: 'background 0.2s ease', margin: '4px 0' }}
                      className="dropdown-item"
                    >
                      <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy-primary)' }}>{res.title}</span>
                      <span className="badge-navy" style={{ fontSize: '11px' }}>{res.type}</span>
                    </Link>
                  ))}
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '80vh', overflowY: 'auto' }} className="mobile-drawer">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: location.pathname === '/' ? '800' : '600', color: location.pathname === '/' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none' }}>
            {t('navHome')}
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: location.pathname === '/about' ? '800' : '600', color: location.pathname === '/about' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/about' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none' }}>
            {t('navAbout')}
          </Link>
          
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
            <div style={{ fontWeight: '800', color: 'var(--coral-accent)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>{t('navDestinations')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <Link to="/destinations/mbbs-in-russia" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: '600', color: location.pathname === '/destinations/mbbs-in-russia' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/destinations/mbbs-in-russia' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '6px 8px', borderRadius: '8px', textDecoration: 'none' }}>🇷🇺 Russia</Link>
              <Link to="/destinations/mbbs-in-georgia" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: '600', color: location.pathname === '/destinations/mbbs-in-georgia' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/destinations/mbbs-in-georgia' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '6px 8px', borderRadius: '8px', textDecoration: 'none' }}>🇬🇪 Georgia</Link>
              <Link to="/destinations/mbbs-in-kyrgyzstan" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: '600', color: location.pathname === '/destinations/mbbs-in-kyrgyzstan' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/destinations/mbbs-in-kyrgyzstan' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '6px 8px', borderRadius: '8px', textDecoration: 'none' }}>🇰🇬 Kyrgyzstan</Link>
              <Link to="/destinations/mbbs-in-uzbekistan" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: '600', color: location.pathname === '/destinations/mbbs-in-uzbekistan' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/destinations/mbbs-in-uzbekistan' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '6px 8px', borderRadius: '8px', textDecoration: 'none' }}>🇺🇿 Uzbekistan</Link>
              <Link to="/destinations/mbbs-in-armenia" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: '600', color: location.pathname === '/destinations/mbbs-in-armenia' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/destinations/mbbs-in-armenia' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '6px 8px', borderRadius: '8px', textDecoration: 'none' }}>🇦🇲 Armenia</Link>
              <Link to="/destinations/mbbs-in-vietnam" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: '600', color: location.pathname === '/destinations/mbbs-in-vietnam' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/destinations/mbbs-in-vietnam' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '6px 8px', borderRadius: '8px', textDecoration: 'none' }}>🇻🇳 Vietnam</Link>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
            <div style={{ fontWeight: '800', color: 'var(--coral-accent)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>{t('navExams')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link to="/exams/fmge-exam" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: '600', color: location.pathname === '/exams/fmge-exam' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/exams/fmge-exam' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none' }}>🩺 FMGE / NEXT Exam Prep</Link>
              <Link to="/exams/nmat-exam" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '13px', fontWeight: '600', color: location.pathname === '/exams/nmat-exam' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/exams/nmat-exam' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none' }}>📝 NMAT Exam Prep</Link>
            </div>
          </div>

          <Link to="/faqs" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: location.pathname === '/faqs' ? '800' : '600', color: location.pathname === '/faqs' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/faqs' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none' }}>{t('navFaqs')}</Link>
          <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: location.pathname.startsWith('/blogs') ? '800' : '600', color: location.pathname.startsWith('/blogs') ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname.startsWith('/blogs') ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none' }}>{t('navBlogs')}</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '15px', fontWeight: location.pathname === '/contact' ? '800' : '600', color: location.pathname === '/contact' ? 'var(--coral-accent)' : 'var(--navy-primary)', background: location.pathname === '/contact' ? 'rgba(225, 91, 63, 0.12)' : 'transparent', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none' }}>{t('navContact')}</Link>
          
          <button className="btn-primary" onClick={onRequestCounselling} style={{ width: '100%', padding: '12px', marginTop: '6px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <GraduationCap size={18} /> {t('bookConsultation')}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
