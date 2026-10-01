import { useEffect, useState } from 'react';

const isPastThreshold = (threshold) => window.scrollY > threshold;

const useScrolled = (threshold = 0) => {
  const [scrolled, setScrolled] = useState(() => isPastThreshold(threshold));

  useEffect(() => {
    const handleScroll = () => setScrolled(isPastThreshold(threshold));
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
};

export default useScrolled;
