import React, { useState } from 'react';
import { X, Globe, Building2, Utensils, Bed, BookOpen, Shield, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const mediaCollection = [
  {
    id: 1,
    title: 'Anatomical Simulation & Robotic Surgical Lab',
    category: 'Labs',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    desc: 'High-fidelity anatomical cadaver simulation labs and 3D digital dissection tables used for first & second-year medical students.'
  },
  {
    id: 2,
    title: 'North & South Indian Student Mess Dining Hall',
    category: 'Mess',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    desc: 'Hygienic 100% Indian mess serving daily breakfast, lunch, and dinner prepared by native Indian cooks (Roti, Rice, Dal, Sambar, Veg/Non-Veg).'
  },
  {
    id: 3,
    title: 'On-Campus International Student Hostel Rooms',
    category: 'Hostel',
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    desc: '2 & 3 sharing renovated hostel rooms equipped with central heating, high-speed Wi-Fi, study desks, attached washrooms, and 24/7 CCTV security.'
  },
  {
    id: 4,
    title: 'Central Federal University Library & Digital Resource Hub',
    category: 'Library',
    img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    desc: 'Quiet 24/7 reading halls with free access to PubMed, Scopus, BMJ journals, and medical licensing exam question banks.'
  }
];

const VirtualTourModal = ({ isOpen, onClose, countryName }) => {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeMedia, setActiveMedia] = useState(mediaCollection[0]);

  if (!isOpen) return null;

  const filteredMedia = activeCategory === 'All' 
    ? mediaCollection 
    : mediaCollection.filter(m => m.category === activeCategory);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{ background: '#0b0f19', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', width: '100%', maxWidth: '960px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)' }}>
        
        {/* Modal Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111827' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                {countryName ? `360° Campus & Hostel Virtual Tour - ${countryName}` : '360° Campus & Hostel Virtual Tour Showcase'}
              </h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Explore real university infrastructure, Indian mess, and student hostels</p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#94a3b8', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main Media Preview Box */}
          <div style={{ position: 'relative', height: '380px', borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <img src={activeMedia.img} alt={activeMedia.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, transparent 100%)', color: '#ffffff' }}>
              <span style={{ background: '#f97316', color: '#ffffff', padding: '3px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                {activeMedia.category}
              </span>
              <h4 style={{ fontSize: '20px', fontWeight: '800', margin: '8px 0 4px 0' }}>{activeMedia.title}</h4>
              <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, maxWidth: '750px', lineHeight: '1.5' }}>{activeMedia.desc}</p>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['All', 'Labs', 'Mess', 'Hostel', 'Library'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: activeCategory === cat ? '1px solid #f97316' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: activeCategory === cat ? '#f97316' : 'rgba(255, 255, 255, 0.04)',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Thumbnails Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            {filteredMedia.map(m => (
              <div
                key={m.id}
                onClick={() => setActiveMedia(m)}
                style={{
                  height: '110px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  border: activeMedia.id === m.id ? '2px solid #f97316' : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <img src={m.img} alt={m.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'flex-end', padding: '8px', color: '#ffffff', fontSize: '11px', fontWeight: '700' }}>
                  {m.title}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default VirtualTourModal;
