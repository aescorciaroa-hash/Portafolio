import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.2rem',
        textAlign: 'center',
      }}
    >
      <a
        href="#presentacion"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}
      >
        Andres<span className="gradient-text">.</span>
      </a>

      <div style={{ display: 'flex', gap: '1.2rem' }}>
        {[
          { icon: <FaGithub size={17} />, url: 'https://github.com/aescorciaroa-hash' },
          { icon: <FaLinkedin size={17} />, url: 'https://www.linkedin.com/in/ingenieroandres' },
          { icon: <FaWhatsapp size={17} />, url: 'https://wa.me/573112487793' },
          { icon: <FaEnvelope size={17} />, url: 'mailto:andrescamilodev@gmail.com' },
        ].map((s, i) => (
          <a
            key={i}
            href={s.url}
            target={s.url.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {s.icon}
          </a>
        ))}
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
        Programa: Análisis y Desarrollo de Software (ADSO) – SENA
      </p>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
        © {new Date().getFullYear()} Andres Camilo Escorcia Roa. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
