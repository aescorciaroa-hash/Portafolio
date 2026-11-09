import React, { useEffect, useState } from 'react';
import { ArrowRight, Puzzle, BookOpen, Users, Target } from 'lucide-react';
import {
  FaJava, FaPhp, FaPython, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaDatabase,
  FaJsSquare, FaNodeJs, FaRobot, FaLaravel,
} from 'react-icons/fa';
import useScrollReveal from '../hooks/useScrollReveal';

const skills = [
  { name: 'Java', icon: <FaJava size={24} />, level: 80 },
  { name: 'Python', icon: <FaPython size={24} />, level: 78 },
  { name: 'IA / LLMs', icon: <FaRobot size={24} />, level: 65 },
  { name: 'PHP', icon: <FaPhp size={24} />, level: 68 },
  { name: 'Laravel', icon: <FaLaravel size={24} />, level: 64 },
  { name: 'React', icon: <FaReact size={24} />, level: 75 },
  { name: 'JavaScript', icon: <FaJsSquare size={24} />, level: 78 },
  { name: 'Node.js', icon: <FaNodeJs size={24} />, level: 62 },
  { name: 'HTML5', icon: <FaHtml5 size={24} />, level: 92 },
  { name: 'CSS3', icon: <FaCss3Alt size={24} />, level: 88 },
  { name: 'MySQL', icon: <FaDatabase size={24} />, level: 72 },
  { name: 'Git', icon: <FaGitAlt size={24} />, level: 74 },
];

const nivel = (n) => (n >= 85 ? 'Avanzado' : n >= 65 ? 'Intermedio' : 'Básico');

const learningNow = [
  'Estudiando Inteligencia Artificial',
  'Integrando modelos de IA en apps',
  'Machine Learning con Python',
  'Ingeniería de prompts y APIs de IA',
];

const fortalezas = [
  { icon: <Puzzle size={20} />, name: 'Resolución de problemas' },
  { icon: <BookOpen size={20} />, name: 'Aprendizaje autónomo' },
  { icon: <Users size={20} />, name: 'Trabajo en equipo' },
  { icon: <Target size={20} />, name: 'Atención al detalle' },
];

const stats = [
  { end: 4, suffix: '+', label: 'Lenguajes' },
  { end: 3, suffix: '', label: 'Proyectos activos' },
  { end: 1, suffix: ' año', label: 'Aprendiendo a diario' },
];

const CountUp = ({ end, suffix = '', start }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 950);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end]);
  return <span>{n}{suffix}</span>;
};

