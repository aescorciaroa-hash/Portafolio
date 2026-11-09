import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Award, GraduationCap, X, ChevronLeft, ChevronRight, ExternalLink, Download,
  ShieldCheck, Clock, Copy, Check, Eye,
} from 'lucide-react';
import Reveal from './Reveal';

const BASE = `${process.env.PUBLIC_URL}/certificados`;
const SENA_VERIFY = 'http://certificados.sena.edu.co';

// Para agregar un certificado: copia el PDF y una imagen (.jpg) en public/certificados
// y añade un objeto aquí con el mismo "file".
const certificados = [
  {
    file: 'inteligencia-artificial',
    title: 'Implementación de Soluciones de Inteligencia Artificial',
    issuer: 'SENA · Regional Huila',
    date: 'Sep 2026',
    hours: 48,
    category: 'Tecnología',
    code: '9116003567993CC1076906432C',
  },
  {
    file: 'mantenimiento-computadores',
    title: 'Básico en Mantenimiento de Computadores',
    issuer: 'SENA · Regional Huila',
    date: 'Oct 2026',
    hours: 40,
    category: 'Tecnología',
    code: '9116003593076CC1076906432C',
  },
  {
    file: 'emprendimiento-digital',
    title: 'Emprendimiento Digital',
    issuer: 'SENA · Regional Huila',
    date: 'Jul 2026',
    hours: 48,
    grade: 'Apto 4.5',
    category: 'Tecnología',
    code: '9116003491218CC1076906432E',
  },
  {
    file: 'informatica-office',
    title: 'Informática: Microsoft Word, Excel e Internet',
    issuer: 'SENA · Regional Huila',
    date: 'Abr 2026',
    hours: 40,
    grade: 'Apto 4.5',
    category: 'Tecnología',
    code: '9116003420050CC1076906432E',
  },
  {
    file: 'solidworks',
    title: 'Diseño Asistido por Computadora con SolidWorks',
    issuer: 'Semillero SYSCOM · Corporación Universitaria del Huila',
    date: 'Nov 2024',
    category: 'Tecnología',
  },
  {
    file: 'english-level-2',
    title: 'English Does Work — Level 2',
    issuer: 'SENA · Regional Meta',
    date: 'Jun 2026',
    hours: 48,
    grade: 'Apto 4.5',
    category: 'Idiomas',
    code: '9117003517074CC1076906432E',
  },
  {
    file: 'english-level-1',
    title: 'English Does Work — Level 1',
    issuer: 'SENA · Regional Norte de Santander',
    date: 'Sep 2025',
    hours: 48,
    grade: 'Apto 4.5',
    category: 'Idiomas',
    code: '9537003301153CC1076906432E',
  },
  {
    file: 'orientacion-discapacidad',
    title: 'Orientación a Usuarios con Discapacidad',
    issuer: 'SENA · Regional Huila',
    date: 'Jun 2026',
    hours: 60,
    grade: 'Apto 4.5',
    category: 'Complementarios',
    code: '9116003465293CC1076906432E',
  },
  {
    file: 'habitos-saludables',
    title: 'Hábitos Saludables: Alimentación y Actividad Física',
    issuer: 'SENA · Regional Huila',
    date: 'Sep 2026',
    hours: 48,
    category: 'Complementarios',
    code: '9116003578458CC1076906432C',
  },
];

const formacion = [
  {
    title: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    issuer: 'SENA',
    date: 'En curso',
    current: true,
  },
  {
    title: 'Bachiller Académico',
    issuer: 'Colegio Campestre Padre Arturo — Neiva',
    date: 'Nov 2024',
    file: 'bachiller',
  },
];

const categorias = ['Todos', 'Tecnología', 'Idiomas', 'Complementarios'];
const totalHoras = certificados.reduce((a, c) => a + (c.hours || 0), 0);

/* ------------------------------ Visor (lightbox) ------------------------------ */
const pad = (n) => String(n).padStart(2, '0');

