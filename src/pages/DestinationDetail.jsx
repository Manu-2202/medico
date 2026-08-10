import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { countryData } from '../data/countryData';
import {
  ShieldCheck, CheckCircle2, FileText, ArrowRight, DollarSign,
  Clock, HelpCircle, Building2, ChevronDown, ChevronUp,
  Plane, Home, Utensils, Thermometer, Sparkles, Stamp
} from 'lucide-react';
import SEO from '../components/SEO';

/* ==========================================================================
   THEME — injected once by this component so the page is fully self-
   contained. If other pages should share the same look, you can instead
   move this block into a global stylesheet (e.g. index.css) — the rest of
   this file only ever references the CSS variables below, so nothing else
   needs to change either way.

   Palette sampled directly from the Medico Overseas logo:
     navy  #1F3354   coral #DD5A3C   (+ a gold accent for seals/certification)
   ========================================================================== */
const ThemeStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,500&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

    :root {
      /* ---- Core brand (sampled from logo) ---- */
      --navy-950: #0d1729;
      --navy-900: #16233d;
      --navy-primary: #1f3354;   /* logo navy */
      --navy-dark: #16233d;
      --navy-600: #3c5c8c;
      --navy-100: #e7ecf4;

      --coral-accent: #dd5a3c;   /* logo coral */
      --coral-dark: #b8432a;
      --coral-50: #fbeae4;

      /* Certification / seal accent */
      --gold-accent: #b0873f;
      --gold-50: #f3e9d2;

      /* Kept for backward compatibility with older components */
      --cyan-accent: #3c5c8c;

      /* Neutrals — warm, not sterile slate */
      --sand-bg: #f8f5f0;
      --ink-900: #1a2233;
      --text-body: #333f52;
      --text-muted: #6b7488;
      --hairline: #e7e1d6;

      --success: #0f8a5f;

      /* Type roles */
      --font-display: 'Newsreader', Georgia, 'Times New Roman', serif;
      --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-mono: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
    }

    .mo-dropcap::first-letter {
      font-family: var(--font-display);
      font-size: 54px;
      font-weight: 600;
      float: left;
      line-height: 0.8;
      padding: 6px 8px 0 0;
      color: var(--coral-accent);
    }
    @media (min-width: 901px) {
      .hero-stamp { display: block !important; }
    }
    @media (max-width: 900px) {
      .mo-layout { grid-template-columns: 1fr !important; }
      .mo-sidebar { position: static !important; }
    }
    @media (prefers-reduced-motion: no-preference) {
      .mo-layout > div:first-child > div { animation: mo-rise 0.5s ease both; }
    }
    @keyframes mo-rise {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

/* --------------------------------------------------------------------------
   StampBadge — the page's signature element.
   A circular "verified / gazette-approved" seal, styled like a passport
   visa stamp or an official document seal. It shows up small in the hero,
   and again (quietly) as a watermark near the fee ledger and the closing
   CTA — tying together the three things this brand is actually about:
   medicine (the seal), travel (the passport-stamp form), and paperwork
   (the gazette/registry framing used throughout the page).
   -------------------------------------------------------------------------- */
const StampBadge = ({ label = 'NMC RECOGNIZED', size = 92, tone = 'coral' }) => {
  const color = tone === 'coral' ? 'var(--coral-accent)' : 'var(--gold-accent)';
  const id = `stamp-path-${tone}-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
      <defs>
        <path id={id} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="1.4" strokeDasharray="2 3" opacity="0.9" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="1.6" />
      <text fill={color} fontFamily="'IBM Plex Mono', monospace" fontSize="7.6" fontWeight="600" letterSpacing="2">
        <textPath href={`#${id}`} startOffset="2%">{label} • {label} • </textPath>
      </text>
      <text x="50" y="47" textAnchor="middle" fill={color} fontFamily="'Newsreader', serif" fontSize="19" fontStyle="italic" fontWeight="600">MO</text>
      <text x="50" y="60" textAnchor="middle" fill={color} fontFamily="'IBM Plex Mono', monospace" fontSize="6" letterSpacing="1.5">EST. VERIFIED</text>
    </svg>
  );
};

/* Small mono "eyebrow" used above every section title — reads like a
   registry / gazette entry code rather than a decorative label. */