const SobreMi = () => {
  const [ref, visible] = useScrollReveal();
  const [phrase, setPhrase] = useState(0);
  const [sel, setSel] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhrase((p) => (p + 1) % learningNow.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="sobremi"
      className="section"
      style={{ padding: '6.5rem 2rem', maxWidth: '1080px', margin: '0 auto' }}
    >
      <div
        ref={ref}
        className={`reveal ${visible ? 'is-visible' : ''} bento`}
      >
        {/* --- Bio --- */}
        <article className="glass-card bento-bio" style={cardPad}>
          <span className="kicker">Sobre mí</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '1rem' }}>
            Convierto <span className="gradient-text">ideas y datos</span> en producto con IA
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.8, marginBottom: 'auto' }}>
            Soy <strong style={{ color: 'var(--text-primary)' }}>Andres Camilo Escorcia Roa</strong>, desarrollador
            de software con enfoque en inteligencia artificial. Construyo
            aplicaciones de punta a punta e integro modelos de IA para automatizar
            procesos y sacar más valor de los datos.
          </p>

          <div style={{ display: 'flex', gap: '1.8rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  className="gradient-text"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 700, lineHeight: 1 }}
                >
                  <CountUp end={s.end} suffix={s.suffix} start={visible} />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
            <a href="#proyectos" className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
              Ver proyectos <ArrowRight size={14} />
            </a>
            <a href="#contacto" className="btn btn-ghost" style={{ fontSize: '0.82rem' }}>
              Contáctame
            </a>
          </div>
        </article>

        {/* --- Stack --- */}
        <article className="glass-card bento-stack" style={cardPad}>
          <span className="kicker">Stack</span>
          <div className="stack-grid">
            {skills.map((s, i) => (
              <button
                key={s.name}
                type="button"
                className={`stack-cell ${sel === i ? 'active' : ''}`}
                onClick={() => setSel(i)}
                onMouseEnter={() => setSel(i)}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? undefined : 'translateY(10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease, border-color 0.22s ease, background 0.22s ease',
                  transitionDelay: visible ? `${100 + i * 45}ms` : '0ms',
                }}
              >
                <span className="stack-icon">{s.icon}</span>
                <span className="stack-name">{s.name}</span>
              </button>
            ))}
          </div>

          {/* barra de progreso interactiva */}
          <div className="stack-detail">
            <div className="stack-detail-top">
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{skills[sel].name}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                {nivel(skills[sel].level)} · {skills[sel].level}%
              </span>
            </div>
            <div className="stack-track">
              <div
                className="stack-fill"
                style={{ width: visible ? `${skills[sel].level}%` : '0%' }}
              />
            </div>
          </div>
        </article>

        {/* --- Fortalezas --- */}
        <article className="glass-card bento-fortalezas" style={cardPad}>
          <span className="kicker">Fortalezas</span>
          <div className="fortalezas-grid">
            {fortalezas.map((f, i) => (
              <div
                key={f.name}
                className="fortaleza-cell"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? undefined : 'translateY(10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease, border-color 0.22s ease, background 0.22s ease',
                  transitionDelay: visible ? `${100 + i * 45}ms` : '0ms',
                }}
              >
                <span className="fortaleza-icon">{f.icon}</span>
                <span className="fortaleza-name">{f.name}</span>
              </div>
            ))}
          </div>
        </article>

        {/* --- Ahora mismo --- */}
        <article className="glass-card bento-now" style={{ ...cardPad, overflow: 'hidden' }}>
          <span className="now-glow" aria-hidden="true" />
          <div className="now-inner">
            <div className="now-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="live-dot" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>
                  Ahora mismo
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="eq" aria-hidden="true">
                  <i /><i /><i /><i />
                </span>
                <div className="now-phrase-wrap">
                  <div
                    key={phrase}
                    className="now-phrase"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'clamp(1.05rem, 2.4vw, 1.4rem)',
                      fontWeight: 600,
                    }}
                  >
                    {learningNow[phrase]}
                  </div>
                </div>
              </div>
            </div>

            <div className="now-dots">
              {learningNow.map((_, i) => (
                <span key={i} className={i === phrase ? 'on' : ''} />
              ))}
            </div>
          </div>
        </article>
      </div>

      <style>{`
        .bento {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1.15fr 1fr;
          grid-template-areas:
            "bio stack"
            "fortalezas fortalezas"
            "now now";
        }
        .bento-bio { grid-area: bio; display: flex; flex-direction: column; }
        .bento-stack { grid-area: stack; display: flex; flex-direction: column; }
        .bento-fortalezas { grid-area: fortalezas; display: flex; flex-direction: column; }
        .bento-now { grid-area: now; }

        .fortalezas-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.7rem;
          margin-top: 0.3rem;
        }
        .fortaleza-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
          padding: 1.1rem 0.6rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
        }
        .fortaleza-cell:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .fortaleza-icon { color: var(--accent); }
        .fortaleza-name { font-size: 0.78rem; color: var(--text-secondary); font-weight: 500; line-height: 1.3; }
        .fortaleza-cell:hover .fortaleza-name { color: var(--text-primary); }

        .stack-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.7rem;
          margin-top: 0.3rem;
          flex: 1;
          align-content: center;
        }
        .stack-cell {
          font: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 0.5rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
        }
        .stack-cell:hover { transform: translateY(-4px); }
        .stack-cell.active {
          border-color: var(--accent);
          background: var(--accent-soft);
        }
        .stack-icon { color: var(--text-secondary); transition: color 0.22s ease; }
        .stack-cell:hover .stack-icon,
        .stack-cell.active .stack-icon { color: var(--accent); }
        .stack-name { font-size: 0.72rem; color: var(--text-secondary); font-weight: 500; }
        .stack-cell.active .stack-name { color: var(--text-primary); }

        .stack-detail { margin-top: 1.2rem; }
        .stack-detail-top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 0.55rem;
        }
        .stack-track {
          height: 7px;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          overflow: hidden;
        }
        .stack-fill {
          height: 100%;
          border-radius: 999px;
          background: var(--gradient);
          transition: width 0.6s cubic-bezier(0.16,1,0.3,1);
        }

        .live-dot {
          position: relative;
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }
        .live-dot::after {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.35;
          animation: breathe 2.4s ease-in-out infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(0.6); opacity: 0.35; }
          50% { transform: scale(1.15); opacity: 0; }
        }

        .bento-now { position: relative; }
        .now-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .now-left { display: flex; flex-direction: column; gap: 1rem; }
        .now-glow {
          position: absolute;
          top: -40%;
          right: -20%;
          width: 60%;
          height: 160%;
          background: radial-gradient(circle, rgba(255,122,26,0.18), transparent 70%);
          filter: blur(30px);
          pointer-events: none;
          animation: glowMove 6s ease-in-out infinite alternate;
        }
        @keyframes glowMove {
          from { transform: translate(0, 0); }
          to { transform: translate(-14%, 12%); }
        }

        .eq {
          display: inline-flex;
          align-items: flex-end;
          gap: 3px;
          height: 26px;
          flex-shrink: 0;
        }
        .eq i {
          width: 3px;
          border-radius: 2px;
          background: var(--gradient);
          animation: eq 1s ease-in-out infinite;
        }
        .eq i:nth-child(1) { animation-delay: -0.2s; }
        .eq i:nth-child(2) { animation-delay: -0.5s; }
        .eq i:nth-child(3) { animation-delay: -0.1s; }
        .eq i:nth-child(4) { animation-delay: -0.7s; }
        @keyframes eq {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }

        .now-phrase-wrap { overflow: hidden; }
        .now-phrase { animation: rollIn 0.55s cubic-bezier(0.16,1,0.3,1); }
        @keyframes rollIn {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .now-dots {
          position: relative;
          display: flex;
          gap: 6px;
        }
        .now-dots span {
          width: 6px; height: 6px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .now-dots span.on {
          width: 22px;
          background: var(--gradient);
        }

        @media (max-width: 820px) {
          .bento {
            grid-template-columns: 1fr;
            grid-template-areas: "bio" "stack" "fortalezas" "now";
          }
        }
        @media (max-width: 420px) {
          .stack-grid { grid-template-columns: repeat(2, 1fr); }
          .fortalezas-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
};

const cardPad = { padding: 'clamp(1.5rem, 3.5vw, 2.2rem)' };

export default SobreMi;
