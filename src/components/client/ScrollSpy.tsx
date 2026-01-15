"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const ScrollSpyContext = createContext<string>('home');

export function useActiveSection() {
  return useContext(ScrollSpyContext);
}

export default function ScrollSpy({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // If at very top, always set to home
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      const sections = ['home', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollSpyContext.Provider value={activeSection}>
      {children}
    </ScrollSpyContext.Provider>
  );
}
