import React, { useState } from 'react';
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

  const handleSend = (text) => {
    const q = (text || inputMsg).trim();
    if (!q) return;

    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    if (!text) setInputMsg('');

    // Find AI Match
    const qLower = q.toLowerCase();
    let matchedReply = knowledgeBase.find(kb => kb.keywords.some(kw => qLower.includes(kw)));
    
    setTimeout(() => {
      if (matchedReply) {
        setMessages(prev => [...prev, { sender: 'ai', text: matchedReply.reply }]);
      } else {
        setMessages(prev => [...prev, { 
          sender: 'ai', 
          text: lang === 'hi' 
            ? 'आपके प्रश्न का विस्तृत उत्तर देने के लिए हमारे वरिष्ठ चिकित्सा सलाहकार तैयार हैं। नीचे बटन दबाकर सीधा परामर्श लें!' 
            : 'For detailed personalized guidance on your NEET score & budget, our senior advisor will guide you directly! Click below to request a callback.' 
        }]);
      }
    }, 600);
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
          color: '#ffffff',
          border: '2px solid #38bdf8',
          borderRadius: '30px',
          padding: '12px 20px',
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Sparkles size={20} color="#38bdf8" />
        <span style={{ fontSize: '13px', fontWeight: '800' }}>
          {lang === 'hi' ? 'AI मेडिकल सहायक' : 'AI Medical Advisor'}
        </span>
      </button>

      {/* AI Chat Window */}
      {isOpen && (
        <div style={{ position: 'fixed', bottom: '86px', right: '24px', zIndex: 9999, width: '380px', maxWidth: 'calc(100vw - 32px)', height: '520px', background: '#0b0f19', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
          
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

            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%',
                  padding: '12px 14px',
                  borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #e15b3f 0%, #c84327 100%)' : '#1e293b',
                  color: '#ffffff',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Question Chips */}
          <div style={{ padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '6px', overflowX: 'auto', background: '#0b0f19' }}>
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
              placeholder="Ask AI about MBBS abroad..."
              style={{ flex: 1, padding: '10px 14px', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
            />
            <button
              onClick={() => handleSend()}
              style={{ background: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '12px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Send size={16} />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default AiMedicalAdvisor;