const Eyebrow = ({ children, tone = 'navy' }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: '600',
    letterSpacing: '2px', textTransform: 'uppercase',
    color: tone === 'coral' ? 'var(--coral-accent)' : 'var(--navy-600)',
    marginBottom: '14px'
  }}>
    <span style={{ width: '18px', height: '1.5px', background: 'currentColor', display: 'inline-block' }} />
    {children}
  </div>
);

/* Section header combining a gazette-style article number with a serif
   display title — the numbering is meaningful here because the sections
   genuinely are the sequence a student moves through (learn → qualify →
   pay → apply → travel → live → ask). */
const SectionHeading = ({ index, icon, title, eyebrow, tone = 'navy' }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', marginBottom: '22px' }}>
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '600',
      color: tone === 'coral' ? 'var(--coral-accent)' : 'var(--navy-600)',
      border: `1.5px solid ${tone === 'coral' ? 'var(--coral-accent)' : 'var(--navy-600)'}`,
      borderRadius: '999px', width: '38px', height: '38px', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px'
    }}>{String(index).padStart(2, '0')}</span>
    <div>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: '30px', color: 'var(--navy-primary)',
        fontWeight: '600', lineHeight: '1.2', display: 'flex', alignItems: 'center', gap: '10px', margin: 0
      }}>
        {icon} {title}
      </h2>
    </div>
  </div>
);

