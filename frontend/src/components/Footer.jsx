import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Youtube, Linkedin, ShieldCheck, 
  Send, GraduationCap, ChevronRight, Award, Globe, HeartHandshake, CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const Footer = ({ onRequestCounselling }) => {
  const { lang, t } = useLanguage();
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
    <footer style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)', color: '#cbd5e1', position: 'relative', overflow: 'hidden', borderTop: '4px solid #E05238' }}>
      
      {/* MAIN FOOTER CONTENT */}
      <div style={{ paddingTop: '28px', paddingBottom: '12px', background: 'transparent' }}>
        <div className="container">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '20px' }}>
            
            {/* Column 1: Brand Info & Socials */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img src="/logo.jpg" alt="Medico Overseas Logo" style={{ height: '56px', borderRadius: '10px', background: '#ffffff', padding: '4px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', border: 'none' }} />
              </div>

              <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
                {t('footerDesc')}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.25s' }}>
                  <Facebook size={16} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.25s' }}>
                  <Instagram size={16} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="Youtube" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.25s' }}>
                  <Youtube size={16} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Linkedin" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.25s' }}>
                  <Linkedin size={16} />
                </a>
                <a href="https://wa.me/918001234567" target="_blank" rel="noreferrer" aria-label="WhatsApp" style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#25D366', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', boxShadow: '0 2px 8px rgba(37, 211, 102, 0.4)', transition: 'all 0.25s' }}>
                  <Phone size={16} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Nav Links */}
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '800', marginBottom: '12px', position: 'relative', paddingBottom: '6px' }}>
                {t('quickNav')}
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '3px', background: '#E05238', borderRadius: '2px' }}></span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', padding: 0, margin: 0 }}>
                <li><Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}><ChevronRight size={13} color="#E05238" /> {t('navHome')}</Link></li>
                <li><Link to="/about" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}><ChevronRight size={13} color="#E05238" /> {t('navAboutFull')}</Link></li>
                <li><Link to="/faqs" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}><ChevronRight size={13} color="#E05238" /> {t('navFaqsFull')}</Link></li>
                <li><Link to="/blogs" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}><ChevronRight size={13} color="#E05238" /> {t('navBlogsFull')}</Link></li>
                <li><Link to="/exams/fmge-exam" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}><ChevronRight size={13} color="#E05238" /> {t('navExamsFull')}</Link></li>
                <li><Link to="/contact" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}><ChevronRight size={13} color="#E05238" /> {t('navContactFull')}</Link></li>
              </ul>
            </div>

            {/* Column 3: Study Destinations */}
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '800', marginBottom: '12px', position: 'relative', paddingBottom: '6px' }}>
                {t('destinationsNav')}
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '3px', background: '#E05238', borderRadius: '2px' }}></span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', padding: 0, margin: 0 }}>
                <li><Link to="/destinations/mbbs-in-russia" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>🇷🇺 {lang === 'hi' ? 'रूस में एमबीबीएस' : 'MBBS in Russia'}</Link></li>
                <li><Link to="/destinations/mbbs-in-georgia" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>🇬🇪 {lang === 'hi' ? 'जॉर्जिया में एमबीबीएस' : 'MBBS in Georgia'}</Link></li>
                <li><Link to="/destinations/mbbs-in-kyrgyzstan" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>🇰🇬 {lang === 'hi' ? 'किर्गिस्तान में एमबीबीएस' : 'MBBS in Kyrgyzstan'}</Link></li>
                <li><Link to="/destinations/mbbs-in-uzbekistan" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>🇺🇿 {lang === 'hi' ? 'उज्बेकिस्तान में एमबीबीएस' : 'MBBS in Uzbekistan'}</Link></li>
                <li><Link to="/destinations/mbbs-in-armenia" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>🇦🇲 {lang === 'hi' ? 'आर्मेनिया में एमबीबीएस' : 'MBBS in Armenia'}</Link></li>
                <li><Link to="/destinations/mbbs-in-vietnam" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>🇻🇳 {lang === 'hi' ? 'वियतनाम में एमबीबीएस' : 'MBBS in Vietnam'}</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Info & Office Addresses */}
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '800', marginBottom: '12px', position: 'relative', paddingBottom: '6px' }}>
                {t('officeBranches')}
                <span style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '3px', background: '#E05238', borderRadius: '2px' }}></span>
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MapPin size={16} color="#E05238" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ffffff' }}>{lang === 'hi' ? 'नई दिल्ली मुख्य कार्यालय:' : 'New Delhi Head Office:'}</strong><br />
                    Suite 402, Medical Education Tower, Connaught Place, New Delhi - 110001
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MapPin size={16} color="#0EA5E9" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#ffffff' }}>{lang === 'hi' ? 'मुंबई क्षेत्रीय डेस्क:' : 'Mumbai Regional Desk:'}</strong><br />
                    Level 5, Bandra Kurla Complex, Mumbai - 400051
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Phone size={14} color="#E05238" style={{ flexShrink: 0 }} />
                  <span><strong>{lang === 'hi' ? 'टोल-फ्री:' : 'Toll-Free:'}</strong> +91-800-123-4567 / +91-800-123-4568</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Mail size={14} color="#E05238" style={{ flexShrink: 0 }} />
                  <span><strong>{lang === 'hi' ? 'आधिकारिक ईमेल:' : 'Official Email:'}</strong> info@medicooverseas.com</span>
                </div>
              </div>

              {/* Newsletter Input Box */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {t('getAlerts')}
                </div>
                {subscribed ? (
                  <div style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#4ade80', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                    <CheckCircle2 size={14} /> {lang === 'hi' ? 'प्रवेश अलर्ट सदस्यता प्राप्त की गई!' : 'Subscribed to Admission Alerts!'}
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
                    <input 
                      type="email" 
                      placeholder={t('enterEmailPlaceholder')} 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      style={{ flexGrow: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#ffffff', fontSize: '12px', outline: 'none' }}
                    />
                    <button type="submit" style={{ background: '#E05238', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '0 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Send size={14} />
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

          {/* Global Accreditation Seals Row */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('accreditedBy')}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '700', color: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                🏥 {t('nmcApproved')}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '700', color: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                🌐 {t('whoListed')}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '700', color: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                🎓 {t('healthMinistry')}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: '700', color: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                🇺🇸 {t('usmleEligible')}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM SUB-FOOTER */}
      <div style={{ background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '10px 0', fontSize: '12px', color: '#94a3b8' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            {t('copyrightText')}
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>{lang === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}</Link>
            <Link to="/terms-and-conditions" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>{lang === 'hi' ? 'नियम व शर्तें' : 'Terms & Conditions'}</Link>
            <Link to="/faqs" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>{lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'FAQs'}</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
