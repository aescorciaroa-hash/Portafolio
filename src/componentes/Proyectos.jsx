import React, { useRef } from 'react';
import { Github, ExternalLink, Hammer } from 'lucide-react';
import Reveal from './Reveal';
import copiwaypro from '../assets/copiwaypro.png';
import mitiendapro from '../assets/mitiendapro.png';

const proyectos = [
  {
    title: 'CopiwayPRO',
    description:
      'Sistema web para administrar una dark kitchen: gestión de menú, pedidos y clientes. Landing pública para hacer pedidos y panel de administración interno.',
    tags: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
    githubUrl: 'https://github.com/aescorciaroa-hash/copiwaypro',
    liveUrl: 'https://www.copiwaypro.com',
    image: copiwaypro,
    inProgress: false,
  },
  {
    title: 'MiTiendaPRO',
    description:
      'Sistema POS 2.0 online inteligente para administración simplificada de tiendas. Optimiza operaciones, agiliza ventas, control de inventario e integra inteligencia artificial.',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'IA / Gemini', 'Node.js'],
    githubUrl: 'https://github.com/aescorciaroa-hash/MiTiendaPRO',
    liveUrl: '',
    image: mitiendapro,
    inProgress: true,
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
              color: '#4ade80',
              border: '1px solid rgba(74,222,128,0.45)',
              borderRadius: '20px',
              padding: '0.2rem 0.6rem',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} /> En línea
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
            Proyectos que ya están en producción y otros en los que sigo trabajando.
            Aquí irán apareciendo a medida que los termine.
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
