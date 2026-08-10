import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, GraduationCap, ShieldCheck, DollarSign } from 'lucide-react';

const FAQs = ({ onRequestCounselling }) => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = ['General', 'NMC Guidelines', 'Fees & Scholarships', 'Visas & Security', 'Hostels & Mess', 'FMGE / NEXT'];

  const faqData = {
    'General': [
      { q: 'Why should I choose MBBS abroad through Medico Overseas?', a: 'Medico Overseas provides 100% official direct university admissions, transparent fee structures with zero capitation fee, complete visa assistance, and on-ground student support in Russia, Georgia, Kyrgyzstan, Uzbekistan, Armenia, and Vietnam.' },
      { q: 'Is NEET mandatory for studying MBBS abroad?', a: 'Yes! Under National Medical Commission (NMC) regulations, NEET qualification is compulsory for all Indian citizens who wish to study MBBS abroad and return to practice medicine in India.' },
      { q: 'What is the duration of MBBS course in abroad universities?', a: 'The MBBS course duration is 6 years (5 years of academic medical education + 1 year of compulsory rotating internship) in full compliance with NMC Gazette rules.' }
    ],
    'NMC Guidelines': [
      { q: 'Are medical degrees from foreign universities valid in India?', a: 'Yes! All universities recommended by Medico Overseas are listed in the WHO World Directory of Medical Schools (WDOMS) and strictly fulfill all NMC 2021 Gazette criteria.' },
      { q: 'What is the medium of instruction for MBBS courses?', a: '100% English medium throughout the 6-year program.' }
    ],
    'Fees & Scholarships': [
      { q: 'What is the average total cost of studying MBBS abroad?', a: 'Total package costs for 6 years (including tuition and hostel) range from ₹14 Lakhs to ₹18 Lakhs in Kyrgyzstan/Uzbekistan, ₹18 Lakhs to ₹28 Lakhs in Russia, and ₹22 Lakhs to ₹32 Lakhs in Georgia.' },
      { q: 'Are education loans available for studying MBBS abroad?', a: 'Yes! Nationalized and private banks in India provide education loans for abroad medical studies. Medico Overseas provides official admission letters and fee structures to assist your bank loan application.' }
    ],
    'Visas & Security': [
      { q: 'What is the success rate for student visas with Medico Overseas?', a: 'Medico Overseas maintains a 100% student visa approval track record by working directly with respective embassies and state ministries.' },
      { q: 'Are foreign university campuses safe for female students?', a: 'Extremely safe! All campus hostels feature 24/7 CCTV surveillance, biometric access control, electronic security turnstiles, and separate floors/buildings for girls.' }
    ],
    'Hostels & Mess': [
      { q: 'Is Indian food available in abroad university hostels?', a: 'Yes! Dedicated Indian dining halls serving North and South Indian vegetarian and non-vegetarian meals daily operate right inside university hostel premises.' }
    ],
    'FMGE / NEXT': [
      { q: 'How does Medico Overseas help with FMGE/NEXT exam preparation?', a: 'We provide an integrated FMGE/NEXT question bank, mock test series, and live online/offline coaching sessions conducted by renowned Indian medical faculty starting from Year 1.' }
    ]
  };

  const currentFaqs = faqData[activeCategory] || faqData['General'];

  return (
    <div>
      {/* FAQs Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#ffffff', padding: '70px 0 50px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-coral" style={{ marginBottom: '12px' }}><HelpCircle size={14} /> Knowledge Center</span>
          <h1 style={{ color: '#ffffff', fontSize: '40px', marginBottom: '14px' }}>Frequently Asked Questions</h1>
          <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '750px', margin: '0 auto' }}>
            Find clear, authoritative answers regarding NEET eligibility, NMC rules, tuition fee structures, visa steps, and Indian hostel mess.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{ background: '#ffffff', padding: '20px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenFaq(null); }}
              style={{
                padding: '10px 22px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                background: activeCategory === cat ? 'var(--coral-accent)' : '#f1f5f9',
                color: activeCategory === cat ? '#ffffff' : 'var(--navy-primary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQs List */}
      <section style={{ padding: '70px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentFaqs.map((faq, idx) => (
              <div key={idx} className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: openFaq === idx ? '#f8fafc' : '#ffffff',
                    border: 'none',
                    textAlign: 'left',
                    fontWeight: '700',
                    color: 'var(--navy-primary)',
                    fontSize: '16px',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} color="var(--coral-accent)" /> : <ChevronDown size={20} />}
                </button>

                {openFaq === idx && (
                  <div style={{ padding: '20px 24px', background: '#ffffff', color: 'var(--text-body)', fontSize: '15px', lineHeight: '1.7', borderTop: '1px solid #f1f5f9' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h3 style={{ fontSize: '22px', color: 'var(--navy-primary)', marginBottom: '12px' }}>Have more specific questions?</h3>
            <button className="btn-primary" onClick={onRequestCounselling} style={{ padding: '14px 36px' }}>
              <GraduationCap size={18} /> Talk to Senior Medical Counselor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
