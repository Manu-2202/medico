import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { examData } from '../data/examData';
import { Stethoscope, BookOpen, CheckCircle2, Award, GraduationCap, ArrowRight, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

const ExamDetail = ({ onRequestCounselling }) => {
  const { examSlug } = useParams();
  const examKey = examSlug?.includes('nmat') ? 'nmat' : 'fmge';
  const exam = examData[examKey] || examData['fmge'];

  const seoTitle = `${exam.title} Guide 2026: Exam Pattern, Syllabus & Coaching Strategy`;
  const seoDesc = `${exam.subtitle} Free study materials, mock test series, and end-to-end coaching for FMGE, NEXT, and NMAT provided by Medico Overseas.`;
  const seoKeywords = `${exam.title}, FMGE coaching for MBBS abroad, NEXT exam syllabus 2026, NMAT Philippines coaching, foreign medical graduate examination India, Medico Overseas`;

  return (
    <div>
      <SEO 
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
      />
      {/* Exam Hero Banner */}
      <section style={{ position: 'relative', background: `linear-gradient(rgba(15, 29, 54, 0.88), rgba(31, 56, 100, 0.95)), url(${exam.bannerImg}) center/cover no-repeat`, color: '#ffffff', padding: '80px 0 60px 0' }}>
        <div className="container">
          <span className="badge-coral" style={{ marginBottom: '16px' }}>{exam.badge}</span>
          <h1 style={{ color: '#ffffff', fontSize: '42px', fontWeight: '800', marginBottom: '14px' }}>
            {exam.title}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '800px', marginBottom: '30px' }}>
            {exam.subtitle}
          </p>
          <button className="btn-primary" onClick={onRequestCounselling} style={{ padding: '14px 32px' }}>
            <GraduationCap size={18} /> Request Free Study Material & Guidance
          </button>
        </div>
      </section>

      {/* Main Content Layout */}
      <section style={{ padding: '70px 0', background: '#f8fafc' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Overview */}
            <div className="glass-card" style={{ padding: '36px', borderRadius: '20px' }}>
              <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', marginBottom: '16px' }}>
                Exam Overview & Purpose
              </h2>
              <p style={{ color: 'var(--text-dark)', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
                {exam.overview}
              </p>
              <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid var(--coral-accent)', fontSize: '14px', color: 'var(--navy-primary)', fontWeight: '600' }}>
                📌 Target Candidate: {exam.whoMustTakeIt}
              </div>
            </div>

            {/* Exam Pattern */}
            <div className="glass-card" style={{ padding: '36px', borderRadius: '20px' }}>
              <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', marginBottom: '20px' }}>
                Exam Pattern & Scoring Details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {Object.entries(exam.examPattern).map(([key, val], idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>{key}</div>
                    <div style={{ fontSize: '14px', color: 'var(--navy-primary)', fontWeight: '700', marginTop: '4px' }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus Breakdown */}
            <div className="glass-card" style={{ padding: '36px', borderRadius: '20px' }}>
              <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', marginBottom: '20px' }}>
                Syllabus & Subject Weightage
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {exam.syllabusSubjects.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--coral-accent)', marginBottom: '6px' }}>{item.category}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-dark)' }}>{item.items}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* How Medico Overseas Helps */}
            <div className="glass-card" style={{ padding: '36px', borderRadius: '20px' }}>
              <h2 style={{ fontSize: '26px', color: 'var(--navy-primary)', marginBottom: '20px' }}>
                How Medico Overseas Assists Your Exam Preparation
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {exam.medicoAssistance.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: 'var(--navy-primary)', fontWeight: '500' }}>
                    <CheckCircle2 color="var(--coral-accent)" size={20} /> {item}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar CTA */}
          <div>
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="glass-card" style={{ padding: '30px', borderRadius: '20px', background: '#ffffff' }}>
                <h3 style={{ fontSize: '22px', color: 'var(--navy-primary)', marginBottom: '8px' }}>
                  Get Free Exam Preparation Materials
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Register to receive PYQ sample tests and FMGE syllabus booklets on WhatsApp.
                </p>
                <button className="btn-primary" onClick={onRequestCounselling} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                  Enroll for Guidance
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Responsive Inline Styling */}
      <style>{`
        @media (max-width: 850px) {
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ExamDetail;
