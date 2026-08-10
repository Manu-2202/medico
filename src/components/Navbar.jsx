import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, ChevronDown, Menu, X, GraduationCap, ShieldCheck, Search } from 'lucide-react';

const Navbar = ({ onRequestCounselling }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [examsOpen, setExamsOpen] = useState(false);

  // Site-wide Search Modal State
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
    setMobileMenuOpen(false);
    setDestinationsOpen(false);
    setExamsOpen(false);
    setSearchModalOpen(false);
  }, [location]);

  // Site-wide searchable dataset
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
    { title: 'Complete Guide to MBBS in Russia 2026', type: 'Blog', link: '/blogs/guide-to-mbbs-in-russia-2026' },
    { title: 'How to Crack FMGE / NEXT Exam on First Attempt', type: 'Blog', link: '/blogs/crack-fmge-next-exam-first-attempt' },
    { title: 'Why Georgia is Becoming #1 Medical Education Hub', type: 'Blog', link: '/blogs/georgia-number-1-medical-hub' },
    { title: 'Frequently Asked Questions & NEET Rules', type: 'FAQ', link: '/faqs' }
  ];

  const searchResults = searchQuery.trim() === '' ? [] : searchItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', boxShadow: isScrolled ? '0 6px 24px rgba(31, 56, 100, 0.15)' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'all 0.3s ease' }}>
      
      {/* Top Utility Contact Bar (Hidden on Mobile Screens <= 768px via CSS) */}
      <div className="top-utility-bar" style={{ background: 'var(--navy-primary)', color: '#ffffff', fontSize: '11px', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#e2e8f0', fontWeight: '600', whiteSpace: 'nowrap' }}>
              <Phone size={12} color="var(--coral-accent)" /> Helpline: +91 98765 43210
            </a>
            <a href="mailto:info@medicooverseas.com" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#e2e8f0', fontWeight: '500', whiteSpace: 'nowrap' }}>
              <Mail size={12} color="var(--coral-accent)" /> info@medicooverseas.com
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#cbd5e1', whiteSpace: 'nowrap', fontWeight: '600' }}>
              🏆 ISO 9001:2015 Certified Consultancy
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(225, 91, 63, 0.25)', color: 'var(--coral-accent)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>
              <ShieldCheck size={12} /> 100% NMC & WHO Recognized Universities
            </span>
            <Link to="/admin" style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: '600', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
              Admin Portal
            </Link>
          </div>

        </div>
      </div>

      {/* Main Header Container */}
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 16px', height: '64px' }}>
        
        {/* Brand Logo - Responsive Sizing */}
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
        <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }} className="desktop-nav">
          <Link to="/" style={{ fontWeight: location.pathname === '/' ? '800' : '600', color: location.pathname === '/' ? 'var(--coral-accent)' : 'var(--navy-primary)', fontSize: '15px' }}>
            Home
          </Link>

          <Link to="/about" style={{ fontWeight: location.pathname === '/about' ? '800' : '600', color: location.pathname === '/about' ? 'var(--coral-accent)' : 'var(--navy-primary)', fontSize: '15px' }}>
            About Us
          </Link>

          {/* Destinations Dropdown */}
          <div 
            style={{ position: 'relative', cursor: 'pointer' }}
            onMouseEnter={() => setDestinationsOpen(true)}
            onMouseLeave={() => setDestinationsOpen(false)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: location.pathname.includes('/destinations') ? '800' : '600', color: location.pathname.includes('/destinations') ? 'var(--coral-accent)' : 'var(--navy-primary)', fontSize: '15px', padding: '4px 0' }}>
              Destinations <ChevronDown size={14} />
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

                {/* Dynamically render custom added destinations */}
                {(() => {
                  try {
                    const saved = localStorage.getItem('custom_destinations');
                    if (saved) {
                      const parsed = JSON.parse(saved);
                      const defaultSlugs = ['mbbs-in-russia', 'mbbs-in-georgia', 'mbbs-in-kazakhstan', 'mbbs-in-uzbekistan', 'mbbs-in-kyrgyzstan', 'mbbs-in-armenia', 'mbbs-in-vietnam'];
                      const customItems = parsed.filter(item => !defaultSlugs.includes(item.slug));
                      return customItems.map((item, i) => (
                        <Link key={i} to={`/destinations/${item.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: 'var(--coral-accent)', fontWeight: '700', fontSize: '14px' }} className="dropdown-item">
                          <span>{item.flag || '🌍'}</span> MBBS in {item.country || item.name}
                        </Link>
                      ));
                    }
                  } catch (e) {}
                  return null;
                })()}
              </div>
            )}
          </div>

          {/* Exams Dropdown */}
          <div 
            style={{ position: 'relative', cursor: 'pointer' }}
            onMouseEnter={() => setExamsOpen(true)}
            onMouseLeave={() => setExamsOpen(false)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: location.pathname.includes('/exams') ? '800' : '600', color: location.pathname.includes('/exams') ? 'var(--coral-accent)' : 'var(--navy-primary)', fontSize: '15px', padding: '4px 0' }}>
              Exams Prep <ChevronDown size={14} />
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

          <Link to="/gallery" style={{ fontWeight: location.pathname === '/gallery' ? '800' : '600', color: location.pathname === '/gallery' ? 'var(--coral-accent)' : 'var(--navy-primary)', fontSize: '15px' }}>
            Gallery
          </Link>

          <Link to="/blogs" style={{ fontWeight: location.pathname === '/blogs' ? '800' : '600', color: location.pathname === '/blogs' ? 'var(--coral-accent)' : 'var(--navy-primary)', fontSize: '15px' }}>
            Blogs
          </Link>

          <Link to="/contact" style={{ fontWeight: location.pathname === '/contact' ? '800' : '600', color: location.pathname === '/contact' ? 'var(--coral-accent)' : 'var(--navy-primary)', fontSize: '15px' }}>
            Contact
          </Link>
        </nav>

        {/* CTA, Search & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Site-wide Search Trigger Button */}
          <button 
            onClick={() => setSearchModalOpen(true)}
            aria-label="Open Site Search"
            style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: 'var(--navy-primary)', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
            title="Search site-wide"
          >
            <Search size={18} />
          </button>

          <button className="btn-primary desktop-cta-btn" onClick={onRequestCounselling} style={{ padding: '10px 20px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            <GraduationCap size={16} /> Get Free Counselling
          </button>

          {/* Mobile Toggle Button */}
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
            
            {/* Search Input Bar */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <Search size={22} color="var(--coral-accent)" style={{ marginRight: '12px' }} />
              <input
                type="text"
                autoFocus
                placeholder="Search countries, exams, blogs, FAQs (e.g. Russia, FMGE)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontSize: '16px', fontWeight: '600', color: 'var(--navy-primary)' }}
              />
              <button onClick={() => setSearchModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px' }}>
                <X size={20} />
              </button>
            </div>

            {/* Results List */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '12px 16px' }}>
              {searchQuery.trim() === '' ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '14px' }}>
                  Type to search across destinations, exams, blogs, and FAQs...
                </div>
              ) : searchResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '14px' }}>
                  No results found for "{searchQuery}".
                </div>
              ) : (
                searchResults.map((res, i) => (
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
                ))
              )}
            </div>

          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '80vh', overflowY: 'auto' }} className="mobile-drawer">
          <Link to="/" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy-primary)' }}>Home</Link>
          <Link to="/about" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy-primary)' }}>About Us</Link>
          
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
            <div style={{ fontWeight: '800', color: 'var(--coral-accent)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Study Destinations</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <Link to="/destinations/mbbs-in-russia" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)' }}>🇷🇺 Russia</Link>
              <Link to="/destinations/mbbs-in-georgia" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)' }}>🇬🇪 Georgia</Link>
              <Link to="/destinations/mbbs-in-kyrgyzstan" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)' }}>🇰🇬 Kyrgyzstan</Link>
              <Link to="/destinations/mbbs-in-uzbekistan" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)' }}>🇺🇿 Uzbekistan</Link>
              <Link to="/destinations/mbbs-in-armenia" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)' }}>🇦🇲 Armenia</Link>
              <Link to="/destinations/mbbs-in-vietnam" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)' }}>🇻🇳 Vietnam</Link>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
            <div style={{ fontWeight: '800', color: 'var(--coral-accent)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Exams Guidance</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Link to="/exams/fmge-exam" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)' }}>🩺 FMGE / NEXT Exam Prep</Link>
              <Link to="/exams/nmat-exam" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)' }}>📝 NMAT Exam Prep</Link>
            </div>
          </div>

          <Link to="/gallery" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy-primary)' }}>Campus & Hostel Gallery</Link>
          <Link to="/faqs" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy-primary)' }}>FAQs</Link>
          <Link to="/blogs" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy-primary)' }}>Blogs</Link>
          <Link to="/contact" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy-primary)' }}>Contact Us</Link>
          
          <button className="btn-primary" onClick={onRequestCounselling} style={{ width: '100%', padding: '12px', marginTop: '6px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <GraduationCap size={18} /> Apply for Free Counselling
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