const DestinationDetail = ({ onRequestCounselling }) => {
  const { countrySlug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', neetScore: '', pcbMarks: '', university: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const countryKey = countrySlug?.replace('mbbs-in-', '') || 'russia';
  const country = countryData[countryKey] || countryData['russia'];

  const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onRequestCounselling) onRequestCounselling(country.name);
  };

  const seoTitle = `MBBS in ${country.name} 2026-27: Fee Structure, Eligibility & Top NMC Universities`;
  const seoDesc = `Study MBBS in ${country.name} for Indian Students: Complete guide on tuition fees, hostel, mess, visa process, NMC & WHO approved medical colleges, and end-to-end guidance by Medico Overseas.`;
  const seoKeywords = `MBBS in ${country.name}, study MBBS in ${country.name} 2026, ${country.name} medical university fees, NMC approved medical colleges in ${country.name}, ${country.name} MBBS eligibility for Indian students, Medico Overseas`;

  const countrySchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': `MBBS in ${country.name}`,
    'description': country.tagline,
    'provider': { '@type': 'EducationalOrganization', 'name': 'Medico Overseas', 'sameAs': window.location.origin },
    'hasCourseInstance': { '@type': 'CourseInstance', 'courseMode': 'Onsite', 'duration': country.quickFacts?.duration || 'P6Y' }
  };

  const card = {
    background: '#ffffff', borderRadius: '20px', padding: '38px',
    border: '1px solid var(--hairline)', boxShadow: '0 1px 2px rgba(22,35,61,0.04)'
  };

  return (
    <div style={{ backgroundColor: 'var(--sand-bg)', color: 'var(--text-body)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <ThemeStyles />
      <SEO title={seoTitle} description={seoDesc} keywords={seoKeywords} schemaJson={countrySchema} />

      {/* ===================== MAIN + SIDEBAR ===================== */}
      <section style={{ padding: '70px 0' }}>
        <div className="container mo-layout" style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '40px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>

            {/* 01 — OVERVIEW, with a serif drop cap for an editorial, prospectus feel */}
            <div style={card}>
              <SectionHeading index={1} icon={<Building2 size={24} color="var(--coral-accent)" />} title={`Overview of MBBS in ${country.name}`} eyebrow="Country Overview" />
              <p className="mo-dropcap" style={{ fontSize: '16.5px', lineHeight: '1.85', color: 'var(--text-body)' }}>
                {country.overview}
              </p>
            </div>

            {/* 02 — ELIGIBILITY */}
            <div style={card}>
              <SectionHeading index={2} icon={<ShieldCheck size={24} color="var(--coral-accent)" />} title="Eligibility Criteria for Indian Students" eyebrow="Admission Requirements" tone="coral" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
                {country.eligibility.map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--sand-bg)', padding: '20px', borderRadius: '14px', borderLeft: '3px solid var(--coral-accent)' }}>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--navy-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={17} color="var(--coral-accent)" /> {item.rule}
                    </div>
                    <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.55' }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 03 — FEE LEDGER */}
            <div id="fees-table" style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <SectionHeading index={3} icon={<DollarSign size={24} color="var(--coral-accent)" />} title={`University Fee Ledger — ${country.name}`} eyebrow="Transparent Fee Quotation" />
                <div className="mo-fee-stamp"><StampBadge label="NO CAPITATION" size={72} tone="gold" /></div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '22px', marginTop: '-6px' }}>
                100% direct official university tuition rates. Tuition and hostel fees are paid directly to the university account.
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '30px', border: '1px solid var(--hairline)', borderRadius: '14px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy-primary)', color: '#ffffff' }}>
                      <th style={{ padding: '15px 16px', fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>University</th>
                      <th style={{ padding: '15px 16px', fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>City</th>
                      <th style={{ padding: '15px 16px', fontFamily: 'var(--font-mono)', fontWeight: '600', fontSize: '12px' }}>Tuition / Yr ($)</th>
                      <th style={{ padding: '15px 16px', fontFamily: 'var(--font-mono)', fontWeight: '600', fontSize: '12px' }}>Hostel + Mess ($)</th>
                      <th style={{ padding: '15px 16px', fontFamily: 'var(--font-mono)', fontWeight: '600', fontSize: '12px' }}>Est. Total / Yr (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.universities.map((uni, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--hairline)', background: idx % 2 === 0 ? '#ffffff' : 'var(--sand-bg)' }}>
                        <td style={{ padding: '16px', fontFamily: 'var(--font-display)', fontWeight: '600', fontSize: '15.5px', color: 'var(--navy-primary)' }}>
                          {uni.name}
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--coral-accent)', fontWeight: '600', marginTop: '3px', letterSpacing: '0.5px' }}>{uni.nmcStatus}</div>
                        </td>
                        <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{uni.city}</td>
                        <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>{uni.tuitionYearUSD}</td>
                        <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{uni.hostelYearUSD} + {uni.messYearUSD}</td>
                        <td style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--coral-accent)', fontSize: '15px' }}>{uni.totalInrYear}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {country.oneTimeCosts && country.oneTimeCosts.length > 0 && (
                <div style={{ background: 'var(--gold-50)', borderRadius: '16px', padding: '24px', border: '1px solid #e6d5a8' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', color: 'var(--navy-primary)', fontWeight: '600', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={17} color="var(--gold-accent)" /> First-Year One-Time Admission &amp; Visa Expenses
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {country.oneTimeCosts.map((c, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'baseline', padding: '9px 2px', fontSize: '13.5px' }}>
                        <span style={{ color: 'var(--text-body)', whiteSpace: 'nowrap' }}>{c.item}</span>
                        <span style={{ flex: 1, borderBottom: '1.5px dotted #c9b17e', margin: '0 8px', transform: 'translateY(-3px)' }} />
                        <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--navy-primary)' }}>{c.cost}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 04 — ADMISSION PROCESS & DOCUMENTS */}
            <div style={card}>
              <SectionHeading index={4} icon={<FileText size={24} color="var(--coral-accent)" />} title="Admission Process & Document Checklist" eyebrow="Step-by-Step Guide" tone="coral" />

              {country.admissionSteps && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1px', background: 'var(--hairline)', border: '1px solid var(--hairline)', borderRadius: '14px', overflow: 'hidden', marginBottom: '34px' }}>
                  {country.admissionSteps.map((s, idx) => (
                    <div key={idx} style={{ background: '#ffffff', padding: '20px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--coral-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Article {String(s.step).padStart(2, '0')}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: '600', color: 'var(--navy-primary)', margin: '6px 0 6px 0' }}>
                        {s.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.55' }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', color: 'var(--navy-primary)', fontWeight: '600', marginBottom: '14px' }}>
                Required Student Documents Checklist
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {country.documentsChecklist.map((doc, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--sand-bg)', padding: '15px 18px', borderRadius: '12px', border: '1px solid var(--hairline)', fontSize: '14px', color: 'var(--navy-primary)', fontWeight: '600' }}>
                    <CheckCircle2 size={18} color="var(--coral-accent)" style={{ flexShrink: 0 }} /> {doc}
                  </div>
                ))}
              </div>
            </div>

            {/* 05 — VISA */}
            {country.visaProcess && (
              <div style={card}>
                <SectionHeading index={5} icon={<Plane size={24} color="var(--coral-accent)" />} title="Visa Process & Resident Permit Overview" eyebrow="Hassle-Free Processing" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '26px' }}>
                  <div style={{ background: 'var(--sand-bg)', padding: '18px', borderRadius: '14px', borderLeft: '3px solid var(--coral-accent)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}><Clock size={12} style={{ marginRight: '5px', verticalAlign: '-2px' }} />Processing Timeline</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '17px', color: 'var(--navy-primary)', fontWeight: '600', marginTop: '4px' }}>{country.visaProcess.processingTime}</div>
                  </div>
                  <div style={{ background: 'var(--sand-bg)', padding: '18px', borderRadius: '14px', borderLeft: '3px solid var(--success)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Visa Approval Rate</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '17px', color: 'var(--success)', fontWeight: '600', marginTop: '4px' }}>{country.visaProcess.approvalRate}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {country.visaProcess.workflow.map((w, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{
                          background: 'var(--navy-primary)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '700', flexShrink: 0
                        }}>{idx + 1}</span>
                        {idx < country.visaProcess.workflow.length - 1 && <span style={{ width: '1.5px', flex: 1, background: 'var(--hairline)', minHeight: '18px' }} />}
                      </div>
                      <div style={{ fontSize: '14.5px', color: 'var(--text-body)', paddingBottom: '18px' }}>{w}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 06 — LIVING */}
            <div style={card}>
              <SectionHeading index={6} icon={<Home size={24} color="var(--coral-accent)" />} title="Living Costs, Hostel Amenities & Climate" eyebrow="Student Experience" tone="coral" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                <div style={{ background: 'var(--sand-bg)', padding: '20px', borderRadius: '14px', border: '1px solid var(--hairline)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--navy-primary)', fontWeight: '700', marginBottom: '8px' }}>
                    <Utensils size={19} color="var(--coral-accent)" /> 100% Indian Mess
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.55' }}>
                    North &amp; South Indian vegetarian and non-vegetarian meals prepared fresh daily by Indian chefs inside university hostels.
                  </p>
                </div>
                <div style={{ background: 'var(--sand-bg)', padding: '20px', borderRadius: '14px', border: '1px solid var(--hairline)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--navy-primary)', fontWeight: '700', marginBottom: '8px' }}>
                    <Thermometer size={19} color="var(--gold-accent)" /> Climate &amp; Central Heating
                  </div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.55' }}>
                    {country.quickFacts.climate}. All campus hostels and university buildings are 100% centrally steam-heated.
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '15.5px', lineHeight: '1.8', color: 'var(--text-body)' }}>{country.livingCosts}</p>
            </div>

            {/* 07 — FAQ */}
            <div style={card}>
              <SectionHeading index={7} icon={<HelpCircle size={24} color="var(--coral-accent)" />} title={`Frequently Asked Questions — MBBS in ${country.name}`} eyebrow="Got Questions?" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {country.faqs.map((faq, idx) => (
                  <div key={idx} style={{ border: '1px solid var(--hairline)', borderRadius: '12px', overflow: 'hidden' }}>
                    <button
                      onClick={() => toggleFaq(idx)}
                      style={{
                        width: '100%', padding: '17px 20px', background: openFaq === idx ? 'var(--sand-bg)' : '#ffffff',
                        border: 'none', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--coral-accent)', fontWeight: '700', flexShrink: 0 }}>
                        Q{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span style={{ flex: 1, fontWeight: '700', color: 'var(--navy-primary)', fontSize: '15.5px' }}>{faq.q}</span>
                      {openFaq === idx ? <ChevronUp size={19} color="var(--coral-accent)" /> : <ChevronDown size={19} color="var(--text-muted)" />}
                    </button>
                    {openFaq === idx && (
                      <div style={{ padding: '4px 20px 20px 54px', color: 'var(--text-muted)', fontSize: '14.5px', lineHeight: '1.65' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ===================== SIDEBAR: APPLICATION FORM ===================== */}
          <div>
            <div className="mo-sidebar" style={{ position: 'sticky', top: '95px' }}>
              <div style={{
                borderRadius: '20px', background: '#ffffff', border: '1px solid var(--hairline)',
                boxShadow: '0 18px 40px rgba(22,35,61,0.09)', overflow: 'hidden'
              }}>
                <div style={{ background: 'var(--navy-primary)', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#ffb199', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Free Doctor Consultation
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: '#fff', fontWeight: '600' }}>
                      Check Your Eligibility
                    </div>
                  </div>
                  <Stamp size={26} color="#ffb199" style={{ flexShrink: 0 }} />
                </div>

                <div style={{ padding: '26px 28px 30px 28px' }}>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '22px', lineHeight: '1.55' }}>
                    Get official seat availability, fee quotation, and scholarship brochure for {country.name} directly from senior counselors.
                  </p>

                  {submitted ? (
                    <div style={{ background: '#e8f6ef', color: '#0f8a5f', padding: '22px', borderRadius: '14px', textAlign: 'center' }}>
                      <CheckCircle2 size={34} color="var(--success)" style={{ margin: '0 auto 10px auto' }} />
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', marginBottom: '6px' }}>Request Received</h4>
                      <p style={{ fontSize: '13.5px' }}>Our senior medical advisor for {country.name} will contact you within 15 minutes.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {[
                        { label: 'Student Full Name *', name: 'name', type: 'text', placeholder: 'e.g. Ananya Roy', required: true },
                        { label: 'Phone / WhatsApp Number *', name: 'phone', type: 'tel', placeholder: '+91 98765 43210', required: true },
                        { label: 'Email Address *', name: 'email', type: 'email', placeholder: 'ananya@gmail.com', required: true },
                      ].map((f) => (
                        <div key={f.name}>
                          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--navy-primary)', marginBottom: '6px', display: 'block' }}>{f.label}</label>
                          <input
                            type={f.type} name={f.name} required={f.required} value={formData[f.name]} onChange={handleInputChange}
                            placeholder={f.placeholder}
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1.5px solid #dfe3ea', outline: 'none', fontSize: '14px', fontFamily: 'var(--font-body)' }}
                          />
                        </div>
                      ))}

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--navy-primary)', marginBottom: '6px', display: 'block' }}>NEET Score</label>
                          <input type="number" name="neetScore" value={formData.neetScore} onChange={handleInputChange} placeholder="e.g. 240"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1.5px solid #dfe3ea', outline: 'none', fontSize: '14px', fontFamily: 'var(--font-mono)' }} />
                        </div>
                        <div>
                          <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--navy-primary)', marginBottom: '6px', display: 'block' }}>12th PCB %</label>
                          <input type="text" name="pcbMarks" value={formData.pcbMarks} onChange={handleInputChange} placeholder="e.g. 75%"
                            style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1.5px solid #dfe3ea', outline: 'none', fontSize: '14px', fontFamily: 'var(--font-mono)' }} />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--navy-primary)', marginBottom: '6px', display: 'block' }}>Preferred University</label>
                        <select name="university" value={formData.university} onChange={handleInputChange}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '9px', border: '1.5px solid #dfe3ea', outline: 'none', fontSize: '14px', background: '#ffffff', fontFamily: 'var(--font-body)' }}>
                          <option value="">Select University (Optional)</option>
                          {country.universities.map((u, idx) => <option key={idx} value={u.name}>{u.name}</option>)}
                        </select>
                      </div>

                      <button type="submit" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%',
                        background: 'var(--coral-accent)', color: '#fff', border: 'none', padding: '15px', borderRadius: '10px',
                        marginTop: '4px', fontSize: '15px', fontWeight: '700', fontFamily: 'var(--font-body)', cursor: 'pointer'
                      }}>
                        Check Eligibility &amp; Get Fee Sheet <ArrowRight size={17} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== CLOSING CTA ===================== */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, var(--navy-primary) 0%, var(--navy-dark) 100%)', color: '#ffffff', padding: '70px 0', textAlign: 'center' }}>
        <div style={{ position: 'absolute', right: '-30px', top: '-30px', opacity: 0.25 }}>
          <StampBadge label="ADMISSIONS OPEN" size={170} tone="gold" />
        </div>
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', letterSpacing: '2px', textTransform: 'uppercase', color: '#ff9c7f', marginBottom: '16px' }}>
            Admissions Open · 2026–27
          </div>
          <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: '600', marginBottom: '16px' }}>
            Secure Your MBBS Seat in {country.name} Today
          </h2>
          <p style={{ color: '#c7d2e3', fontSize: '17px', maxWidth: '720px', margin: '0 auto 32px auto', lineHeight: '1.65' }}>
            Zero capitation fees, 100% direct university tuition payment, and guaranteed NMC Gazette compliance. Speak with our senior overseas medical counselors now.
          </p>
          <button onClick={() => onRequestCounselling(country.name)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--coral-accent)',
            color: '#fff', border: 'none', padding: '17px 38px', borderRadius: '10px',
            fontFamily: 'var(--font-body)', fontWeight: '700', fontSize: '16px', cursor: 'pointer'
          }}>
            Book Free Counselling for MBBS in {country.name} <ArrowRight size={19} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;