import React, { useState, useEffect, useRef } from 'react';

/**
 * AutoCountUp Component
 * Automatically increments numbers from start (default 0) to end value 
 * smoothly when scrolled into view on any page.
 */
const AutoCountUp = ({ 
  end = 0, 
  start = 0, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0, 
  style = {}, 
  className = '' 
}) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          // Reset count when leaving viewport so it re-increments when scrolled into view again
          if (animRef.current) cancelAnimationFrame(animRef.current);
          setCount(start);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [end, start, duration]);

  const startAnimation = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const startTime = performance.now();
    const target = Number(end) || 0;
    const initial = Number(start) || 0;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth Cubic Ease-Out for natural feel
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = initial + (target - initial) * easeOut;

      setCount(currentVal);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animRef.current = requestAnimationFrame(step);
  };

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-US');

  return (
    <span ref={ref} style={{ display: 'inline-block', ...style }} className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

export default AutoCountUp;
