import React, { useState } from 'react';
import { Camera, GraduationCap, Building2, Heart, Award } from 'lucide-react';

const Gallery = ({ onRequestCounselling }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Russia 🇷🇺', 'Georgia 🇬🇪', 'Uzbekistan 🇺🇿', 'Kyrgyzstan 🇰🇬', 'Armenia 🇦🇲', 'Vietnam 🇻🇳', 'Hostels & Mess 🍱', 'Graduation 🎓'];

  const galleryItems = [
    { title: 'Bashkir State Anatomy Lab', country: 'Russia 🇷🇺', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', desc: 'Medical students performing anatomical simulations in Ufa, Russia.' },
    { title: 'Tbilisi State University Campus', country: 'Georgia 🇬🇪', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80', desc: 'Main European campus building of TSMU in Tbilisi, Georgia.' },
    { title: 'Indian Hostel Mess Hall', country: 'Hostels & Mess 🍱', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', desc: 'Authentic Indian North & South Indian meals served daily for students.' },
    { title: 'Tashkent State Medical Academy', country: 'Uzbekistan 🇺🇿', img: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80', desc: 'State-of-the-art medical hospital complex in Tashkent.' },
    { title: 'Osh State Convocation Ceremony', country: 'Graduation 🎓', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80', desc: 'Indian medical graduates receiving MBBS degrees in Kyrgyzstan.' },
    { title: 'Yerevan State Clinical Rotation', country: 'Armenia 🇦🇲', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80', desc: 'Super-specialty bedside clinical rotations in Yerevan.' },
    { title: 'Can Tho Medical Center', country: 'Vietnam 🇻🇳', img: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', desc: 'Modern government medical building in Vietnam.' },
    { title: 'Student Hostel Room Setup', country: 'Hostels & Mess 🍱', img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80', desc: 'Furnished double occupancy hostel rooms with 24/7 central heating.' }
  ];

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.country.includes(activeFilter.split(' ')[0]));

  return (
    <div>
      {/* Gallery Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#ffffff', padding: '70px 0 50px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-coral" style={{ marginBottom: '12px' }}><Camera size={14} /> Campus & Student Life</span>
          <h1 style={{ color: '#ffffff', fontSize: '40px', marginBottom: '14px' }}>Medico Overseas Photo Gallery</h1>
          <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '750px', margin: '0 auto' }}>
            Explore real photos of university campuses, anatomy labs, hostel dining halls, and convocation ceremonies across 6 countries.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ background: '#ffffff', padding: '20px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                height: '38px',
                padding: '0 20px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '1',
                whiteSpace: 'nowrap',
                background: activeFilter === f ? 'var(--coral-accent)' : '#f1f5f9',
                color: activeFilter === f ? '#ffffff' : 'var(--navy-primary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ padding: '70px 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {filteredItems.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge-coral" style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '11px' }}>
                    {item.country}
                  </span>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--navy-primary)', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button className="btn-primary" onClick={onRequestCounselling} style={{ padding: '14px 36px' }}>
              <GraduationCap size={18} /> Apply for Campus Tour & Admission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
