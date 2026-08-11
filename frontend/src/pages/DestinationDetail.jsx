import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { countryData } from '../data/countryData';
import { 
  ShieldCheck, GraduationCap, CheckCircle2, FileText, ArrowRight, DollarSign, 
  MapPin, Clock, HelpCircle, Building2, ChevronDown, ChevronUp, AlertCircle,
  Plane, Home, Utensils, Sun, Thermometer, UserCheck, Sparkles, Lock, Award,
  BookOpen, HeartPulse, Calendar, Users, Check
} from 'lucide-react';
import SEO from '../components/SEO';
import EligibilityCalculator from '../components/EligibilityCalculator';

const DestinationDetail = ({ onRequestCounselling }) => {
  const { countrySlug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  // Match slug to country key (e.g., 'mbbs-in-russia' -> 'russia')
  const countryKey = countrySlug?.replace('mbbs-in-', '') || 'russia';
  const country = countryData[countryKey] || countryData['russia'];

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const seoTitle = `MBBS in ${country.name} 2026-27: Fee Structure, Eligibility & Top NMC Universities`;
  const seoDesc = `Study MBBS in ${country.name} for Indian Students: Complete guide on tuition fees, hostel, mess, visa process, NMC & WHO approved medical colleges, and end-to-end guidance by Medico Overseas.`;
  const seoKeywords = `MBBS in ${country.name}, study MBBS in ${country.name} 2026, ${country.name} medical university fees, NMC approved medical colleges in ${country.name}, ${country.name} MBBS eligibility for Indian students, Medico Overseas`;

  const countrySchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': `MBBS in ${country.name}`,
    'description': country.tagline,
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'Medico Overseas',
      'sameAs': window.location.origin
    },
    'hasCourseInstance': {
      '@type': 'CourseInstance',
      'courseMode': 'Onsite',
      'duration': country.quickFacts?.duration || 'P6Y'
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: 'var(--text-body)', minHeight: '100vh' }}>
      <SEO 
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        schemaJson={countrySchema}
      />

      {/* 1. HERO HEADER BANNER */}
      <section className="hero-section" style={{ 
        position: 'relative', 
        background: `linear-gradient(135deg, rgba(11, 19, 43, 0.9) 0%, rgba(31, 56, 100, 0.92) 100%), url(${country.bannerImg}) center/cover no-repeat`, 
        color: '#ffffff', 
        padding: '40px 0 32px 0' 
      }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '42px' }}>{country.flag}</span>
            <span className="badge-coral" style={{ background: 'rgba(225, 91, 63, 0.25)', color: '#ff8a73', border: '1px solid rgba(225, 91, 63, 0.4)' }}>
              NMC 54-Month Gazette & WHO Recognized
            </span>
            <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '6px 14px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
              {country.quickFacts.safetyIndex || 'High Safety Index'}
            </span>
          </div>

          <h1 style={{ color: '#ffffff', fontSize: '44px', fontWeight: '800', marginBottom: '16px', lineHeight: '1.25' }}>
            MBBS in {country.name} for Indian Students 2026-27
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '19px', maxWidth: '850px', lineHeight: '1.65', marginBottom: '32px' }}>
            {country.tagline}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => onRequestCounselling(country.name)} style={{ padding: '16px 36px', fontSize: '16px' }}>
              <GraduationCap size={20} /> Apply for MBBS in {country.name}
            </button>
            <a href="#fees-table" className="btn-outline" style={{ color: '#ffffff', borderColor: '#ffffff', padding: '16px 30px', fontSize: '15px' }}>
              <DollarSign size={18} /> View Fee Structure & Cost
            </a>
          </div>
        </div>
      </section>

      {/* 2. QUICK FACTS METRICS STRIP */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '28px 0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            
            <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '14px', borderLeft: '4px solid var(--coral-accent)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Course Duration</div>
              <div style={{ fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '800', marginTop: '4px' }}>{country.quickFacts.duration}</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '14px', borderLeft: '4px solid var(--navy-primary)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Medium of Instruction</div>
              <div style={{ fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '800', marginTop: '4px' }}>{country.quickFacts.medium}</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '14px', borderLeft: '4px solid var(--cyan-accent)' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Estimated Total Package</div>
              <div style={{ fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '800', marginTop: '4px' }}>{country.quickFacts.feeRange}</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '14px', borderLeft: '4px solid #10b981' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>NEET Requirement</div>
              <div style={{ fontSize: '15px', color: '#10b981', fontWeight: '800', marginTop: '4px' }}>Qualified Score (Gen ~135+)</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT LAYOUT (FULL WIDTH CONTAINER - NO SIDEBAR FORM) */}
      <section style={{ padding: '24px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1140px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* SECTION 1: OVERVIEW OF STUDYING MBBS IN THE COUNTRY (WHY CHOOSE IT) */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="badge-navy">Section 1</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--coral-accent)' }}>Key Benefits & Highlights</span>
              </div>
              <h2 style={{ fontSize: '28px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 color="var(--coral-accent)" size={28} /> Overview of Studying MBBS in {country.name}
              </h2>
              
              <div style={{ background: '#f0f7ff', borderLeft: '4px solid var(--navy-primary)', padding: '18px', borderRadius: '0 14px 14px 0', marginBottom: '24px' }}>
                <p style={{ color: 'var(--navy-primary)', fontSize: '15.5px', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
                  {country.overview}
                </p>
              </div>

              {/* WHY CHOOSE MBBS IN THIS COUNTRY GRID */}
              <h3 style={{ fontSize: '20px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award color="var(--coral-accent)" size={22} /> Why Choose MBBS in {country.name}?
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                {country.whyChoose ? country.whyChoose.map((item, idx) => (
                  <div key={idx} style={{ 
                    background: '#f8fafc', 
                    padding: '18px', 
                    borderRadius: '16px', 
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(225, 91, 63, 0.1)', color: 'var(--coral-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                        {idx + 1}
                      </div>
                      {item.badge && (
                        <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '6px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                )) : (
                  <p style={{ color: 'var(--text-muted)' }}>Top choice for high quality European & Asian medical education.</p>
                )}
              </div>
            </div>

            {/* SECTION 2: ELIGIBILITY CRITERIA (AGE, NEET REQUIREMENT, ACADEMIC %) */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="badge-coral">Section 2</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy-primary)' }}>NMC 2026 Guidelines</span>
              </div>
              <h2 style={{ fontSize: '28px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck color="var(--coral-accent)" size={28} /> Eligibility Criteria for Indian Students
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', marginBottom: '20px', maxWidth: '850px' }}>
                To secure MBBS admission in {country.name} for the 2026-27 academic session, Indian candidates must satisfy the following National Medical Commission (NMC) admission norms:
              </p>

              {/* Explicit 3 Core Pillars: Age, NEET, Academic % */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                
                {/* 1. Age Limit */}
                <div style={{ background: '#fff5f3', border: '1.5px solid #ffcca8', padding: '18px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'var(--coral-accent)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--coral-accent)' }}>Rule 01</span>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', margin: 0 }}>Age Limit / Requirement</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.55', margin: 0, fontWeight: '500' }}>
                    Candidate must complete at least <strong>17 years of age</strong> on or before <strong>December 31st</strong> of the admission year. No maximum age limit applies.
                  </p>
                </div>

                {/* 2. NEET Requirement */}
                <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', padding: '18px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#10b981' }}>Rule 02</span>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', margin: 0 }}>NEET Requirement</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.55', margin: 0, fontWeight: '500' }}>
                    Mandatory <strong>NEET Qualified Scorecard</strong> in the current year or preceding 2 years (General ~135+, SC/ST/OBC ~107+). Valid for 3 years for abroad studies.
                  </p>
                </div>

                {/* 3. Academic % (12th Board) */}
                <div style={{ background: '#f0f7ff', border: '1.5px solid #bae6fd', padding: '18px', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'var(--navy-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--navy-primary)' }}>Rule 03</span>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', margin: 0 }}>Academic % (12th Board)</h4>
                    </div>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.55', margin: 0, fontWeight: '500' }}>
                    Minimum <strong>50% aggregate marks</strong> in Physics, Chemistry, and Biology (PCB) in 12th Board/Intermediate (<strong>40% for SC/ST/OBC</strong>). English as a compulsory subject.
                  </p>
                </div>

              </div>

              {/* Additional Eligibility Items Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                {country.eligibility.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="var(--coral-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '2px' }}>{item.rule}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.45' }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Verification Callout */}
              <div style={{ background: 'linear-gradient(135deg, rgba(31, 56, 100, 0.05) 0%, rgba(225, 91, 63, 0.05) 100%)', borderRadius: '16px', padding: '18px 24px', border: '1px dashed var(--navy-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--navy-primary)', marginBottom: '2px' }}>Do You Meet These Eligibility Requirements?</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Get instant university seat confirmation and free document evaluation from senior counselors.</p>
                </div>
                <button className="btn-primary" onClick={() => onRequestCounselling(country.name)} style={{ padding: '12px 24px', fontSize: '14px', whiteSpace: 'nowrap' }}>
                  Check Eligibility Now <ArrowRight size={16} />
                </button>
              </div>

            </div>

            {/* SECTION 4: FEE STRUCTURE TABLE (Tuition, Hostel, Mess, One-time Costs) */}
            <div id="fees-table" className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)' }}>
              <span className="badge-navy" style={{ marginBottom: '8px' }}>Transparent Fee Quotation</span>
              <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign color="var(--coral-accent)" size={24} /> University Fee Structure Breakdown ({country.name})
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '18px' }}>
                100% direct official university tuition rates. Tuition and hostel fees are paid directly to the university account.
              </p>

              {/* Table */}
              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy-primary)', color: '#ffffff' }}>
                      <th style={{ padding: '12px 14px', borderRadius: '10px 0 0 0' }}>University Name</th>
                      <th style={{ padding: '12px 14px' }}>City</th>
                      <th style={{ padding: '12px 14px' }}>Tuition / Yr ($)</th>
                      <th style={{ padding: '12px 14px' }}>Hostel + Mess ($)</th>
                      <th style={{ padding: '12px 14px', borderRadius: '0 10px 0 0' }}>Est. Total / Yr (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.universities.map((uni, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: 'var(--navy-primary)' }}>
                          {uni.name}
                          <div style={{ fontSize: '11px', color: 'var(--coral-accent)', fontWeight: '800', marginTop: '2px' }}>{uni.nmcStatus}</div>
                        </td>
                        <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>{uni.city}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '700' }}>{uni.tuitionYearUSD}</td>
                        <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>{uni.hostelYearUSD} + {uni.messYearUSD}</td>
                        <td style={{ padding: '12px 14px', fontWeight: '800', color: 'var(--coral-accent)', fontSize: '14px' }}>{uni.totalInrYear}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* One-Time Expenses Breakdown Sub-Card */}
              {country.oneTimeCosts && country.oneTimeCosts.length > 0 && (
                <div style={{ background: '#f0f7ff', borderRadius: '16px', padding: '18px', border: '1px solid #bae6fd' }}>
                  <h4 style={{ fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="var(--cyan-accent)" /> 1st Year One-Time Initial Admission & Visa Expenses
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                    {country.oneTimeCosts.map((c, idx) => (
                      <div key={idx} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{c.item}</span>
                        <strong style={{ color: 'var(--navy-primary)' }}>{c.cost}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* EMBEDDED ELIGIBILITY & BUDGET CALCULATOR FOR DESTINATION */}
            <EligibilityCalculator 
              onRequestCounselling={onRequestCounselling} 
              defaultCountry={country.name} 
            />

            {/* SECTION 5: ADMISSION PROCESS & REQUIRED DOCUMENTS CHECKLIST */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)' }}>
              <span className="badge-coral" style={{ marginBottom: '8px' }}>Step-by-Step Guide</span>
              <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText color="var(--coral-accent)" size={24} /> Admission Process & Document Checklist
              </h2>

              {/* Admission Process Steps */}
              {country.admissionSteps && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                  {country.admissionSteps.map((s, idx) => (
                    <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', borderTop: '4px solid var(--navy-primary)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--coral-accent)', fontWeight: '800', textTransform: 'uppercase' }}>
                        STEP {s.step}
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--navy-primary)', margin: '3px 0 4px 0' }}>
                        {s.title}
                      </h4>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Documents Checklist Sub-Card */}
              {country.documentsChecklist && (
                <div style={{ background: '#faf5ff', borderRadius: '16px', padding: '18px', border: '1px solid #e9d5ff' }}>
                  <h4 style={{ fontSize: '16px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={18} color="var(--coral-accent)" /> Mandatory Documents Checklist for Indian Applicants
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '8px' }}>
                    {country.documentsChecklist.map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', border: '1px solid #f3e8ff' }}>
                        <Check size={14} color="#9333ea" />
                        <span style={{ color: 'var(--navy-primary)', fontWeight: '600' }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 6: VISA PROCESS & APPROVAL TIMELINE */}
            {country.visaProcess && (
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)' }}>
                <span className="badge-navy" style={{ marginBottom: '8px' }}>Hassle-Free Processing</span>
                <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Plane color="var(--coral-accent)" size={24} /> Student Visa & Immigration Process ({country.name})
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Processing Time</div>
                    <div style={{ fontSize: '16px', color: 'var(--navy-primary)', fontWeight: '800', marginTop: '3px' }}>{country.visaProcess.processingTime}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Visa Approval Success Rate</div>
                    <div style={{ fontSize: '16px', color: '#10b981', fontWeight: '800', marginTop: '3px' }}>{country.visaProcess.approvalRate}</div>
                  </div>
                </div>

                <h4 style={{ fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '10px' }}>Workflow Steps:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {country.visaProcess.workflow.map((w, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', fontSize: '13.5px', borderLeft: '4px solid var(--coral-accent)' }}>
                      <span style={{ fontWeight: '800', color: 'var(--coral-accent)' }}>0{idx + 1}.</span>
                      <span style={{ color: 'var(--text-body)', fontWeight: '500' }}>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 7: LIVING COSTS, STUDENT LIFE & CLIMATE NOTES */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)' }}>
              <span className="badge-coral" style={{ marginBottom: '8px' }}>Student Experience</span>
              <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Home color="var(--coral-accent)" size={24} /> Living Costs, Hostel Amenities & Climate
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '18px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '6px' }}>
                    <Utensils size={18} color="var(--coral-accent)" /> 100% Indian Mess
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                    North & South Indian vegetarian and non-vegetarian meals prepared fresh daily by Indian chefs inside university hostels.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '6px' }}>
                    <Thermometer size={18} color="var(--cyan-accent)" /> Climate & Central Heating
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.45', margin: 0 }}>
                    {country.quickFacts.climate}. All campus hostels and university buildings are 100% centrally steam-heated.
                  </p>
                </div>
              </div>

              <p style={{ color: 'var(--text-body)', fontSize: '14.5px', lineHeight: '1.65', margin: 0 }}>
                {country.livingCosts}
              </p>
            </div>

            {/* SECTION 8: COUNTRY SPECIFIC FAQS */}
            <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15, 23, 42, 0.03)' }}>
              <span className="badge-navy" style={{ marginBottom: '8px' }}>Got Questions?</span>
              <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', fontWeight: '800', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle color="var(--coral-accent)" size={24} /> Frequently Asked Questions (MBBS in {country.name})
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {country.faqs.map((faq, idx) => (
                  <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                    <button 
                      onClick={() => toggleFaq(idx)}
                      style={{ width: '100%', padding: '14px 18px', background: openFaq === idx ? '#f8fafc' : '#ffffff', border: 'none', textAlign: 'left', fontWeight: '800', color: 'var(--navy-primary)', fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? <ChevronUp size={18} color="var(--coral-accent)" /> : <ChevronDown size={18} />}
                    </button>
                    {openFaq === idx && (
                      <div style={{ padding: '14px 18px', background: '#ffffff', color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: '1.6', borderTop: '1px solid #f1f5f9' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>


    </div>
  );
};

export default DestinationDetail;
