import React, { useState } from 'react';
import { Award, CheckCircle2, AlertCircle, ArrowRight, DollarSign, BookOpen, Utensils, CloudSun } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const EligibilityCalculator = ({ onRequestCounselling, defaultCountry }) => {
  const { lang } = useLanguage();
  const [category, setCategory] = useState('General');
  const [neetScore, setNeetScore] = useState(240);
  const [pcbPercentage, setPcbPercentage] = useState(68);
  const [budgetFilter, setBudgetFilter] = useState('All'); // 'All', 'Low', 'Medium', 'High'
  const [messPref, setMessPref] = useState('Both'); // 'North', 'South', 'Both'

  const neetCutoff = category === 'General' ? 135 : 107;
  const isNeetQualified = neetScore >= neetCutoff;
  const isPcbEligible = pcbPercentage >= (category === 'General' ? 50 : 40);
  const isOverallEligible = isNeetQualified && isPcbEligible;

  const universitiesDatabase = [
    // RUSSIA UNIVERSITIES (3 CARDS)
    {
      country: 'Russia',
      country_hi: 'रूस',
      flag: '🇷🇺',
      college: 'Bashkir State Medical University',
      feeYear: '₹3.5 Lakhs / Year',
      totalPackage: '₹18 Lakhs to ₹22 Lakhs',
      categoryTag: 'Low',
      duration: '6 Years',
      fmgePassRate: 'Very High (78%+)',
      mess: 'North & South Indian Mess',
      climate: 'Snowy Winter (-10°C to +25°C)'
    },
    {
      country: 'Russia',
      country_hi: 'रूस',
      flag: '🇷🇺',
      college: 'Kazan Federal University',
      feeYear: '₹4.2 Lakhs / Year',
      totalPackage: '₹24 Lakhs to ₹28 Lakhs',
      categoryTag: 'Medium',
      duration: '6 Years',
      fmgePassRate: 'High (76%+)',
      mess: 'Indian Hostel Mess',
      climate: 'Snowy Winter (-12°C to +24°C)'
    },
    {
      country: 'Russia',
      country_hi: 'रूस',
      flag: '🇷🇺',
      college: 'Crimea Federal University',
      feeYear: '₹3.2 Lakhs / Year',
      totalPackage: '₹17 Lakhs to ₹21 Lakhs',
      categoryTag: 'Low',
      duration: '6 Years',
      fmgePassRate: 'Very High (82%+)',
      mess: 'Dedicated Indian Canteen',
      climate: 'Coastal Climate (+2°C to +28°C)'
    },

    // GEORGIA UNIVERSITIES (3 CARDS)
    {
      country: 'Georgia',
      country_hi: 'जॉर्जिया',
      flag: '🇬🇪',
      college: 'Tbilisi State Medical University',
      feeYear: '₹4.8 Lakhs / Year',
      totalPackage: '₹26 Lakhs to ₹32 Lakhs',
      categoryTag: 'High',
      duration: '6 Years',
      fmgePassRate: 'Highest in Europe (84%+)',
      mess: 'Indian Cooks & Mess',
      climate: 'Moderate European (+5°C to +28°C)'
    },
    {
      country: 'Georgia',
      country_hi: 'जॉर्जिया',
      flag: '🇬🇪',
      college: 'Batumi Shota Rustaveli State University',
      feeYear: '₹4.2 Lakhs / Year',
      totalPackage: '₹22 Lakhs to ₹26 Lakhs',
      categoryTag: 'Medium',
      duration: '6 Years',
      fmgePassRate: 'Very High (80%+)',
      mess: 'Indian Mess Catering',
      climate: 'Subtropical Mild (+8°C to +26°C)'
    },
    {
      country: 'Georgia',
      country_hi: 'जॉर्जिया',
      flag: '🇬🇪',
      college: 'Georgian National University (SEU)',
      feeYear: '₹4.5 Lakhs / Year',
      totalPackage: '₹24 Lakhs to ₹28 Lakhs',
      categoryTag: 'High',
      duration: '6 Years',
      fmgePassRate: 'High (81%+)',
      mess: 'Indian Hostel Food',
      climate: 'Pleasant City Climate'
    },

    // KAZAKHSTAN UNIVERSITIES (3 CARDS)
    {
      country: 'Kazakhstan',
      country_hi: 'कजाकिस्तान',
      flag: '🇰🇿',
      college: 'Astana Medical University',
      feeYear: '₹3.4 Lakhs / Year',
      totalPackage: '₹17 Lakhs to ₹22 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'High (75%+)',
      mess: 'Dedicated Indian Mess',
      climate: 'Continental (+10°C to +30°C)'
    },
    {
      country: 'Kazakhstan',
      country_hi: 'कजाकिस्तान',
      flag: '🇰🇿',
      college: 'Kazakh National Medical University',
      feeYear: '₹3.2 Lakhs / Year',
      totalPackage: '₹16 Lakhs to ₹20 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'High (74%+)',
      mess: 'Fresh Indian Catering',
      climate: 'Pleasant City Climate'
    },
    {
      country: 'Kazakhstan',
      country_hi: 'कजाकिस्तान',
      flag: '🇰🇿',
      college: 'Semey State Medical University',
      feeYear: '₹2.9 Lakhs / Year',
      totalPackage: '₹15 Lakhs to ₹18 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'High (72%+)',
      mess: 'Indian Mess Cooks',
      climate: 'Continental (-10°C to +28°C)'
    },

    // UZBEKISTAN UNIVERSITIES (3 CARDS)
    {
      country: 'Uzbekistan',
      country_hi: 'उज्बेकिस्तान',
      flag: '🇺🇿',
      college: 'Tashkent Medical Academy',
      feeYear: '₹2.8 Lakhs / Year',
      totalPackage: '₹14 Lakhs to ₹18 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'High (72%+)',
      mess: '100% Indian Mess Cooks',
      climate: 'Sunny & Pleasant (+8°C to +32°C)'
    },
    {
      country: 'Uzbekistan',
      country_hi: 'उज्बेकिस्तान',
      flag: '🇺🇿',
      college: 'Samarkand State Medical University',
      feeYear: '₹2.7 Lakhs / Year',
      totalPackage: '₹13 Lakhs to ₹17 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'High (70%+)',
      mess: 'Indian Hostel Canteen',
      climate: 'Sunny & Warm (+10°C to +33°C)'
    },
    {
      country: 'Uzbekistan',
      country_hi: 'उज्बेकिस्तान',
      flag: '🇺🇿',
      college: 'Bukhara State Medical Institute',
      feeYear: '₹2.5 Lakhs / Year',
      totalPackage: '₹12 Lakhs to ₹15 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'High (71%+)',
      mess: 'Indian Food Catering',
      climate: 'Warm Climate (+12°C to +34°C)'
    },

    // KYRGYZSTAN UNIVERSITIES (3 CARDS)
    {
      country: 'Kyrgyzstan',
      country_hi: 'किर्गिस्तान',
      flag: '🇰🇬',
      college: 'Osh State University',
      feeYear: '₹2.5 Lakhs / Year',
      totalPackage: '₹14 Lakhs to ₹18 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'Good (70%+)',
      mess: 'North & South Indian Food',
      climate: 'Pleasant Valley Climate'
    },
    {
      country: 'Kyrgyzstan',
      country_hi: 'किर्गिस्तान',
      flag: '🇰🇬',
      college: 'Kyrgyz State Medical Academy (KSMA)',
      feeYear: '₹2.6 Lakhs / Year',
      totalPackage: '₹14 Lakhs to ₹18 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'High (72%+)',
      mess: 'Indian Mess Facilities',
      climate: 'Mountain Valley Climate'
    },
    {
      country: 'Kyrgyzstan',
      country_hi: 'किर्गिस्तान',
      flag: '🇰🇬',
      college: 'International School of Medicine (ISM)',
      feeYear: '₹2.8 Lakhs / Year',
      totalPackage: '₹15 Lakhs to ₹19 Lakhs',
      categoryTag: 'Low',
      duration: '5 Years',
      fmgePassRate: 'High (73%+)',
      mess: 'Indian Hostel Canteen',
      climate: 'Cool Mountain Air'
    },

    // ARMENIA UNIVERSITIES (3 CARDS)
    {
      country: 'Armenia',
      country_hi: 'आर्मेनिया',
      flag: '🇦🇲',
      college: 'Yerevan State Medical University',
      feeYear: '₹3.2 Lakhs / Year',
      totalPackage: '₹18 Lakhs to ₹24 Lakhs',
      categoryTag: 'Medium',
      duration: '6 Years',
      fmgePassRate: 'High (76%+)',
      mess: 'Indian Hostel & Kitchen',
      climate: 'European Mountain Climate'
    },
    {
      country: 'Armenia',
      country_hi: 'आर्मेनिया',
      flag: '🇦🇲',
      college: 'St. Tereza Medical University',
      feeYear: '₹2.8 Lakhs / Year',
      totalPackage: '₹15 Lakhs to ₹19 Lakhs',
      categoryTag: 'Low',
      duration: '6 Years',
      fmgePassRate: 'High (72%+)',
      mess: 'Indian Food Mess',
      climate: 'Mountain Climate'
    },
    {
      country: 'Armenia',
      country_hi: 'आर्मेनिया',
      flag: '🇦🇲',
      college: 'Mkhitar Gosh International University',
      feeYear: '₹2.9 Lakhs / Year',
      totalPackage: '₹16 Lakhs to ₹20 Lakhs',
      categoryTag: 'Medium',
      duration: '6 Years',
      fmgePassRate: 'High (74%+)',
      mess: 'Indian Mess Service',
      climate: 'Mild European Climate'
    },

    // VIETNAM UNIVERSITIES (3 CARDS)
    {
      country: 'Vietnam',
      country_hi: 'वियतनाम',
      flag: '🇻🇳',
      college: 'Can Tho University of Medicine & Pharmacy',
      feeYear: '₹3.0 Lakhs / Year',
      totalPackage: '₹16 Lakhs to ₹22 Lakhs',
      categoryTag: 'Medium',
      duration: '6 Years',
      fmgePassRate: 'Emerging High',
      mess: 'Fresh Indian Catering',
      climate: 'Tropical Warm Weather'
    },
    {
      country: 'Vietnam',
      country_hi: 'वियतनाम',
      flag: '🇻🇳',
      college: 'Hong Bang International University',
      feeYear: '₹3.5 Lakhs / Year',
      totalPackage: '₹18 Lakhs to ₹24 Lakhs',
      categoryTag: 'Medium',
      duration: '6 Years',
      fmgePassRate: 'High (75%+)',
      mess: 'Indian Kitchen Service',
      climate: 'Warm Coastal Climate'
    },
    {
      country: 'Vietnam',
      country_hi: 'वियतनाम',
      flag: '🇻🇳',
      college: 'Hue University of Medicine & Pharmacy',
      feeYear: '₹3.2 Lakhs / Year',
      totalPackage: '₹17 Lakhs to ₹23 Lakhs',
      categoryTag: 'Medium',
      duration: '6 Years',
      fmgePassRate: 'Emerging High',
      mess: 'Indian Mess Catering',
      climate: 'Tropical Mild Climate'
    }
  ];

  const filteredUniversities = universitiesDatabase.filter(u => {
    if (defaultCountry && u.country.toLowerCase() !== defaultCountry.toLowerCase()) return false;
    if (budgetFilter === 'Low' && u.categoryTag !== 'Low') return false;
    if (budgetFilter === 'High' && u.categoryTag !== 'High') return false;
    return true;
  }).slice(0, 3);

  return (
    <div style={{ background: '#ffffff', borderRadius: '24px', padding: '32px 28px', border: '1px solid #fed7aa', boxShadow: '0 12px 40px rgba(234, 88, 12, 0.12)', margin: '30px 0' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span className="badge-coral" style={{ fontSize: '11px', marginBottom: '8px', padding: '3px 12px' }}>
          {lang === 'hi' ? '🎯 स्मार्ट नीट व बजट कैलकुलेटर' : '🎯 Smart NEET & Budget Matcher'}
        </span>
        <h2 style={{ fontSize: '28px', color: 'var(--navy-primary)', fontWeight: '800', margin: '4px 0 8px 0' }}>
          {lang === 'hi' ? 'विदेश में एमबीबीएस पात्रता एवं फीस कैलकुलेटर' : 'MBBS Abroad Eligibility & Budget Calculator'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
          {lang === 'hi' 
            ? '30 सेकंड में अपने नीट स्कोर और बजट के अनुसार पात्र सरकारी मेडिकल विश्वविद्यालयों की सूची प्राप्त करें।' 
            : 'Find your eligible government medical universities and 6-year fee packages in 30 seconds.'}
        </p>
      </div>

      {/* Input Sliders & Filters Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', background: '#fff7ed', padding: '24px', borderRadius: '18px', border: '1px solid #ffedd5', marginBottom: '28px' }}>
        
        {/* Category Selection */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#7c2d12', marginBottom: '8px' }}>
            {lang === 'hi' ? 'आपकी श्रेणी (Category)' : 'Student Category'}
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['General', 'OBC / SC / ST'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: category === cat ? '2px solid #f97316' : '1px solid #cbd5e1',
                  background: category === cat ? '#f97316' : '#ffffff',
                  color: category === cat ? '#ffffff' : '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* NEET Score Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '800', color: '#7c2d12' }}>
              {lang === 'hi' ? 'नीट स्कोर (720 में से)' : 'NEET Score (Out of 720)'}
            </label>
            <span style={{ fontSize: '15px', fontWeight: '900', color: '#ea580c' }}>{neetScore} / 720</span>
          </div>
          <input
            type="range"
            min="100"
            max="600"
            value={neetScore}
            onChange={(e) => setNeetScore(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#f97316', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9a3412', marginTop: '4px' }}>
            <span>Cutoff: {neetCutoff}</span>
            <span>Qualified Score</span>
          </div>
        </div>

        {/* PCB % Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '800', color: '#7c2d12' }}>
              {lang === 'hi' ? '12वीं PCB प्रतिशत (PCB %)' : '12th Board PCB Marks %'}
            </label>
            <span style={{ fontSize: '15px', fontWeight: '900', color: '#ea580c' }}>{pcbPercentage}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="95"
            value={pcbPercentage}
            onChange={(e) => setPcbPercentage(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#f97316', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#9a3412', marginTop: '4px' }}>
            <span>Min Eligibility: {category === 'General' ? '50%' : '40%'}</span>
            <span>Distinctive</span>
          </div>
        </div>

        {/* Budget Filter Buttons */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#7c2d12', marginBottom: '8px' }}>
            {lang === 'hi' ? 'पसंद का कुल बजट (6 वर्ष)' : 'Preferred Total Budget'}
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'All', label: 'All Packages' },
              { id: 'Low', label: '< ₹20 Lakhs' },
              { id: 'High', label: '₹20L - ₹32L' }
            ].map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBudgetFilter(b.id)}
                style={{
                  flex: 1,
                  padding: '8px 4px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '700',
                  border: budgetFilter === b.id ? '2px solid #ea580c' : '1px solid #cbd5e1',
                  background: budgetFilter === b.id ? '#ea580c' : '#ffffff',
                  color: budgetFilter === b.id ? '#ffffff' : '#334155',
                  cursor: 'pointer'
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Qualification Verdict Box */}
      <div style={{
        background: isOverallEligible ? 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        border: `1.5px solid ${isOverallEligible ? '#10b981' : '#ef4444'}`,
        borderRadius: '16px',
        padding: '18px 22px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {isOverallEligible ? (
            <CheckCircle2 size={32} color="#10b981" />
          ) : (
            <AlertCircle size={32} color="#ef4444" />
          )}
          <div>
            <h4 style={{ fontSize: '17px', fontWeight: '800', color: isOverallEligible ? '#065f46' : '#991b1b', margin: 0 }}>
              {isOverallEligible 
                ? (lang === 'hi' ? '🎉 आप एनएमसी व डब्ल्यूएचओ अनुमोदित राज्य चिकित्सा विश्वविद्यालयों के लिए 100% पात्र हैं!' : '🎉 You are 100% Eligible for NMC & WHO Approved Government Universities!')
                : (lang === 'hi' ? '⚠️ नीट स्कोर कम है - घबराएं नहीं! हमारे विशेषज्ञ से विशेष मार्गदर्शन प्राप्त करें।' : '⚠️ NEET score requires counseling review - Speak with Senior Counselor!')}
            </h4>
            <p style={{ fontSize: '13px', color: isOverallEligible ? '#047857' : '#b91c1c', margin: '4px 0 0 0' }}>
              NEET Qualified ({neetScore} ≥ {neetCutoff}) • PCB Marks ({pcbPercentage}% ≥ {category === 'General' ? '50%' : '40%'})
            </p>
          </div>
        </div>

        {onRequestCounselling && (
          <button
            onClick={() => onRequestCounselling(defaultCountry || '')}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '20px', background: isOverallEligible ? '#059669' : '#dc2626' }}
          >
            {lang === 'hi' ? 'मुफ्त सीट लॉक परामर्श प्राप्त करें' : 'Lock Your University Seat'} <ArrowRight size={15} />
          </button>
        )}
      </div>

      {/* Recommended University Cards Grid - EXACTLY 3 CLEAN CARDS */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="var(--coral-accent)" /> 
          {lang === 'hi' ? 'अनुशंसित शीर्ष 3 मेडिकल विश्वविद्यालय:' : `Top Recommended Medical Universities (${defaultCountry || 'Featured'}):`}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {filteredUniversities.map((u, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: '#ffffff', 
                borderRadius: '16px', 
                border: '1.5px solid #e2e8f0', 
                padding: '20px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '26px' }}>{u.flag}</span>
                  <span style={{ background: 'rgba(225, 91, 63, 0.12)', color: 'var(--coral-accent)', fontSize: '11px', fontWeight: '800', padding: '3px 10px', borderRadius: '12px' }}>
                    {u.duration} MBBS
                  </span>
                </div>

                <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', margin: '0 0 8px 0', lineHeight: '1.35' }}>
                  {u.college}
                </h4>

                <div style={{ fontSize: '14px', fontWeight: '800', color: '#16a34a', marginBottom: '12px', background: '#f0fdf4', padding: '6px 10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  Tuition: {u.feeYear}
                </div>

                <div style={{ fontSize: '12.5px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={14} color="#10b981" />
                    <span><strong style={{ color: '#0f172a' }}>FMGE Rate:</strong> {u.fmgePassRate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Utensils size={14} color="#f97316" />
                    <span><strong style={{ color: '#0f172a' }}>Mess:</strong> {u.mess}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRequestCounselling && onRequestCounselling(u.country)}
                style={{ marginTop: '16px', width: '100%', padding: '10px', background: 'var(--navy-primary)', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s ease' }}
              >
                {lang === 'hi' ? 'प्रवेश विवरण प्राप्त करें' : 'Get Complete Fee Details'} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default EligibilityCalculator;
