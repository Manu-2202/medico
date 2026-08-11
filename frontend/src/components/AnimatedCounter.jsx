import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter Component
 * Triggers smooth auto-increment counting animation whenever the numbers section is reached on scroll.
 */
const AnimatedCounter = ({ 
  target = 0, 
  end = null,
  duration = 2000, 
  prefix = "", 
  suffix = "", 
  format = true 
}) => {
  const finalTarget = end !== null ? end : target;
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset count when scrolling away so it auto-increments again when scrolled back into view
          setIsVisible(false);
          setCount(0);
        }
      },
      { 
        threshold: 0.01,
        rootMargin: '0px 0px -20px 0px' 
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Smooth easeOutCubic curve for elegant count-up feel
      const easedPercentage = 1 - Math.pow(1 - percentage, 3);
      const currentValue = Math.floor(easedPercentage * finalTarget);

      setCount(currentValue);

      if (progress < duration) {
        animationFrameId = window.requestAnimationFrame(animate);
      } else {
        setCount(finalTarget);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, finalTarget, duration]);

  const formattedValue = format ? count.toLocaleString('en-US') : count;

  return (
    <span ref={elementRef} style={{ display: 'inline-block' }}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default AnimatedCounter;
