import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Copy, Check, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import Reveal from './Reveal';

// NOTA: crea tu cuenta gratis en https://formspree.io y reemplaza el endpoint.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/TU_ID_AQUI';
const EMAIL = 'andrescamilodev@gmail.com';
const TELEFONO = '573112487793'; // con indicativo de Colombia (+57)
const TELEFONO_VISIBLE = '+57 311 248 7793';

const canales = [
  {
    icon: <FaWhatsapp size={17} />,
    label: 'WhatsApp',
    value: TELEFONO_VISIBLE,
    href: `https://wa.me/${TELEFONO}?text=${encodeURIComponent('¡Hola Andres! Vi tu portafolio y quiero hablar contigo.')}`,
  },
  { icon: <FaPhoneAlt size={15} />, label: 'Llamada', value: TELEFONO_VISIBLE, href: `tel:+${TELEFONO}`, sameTab: true },
  { icon: <FaGithub size={17} />, label: 'GitHub', value: '@aescorciaroa-hash', href: 'https://github.com/aescorciaroa-hash' },
  { icon: <FaLinkedin size={17} />, label: 'LinkedIn', value: 'Andres Escorcia', href: 'https://www.linkedin.com/in/ingenieroandres' },
];

const Contacto = () => {
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="section" style={{ padding: '7rem 2rem 5rem', maxWidth: '1050px', margin: '0 auto' }}>
      <div className="contacto-grid">
        {/* --- Izquierda --- */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <span className="kicker">Contacto</span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.9rem)', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: '1rem' }}>
              Construyamos<br /><span className="gradient-text">algo juntos</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '1.8rem' }}>
              ¿Tienes una idea, una vacante o solo quieres saludar? Escríbeme y te
              respondo normalmente en menos de 24 horas.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '0.5rem' }}>
              {/* email con copiar */}
              <div className="canal">
                <span className="canal-ico"><FaEnvelope size={17} /></span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Email</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{EMAIL}</div>
                </div>
                <button type="button" onClick={copyEmail} className="canal-btn" aria-label="Copiar correo">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>

              {canales.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.sameTab ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="canal canal-link"
                >
                  <span className="canal-ico">{c.icon}</span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{c.label}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{c.value}</div>
                  </div>
                  <ArrowUpRight size={16} className="canal-arrow" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* --- Derecha: formulario --- */}
        <Reveal delay={120}>
          <form onSubmit={handleSubmit} className="glass-card form-card">
            <span className="form-glow" aria-hidden="true" />
            <div className="field">
              <input type="text" name="name" id="name" placeholder=" " required />
              <label htmlFor="name">Tu nombre</label>
            </div>
            <div className="field">
              <input type="email" name="email" id="email" placeholder=" " required />
              <label htmlFor="email">Tu correo</label>
            </div>
            <div className="field field-grow">
              <textarea name="message" id="message" rows={5} placeholder=" " required />
              <label htmlFor="message">Tu mensaje</label>
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn btn-primary" style={{ justifyContent: 'center', padding: '1rem', cursor: 'pointer' }}>
              {status === 'sending' ? (
                <><Loader2 size={16} className="spin" /> Enviando...</>
              ) : status === 'success' ? (
                <><CheckCircle size={16} /> ¡Mensaje enviado!</>
              ) : status === 'error' ? (
                <><AlertCircle size={16} /> Error, intenta de nuevo</>
              ) : (
                <><Send size={16} /> Enviar mensaje</>
              )}
            </button>
          </form>
        </Reveal>
      </div>

      <style>{`
        .contacto-grid {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: 2.5rem;
          align-items: stretch;
        }

        .c-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          position: relative;
        }
        .c-dot::after {
          content: '';
          position: absolute; inset: -4px;
          border-radius: 50%; background: var(--accent);
          opacity: 0.35;
          animation: cBreathe 2.4s ease-in-out infinite;
        }
        @keyframes cBreathe {
          0%,100% { transform: scale(0.6); opacity: 0.35; }
          50% { transform: scale(1.2); opacity: 0; }
        }

        .canal {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          color: var(--text-primary);
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .canal-link:hover {
          border-color: var(--accent);
          background: var(--accent-soft);
          transform: translateX(4px);
        }
        .canal-ico {
          display: grid; place-items: center;
          width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 10px;
          background: var(--accent-soft);
          color: var(--accent);
        }
        .canal-arrow { color: var(--text-secondary); transition: color 0.25s ease, transform 0.25s ease; }
        .canal-link:hover .canal-arrow { color: var(--accent); transform: translate(2px,-2px); }
        .canal-btn {
          display: grid; place-items: center;
          width: 34px; height: 34px; flex-shrink: 0;
          border-radius: 9px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .canal-btn:hover { color: var(--accent); border-color: var(--accent); }

        .form-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          padding: clamp(1.5rem, 3.5vw, 2.3rem);
          height: 100%;
        }
        .form-glow {
          position: absolute;
          top: -50%; right: -30%;
          width: 70%; height: 200%;
          background: radial-gradient(circle, rgba(255,122,26,0.12), transparent 70%);
          filter: blur(30px);
          pointer-events: none;
          animation: glowMove 7s ease-in-out infinite alternate;
        }

        .field { position: relative; }
        .field input, .field textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem 1rem 0.6rem;
          color: var(--text-primary);
          font: inherit;
          font-size: 0.92rem;
          outline: none;
          resize: vertical;
          transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
        }
        .field textarea { min-height: 120px; }
        /* el campo del mensaje crece para llenar la altura de la tarjeta */
        .field-grow { flex: 1; display: flex; flex-direction: column; }
        .field-grow textarea { flex: 1; resize: none; }
        .field label {
          position: absolute;
          left: 1rem;
          top: 1.05rem;
          color: var(--text-secondary);
          font-size: 0.92rem;
          pointer-events: none;
          transition: top 0.18s ease, font-size 0.18s ease, color 0.18s ease, letter-spacing 0.18s ease;
        }
        .field input:focus, .field textarea:focus {
          border-color: var(--accent);
          background: rgba(255,122,26,0.05);
          box-shadow: 0 0 0 3px rgba(255,122,26,0.12);
        }
        .field input:focus + label,
        .field input:not(:placeholder-shown) + label,
        .field textarea:focus + label,
        .field textarea:not(:placeholder-shown) + label {
          top: 0.5rem;
          font-size: 0.68rem;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: var(--accent);
        }

        @media (max-width: 820px) {
          .contacto-grid { grid-template-columns: 1fr; gap: 2rem; }
          .field-grow textarea { min-height: 160px; }
        }
      `}</style>
    </section>
  );
};

export default Contacto;
