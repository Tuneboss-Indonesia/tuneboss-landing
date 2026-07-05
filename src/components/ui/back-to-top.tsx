import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ArrowUp } from 'lucide-react';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-[99] p-3 rounded-full bg-[#e87a1e] text-white shadow-[0_0_20px_rgba(232,122,30,0.5)] transition-all duration-300 hover:bg-[#f9a054] hover:scale-110 focus:outline-none",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
};
