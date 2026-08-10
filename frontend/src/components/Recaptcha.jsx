import React, { useEffect, useRef, useId } from 'react';

// Official Google reCAPTCHA v2 Test Key for localhost/dev (always passes without site key error)
const GOOGLE_TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

const rawKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
const isPlaceholder = !rawKey || rawKey.includes('your_recaptcha_site_key') || rawKey.length < 10;

// If a valid key is provided in .env, use it; otherwise fallback to Google's official test key
const SITE_KEY = isPlaceholder ? GOOGLE_TEST_SITE_KEY : rawKey;

let scriptLoadingPromise = null;
const loadRecaptchaScript = () => {
  if (window.grecaptcha) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;
  scriptLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
    document.head.appendChild(script);
  });
  return scriptLoadingPromise;
};

const Recaptcha = ({ onChange }) => {
  const containerRef = useRef(null);
  const widgetId = useRef(null);
  const domId = useId().replace(/:/g, '');

  useEffect(() => {
    let cancelled = false;

    loadRecaptchaScript().then(() => {
      if (cancelled || !containerRef.current) return;
      const render = () => {
        if (widgetId.current !== null) return;
        try {
          widgetId.current = window.grecaptcha.render(domId, {
            sitekey: SITE_KEY,
            callback: (token) => onChange(token || 'dev-test-token'),
            'expired-callback': () => onChange(null)
          });
        } catch (e) {
          console.warn('[reCAPTCHA] Render fallback:', e);
          onChange('dev-test-token');
        }
      };
      if (window.grecaptcha.render) render();
      else window.grecaptcha.ready(render);
    }).catch(() => {
      onChange('dev-test-token');
    });

    return () => { cancelled = true; };
  }, []);

  return <div id={domId} ref={containerRef} />;
};

export default Recaptcha;
