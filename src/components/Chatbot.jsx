import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, MessageCircle, Sparkles, User, Phone, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

const Chatbot = ({ isOpen, setIsOpen, onRequestCounselling }) => {
  const whatsappNumber = '919876543210';
  const whatsappMsg = encodeURIComponent('Hello Medico Overseas! I am interested in MBBS Abroad admission. Please provide fee details.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Welcome to Medico Overseas! I am Dr. Maya, your 24/7 AI Admissions Specialist. How can I assist your MBBS Abroad journey today?',
      options: [
        '🎓 Check MBBS Fees & Budget',
        '🇷🇺 MBBS in Russia Details',
        '🇬🇪 MBBS in Georgia Details',
        '🩺 FMGE / NEXT Exam Coaching',
        '💬 Chat on WhatsApp Directly',
        '📞 Request Call with Senior Counselor'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [leadStep, setLeadStep] = useState(null); // 'name' | 'phone' | null
  const [leadData, setLeadData] = useState({ name: '', phone: '', country: 'Russia' });
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleOptionClick = (optionText) => {
    const userMsg = { sender: 'user', text: optionText };
    let botReply = { sender: 'bot', text: '' };

    if (optionText.includes('Fees & Budget')) {
      botReply = {
        sender: 'bot',
        text: '💰 Total 6-year MBBS packages start from ₹14 Lakhs in Kyrgyzstan, ₹18 Lakhs in Russia, ₹22 Lakhs in Georgia, and ₹15 Lakhs in Uzbekistan. Would you like a personalized fee breakdown?',
        options: ['🇷🇺 Get Russia Fee Breakdown', '🇬🇪 Get Georgia Fee Breakdown', '📞 Request Call with Senior Counselor']
      };
    } else if (optionText.includes('Russia')) {
      botReply = {
        sender: 'bot',
        text: '🇷🇺 MBBS in Russia is 100% English medium, NMC & WHO approved. Top state universities include Bashkir State & Kazan Federal. Annual tuition starts from ₹3.5 Lakhs.',
        options: ['📋 Check Eligibility for Russia', '📞 Request Direct Seat Booking']
      };
    } else if (optionText.includes('Georgia')) {
      botReply = {
        sender: 'bot',
        text: '🇬🇪 Georgia offers USMLE-integrated medical curriculum, high FMGE pass rates, European safety standards, and 100% English medium instruction.',
        options: ['📋 Check Eligibility for Georgia', '📞 Request Direct Seat Booking']
      };
    } else if (optionText.includes('FMGE')) {
      botReply = {
        sender: 'bot',
        text: '🩺 Medico Overseas provides integrated FMGE / NEXT question bank access, mock tests, and live online faculty coaching right from Year 1 of your MBBS.',
        options: ['📞 Get Free Study Material', '💬 Chat on WhatsApp Directly']
      };
    } else if (optionText.includes('WhatsApp')) {
      botReply = {
        sender: 'bot',
        text: '💬 You can chat with our senior counselors directly on WhatsApp for instant seat availability and fee sheets:',
        whatsappLink: whatsappUrl
      };
    } else {
      setLeadStep('name');
      botReply = {
        sender: 'bot',
        text: 'Great! Please type your Full Name to request a callback from our senior counselor.'
      };
    }

    setMessages((prev) => [...prev, userMsg, botReply]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);

    if (leadStep === 'name') {
      setLeadData((prev) => ({ ...prev, name: userText }));
      setLeadStep('phone');
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: `Thanks ${userText}! Please share your 10-digit Phone / WhatsApp number so our doctor counselor can call you.` }
        ]);
      }, 500);
    } else if (leadStep === 'phone') {
      const updatedLead = { ...leadData, phone: userText };
      setLeadData(updatedLead);
      setLeadStep(null);

      try {
        await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...updatedLead, email: `${userText}@lead.com`, sourcePage: 'Chatbot' })
        });
      } catch (err) {}

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: '🎉 Callback confirmed! Senior Counselor Dr. Ramesh will call you within 15 minutes to discuss admission options.',
            options: ['🎓 Check MBBS Fees & Budget', '💬 Chat on WhatsApp Directly']
          }
        ]);
      }, 600);
    } else {
      // General intelligent assistant response logic
      setTimeout(() => {
        const lowerText = userText.toLowerCase();
        let responseText = 'Thank you for your message! Our senior counselors are online. Would you like to check fees or request a direct callback?';
        
        if (lowerText.includes('fee') || lowerText.includes('cost') || lowerText.includes('budget') || lowerText.includes('lakh')) {
          responseText = '💰 Total 6-year MBBS cost ranges from ₹14 Lakhs to ₹30 Lakhs total depending on university & country (Russia, Georgia, Central Asia). Zero hidden charges!';
        } else if (lowerText.includes('neet') || lowerText.includes('eligible') || lowerText.includes('mark')) {
          responseText = '📋 NMC Guidelines require NEET Qualification (50th percentile for General, 40th percentile for SC/ST/OBC) and 50% marks in 12th Physics, Chemistry, & Biology.';
        } else if (lowerText.includes('hostel') || lowerText.includes('food') || lowerText.includes('mess')) {
          responseText = '🍲 On-campus hostels offer 24/7 CCTV security, central heating, and North & South Indian cooked meals prepared by Indian chefs daily.';
        }

        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: responseText,
            options: ['🎓 Check MBBS Fees & Budget', '📞 Request Call with Senior Counselor', '💬 Chat on WhatsApp Directly']
          }
        ]);
      }, 600);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="chatbot-window"
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '24px',

        width: '360px',
        maxHeight: '540px',
        height: '78vh',
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(15, 29, 54, 0.35)',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1.5px solid #e2e8f0',
        animation: 'float 0.3s ease-out'
      }}
    >
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy-primary), var(--navy-dark))', color: '#ffffff', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={24} color="var(--navy-primary)" />
          </div>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '15px', margin: 0, fontWeight: '700' }}>Dr. Maya (Admissions AI)</h4>
            <span style={{ fontSize: '11px', color: '#f97316', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', background: '#f97316', borderRadius: '50%' }}></span> Online • Medico Overseas
            </span>
          </div>
        </div>

        <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#ffffff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <X size={16} />
        </button>
      </div>

      {/* Messages Body */}
      <div style={{ flexGrow: 1, padding: '16px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            
            <div
              style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                background: msg.sender === 'user' ? 'var(--coral-accent)' : '#ffffff',
                color: msg.sender === 'user' ? '#ffffff' : 'var(--navy-primary)',
                fontSize: '13px',
                lineHeight: '1.5',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: msg.sender === 'bot' ? '1px solid #e2e8f0' : 'none'
              }}
            >
              {msg.text}

              {/* Embedded Direct WhatsApp Button inside Chat */}
              {msg.whatsappLink && (
                <div style={{ marginTop: '10px' }}>
                  <a
                    href={msg.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#25D366',
                      color: '#ffffff',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)'
                    }}
                  >
                    <MessageCircle size={16} /> Open WhatsApp Chat <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>

            {/* Interactive Option Pills */}
            {msg.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', width: '100%' }}>
                {msg.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionClick(opt)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      background: '#ffffff',
                      border: '1px solid var(--navy-primary)',
                      color: 'var(--navy-primary)',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                    className="dropdown-item"
                  >
                    <span>{opt}</span>
                    <ChevronRight size={14} color="var(--coral-accent)" />
                  </button>
                ))}
              </div>
            )}

          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Footer Input */}
      <form onSubmit={handleSendMessage} style={{ padding: '12px', background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Type your question..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          style={{ flexGrow: 1, padding: '10px 14px', borderRadius: '30px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '13px' }}
        />
        <button type="submit" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--coral-accent)', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Send size={16} />
        </button>
      </form>

    </div>
  );
};

export default Chatbot;
