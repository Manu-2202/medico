import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

const EligibilityCalculator = ({ onRequestCounselling }) => {
  const [neetScore, setNeetScore] = useState('');
  const [pcbMarks, setPcbMarks] = useState('');
  const [category, setCategory] = useState('General');
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const score = parseInt(neetScore) || 0;
    const pcb = parseFloat(pcbMarks) || 0;

    const minNeet = category === 'General' ? 135 : 107;
    const minPcb = category === 'General' ? 50 : 40;

    const isNeetOk = score >= minNeet;
    const isPcbOk = pcb >= minPcb;

    setResults({
      isEligible: isNeetOk && isPcbOk,
      neetPassed: isNeetOk,
      pcbPassed: isPcbOk,
      minNeet,
      minPcb,
      score,
      pcb
    });
    setCalculated(true);
  };

  return (
    <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', padding: '20px 22px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.12)', position: 'relative' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge-coral" style={{ padding: '2px 8px', fontSize: '11px' }}>
            <Calculator size={12} /> Instant Assessment
          </span>
          <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '800', margin: 0 }}>
            MBBS Abroad Eligibility Calculator
          </h3>
        </div>
        <span style={{ color: '#cbd5e1', fontSize: '12px' }}>
          Check NMC/WHO qualifying status for Russia, Georgia, Uzbekistan & Central Asia.
        </span>
      </div>

      {!calculated ? (
        <form onSubmit={handleCalculate} className="eligibility-calc-form">
          <style>{`
            .eligibility-calc-form {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
              align-items: end;
            }
            @media (max-width: 992px) {
              .eligibility-calc-form {
                grid-template-columns: 1fr 1fr;
              }
            }
            @media (max-width: 576px) {
              .eligibility-calc-form {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
          
          <div>
            <label style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: '#ffffff', color: '#0f172a', outline: 'none', fontSize: '13px', fontWeight: '600', boxSizing: 'border-box' }}
            >
              <option value="General">General / EWS</option>
              <option value="Reserved">OBC / SC / ST</option>
            </select>
          </div>

          <div>
            <label style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>NEET Score (Out of 720)</label>
            <input 
              type="number"
              required
              placeholder="e.g. 240"
              value={neetScore}
              onChange={(e) => setNeetScore(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: '#ffffff', color: '#0f172a', outline: 'none', fontSize: '13px', fontWeight: '600', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>12th PCB Aggregate %</label>
            <input 
              type="number"
              step="0.1"
              required
              placeholder="e.g. 68.5"
              value={pcbMarks}
              onChange={(e) => setPcbMarks(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: '#ffffff', color: '#0f172a', outline: 'none', fontSize: '13px', fontWeight: '600', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px 14px', fontSize: '13px', borderRadius: '8px', boxSizing: 'border-box' }}>
              Check Eligibility Now
            </button>
          </div>

        </form>
      ) : (
        <div style={{ background: 'rgba(255,255,255,0.08)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
          {results.isEligible ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>
                  <CheckCircle2 size={18} /> You are 100% Eligible for MBBS Abroad!
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '12px' }}>
                  NEET: {results.score} | PCB: {results.pcb}% — Qualified for Russia, Georgia, Uzbekistan, Kazakhstan & Kyrgyzstan.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-primary" onClick={onRequestCounselling} style={{ padding: '7px 14px', fontSize: '12px', borderRadius: '6px' }}>
                  Get Admission Letter <ArrowRight size={13} />
                </button>
                <button className="btn-secondary" onClick={() => setCalculated(false)} style={{ padding: '7px 12px', fontSize: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none' }}>
                  Recalculate
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f87171', fontSize: '15px', fontWeight: '700', marginBottom: '2px' }}>
                  <AlertTriangle size={18} /> Special Guidance Required
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '12px' }}>
                  Speak with senior counselors for customized university pathway guidance.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-primary" onClick={onRequestCounselling} style={{ padding: '7px 14px', fontSize: '12px', borderRadius: '6px' }}>
                  Talk to Counselor
                </button>
                <button className="btn-secondary" onClick={() => setCalculated(false)} style={{ padding: '7px 12px', fontSize: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'none' }}>
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default EligibilityCalculator;
