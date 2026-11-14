import React from 'react';
import { ArrowUp, Mail, Phone, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const EMAIL = 'andrescamilodev@gmail.com';
const TELEFONO = '573112487793';
const TELEFONO_VISIBLE = '+57 311 248 7793';
const WHATSAPP = `https://wa.me/${TELEFONO}`;

const navegacion = [
  { href: '#presentacion', label: 'Inicio' },
  { href: '#sobremi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#certificados', label: 'Certificados' },
  { href: '#contacto', label: 'Contacto' },
];

const redes = [
  { icon: <FaGithub size={16} />, label: 'GitHub', url: 'https://github.com/aescorciaroa-hash' },
  { icon: <FaLinkedin size={16} />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/ingenieroandres' },
  { icon: <FaWhatsapp size={16} />, label: 'WhatsApp', url: WHATSAPP },
  { icon: <FaEnvelope size={16} />, label: 'Correo', url: `mailto:${EMAIL}` },
];

const externo = (url) => (url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {});

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="ft">
      <div className="ft-inner">
        {/* --- Llamado a la acción --- */}
        <div className="ft-cta">
          <span className="ft-cta-glow" aria-hidden="true" />
          <div className="ft-cta-text">
            <span className="ft-eyebrow">
              <span className="ft-dot" /> Disponible para nuevos proyectos
            </span>
            <h3>
              ¿Tienes una idea en mente? <br />
              <span className="gradient-text">Hagámosla realidad.</span>
            </h3>
          </div>
          <div className="ft-cta-actions">
            <a href="#contacto" className="btn btn-primary">
              <Send size={15} /> Escríbeme
            </a>
            <a href={WHATSAPP} {...externo(WHATSAPP)} className="btn btn-ghost">
              <FaWhatsapp size={16} /> WhatsApp
            </a>
          </div>
        </div>

        {/* --- Columnas --- */}
        <div className="ft-grid">
          <div className="ft-brand">
            <a href="#presentacion" className="ft-logo">
              Andres<span className="gradient-text">.</span>
            </a>
            <p className="ft-text">
              Desarrollador de software. Construyo soluciones web funcionales e
              integro inteligencia artificial en productos reales.
            </p>
            <div className="ft-social">
              {redes.map((s) => (
                <a key={s.label} href={s.url} aria-label={s.label} title={s.label} {...externo(s.url)}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h4 className="ft-title">Navegación</h4>
            <ul className="ft-list">
              {navegacion.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="ft-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="ft-title">Contacto</h4>
            <ul className="ft-list">
              <li>
                <a href={`mailto:${EMAIL}`} className="ft-contact">
                  <span className="ft-ico"><Mail size={14} /></span>
                  <span className="ft-contact-txt">{EMAIL}</span>
                </a>
              </li>
              <li>
                <a href={WHATSAPP} {...externo(WHATSAPP)} className="ft-contact">
                  <span className="ft-ico"><Phone size={14} /></span>
                  <span className="ft-contact-txt">{TELEFONO_VISIBLE}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Barra inferior --- */}
        <div className="ft-bottom">
          <p>© {year} Andres Camilo Escorcia Roa. Todos los derechos reservados.</p>
          <a href="#presentacion" className="ft-top" aria-label="Volver arriba">
            <ArrowUp size={14} /> Volver arriba
          </a>
        </div>
      </div>

      <style>{`
        .ft {
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--border);
          padding: 5rem 2rem 0;
          background:
            radial-gradient(900px 300px at 50% 100%, rgba(255,122,26,0.10), transparent 70%),
            var(--bg);
        }
        .ft-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }

        /* CTA */
        .ft-cta {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          padding: clamp(1.8rem, 4vw, 2.8rem);
          border-radius: 22px;
          border: 1px solid rgba(255,122,26,0.22);
          background: linear-gradient(135deg, rgba(255,122,26,0.10), rgba(255,255,255,0.02) 55%);
          margin-bottom: 4rem;
        }
        .ft-cta-glow {
          position: absolute;
          top: -60%; right: -10%;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,122,26,0.22), transparent 65%);
          filter: blur(20px);
          pointer-events: none;
        }
        .ft-cta-text, .ft-cta-actions { position: relative; }
        .ft-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 0.35rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: rgba(255,255,255,0.03);
          margin-bottom: 1rem;
        }
        .ft-cta h3 {
          font-size: clamp(1.5rem, 3.4vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -1px;
          line-height: 1.15;
        }
        .ft-cta-actions { display: flex; gap: 0.8rem; flex-wrap: wrap; }
        .ft-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft);
          flex-shrink: 0;
        }

        /* Columnas */
        .ft-grid {
          display: grid;
          grid-template-columns: 1.5fr 0.8fr 1.2fr;
          gap: 3rem;
          padding-bottom: 3rem;
        }
        .ft-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.6rem;
          letter-spacing: -0.5px;
          color: var(--text-primary);
        }
        .ft-text {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
          margin: 0.9rem 0 1.4rem;
          max-width: 340px;
        }
        .ft-social { display: flex; gap: 0.6rem; }
        .ft-social a {
          display: grid; place-items: center;
          width: 38px; height: 38px;
          border-radius: 11px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.03);
          color: var(--text-secondary);
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .ft-social a:hover {
          color: #fff;
          border-color: transparent;
          background: var(--gradient);
          transform: translateY(-3px);
        }
        .ft-title {
          margin: 0.4rem 0 1.2rem;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: var(--accent-2);
        }
        .ft-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 0.75rem;
          font-size: 0.9rem;
        }
        .ft-link {
          position: relative;
          color: var(--text-secondary);
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .ft-link::before {
          content: '';
          position: absolute; left: 0; top: 50%;
          width: 0; height: 1px;
          background: var(--accent);
          transition: width 0.2s ease;
        }
        .ft-link:hover { color: var(--text-primary); padding-left: 16px; }
        .ft-link:hover::before { width: 10px; }
        .ft-contact {
          display: inline-flex; align-items: center; gap: 0.7rem;
          color: var(--text-secondary);
          transition: color 0.2s ease;
          min-width: 0;
        }
        .ft-contact-txt { overflow-wrap: anywhere; }
        .ft-ico {
          display: grid; place-items: center;
          width: 30px; height: 30px; flex-shrink: 0;
          border-radius: 9px;
          background: var(--accent-soft);
          color: var(--accent);
        }
        .ft-contact:hover { color: var(--text-primary); }

        /* Barra inferior: deja espacio a la derecha para el botón flotante del chat */
        .ft-bottom {
          border-top: 1px solid var(--border);
          padding: 1.5rem 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          color: var(--text-secondary);
          font-size: 0.8rem;
        }
        .ft-top {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          transition: color 0.2s ease, border-color 0.2s ease;
          margin-right: 5.5rem;
        }
        .ft-top:hover { color: var(--accent); border-color: var(--accent); }

        @media (max-width: 820px) {
          .ft { padding-top: 4rem; }
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 2.4rem; }
          .ft-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .ft { padding: 3.5rem 1rem 0; }
          .ft-cta { margin-bottom: 3rem; }
          .ft-cta-actions, .ft-cta-actions .btn { width: 100%; justify-content: center; }
          .ft-grid { grid-template-columns: 1fr; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
          .ft-top { margin-right: 0; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
