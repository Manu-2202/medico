import React, { useState, useEffect, useRef } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, User, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const knowledgeBase = [
  {
    keywords: ['russia', 'nmc', 'approved'],
    reply: 'Yes! Top Russian Federal Universities like Bashkir State and Kazan Federal are 100% NMC Gazette 2021 compliant and listed in WHO WDOMS. The degree is 6 years including 1 year internship.'
  },
  {
    keywords: ['georgia', 'fee', 'cost'],
    reply: 'MBBS in Georgia tuition ranges from $4,500 to $6,500/year (approx ₹22L to ₹32L total 6-year package). All courses are taught 100% in English with high USMLE & FMGE pass rates.'
  },
  {
    keywords: ['fmge', 'next', 'exam', 'coaching'],
    reply: 'Medico Overseas provides integrated FMGE/NEXT online coaching starting from Year 1 of MBBS with 15,000+ MCQ question banks and live lectures by senior Indian professors.'
  },
  {
    keywords: ['mess', 'food', 'indian'],
    reply: 'Yes! All our recommended university hostels in Russia, Georgia, Kazakhstan, Uzbekistan, and Kyrgyzstan feature 100% Indian mess facilities with native cooks preparing Veg & Non-Veg meals.'
  },
  {
    keywords: ['neet', 'cutoff', 'score'],
    reply: 'For General category students, NEET score of 135+ is required. For OBC/SC/ST, NEET score of 107+ is required. 12th PCB percentage must be 50% (General) or 40% (Reserved).'
  }
];