const Visor = ({ list, index, onClose, onNav, onGo }) => {
  const c = list[index];
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const touchX = useRef(null);
  const thumbsRef = useRef(null);

  useEffect(() => { setLoaded(false); setCopied(false); }, [index]);

  useEffect(() => {
    const el = thumbsRef.current && thumbsRef.current.children[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onNav]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(c.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { /* sin portapapeles */ }
  };

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null || list.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const pdf = `${BASE}/${c.file}.pdf`;
  const meta = [c.issuer, c.date, c.hours && `${c.hours} horas`, c.grade].filter(Boolean);
  const stop = (fn) => (e) => { e.stopPropagation(); fn(); };

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={c.title}>
      <div className="lb-top">
        <span className="lb-count">
          {pad(index + 1)}<i> / {pad(list.length)}</i>
        </span>
        <div className="lb-tools">
          <a href={pdf} target="_blank" rel="noopener noreferrer" className="lb-tool" title="Abrir PDF">
            <ExternalLink size={17} /><span>Abrir PDF</span>
          </a>
          <a href={pdf} download className="lb-tool" title="Descargar">
            <Download size={17} /><span>Descargar</span>
          </a>
          <button type="button" className="lb-tool lb-close" onClick={onClose} aria-label="Cerrar">
            <X size={19} />
          </button>
        </div>
      </div>

      <div className="lb-stage" onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {list.length > 1 && (
          <button type="button" className="lb-arrow prev" onClick={stop(() => onNav(-1))} aria-label="Anterior">
            <ChevronLeft size={22} />
          </button>
        )}
        {!loaded && <span className="lb-loader" />}
        <img
          key={c.file}
          src={`${BASE}/${c.file}.jpg`}
          alt={`Certificado: ${c.title}`}
          className={`lb-img ${loaded ? 'is-loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onClick={(e) => e.stopPropagation()}
        />
        {list.length > 1 && (
          <button type="button" className="lb-arrow next" onClick={stop(() => onNav(1))} aria-label="Siguiente">
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      <div className="lb-bottom">
        <div className="lb-caption" key={c.file}>
          <h3>{c.title}</h3>
          <p>{meta.join('  ·  ')}</p>
          {c.code && (
            <div className="lb-verify">
              <span className="lb-verify-icon"><ShieldCheck size={16} /></span>
              <div className="lb-verify-info">
                <small>Código de verificación</small>
                <code>{c.code}</code>
              </div>
              <button
                type="button"
                className={`lb-verify-copy ${copied ? 'is-copied' : ''}`}
                onClick={copyCode}
                title={copied ? 'Copiado' : 'Copiar código'}
                aria-label="Copiar código de verificación"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <span className="lb-verify-sep" />
              <a href={SENA_VERIFY} target="_blank" rel="noopener noreferrer">
                Verificar en SENA <ExternalLink size={12} />
              </a>
            </div>
          )}
        </div>

        {list.length > 1 && (
          <div className="lb-thumbs" ref={thumbsRef}>
            {list.map((x, i) => (
              <button
                key={x.file}
                type="button"
                className={i === index ? 'on' : ''}
                onClick={() => onGo(i)}
                aria-label={x.title}
              >
                <img src={`${BASE}/${x.file}.jpg`} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------- Sección -------------------------------- */
const Certificados = () => {
  const [filtro, setFiltro] = useState('Todos');
  const [visor, setVisor] = useState(null); // { list, index }

  const lista = filtro === 'Todos' ? certificados : certificados.filter((c) => c.category === filtro);

  const cerrar = useCallback(() => setVisor(null), []);
  const navegar = useCallback((d) => {
    setVisor((v) => v && { ...v, index: (v.index + d + v.list.length) % v.list.length });
  }, []);
  const irA = useCallback((i) => setVisor((v) => v && { ...v, index: i }), []);

  return (
    <section id="certificados" className="section" style={{ padding: '7rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <Reveal>
          <span className="kicker" style={{ justifyContent: 'center' }}>Formación</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.7rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-1px' }}>
            Formación y <span className="gradient-text">certificados</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            {certificados.length} certificaciones y más de {totalHoras} horas de formación complementaria.
            Haz clic en cualquiera para ver el certificado.
          </p>
        </Reveal>
      </div>

      {/* Formación académica */}
      <div className="edu-grid">
        {formacion.map((f, i) => {
          const clickable = Boolean(f.file);
          const Tag = clickable ? 'button' : 'div';
          return (
            <Reveal key={f.title} delay={i * 100}>
              <Tag
                type={clickable ? 'button' : undefined}
                className={`glass-card edu-card ${clickable ? 'is-clickable' : ''}`}
                onClick={clickable ? () => setVisor({ list: [{ ...f, category: 'Formación académica' }], index: 0 }) : undefined}
              >
                <span className="edu-ico"><GraduationCap size={22} /></span>
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div className="edu-date">
                    {f.current && <span className="live-dot" style={{ marginRight: 8 }} />}
                    {f.date}
                  </div>
                  <div className="edu-title">{f.title}</div>
                  <div className="edu-issuer">{f.issuer}</div>
                </div>
                {clickable && <Eye size={17} className="edu-eye" />}
              </Tag>
            </Reveal>
          );
        })}
      </div>

      {/* Filtros */}
      <Reveal>
        <div className="cert-filtros" role="tablist">
          {categorias.map((cat) => {
            const n = cat === 'Todos' ? certificados.length : certificados.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filtro === cat}
                className={`cert-filtro ${filtro === cat ? 'active' : ''}`}
                onClick={() => setFiltro(cat)}
              >
                {cat} <span>{n}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Certificados */}
      <div className="cert-grid">
        {lista.map((c, i) => (
          <Reveal key={c.file} delay={(i % 3) * 90}>
            <button
              type="button"
              className="glass-card cert-card"
              onClick={() => setVisor({ list: lista, index: i })}
              aria-label={`Ver certificado: ${c.title}`}
            >
              <div className="cert-thumb">
                <img src={`${BASE}/${c.file}.jpg`} alt="" loading="lazy" />
                <span className="cert-thumb-hover"><Eye size={14} /> Ver</span>
              </div>
              <div className="cert-body">
                <div className="cert-top">
                  <span className="cert-chip">{c.category}</span>
                  <span className="cert-date">{c.date}</span>
                </div>
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-issuer">{c.issuer}</p>
                <div className="cert-foot">
                  {c.hours ? <span><Clock size={13} /> {c.hours} h</span> : <span><Award size={13} /> Presencial</span>}
                  {c.grade && <span><Award size={13} /> {c.grade}</span>}
                  {c.code && <span className="cert-verified"><ShieldCheck size={13} /> Verificable</span>}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {visor && <Visor list={visor.list} index={visor.index} onClose={cerrar} onNav={navegar} onGo={irA} />}

      <style>{`
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .edu-card {
          font: inherit;
          color: inherit;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.3rem 1.4rem;
        }
        .edu-card.is-clickable { cursor: pointer; }
        .edu-card.is-clickable:hover { transform: translateY(-4px); }
        .edu-ico {
          display: grid; place-items: center;
          width: 46px; height: 46px; flex-shrink: 0;
          border-radius: 12px;
          background: var(--accent-soft);
          color: var(--accent);
        }
        .edu-date {
          display: flex; align-items: center;
          font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--accent-2); font-weight: 600; margin-bottom: 0.3rem;
        }
        .edu-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1rem; line-height: 1.3; }
        .edu-issuer { color: var(--text-secondary); font-size: 0.82rem; margin-top: 0.2rem; }
        .edu-eye { color: var(--text-secondary); flex-shrink: 0; transition: color 0.2s ease; }
        .edu-card:hover .edu-eye { color: var(--accent); }

        .cert-filtros {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .cert-filtro {
          font: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.03);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.22s ease;
        }
        .cert-filtro span {
          margin-left: 0.35rem;
          font-size: 0.7rem;
          padding: 0.05rem 0.45rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
        }
        .cert-filtro:hover { color: var(--text-primary); border-color: rgba(255,122,26,0.5); }
        .cert-filtro.active {
          color: #0a0817;
          background: var(--gradient);
          border-color: transparent;
        }
        .cert-filtro.active span { background: rgba(0,0,0,0.15); }

        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 1.2rem;
        }
        .cert-grid > .reveal { height: 100%; }
        .cert-card {
          font: inherit;
          color: inherit;
          text-align: left;
          width: 100%;
          height: 100%;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .cert-card:hover { transform: translateY(-6px); }
        .cert-card:focus-visible, .edu-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
        .cert-thumb {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #f4f4f4;
          border-bottom: 1px solid var(--border);
        }
        .cert-thumb img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .cert-card:hover .cert-thumb img { transform: scale(1.06); }
        .cert-thumb::after {
          content: "";
          position: absolute; inset: auto 0 0 0; height: 45%;
          background: linear-gradient(to top, rgba(10,10,11,0.45), transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .cert-thumb-hover {
          position: absolute; right: 0.75rem; bottom: 0.75rem; z-index: 1;
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.8rem;
          border-radius: 999px;
          background: rgba(18,18,20,0.85);
          border: 1px solid rgba(255,122,26,0.45);
          color: #fff; font-weight: 600; font-size: 0.75rem;
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .cert-thumb-hover svg { color: var(--accent); }
        .cert-card:hover .cert-thumb::after,
        .cert-card:focus-visible .cert-thumb::after { opacity: 1; }
        .cert-card:hover .cert-thumb-hover,
        .cert-card:focus-visible .cert-thumb-hover { opacity: 1; transform: translateY(0); }

        .cert-body { padding: 1.2rem 1.3rem 1.3rem; display: flex; flex-direction: column; gap: 0.45rem; flex: 1; }
        .cert-top { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; }
        .cert-chip {
          display: inline-block;
          font-size: 0.66rem; font-weight: 600; letter-spacing: 0.5px;
          color: var(--accent);
          border: 1px solid rgba(255,122,26,0.45);
          border-radius: 999px;
          padding: 0.18rem 0.6rem;
        }
        .cert-date { font-size: 0.75rem; color: var(--text-secondary); }
        .cert-title { font-size: 1rem; font-weight: 700; line-height: 1.35; }
        .cert-issuer { font-size: 0.8rem; color: var(--text-secondary); flex: 1; }
        .cert-foot {
          display: flex; flex-wrap: wrap; gap: 0.9rem;
          margin-top: 0.4rem; padding-top: 0.8rem;
          border-top: 1px solid var(--border);
          font-size: 0.74rem; color: var(--text-secondary);
        }
        .cert-foot span { display: inline-flex; align-items: center; gap: 0.3rem; }
        .cert-verified { color: #4ade80; }

        /* --- Visor (lightbox) --- */
        .lb {
          position: fixed; inset: 0; z-index: 300;
          display: flex; flex-direction: column;
          background: rgba(6,6,8,0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: lbFade 0.3s ease;
        }
        @keyframes lbFade { from { opacity: 0; } to { opacity: 1; } }

        .lb-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.4rem;
        }
        .lb-count {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.95rem; font-weight: 600; letter-spacing: 1px;
          color: var(--text-primary);
        }
        .lb-count i { font-style: normal; color: var(--text-secondary); }
        .lb-tools { display: flex; gap: 0.4rem; }
        .lb-tool {
          display: inline-flex; align-items: center; gap: 0.45rem;
          height: 40px; padding: 0 0.95rem;
          border-radius: 999px; border: none;
          background: transparent;
          color: var(--text-secondary);
          font: inherit; font-size: 0.82rem; font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .lb-tool:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }
        .lb-close { width: 40px; padding: 0; justify-content: center; background: rgba(255,255,255,0.06); color: var(--text-primary); }
        .lb-close:hover { background: var(--accent); color: #0a0817; }

        .lb-stage {
          position: relative;
          flex: 1; min-height: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 0.5rem 5.5rem;
        }
        .lb-img {
          max-width: 100%; max-height: 100%;
          object-fit: contain;
          border-radius: 6px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06);
          opacity: 0;
          transform: scale(0.97);
          transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .lb-img.is-loaded { opacity: 1; transform: none; }
        .lb-loader {
          position: absolute;
          width: 32px; height: 32px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: var(--accent);
          animation: spin 0.8s linear infinite;
        }
        .lb-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          display: grid; place-items: center;
          width: 48px; height: 48px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .lb-arrow:hover { background: var(--accent); border-color: var(--accent); color: #0a0817; }
        .lb-arrow.prev { left: 1.4rem; }
        .lb-arrow.next { right: 1.4rem; }
        .lb-arrow.prev:hover { transform: translateY(-50%) translateX(-3px); }
        .lb-arrow.next:hover { transform: translateY(-50%) translateX(3px); }

        .lb-bottom {
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
          padding: 1.2rem 1.4rem 1.3rem;
        }
        .lb-caption { text-align: center; max-width: 760px; animation: lbUp 0.45s cubic-bezier(0.16,1,0.3,1); }
        @keyframes lbUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .lb-caption h3 { font-size: clamp(1.05rem, 2.2vw, 1.3rem); font-weight: 700; margin-bottom: 0.35rem; }
        .lb-caption p { color: var(--text-secondary); font-size: 0.85rem; white-space: pre-wrap; }
        .lb-verify {
          display: inline-flex; align-items: center; gap: 0.75rem;
          margin-top: 0.9rem;
          padding: 0.5rem 0.6rem 0.5rem 0.55rem;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          text-align: left;
        }
        .lb-verify-icon {
          display: grid; place-items: center;
          width: 32px; height: 32px; flex-shrink: 0;
          border-radius: 8px;
          color: #4ade80;
          background: rgba(74,222,128,0.1);
        }
        .lb-verify-info { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; }
        .lb-verify-info small {
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.6px; text-transform: uppercase;
          color: var(--text-secondary);
        }
        .lb-verify-info code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 0.78rem; letter-spacing: 0.3px;
          color: var(--text-primary);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .lb-verify-copy {
          display: grid; place-items: center;
          width: 30px; height: 30px; flex-shrink: 0;
          border-radius: 8px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .lb-verify-copy:hover { color: var(--text-primary); background: rgba(255,255,255,0.06); border-color: var(--border); }
        .lb-verify-copy.is-copied { color: #4ade80; }
        .lb-verify-sep { width: 1px; align-self: stretch; margin: 0.2rem 0; background: var(--border); }
        .lb-verify a {
          display: inline-flex; align-items: center; gap: 0.35rem;
          padding: 0.4rem 0.55rem;
          border-radius: 8px;
          font-size: 0.76rem; font-weight: 600;
          color: var(--accent);
          white-space: nowrap;
          transition: background 0.2s ease;
        }
        .lb-verify a:hover { background: rgba(255,122,26,0.1); }

        .lb-thumbs {
          display: flex; gap: 0.5rem;
          max-width: 100%;
          overflow-x: auto;
          padding: 0.3rem;
          scrollbar-width: none;
        }
        .lb-thumbs::-webkit-scrollbar { display: none; }
        .lb-thumbs button {
          flex-shrink: 0;
          width: 68px; height: 46px;
          padding: 0; border: none;
          border-radius: 6px;
          overflow: hidden;
          background: #f4f4f4;
          cursor: pointer;
          opacity: 0.35;
          outline: 2px solid transparent;
          outline-offset: 2px;
          transition: opacity 0.25s ease, outline-color 0.25s ease, transform 0.25s ease;
        }
        .lb-thumbs button:hover { opacity: 0.75; }
        .lb-thumbs button.on { opacity: 1; outline-color: var(--accent); transform: translateY(-2px); }
        .lb-thumbs img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }

        @media (max-width: 760px) {
          .lb-top { padding: 0.8rem 0.9rem; }
          .lb-tool span { display: none; }
          .lb-tool { width: 40px; padding: 0; justify-content: center; }
          .lb-stage { padding: 0.5rem 0.9rem; }
          .lb-arrow { display: none; }
          .lb-bottom { padding: 1rem 0.9rem 1.1rem; }
          .lb-verify { gap: 0.5rem; max-width: 100%; }
          .lb-verify-info code { max-width: 140px; }
        }
        @media (max-width: 640px) {
          .edu-grid { grid-template-columns: 1fr; }
        }

        /* ---------- Celular: certificados en 2 columnas ---------- */
        @media (max-width: 600px) {
          #certificados { padding: 4.5rem 1rem !important; }
          .cert-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.7rem; }
          .cert-card { border-radius: 14px; }
          .cert-card:hover { transform: none; }
          .cert-thumb { aspect-ratio: 4 / 3; }
          .cert-thumb-hover { display: none; }
          .cert-body { padding: 0.75rem 0.75rem 0.8rem; gap: 0.35rem; }
          .cert-top { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
          .cert-chip { font-size: 0.56rem; padding: 0.12rem 0.45rem; letter-spacing: 0.3px; }
          .cert-date { font-size: 0.62rem; }
          .cert-title {
            font-size: 0.78rem; line-height: 1.3;
            display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
          }
          .cert-issuer { font-size: 0.64rem; }
          .cert-foot { gap: 0.5rem; margin-top: 0.2rem; padding-top: 0.5rem; font-size: 0.62rem; }
          .cert-foot svg { width: 11px; height: 11px; }
          .cert-filtros { flex-wrap: nowrap; overflow-x: auto; justify-content: flex-start; scrollbar-width: none; padding-bottom: 0.2rem; }
          .cert-filtros::-webkit-scrollbar { display: none; }
          .cert-filtro { flex-shrink: 0; }
        }
      `}</style>
    </section>
  );
};

export default Certificados;
