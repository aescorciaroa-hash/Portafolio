import React, { useRef } from 'react';

// Botón/enlace con efecto magnético: se desplaza levemente hacia el cursor.
const MagneticButton = ({ children, strength = 0.35, style, className = '', ...props }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)', ...style }}
      {...props}
    >
      {children}
    </a>
  );
};

export default MagneticButton;