const AiMedicalAdvisor = ({ onRequestCounselling }) => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: lang === 'hi' ? 'नमस्ते! मैं आपका एआई मेडिकल सलाहकार हूँ। आप एनएमसी नियमों, फीस या यूनिवर्सिटी के बारे में कुछ भी पूछ सकते हैं!' : 'Hello! I am your AI Medical Advisor. Ask me anything about NMC guidelines, 6-year fee packages, or university selection!' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const isFormKeyword = (text) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return (
      lower.includes('form') ||
      lower.includes('fill') ||
      lower.includes('apply') ||
      lower.includes('register') ||
      lower.includes('counsell') ||
      lower.includes('counsel') ||
      lower.includes('book') ||
      lower.includes('seat') ||
      lower.includes('contact') ||
      lower.includes('admission')
    );
  };

  const handleSend = async (text) => {
    const q = (text || inputMsg).trim();
    if (!q || isLoading) return;

    const userWantsForm = isFormKeyword(q);
    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    if (!text) setInputMsg('');
    setIsLoading(true);

    // If user asked to fill form or apply, automatically trigger lead form modal!
    if (userWantsForm && onRequestCounselling) {
      setTimeout(() => {
        onRequestCounselling();
      }, 400);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, history: messages.slice(-8) })
      });
      const data = await response.json();

      if (data && data.success && data.aiAvailable && data.reply) {
        setMessages(prev => [
          ...prev, 
          { sender: 'ai', text: data.reply, showFormButton: userWantsForm || isFormKeyword(data.reply) }
        ]);
      } else {
        // Fallback to local knowledge base
        const qLower = q.toLowerCase();
        let matchedReply = knowledgeBase.find(kb => kb.keywords.some(kw => qLower.includes(kw)));
        if (matchedReply) {
          setMessages(prev => [
            ...prev, 
            { sender: 'ai', text: matchedReply.reply, showFormButton: userWantsForm || isFormKeyword(matchedReply.reply) }
          ]);
        } else {
          setMessages(prev => [...prev, { 
            sender: 'ai', 
            text: lang === 'hi' 
              ? 'आपके प्रश्न का विस्तृत उत्तर देने के लिए हमारे वरिष्ठ चिकित्सा सलाहकार तैयार हैं। 100% सटीक मार्गदर्शन प्राप्त करें!' 
              : 'For detailed personalized guidance on your NEET score & budget, our senior counselor will guide you directly! Click below to open the official admission form:',
            showFormButton: true
          }]);
        }
      }
    } catch (err) {
      const qLower = q.toLowerCase();
      let matchedReply = knowledgeBase.find(kb => kb.keywords.some(kw => qLower.includes(kw)));
      if (matchedReply) {
        setMessages(prev => [
          ...prev, 
          { sender: 'ai', text: matchedReply.reply, showFormButton: userWantsForm }
        ]);
      } else {
        setMessages(prev => [...prev, { 
          sender: 'ai', 
          text: lang === 'hi' 
            ? 'हमारे वरिष्ठ चिकित्सा सलाहकार सहायता के लिए उपलब्ध हैं। नीचे दिए गए बटन पर क्लिक करें:' 
            : 'Our senior medical admissions advisor can guide you directly. Click below to open the counselling & admission form:',
          showFormButton: true
        }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 3D Floating AI Trigger Container */}
      <div className="ai-trigger-wrapper-3d">
        {/* Floating "Need Any Help?" 3D Pill Badge */}
        {!isOpen && (
          <div className="need-help-pill-3d" onClick={() => setIsOpen(true)}>
            <span className="pulsing-dot-green"></span>
            {lang === 'hi' ? 'क्या सहायता चाहिए? 💬' : 'Need Any Help? 💬'}
          </div>
        )}

        {/* Floating AI Button with 3D Walking Doctor Avatar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ai-advisor-trigger-btn-3d"
          aria-label="Toggle AI Medical Advisor"
        >
          <span className="walking-doctor-avatar">👨‍⚕️</span>
          <Sparkles size={18} color="#38bdf8" />
          <span className="ai-advisor-btn-text">
            {lang === 'hi' ? 'AI मेडिकल सहायक' : 'AI Medical Advisor'}
          </span>
        </button>
      </div>

      {/* AI Chat Window */}
      {isOpen && (
        <div className="ai-advisor-window">
          
          {/* Header */}
          <div style={{ padding: '16px 20px', background: '#111827', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#38bdf8', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={22} />
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: '800', fontSize: '15px' }}>Medico AI Advisor</div>
                <div style={{ color: '#4ade80', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} /> Online 24/7
                </div>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }} aria-label="Close AI Advisor">
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '12px 14px',
                  borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : '#1e293b',
                  color: '#ffffff',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  {m.text}
                </div>

                {/* Interactive Admission Form Button inside Chat */}
                {(m.showFormButton || (m.sender === 'ai' && isFormKeyword(m.text))) && (
                  <button
                    onClick={() => {
                      if (onRequestCounselling) onRequestCounselling();
                    }}
                    style={{
                      marginTop: '8px',
                      background: 'linear-gradient(135deg, #E15B3F, #C9452B)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(225, 91, 63, 0.4)',
                      transition: 'transform 0.2s ease'
                    }}
                    className="chat-form-action-btn"
                  >
                    📋 Fill Admission & Counselling Form
                  </button>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ background: '#1e293b', color: '#94a3b8', padding: '10px 16px', borderRadius: '18px 18px 18px 4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="#38bdf8" style={{ animation: 'spin 2s linear infinite' }} /> Dr. Maya is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question & Form Trigger Chips */}
          <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '6px', overflowX: 'auto', background: '#0b0f19' }}>
            <button
              onClick={() => {
                handleSend('I want to fill the admission form');
                if (onRequestCounselling) onRequestCounselling();
              }}
              style={{ background: 'linear-gradient(135deg, rgba(225,91,63,0.2), rgba(225,91,63,0.3))', border: '1px solid var(--coral-accent)', color: '#ffedd5', borderRadius: '14px', padding: '5px 12px', fontSize: '11px', fontWeight: '800', whiteSpace: 'nowrap', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              📋 Fill Admission Form
            </button>
            {['Is Russia NMC approved?', 'Georgia 6-year fee?', 'Indian mess available?'].map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#93c5fd', borderRadius: '14px', padding: '5px 10px', fontSize: '11px', whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div style={{ padding: '12px', background: '#111827', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI or type 'fill form'..."
              style={{ flex: 1, padding: '10px 14px', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
            />
            <button
              onClick={() => handleSend()}
              style={{ background: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '12px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Send Message"
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}

      {/* Embedded Component Styles */}
      <style>{`
        .ai-trigger-wrapper-3d {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          perspective: 1000px;
        }
        .need-help-pill-3d {
          background: #ffffff;
          color: #0f172a;
          border: 2px solid var(--coral-accent, #E15B3F);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 8px 24px rgba(225, 91, 63, 0.35);
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          animation: floatBouncePill 2.5s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .need-help-pill-3d:hover {
          transform: translateY(-4px) scale(1.06);
          background: #fff4f1;
        }
        .pulsing-dot-green {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: dotPulse 1.6s infinite;
        }
        .walking-doctor-avatar {
          font-size: 20px;
          display: inline-block;
          animation: doctorWalkLegs 1.2s ease-in-out infinite alternate;
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
        }
        .ai-advisor-trigger-btn-3d {
          background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
          color: #ffffff;
          border: 2px solid #38bdf8;
          border-radius: 30px;
          padding: 12px 20px;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.4);
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .ai-advisor-trigger-btn-3d:hover {
          transform: translateY(-4px) rotateY(-10deg) scale(1.05);
          box-shadow: 0 14px 40px rgba(56, 189, 248, 0.45);
        }
        .chat-form-action-btn:hover {
          transform: scale(1.05);
        }
        @keyframes doctorWalkLegs {
          0% { transform: translateY(0) rotate(-8deg) scale(1); }
          50% { transform: translateY(-4px) rotate(0deg) scale(1.1); }
          100% { transform: translateY(0) rotate(8deg) scale(1); }
        }
        @keyframes floatBouncePill {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes dotPulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .ai-advisor-window {
          position: fixed;
          bottom: 86px;
          right: 24px;
          z-index: 9999;
          width: 380px;
          max-width: calc(100vw - 32px);
          height: 520px;
          max-height: calc(100vh - 110px);
          background: #0b0f19;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        @media (max-width: 480px) {
          .ai-trigger-wrapper-3d {
            bottom: 16px;
            right: 16px;
          }
          .ai-advisor-trigger-btn-3d {
            padding: 10px 16px;
          }
          .ai-advisor-btn-text {
            font-size: 12px;
          }
          .ai-advisor-window {
            right: 16px;
            left: 16px;
            bottom: 74px;
            width: auto;
            max-width: none;
            height: calc(100vh - 120px);
            max-height: 520px;
          }
        }
      `}</style>
    </>
  );
};

export default AiMedicalAdvisor;
