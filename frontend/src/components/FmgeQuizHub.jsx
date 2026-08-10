import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const defaultQuestions = [
  {
    id: 1,
    question: 'Which nerve is most commonly injured in a fracture of the surgical neck of the humerus?',
    options: ['Axillary nerve', 'Radial nerve', 'Median nerve', 'Ulnar nerve'],
    correctAnswer: 0,
    explanation: 'The axillary nerve winds around the surgical neck of the humerus along with the posterior circumflex humeral vessels.'
  },
  {
    id: 2,
    question: 'According to NMC guidelines 2021, what is the mandatory minimum duration of the MBBS course abroad?',
    options: ['48 months', '54 months (4.5 years)', '60 months (5 years)', '36 months'],
    correctAnswer: 1,
    explanation: 'As per NMC Gazette notification, foreign medical courses must span at least 54 months of theory/clinical training plus 12 months internship in the same institution.'
  },
  {
    id: 3,
    question: 'What is the characteristic cell type seen in Aschoff nodules in Rheumatic Heart Disease?',
    options: ['Anitschkow cells (Caterpillar cells)', 'Reed-Sternberg cells', 'Langhans giant cells', 'Psammoma bodies'],
    correctAnswer: 0,
    explanation: 'Anitschkow cells with slender caterpillar-like nuclear chromatin are characteristic histological markers of Aschoff bodies in rheumatic carditis.'
  },
  {
    id: 4,
    question: 'Which drug is safe for malaria prophylaxis in pregnant women visiting endemic regions?',
    options: ['Mefloquine', 'Primaquine', 'Doxycycline', 'Artemether'],
    correctAnswer: 0,
    explanation: 'Mefloquine is safe for malaria prophylaxis during pregnancy. Primaquine and Doxycycline are strictly contraindicated due to fetal toxicity.'
  }
];

const FmgeQuizHub = () => {
  const { lang } = useLanguage();
  const [questions, setQuestions] = useState(defaultQuestions);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredList, setAnsweredList] = useState([]);

  useEffect(() => {
    fetch('/api/quiz-questions')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setQuestions(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectOption = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const isCorrect = index === questions[currentIdx].correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    setAnsweredList(prev => [...prev, { qId: questions[currentIdx].id, selected: index, isCorrect }]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnsweredList([]);
  };

  const currentQ = questions[currentIdx];

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#ffffff', borderRadius: '24px', padding: '32px 28px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.5)', margin: '30px 0' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ background: 'rgba(124, 58, 237, 0.2)', color: '#c084fc', border: '1px solid rgba(124, 58, 237, 0.4)', padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {lang === 'hi' ? '🧠 दैनिक एफएमजीई व नेक्स्ट प्रैक्टिस क्विज' : '🧠 Daily FMGE & NEXT Practice Quiz'}
        </span>
        <h3 style={{ fontSize: '26px', color: '#ffffff', fontWeight: '800', margin: '8px 0 4px 0' }}>
          {lang === 'hi' ? 'लाइकेंशिंग परीक्षा मॉक टेस्ट' : 'Test Your Medical Knowledge'}
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '13px', margin: 0 }}>
          {lang === 'hi'
            ? 'अपनी एनएमसी लाइसेंसिंग परीक्षा की तैयारी का परीक्षण करें। तुरंत उत्तर और मेडिकल व्याख्या प्राप्त करें।'
            : 'Attempt real FMGE / NEXT high-yield MCQs with instant answer rationales.'}
        </p>
      </div>

      {!showResult ? (
        <div style={{ maxWidth: '680px', margin: '0 auto', background: '#1e293b', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          
          {/* Progress Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#818cf8' }}>
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#4ade80' }}>
              Current Score: {score}
            </span>
          </div>

          {/* Question Text */}
          <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', marginBottom: '20px', lineHeight: '1.5' }}>
            {currentQ.question}
          </h4>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {currentQ.options.map((opt, idx) => {
              let bg = '#0f172a';
              let border = 'rgba(255, 255, 255, 0.12)';
              let color = '#ffffff';

              if (selectedOption !== null) {
                if (idx === currentQ.correctAnswer) {
                  bg = 'rgba(34, 197, 94, 0.2)';
                  border = '#22c55e';
                  color = '#4ade80';
                } else if (idx === selectedOption) {
                  bg = 'rgba(239, 68, 68, 0.2)';
                  border = '#ef4444';
                  color = '#fca5a5';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: bg,
                    border: `1px solid ${border}`,
                    color: color,
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: selectedOption !== null ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                  {selectedOption !== null && idx === currentQ.correctAnswer && (
                    <CheckCircle2 size={18} color="#4ade80" />
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.correctAnswer && (
                    <XCircle size={18} color="#fca5a5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Rationale Box */}
          {selectedOption !== null && (
            <div style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '14px 16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#60a5fa', marginBottom: '4px', textTransform: 'uppercase' }}>
                💡 Medical Rationale & Explanation
              </div>
              <p style={{ fontSize: '13px', color: '#e2e8f0', margin: 0, lineHeight: '1.5' }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <button
              onClick={handleNext}
              style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {currentIdx + 1 === questions.length ? 'View Final Results' : 'Next Question'} <ArrowRight size={16} />
            </button>
          )}

        </div>
      ) : (
        /* Final Results Score Card */
        <div style={{ maxWidth: '540px', margin: '0 auto', background: '#1e293b', borderRadius: '20px', padding: '32px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#4ade80' }}>
            <Award size={32} />
          </div>

          <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
            Quiz Completed!
          </h3>

          <p style={{ fontSize: '15px', color: '#cbd5e1', marginBottom: '20px' }}>
            You scored <strong style={{ color: '#4ade80', fontSize: '20px' }}>{score}</strong> out of <strong style={{ color: '#ffffff' }}>{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={handleRestart}
              style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RotateCcw size={14} /> Retry Quiz
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default FmgeQuizHub;
