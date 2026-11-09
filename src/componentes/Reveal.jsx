import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

// Envoltorio que anima la aparición de su contenido al entrar en pantalla.
// delay: retardo en ms para escalonar elementos.
const Reveal = ({ children, delay = 0, style, className = '', as: Tag = 'div' }) => {
  const [ref, visible] = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
