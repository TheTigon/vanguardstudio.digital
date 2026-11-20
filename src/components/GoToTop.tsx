import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const GoToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      try {
        const top = window.scrollY ?? window.pageYOffset ?? document.documentElement.scrollTop ?? 0;
        setIsVisible(top > 300);
      } catch {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Sayfanın en üstüne çık"
      title="Sayfanın en üstüne çık"
      className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center animate-in fade-in duration-200 cursor-pointer"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};
