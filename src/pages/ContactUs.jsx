import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Building2, Facebook, Instagram, Youtube } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    country: 'Russia',
    neetScore: '',
    message: ''
  });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (String(captchaAnswer).trim() !== '8') {
      setError('Anti-Spam Verification Failed: 5 + 3 = 8. Please enter correct answer.');
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
          captchaAnswer: captchaAnswer,
          captchaExpected: '8'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', city: '', country: 'Russia', neetScore: '', message: '' });
        setCaptchaAnswer('');
      } else {
        setError(data.message || 'Error submitting form.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Contact Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#ffffff', padding: '70px 0 50px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-coral" style={{ marginBottom: '12px' }}>Get in Touch</span>
          <h1 style={{ color: '#ffffff', fontSize: '40px', marginBottom: '14px' }}>Contact Medico Overseas Admissions</h1>
          <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            Have questions regarding NEET requirements, university fees, or visa process? Our expert counselors are ready to help.
          </p>
        </div>
      </section>

      {/* Main Form & Office Grid */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          
          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '36px', borderRadius: '24px', background: '#ffffff' }}>
            <h3 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '8px' }}>Send Us a Message</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Fill out the form below and our senior counselor will connect with you within 15 minutes.
            </p>

            {success ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={54} color="var(--coral-accent)" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '22px', color: 'var(--navy-primary)' }}>Message Sent Successfully!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
                  Thank you for reaching out to Medico Overseas. Our team is contacting you shortly.
                </p>
                <button className="btn-primary" onClick={() => setSuccess(false)} style={{ marginTop: '20px' }}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Full Name *</label>
                  <input type="text" required placeholder="e.g. Ankit Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Phone Number *</label>
                    <input type="tel" required placeholder="+91 9876543210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Email Address *</label>
                    <input type="email" required placeholder="student@gmail.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Interested Country</label>
                    <select value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', background: '#ffffff' }}>
                      <option value="Russia">Russia 🇷🇺</option>
                      <option value="Georgia">Georgia 🇬🇪</option>
                      <option value="Kyrgyzstan">Kyrgyzstan 🇰🇬</option>
                      <option value="Uzbekistan">Uzbekistan 🇺🇿</option>
                      <option value="Armenia">Armenia 🇦🇲</option>
                      <option value="Vietnam">Vietnam 🇻🇳</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>NEET Score</label>
                    <input type="number" placeholder="e.g. 240" value={formData.neetScore} onChange={e => setFormData({...formData, neetScore: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy-primary)', marginBottom: '4px', display: 'block' }}>Your Query / Message</label>
                  <textarea rows="4" placeholder="Tell us about your educational background or preferred university..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', fontFamily: 'inherit' }}></textarea>
                </div>

                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '13px' }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Spam Protection reCAPTCHA Verification Box */}
                <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--navy-primary)' }}>
                    <span style={{ background: '#22c55e', color: '#ffffff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>reCAPTCHA</span>
                    <span>Security Check: <strong>5 + 3 = ?</strong></span>
                  </div>
                  <input 
                    type="number"
                    required
                    placeholder="Answer"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    style={{ width: '80px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', textAlign: 'center', outline: 'none' }}
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                  {loading ? 'Verifying & Sending Inquiry...' : (
                    <>
                      <Send size={16} /> Submit Admission Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Office Contact Info & Embedded Map representation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Direct WhatsApp Callout */}
            <div style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#ffffff', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '20px', marginBottom: '4px' }}>Prefer WhatsApp?</h4>
                <p style={{ fontSize: '13px', color: '#e8f5e9' }}>Chat instantly with senior counselors for fee structures.</p>
              </div>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn-secondary" style={{ background: '#ffffff', color: '#128C7E', padding: '12px 20px' }}>
                <MessageSquare size={18} /> Chat Now
              </a>
            </div>

            {/* Corporate Head Office Details */}
            <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
              <h4 style={{ fontSize: '20px', color: 'var(--navy-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 color="var(--coral-accent)" /> Corporate Head Office
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-dark)' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <MapPin size={20} color="var(--coral-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Suite 402, Medical Education Tower, MG Road, Connaught Place, New Delhi - 110001</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={18} color="var(--coral-accent)" />
                  <span>+91 98765 43210 / +91 98765 43211</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Mail size={18} color="var(--coral-accent)" />
                  <span>info@medicooverseas.com</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Clock size={18} color="var(--coral-accent)" />
                  <span>Monday - Saturday: 9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Representation */}
            <div style={{ borderRadius: '20px', overflow: 'hidden', height: '240px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e2e8f0' }}>
              <iframe 
                title="Medico Overseas Head Office Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.986884698501!2d77.2155!3d28.6304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e4739382f!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
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
