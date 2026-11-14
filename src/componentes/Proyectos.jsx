import React, { useRef } from 'react';
import { Github, ExternalLink, Hammer, Globe } from 'lucide-react';
import Reveal from './Reveal';
import copiwaypro from '../assets/copiwaypro.jpg';
const proyectos = [
  {
    title: 'CopiwayPRO',
    description:
      'Sistema de gestión para una dark kitchen de hamburguesas a domicilio, con 5 roles (cliente, cocina, domiciliario, administrador y programador). Pedidos en línea con armador de hamburguesas, pagos con Nequi/Daviplata/Bancolombia, tablero de cocina, mapa de entregas con PIN, inventario automático, puntos de fidelidad y cierre de caja con reportes PDF.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'PHP 8 (MVC)', 'MySQL', 'API REST'],
    githubUrl: 'https://github.com/aescorciaroa-hash/copiwaypro',
    liveUrl: 'https://www.copiwaypro.com',
    image: copiwaypro,
    inProgress: false,
  },
];

const TiltCard = ({ p }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 12;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <div
      ref={ref}
      className="glass-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        padding: '1.9rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transformStyle: 'preserve-3d',
        background:
          'radial-gradient(320px circle at var(--mx,50%) var(--my,0%), rgba(255,122,26,0.16), transparent 60%), rgba(255,255,255,0.03)',
      }}
    >
      {p.image && (
        <div
          style={{
            margin: '-1.9rem -1.9rem 0',
            borderRadius: '14px 14px 0 0',
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{p.title}</h3>
        {p.inProgress && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.68rem',
              color: 'var(--accent)',
              border: '1px solid rgba(255,122,26,0.45)',
              borderRadius: '20px',
              padding: '0.2rem 0.6rem',
              whiteSpace: 'nowrap',
            }}
          >
            <Hammer size={11} /> En progreso
          </span>
        )}
        {!p.inProgress && p.liveUrl && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.68rem',
              color: 'var(--accent-2)',
              background: 'var(--accent-soft)',
              border: '1px solid rgba(255,122,26,0.35)',
              borderRadius: '20px',
              padding: '0.2rem 0.65rem',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}
          >
            <Globe size={11} /> En producción
          </span>
        )}
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, flexGrow: 1 }}>
        {p.description}
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {p.tags.map((t) => (
          <span
            key={t}
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-primary)',
              background: 'rgba(255,255,255,0.06)',
              padding: '0.25rem 0.7rem',
              borderRadius: '20px',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.4rem' }}>
        {p.githubUrl ? (
          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <Github size={15} /> Código
          </a>
        ) : (
          <span style={{ ...linkStyle, color: '#555' }}>
            <Github size={15} /> Próximamente
          </span>
        )}
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <ExternalLink size={15} /> Ver sitio
          </a>
        )}
      </div>
    </div>
  );
};

const linkStyle = {
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: '0.3rem',
  fontSize: '0.85rem',
};

const Proyectos = () => {
  return (
    <section id="proyectos" className="section" style={{ padding: '7rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <Reveal>
          <span className="kicker" style={{ justifyContent: 'center' }}>Proyectos</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.7rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-1px' }}>
            Lo que estoy <span className="gradient-text">construyendo</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Proyectos que ya están en producción. Aquí irán apareciendo
            nuevos a medida que los termine.
          </p>
        </Reveal>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 380px))',
          justifyContent: 'center',
          gap: '1.5rem',
        }}
      >
        {proyectos.map((p, i) => (
          <Reveal key={p.title} delay={i * 120}>
            <TiltCard p={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Proyectos;
