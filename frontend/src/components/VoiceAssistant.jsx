import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useLanguage } from '../utils/languageContext';

const VoiceAssistant = ({ textToRead, label }) => {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleTogglePlay = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    const text = textToRead || (lang === 'hi'
      ? 'मेडिको ओवरसीज में आपका स्वागत है। हम एनएमसी और डब्ल्यूएचओ अनुमोदित राज्य चिकित्सा विश्वविद्यालयों में सीधा प्रवेश दिलाते हैं।'
      : 'Welcome to Medico Overseas. We provide direct admissions in top NMC and WHO approved government medical universities.');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handleTogglePlay}
      title={isPlaying ? 'Stop Audio Guidance' : 'Listen to Voice Guidance'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: isPlaying ? '#ef4444' : 'rgba(59, 130, 246, 0.12)',
        color: isPlaying ? '#ffffff' : '#2563eb',
        border: `1px solid ${isPlaying ? '#dc2626' : 'rgba(59, 130, 246, 0.3)'}`,
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isPlaying ? '0 4px 12px rgba(239, 68, 68, 0.35)' : 'none'
      }}
    >
      {isPlaying ? <VolumeX size={14} /> : <Volume2 size={14} />}
      <span>{isPlaying ? (lang === 'hi' ? 'ऑडियो रोकें' : 'Stop Audio') : (label || (lang === 'hi' ? 'आवाज में सुनें 🔊' : 'Listen Audio 🔊'))}</span>
    </button>
  );
};

export default VoiceAssistant;
