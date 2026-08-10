import React, { useState, useEffect, useRef } from 'react';
import { Award, GraduationCap, Building2, Globe, ShieldCheck } from 'lucide-react';

const TrustBar = () => {
  const sectionRef = useRef(null);

  // Counter states (Starts from 0)
  const [yearsCount, setYearsCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [univCount, setUnivCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0);

  const animationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          runAutoIncrementAnimation();
        } else {
          // Reset to 0 when scrolled out of view so it always animates from 0 when user reaches section
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          setYearsCount(0);
          setStudentsCount(0);
          setUnivCount(0);
          setCountriesCount(0);
        }
      },
      { 
        threshold: 0.35,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const runAutoIncrementAnimation = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const duration = 2000; // 2 seconds count-up duration
    const startTime = performance.now();

    const targetYears = 15;
    const targetStudents = 10000;
    const targetUniv = 50;
    const targetCountries = 8;

    const step = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Smooth ease-out cubic deceleration formula
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setYearsCount(Math.floor(targetYears * easeOut));
      setStudentsCount(Math.floor(targetStudents * easeOut));
      setUnivCount(Math.floor(targetUniv * easeOut));
      setCountriesCount(Math.floor(targetCountries * easeOut));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setYearsCount(targetYears);
        setStudentsCount(targetStudents);
        setUnivCount(targetUniv);
        setCountriesCount(targetCountries);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  return (
    <section 
      ref={sectionRef}
      style={{ 
        background: '#ffffff', 
        padding: '30px 0', 
        position: 'relative',
        boxShadow: '0 4px 20px rgba(31, 56, 100, 0.04)',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}
    >
      <style>{`
        .trust-stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }
        .trust-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(31, 56, 100, 0.08) !important;
          border-color: #cbd5e1 !important;
        }
      `}</style>

      <div className="container">
        
        {/* Header Badge */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(225, 91, 63, 0.1)', border: '1px solid rgba(225, 91, 63, 0.25)', padding: '5px 16px', borderRadius: '30px', fontSize: '12px', fontWeight: '800', color: 'var(--coral-accent)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            <ShieldCheck size={15} /> Quick-Glance Track Record
          </div>
        </div>

        {/* 4 Counter Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '22px' }}>
          
          {/* Stat 1: Years of Experience */}
          <div className="trust-stat-card">
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(225, 91, 63, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '1px solid rgba(225, 91, 63, 0.2)' }}>
              <Award size={26} color="var(--coral-accent)" />
            </div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--navy-primary)', lineHeight: 1, letterSpacing: '-1px' }}>
              {yearsCount}+
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--coral-accent)', marginTop: '10px' }}>
              Years of Experience
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: '500' }}>
              Unblemished 15-Year Record
            </div>
          </div>

          {/* Stat 2: Students Placed */}
          <div className="trust-stat-card">
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(29, 78, 216, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '1px solid rgba(29, 78, 216, 0.2)' }}>
              <GraduationCap size={26} color="#1d4ed8" />
            </div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--navy-primary)', lineHeight: 1, letterSpacing: '-1px' }}>
              {studentsCount.toLocaleString()}+
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#1d4ed8', marginTop: '10px' }}>
              Students Placed
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: '500' }}>
              Successful Doctors & Scholars
            </div>
          </div>

          {/* Stat 3: NMC/WHO Approved Universities */}
          <div className="trust-stat-card">
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(5, 150, 105, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
              <Building2 size={26} color="#059669" />
            </div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--navy-primary)', lineHeight: 1, letterSpacing: '-1px' }}>
              {univCount}+
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#059669', marginTop: '10px' }}>
              NMC/WHO Universities
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: '500' }}>
              100% Recognized & Accredited
            </div>
          </div>

          {/* Stat 4: Countries Covered */}
          <div className="trust-stat-card">
            <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(124, 58, 237, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
              <Globe size={26} color="#7c3aed" />
            </div>
            <div style={{ fontSize: '40px', fontWeight: '800', color: 'var(--navy-primary)', lineHeight: 1, letterSpacing: '-1px' }}>
              {countriesCount}+
            </div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#7c3aed', marginTop: '10px' }}>
              Countries Covered
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: '500' }}>
              Global Study Destinations
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBar;
