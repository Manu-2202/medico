import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-primary))', color: '#ffffff', padding: '60px 0 40px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge-coral" style={{ marginBottom: '12px' }}><Lock size={14} /> Data Protection</span>
          <h1 style={{ color: '#ffffff', fontSize: '36px', marginBottom: '10px' }}>Privacy Policy</h1>
          <p style={{ color: '#cbd5e1', fontSize: '15px' }}>Last updated: August 4, 2026</p>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '850px', fontSize: '15px', color: 'var(--text-body)', lineHeight: '1.8' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '14px' }}>1. Introduction</h2>
          <p style={{ marginBottom: '20px' }}>
            Medico Overseas ("we," "our," or "us") values your privacy. This Privacy Policy outlines how we collect, use, store, and safeguard your personal information when you fill out lead forms, request counselling, or browse our website.
          </p>

          <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '14px' }}>2. Information We Collect</h2>
          <p style={{ marginBottom: '20px' }}>
            When you interact with our website or submit inquiry forms, we may collect:
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li>Full Name, Mobile / WhatsApp Number, and Email Address</li>
              <li>City / State of residence</li>
              <li>Preferred MBBS study destination (e.g. Russia, Georgia, Uzbekistan)</li>
              <li>NEET Score and 12th PCB Academic Percentage</li>
            </ul>
          </p>

          <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '14px' }}>3. How We Use Your Data</h2>
          <p style={{ marginBottom: '20px' }}>
            Your information is strictly used to provide 1-on-1 MBBS admission counselling, process official university eligibility applications, share fee structures via WhatsApp or Email, and assist in visa documentation. We maintain a strict zero-spam policy and never sell your personal data to third-party marketing agencies.
          </p>

          <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '14px' }}>4. Data Security</h2>
          <p style={{ marginBottom: '20px' }}>
            We employ SSL encryption, secure MongoDB datastores, and strict organizational security measures to protect your data against unauthorized access.
          </p>

          <h2 style={{ fontSize: '24px', color: 'var(--navy-primary)', marginBottom: '14px' }}>5. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy, please email us at <strong>privacy@medicooverseas.com</strong> or visit our Corporate Head Office in Connaught Place, New Delhi.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
