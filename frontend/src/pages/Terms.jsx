import React from 'react';
import { FileText } from 'lucide-react';
import SEO from '../components/SEO';

const Terms = () => {
  return (
    <div>
      <SEO 
        title="Terms & Conditions - Medico Overseas Consultancy Agreement"
        description="Terms & Conditions for MBBS abroad admissions through Medico Overseas. Official university fee policies, zero hidden charges, and transparent student agreement."
      />
      <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#ffffff', padding: '60px 0 40px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-coral" style={{ marginBottom: '12px' }}><FileText size={14} /> Legal Agreement</span>
          <h1 style={{ color: '#ffffff', fontSize: '36px', marginBottom: '10px' }}>Terms & Conditions</h1>
          <p style={{ color: '#cbd5e1', fontSize: '15px' }}>Last updated: August 4, 2026</p>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '850px', fontSize: '15px', color: 'var(--text-body)', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '14px' }}>1. Consultancy Services</h2>
          <p style={{ marginBottom: '20px' }}>
            Medico Overseas acts as an official authorized admission representative for NMC & WHO-recognized medical universities across Russia, Georgia, Kyrgyzstan, Uzbekistan, Armenia, and Vietnam.
          </p>

          <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '14px' }}>2. Admission & Eligibility</h2>
          <p style={{ marginBottom: '20px' }}>
            Direct seat issuance is subject to the candidate fulfilling NMC guidelines (minimum age of 17, 50% in 12th PCB, and valid NEET score). All tuition fee payments are made directly to the university's official bank accounts.
          </p>

          <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '14px' }}>3. Visa Guarantee & Travel</h2>
          <p style={{ marginBottom: '20px' }}>
            Medico Overseas guarantees visa processing assistance provided all original candidate documents, apostilles, and medical fitness certificates submitted by the candidate are authentic and verified by embassy standards.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;
