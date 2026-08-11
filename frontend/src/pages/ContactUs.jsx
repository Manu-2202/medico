import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Building2 } from 'lucide-react';
import Recaptcha from '../components/Recaptcha';
import SEO from '../components/SEO';
import { useLanguage } from '../utils/languageContext';
import { playAlertSound } from '../utils/soundNotification';

const ContactUs = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    country: 'Russia',
    neetScore: '',
    message: ''
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [offices, setOffices] = useState([
    {
      city: lang === 'hi' ? 'नई दिल्ली (मुख्य कार्यालय)' : 'New Delhi (Head Office)',
      address: lang === 'hi' ? 'सूट 402, मेडिकल हब टावर, बाराखम्बा रोड, कनॉट प्लेस, नई दिल्ली - 110001' : 'Suite 402, Medical Hub Tower, Barakhamba Road, Connaught Place, New Delhi - 110001',
      phone: '+91 98765 43210',
      email: 'delhi@medicooverseas.com'
    },
    {
      city: lang === 'hi' ? 'मुंबई कार्यालय' : 'Mumbai Office',
      address: lang === 'hi' ? '7वीं मंजिल, कॉमर्स सेंटर, बांद्रा वेस्ट, मुंबई, महाराष्ट्र - 400050' : '7th Floor, Commerce Centre, Bandra West, Mumbai, Maharashtra - 400050',
      phone: '+91 98765 43211',
      email: 'mumbai@medicooverseas.com'
    },
    {
      city: lang === 'hi' ? 'हैदराबाद शाखा' : 'Hyderabad Branch',
      address: lang === 'hi' ? '3री मंजिल, जुबली हाइट्स, रोड नं. 36, जुबली हिल्स, हैदराबाद - 500033' : '3rd Floor, Jubilee Heights, Road No. 36, Jubilee Hills, Hyderabad - 500033',
      phone: '+91 98765 43212',
      email: 'hyderabad@medicooverseas.com'
    },
    {
      city: lang === 'hi' ? 'बंगलोर शाखा' : 'Bangalore Branch',
      address: lang === 'hi' ? '2री मंजिल, प्रेस्टीज मेरिडियन, एमजी रोड, बंगलोर, कर्नाटक - 560001' : '2nd Floor, Prestige Meridian, M.G. Road, Bangalore, Karnataka - 560001',
      phone: '+91 98765 43213',
      email: 'bangalore@medicooverseas.com'
    }
  ]);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data.officeLocations && d.data.officeLocations.length > 0) {
          setOffices(d.data.officeLocations);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (import.meta.env.VITE_RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setError(lang === 'hi' ? 'कृपया सबमिट करने से पहले reCAPTCHA जांच पूरी करें।' : 'Please complete the reCAPTCHA check before submitting.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          sourcePage: 'Contact Page',
          recaptchaToken
        })
      });
      const data = await res.json();
      if (data.success) {
        playAlertSound();
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', city: '', country: 'Russia', neetScore: '', message: '' });
        setRecaptchaToken(null);
      } else {
        setError(data.message || (lang === 'hi' ? 'फॉर्म जमा करने में त्रुटि।' : 'Error submitting form.'));
      }
    } catch (err) {
      console.error(err);
      setError(lang === 'hi' ? 'बैकएंड से कनेक्ट नहीं हो सका।' : 'Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEO 
        title={lang === 'hi' ? 'मेडिको ओवरसीज से संपर्क करें | मुख्यालय और क्षेत्रीय शाखाएं' : 'Contact Medico Overseas | Head Office & Regional Branches'}
        description={lang === 'hi' ? 'एमबीबीएस विदेश मार्गदर्शन के लिए हमारे नई दिल्ली, मुंबई, हैदराबाद और बंगलोर कार्यालयों में हमारे सलाहकारों से संपर्क करें।' : 'Get in touch with Medico Overseas counselors across our New Delhi, Mumbai, Hyderabad, and Bangalore offices for MBBS abroad guidance.'}
      />

      {/* Contact Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#ffffff', padding: '36px 0 28px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-coral" style={{ marginBottom: '12px' }}>
            {lang === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
          </span>
          <h1 style={{ color: '#ffffff', fontSize: '40px', marginBottom: '14px', fontWeight: '800' }}>
            {lang === 'hi' ? 'मेडिकल परामर्शदाताओं से बात करें' : 'Talk with Senior Medical Counselors'}
          </h1>
          <p style={{ color: '#cbd5e1', maxWidth: '650px', margin: '0 auto', fontSize: '16px' }}>
            {lang === 'hi'
              ? 'विश्वविद्यालय चयन, बजट योजना, एनएमसी पात्रता और वीजा आवेदन पर 1-ऑन-1 निःशुल्क विशेषज्ञ मार्गदर्शन प्राप्त करें।'
              : 'Get personalized 1-on-1 expert guidance on university selection, tuition fee budget, NMC 2026 guidelines, and visa stamping.'}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
          
          {/* Inquiry Form */}
          <div style={{ background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontSize: '24px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '8px' }}>
              {lang === 'hi' ? 'निःशुल्क परामर्श अनुरोध भेजें' : 'Send Free Counseling Request'}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              {lang === 'hi'
                ? 'नीचे फॉर्म भरें और हमारे वरिष्ठ सलाहकार 15–30 मिनट के भीतर आपसे संपर्क करेंगे।'
                : 'Fill out the form below and our senior counselor will personally connect with you within 15–30 minutes.'}
            </p>

            {success ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'grid', placeItems: 'center', margin: '0 auto 14px', color: '#16a34a' }}>
                  <CheckCircle2 size={36} />
                </div>
                <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.12)', color: '#15803d', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {lang === 'hi' ? '✓ संदेश प्राप्त हुआ' : '✓ Request Received Successfully'}
                </div>
                <h4 style={{ fontSize: '22px', color: 'var(--navy-primary)', fontWeight: '800', margin: '0 0 8px' }}>
                  {lang === 'hi' ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Message Sent Successfully!'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
                  {lang === 'hi'
                    ? 'मेडिको ओवरसीज से संपर्क करने के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क कर रही है।'
                    : 'Thank you for reaching out to Medico Overseas. Our team is contacting you shortly.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px', margin: '20px auto 0' }}>
                  <a 
                    href="https://wa.me/919876543210?text=Hello%20Medico%20Overseas%2C%20I%20just%20submitted%20a%20counseling%20inquiry." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#22c55e', color: '#ffffff', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: '800', fontSize: '14px', boxShadow: '0 4px 14px rgba(34,197,94,0.35)' }}
                  >
                    💬 {lang === 'hi' ? 'व्हाट्सएप पर तुरंत चैट करें' : 'Chat on WhatsApp (+91 98765 43210)'}
                  </a>
                  <button className="btn-secondary" onClick={() => setSuccess(false)} style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                    {lang === 'hi' ? 'एक और पूछताछ भेजें' : 'Send Another Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>
                    {lang === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input type="text" required placeholder={lang === 'hi' ? 'जैसे अंकित शर्मा' : 'e.g. Ankit Sharma'} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>
                      {lang === 'hi' ? 'फोन नंबर *' : 'Phone Number *'}
                    </label>
                    <input type="tel" required placeholder="+91 9876543210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>
                      {lang === 'hi' ? 'ईमेल पता *' : 'Email Address *'}
                    </label>
                    <input type="email" required placeholder="student@gmail.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>
                      {lang === 'hi' ? 'रुचि का देश' : 'Interested Country'}
                    </label>
                    <select value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#ffffff' }}>
                      <option value="Russia">{lang === 'hi' ? 'रूस 🇷🇺' : 'Russia 🇷🇺'}</option>
                      <option value="Georgia">{lang === 'hi' ? 'जॉर्जिया 🇬🇪' : 'Georgia 🇬🇪'}</option>
                      <option value="Kyrgyzstan">{lang === 'hi' ? 'किर्गिस्तान 🇰🇬' : 'Kyrgyzstan 🇰🇬'}</option>
                      <option value="Uzbekistan">{lang === 'hi' ? 'उज्बेकिस्तान 🇺🇿' : 'Uzbekistan 🇺🇿'}</option>
                      <option value="Philippines">{lang === 'hi' ? 'फिलिपिंस 🇵🇭' : 'Philippines 🇵🇭'}</option>
                      <option value="Kazakhstan">{lang === 'hi' ? 'कजाकिस्तान 🇰🇿' : 'Kazakhstan 🇰🇿'}</option>
                      <option value="Armenia">{lang === 'hi' ? 'आर्मेनिया 🇦🇲' : 'Armenia 🇦🇲'}</option>
                      <option value="Vietnam">{lang === 'hi' ? 'वियतनाम 🇻🇳' : 'Vietnam 🇻🇳'}</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>
                      {lang === 'hi' ? 'नीट स्कोर' : 'NEET Score'}
                    </label>
                    <input type="number" placeholder="e.g. 240" value={formData.neetScore} onChange={e => setFormData({...formData, neetScore: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>
                    {lang === 'hi' ? 'आपका प्रश्न / संदेश' : 'Your Query / Message'}
                  </label>
                  <textarea rows="4" placeholder={lang === 'hi' ? 'अपनी शैक्षिक पृष्ठभूमि या पसंदीदा विश्वविद्यालय के बारे में बताएं...' : 'Tell us about your educational background or preferred university...'} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: 'inherit' }}></textarea>
                </div>

                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                    ⚠️ {error}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                  <Recaptcha onChange={setRecaptchaToken} />
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '10px' }}>
                  {loading ? (lang === 'hi' ? 'सत्यापन और पूछताछ भेजी जा रही है...' : 'Verifying & Sending Inquiry...') : (
                    <>
                      <Send size={16} /> {lang === 'hi' ? 'प्रवेश पूछताछ जमा करें' : 'Submit Admission Inquiry'}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Office Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Direct WhatsApp Callout */}
            <div style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#ffffff', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '20px', marginBottom: '4px', fontWeight: '800' }}>
                  {lang === 'hi' ? 'व्हाट्सएप पसंद है?' : 'Prefer WhatsApp?'}
                </h4>
                <p style={{ fontSize: '13px', color: '#e8f5e9' }}>
                  {lang === 'hi' ? 'फीस संरचना के लिए वरिष्ठ सलाहकारों से तुरंत चैट करें।' : 'Chat instantly with senior counselors for fee structures.'}
                </p>
              </div>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn-secondary" style={{ background: '#ffffff', color: '#128C7E', padding: '12px 20px', borderRadius: '20px', fontWeight: '700' }}>
                <MessageSquare size={18} /> {lang === 'hi' ? 'चैट करें' : 'Chat Now'}
              </a>
            </div>

            {/* Render 4+ Office Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {offices.map((off, idx) => (
                <div key={idx} className="glass-card" style={{ padding: '22px', borderRadius: '16px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '18px', color: 'var(--navy-primary)', marginBottom: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 color="var(--coral-accent)" size={18} /> {off.city}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-dark)' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <MapPin size={16} color="var(--coral-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{off.address}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Phone size={16} color="var(--coral-accent)" />
                      <span>{off.phone}</span>
                    </div>
                    {off.email && (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Mail size={16} color="var(--coral-accent)" />
                        <span>{off.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Embedded Google Map */}
            <div style={{ borderRadius: '20px', overflow: 'hidden', height: '420px', minHeight: '420px', width: '100%', boxShadow: '0 12px 30px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1', background: '#f1f5f9' }}>
              <iframe 
                title="Medico Overseas Head Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.986884698501!2d77.2155!3d28.6304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e4739382f!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0, display: 'block', width: '100%', height: '100%', minHeight: '420px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactUs;
