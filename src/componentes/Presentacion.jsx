import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import useTypewriter from '../hooks/useTypewriter';
import MagneticButton from './MagneticButton';
import perfil from '../assets/perfil.png';

const Presentacion = () => {
  const roles = [
    'Desarrollador de Software',
    'Integración de Inteligencia Artificial',
    'Automatización de Procesos',
  ];
  const typewrittenText = useTypewriter(roles, 80, 45, 1800);

  return (
    <section
      id="presentacion"
      className="section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}
    >

      <style>{`
        /* Celular: nombre y descripción -> foto -> botones y redes */
        @media (max-width: 860px) {
          .hero-wrap { flex-direction: column; flex-wrap: nowrap !important; gap: 2.2rem !important; }
          .hero-text { display: contents; }
          .hero-intro, .hero-actions { width: 100%; max-width: 540px; }
          .hero-intro { order: 1; }
          .hero-photo { order: 2; max-width: 320px !important; }
          .hero-actions { order: 3; }
          .hero-intro p:last-child { margin-bottom: 0 !important; }
          .hero-buttons { margin-bottom: 2rem !important; }
        }
      `}</style>
      <div
        className="hero-wrap"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap-reverse',
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
          gap: '4rem',
          padding: '0 2rem',
        }}
      >
        <div
          className="hero-text"
          style={{ flex: '1 1 400px', maxWidth: '540px', minWidth: '300px' }}
        >
          <div className="hero-intro">
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '0.7rem' }}>
            Hola, soy
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 4.4rem)',
              fontWeight: 700,
              lineHeight: 1.03,
              marginBottom: '1.1rem',
              letterSpacing: '-2px',
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>Andres Camilo</span>
            <br />
            <span className="gradient-text">Escorcia Roa</span>
          </h1>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: 'var(--text-primary)',
              fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
              letterSpacing: '0.5px',
              marginBottom: '1.8rem',
              fontWeight: 500,
              minHeight: '1.6em',
            }}
          >
            {typewrittenText}
            <span className="cursor-blink">|</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth: '460px',
            }}
          >
            Desarrollo aplicaciones web completas, de principio a fin, y les integro
            inteligencia artificial para automatizar procesos. Me enfoco en crear
            soluciones claras, seguras y fáciles de usar que resuelvan problemas reales.
          </p>
          </div>

          <div className="hero-actions">
          <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <MagneticButton href="#proyectos" className="btn btn-primary">
              Ver Proyectos <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton href="#contacto" className="btn btn-ghost">
              Contactarme
            </MagneticButton>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Sígueme</span>
            <div style={{ display: 'flex', gap: '0.9rem' }}>
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>

        <div
          className="float hero-photo"
          style={{
            flex: '1 1 320px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <div
            className="photo-frame"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
              padding: '3px',
              borderRadius: '28px',
              background: 'var(--gradient)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4 / 5',
                borderRadius: '25px',
                overflow: 'hidden',
                background:
                  'radial-gradient(120% 80% at 50% 15%, rgba(255,122,26,0.14), transparent 60%), linear-gradient(180deg, #17161d 0%, #0a0a0b 100%)',
              }}
            >
              {/* halo detrás del sujeto */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '-6%',
                  width: '90%',
                  height: '80%',
                  transform: 'translateX(-50%)',
                  background: 'radial-gradient(circle, rgba(255,122,26,0.28), transparent 68%)',
                  filter: 'blur(24px)',
                  pointerEvents: 'none',
                }}
              />
              <img
                src={perfil}
                alt="Andres Camilo Escorcia Roa"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '104%',
                  height: 'auto',
                  filter: 'brightness(0.97) contrast(1.03)',
                }}
              />
              {/* fundido inferior hacia el marco */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 72%, rgba(10,10,11,0.55) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presentacion;
