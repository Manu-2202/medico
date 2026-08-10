import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, duration = 2000, prefix = "", suffix = "", format = false }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCount(0);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
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

      // Smooth easeOutCubic curve
      const easedPercentage = 1 - Math.pow(1 - percentage, 3);
      const currentValue = Math.floor(easedPercentage * target);

      setCount(currentValue);

      if (progress < duration) {
        animationFrameId = window.requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, target, duration]);

  const formattedValue = format ? count.toLocaleString('en-IN') : count;

  return (
    <span ref={elementRef}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default AnimatedCounter;
