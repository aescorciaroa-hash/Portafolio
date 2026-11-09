import { useEffect, useRef, useState } from 'react';

// Devuelve una ref y un booleano. Cuando el elemento entra en el viewport,
// visible pasa a true (una sola vez) para disparar animaciones de aparición.
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, visible];
};

export default useScrollReveal;
