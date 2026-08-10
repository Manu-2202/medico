// Robust Audio Notification Engine for Medico Overseas
// Features Web Audio API synth + HTML5 Audio fallback + Auto-unlock on first user interaction

let audioContext = null;

// Initialize and unlock audio on first user gesture
export const unlockAudio = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioContext) {
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log('[Audio Engine] AudioContext resumed & active ✓');
      });
    }
  } catch (e) {
    console.warn('[Audio Engine] Unlock warning:', e);
  }
};

// Listen globally for first interaction to unlock audio
if (typeof window !== 'undefined') {
  const handleInteraction = () => {
    unlockAudio();
    window.removeEventListener('click', handleInteraction);
    window.removeEventListener('keydown', handleInteraction);
    window.removeEventListener('touchstart', handleInteraction);
  };
  window.addEventListener('click', handleInteraction, { once: true });
  window.addEventListener('keydown', handleInteraction, { once: true });
  window.addEventListener('touchstart', handleInteraction, { once: true });
}

// Play pleasant, loud, multi-tone medical alert chime
export const playAlertSound = (type = 'chime') => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    const playTones = (ctx) => {
      const now = ctx.currentTime;
      // High-energy 4-note ascending bell chime: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
      const frequencies = [523.25, 659.25, 783.99, 1046.50];
      
      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle'; // Richer harmonics than pure sine
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        // Quick attack, gentle bell decay
        gain.gain.setValueAtTime(0.001, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.4, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.46);
      });
    };

    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        playTones(audioContext);
      }).catch(() => {
        // Fallback tone
        playTones(audioContext);
      });
    } else {
      playTones(audioContext);
    }
  } catch (err) {
    console.warn('[Audio Engine] Play sound error:', err);
  }
};
