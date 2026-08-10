import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin, ShieldCheck, 
  Send, GraduationCap, ChevronRight, Award, Globe, HeartHandshake, CheckCircle2 
} from 'lucide-react';

const Footer = ({ onRequestCounselling }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer style={{ background: '#F8FAFC', color: '#475569', position: 'relative', overflow: 'hidden', borderTop: '4px solid #E05238' }}>
      
      {/* 1. TOP CALLOUT BANNER (Option 1: Clean & High Contrast CTA) */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#ffffff', padding: '44px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#E05238', marginBottom: '6px' }}>
              ⭐ DIRECT ADMISSION INTAKE 2026 NOW OPEN
            </div>
            <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '800', margin: 0 }}>
              Ready to Begin Your MBBS Career Abroad?
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '15px', marginTop: '6px', margin: 0 }}>
              Speak directly with senior medical counselors. Get 100% authentic fee structure with zero capitation fees.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              className="btn-primary" 
              onClick={onRequestCounselling} 
              style={{ background: '#E05238', color: '#ffffff', padding: '14px 30px', fontSize: '15px', borderRadius: '30px', border: 'none', fontWeight: '700', boxShadow: '0 6px 20px rgba(224, 82, 56, 0.4)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <GraduationCap size={18} /> Get Free Counselling
            </button>
            <button 
              className="btn-secondary" 
              onClick={onRequestCounselling} 
              style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', padding: '14px 28px', fontSize: '15px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.3)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <Phone size={18} color="#E05238" /> Talk to an Expert
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT (Option 1: Clean #F8FAFC Light Slate) */}
      <div style={{ paddingTop: '60px', paddingBottom: '40px', background: '#F8FAFC' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '45px' }}>
            
            {/* Column 1: Brand Info & Socials */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <img src="/logo.jpg" alt="Medico Overseas Logo" style={{ height: '68px', borderRadius: '10px', background: '#ffffff', padding: '4px', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.1)', border: '1px solid #E2E8F0' }} />
              </div>

              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
                Medico Overseas is India’s premier medical study consultancy. We guide aspirants to secure direct admissions in NMC & WHO-approved state medical universities with 100% transparent fee structures.
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.25s' }}>
                  <Facebook size={18} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.25s' }}>
                  <Instagram size={18} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="Youtube" style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.25s' }}>
                  <Youtube size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Linkedin" style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.25s' }}>
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Nav Links */}
            <div>
              <h4 style={{ color: '#0F172A', fontSize: '18px', fontWeight: '800', marginBottom: '20px', position: 'relative', paddingBottom: '8px' }}>
                Quick Navigation
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '36px', height: '3px', background: '#E05238', borderRadius: '2px' }}></span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                <li><Link to="/" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><ChevronRight size={14} color="#E05238" /> Home</Link></li>
                <li><Link to="/about" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><ChevronRight size={14} color="#E05238" /> About Medico Overseas</Link></li>
                <li><Link to="/gallery" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><ChevronRight size={14} color="#E05238" /> Campus & Hostel Life</Link></li>
                <li><Link to="/faqs" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><ChevronRight size={14} color="#E05238" /> Student FAQs</Link></li>
                <li><Link to="/blogs" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><ChevronRight size={14} color="#E05238" /> Medical News & Blogs</Link></li>
                <li><Link to="/exams/fmge-exam" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><ChevronRight size={14} color="#E05238" /> FMGE / NEXT Exam Prep</Link></li>
                <li><Link to="/contact" style={{ color: '#475569', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}><ChevronRight size={14} color="#E05238" /> Contact Office Branches</Link></li>
              </ul>
            </div>

            {/* Column 3: Study Destinations */}
            <div>
              <h4 style={{ color: '#0F172A', fontSize: '18px', fontWeight: '800', marginBottom: '20px', position: 'relative', paddingBottom: '8px' }}>
                MBBS Destinations
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '36px', height: '3px', background: '#E05238', borderRadius: '2px' }}></span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', padding: 0 }}>
                <li><Link to="/destinations/mbbs-in-russia" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>🇷🇺 MBBS in Russia</Link></li>
                <li><Link to="/destinations/mbbs-in-georgia" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>🇬🇪 MBBS in Georgia</Link></li>
                <li><Link to="/destinations/mbbs-in-kyrgyzstan" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>🇰🇬 MBBS in Kyrgyzstan</Link></li>
                <li><Link to="/destinations/mbbs-in-uzbekistan" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>🇺🇿 MBBS in Uzbekistan</Link></li>
                <li><Link to="/destinations/mbbs-in-armenia" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>🇦🇲 MBBS in Armenia</Link></li>
                <li><Link to="/destinations/mbbs-in-vietnam" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>🇻🇳 MBBS in Vietnam</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Info & Newsletter */}
            <div>
              <h4 style={{ color: '#0F172A', fontSize: '18px', fontWeight: '800', marginBottom: '20px', position: 'relative', paddingBottom: '8px' }}>
                Head Office Contact
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '36px', height: '3px', background: '#E05238', borderRadius: '2px' }}></span>
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#475569', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={18} color="#E05238" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Suite 402, Medical Education Tower, Connaught Place, New Delhi - 110001</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={16} color="#E05238" style={{ flexShrink: 0 }} />
                  <span>+91-800-123-4567 / +91-800-123-4568</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={16} color="#E05238" style={{ flexShrink: 0 }} />
                  <span>info@medicooverseas.com</span>
                </div>
              </div>

              {/* Newsletter Input Box */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase', marginBottom: '8px' }}>
                  GET ADMISSION ALERTS
                </div>
                {subscribed ? (
                  <div style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#15803d', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #bbf7d0' }}>
                    <CheckCircle2 size={16} /> Subscribed to Admission Alerts!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      style={{ flexGrow: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#ffffff', color: '#0F172A', fontSize: '13px', outline: 'none' }}
                    />
                    <button type="submit" style={{ background: '#E05238', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

          {/* Global Accreditation Seals Row */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '1px' }}>
              RECOGNIZED & ACCREDITED BY
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ background: '#ffffff', border: '1px solid #E2E8F0', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#0F172A', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                🏥 NMC Approved
              </span>
              <span style={{ background: '#ffffff', border: '1px solid #E2E8F0', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#0F172A', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                🌐 WHO Listed
              </span>
              <span style={{ background: '#ffffff', border: '1px solid #E2E8F0', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#0F172A', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                🎓 Ministry of Health
              </span>
              <span style={{ background: '#ffffff', border: '1px solid #E2E8F0', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: '#0F172A', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                🇺🇸 USMLE & WFME Eligible
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM SUB-FOOTER (Option 1: #EEF2F6 Neutral Gray) */}
      <div style={{ background: '#EEF2F6', borderTop: '1px solid #E2E8F0', padding: '20px 0', fontSize: '13px', color: '#475569' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            © {new Date().getFullYear()} Medico Overseas Educational Consultancy. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy-policy" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</Link>
            <Link to="/terms-and-conditions" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>Terms & Conditions</Link>
            <Link to="/faqs" style={{ color: '#475569', textDecoration: 'none', fontWeight: '500' }}>FAQs</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
