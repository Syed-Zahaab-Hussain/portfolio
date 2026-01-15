"use client";

import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = 'fit-content', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element entered viewport
          if (!isVisible) {
            setIsVisible(true);

            // Set overflow to visible after animation finishes
            clearTimeout(timer);
            timer = setTimeout(() => {
              setAnimationComplete(true);
            }, 800 + (delay * 1000) + 200);
          }
        } else {
          // Element left viewport
          // Only reset if the element is BELOW the viewport (user scrolled up past it)
          // entry.boundingClientRect.top > 0 means it's below the viewport
          if (entry.boundingClientRect.top > 0) {
            setIsVisible(false);
            setAnimationComplete(false);
            clearTimeout(timer);
          }
          // If entry.boundingClientRect.top < 0, it's above the viewport (user scrolled down past it)
          // We leave it visible so it doesn't re-animate when scrolling back up.
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      clearTimeout(timer);
    };
  }, [delay, isVisible]);

  return (
    <div
      ref={ref}
      style={{
        width,
        position: 'relative',
        overflow: animationComplete ? 'visible' : 'hidden'
      }}
    >
      <div
        style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(75px)',
            opacity: isVisible ? 1 : 0,
            transition: isVisible ? `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s` : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};
