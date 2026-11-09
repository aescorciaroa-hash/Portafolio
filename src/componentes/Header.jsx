import React, { useState, useEffect } from 'react';
import { Code2, ArrowRight, Menu, X } from 'lucide-react';

const links = [
  { href: '#presentacion', label: 'Inicio' },
  { href: '#sobremi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#certificados', label: 'Certificados' },
  { href: '#contacto', label: 'Contacto' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('#presentacion');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Menú móvil: cerrar con Esc, al pasar a escritorio, y bloquear el scroll de fondo
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth > 900 && setMenuOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <header
      style={{
        position: 'fixed',
        top: '1.1rem',
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem',
        pointerEvents: 'none',
      }}
    >
      <div
        className="nav-pill"
        style={{
          pointerEvents: 'auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '1.6rem',
          padding: '0.5rem 0.5rem 0.5rem 1.1rem',
          borderRadius: '999px',
          border: '1px solid var(--border)',
          background: scrolled ? 'rgba(11,11,13,0.82)' : 'rgba(11,11,13,0.6)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: scrolled
            ? '0 14px 44px rgba(0,0,0,0.5)'
            : '0 10px 34px rgba(0,0,0,0.35)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* logo */}
        <a
          href="#presentacion"
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)' }}
        >
          <span
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 34,
              height: 34,
              borderRadius: '10px',
              background: 'var(--gradient)',
              color: '#0a0a0b',
              flexShrink: 0,
            }}
          >
            <Code2 size={18} strokeWidth={2.6} />
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '-0.5px',
              whiteSpace: 'nowrap',
            }}
          >
            Andres<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </a>

        {/* links */}
        <nav className="nav-links" style={{ display: 'flex', gap: '0.4rem' }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                position: 'relative',
                color: active === l.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '0.45rem 0.85rem',
                borderRadius: '999px',
                background: active === l.href ? 'rgba(255,255,255,0.06)' : 'transparent',
                transition: 'color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => {
                if (active !== l.href) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contacto"
          className="nav-cta btn btn-primary"
          style={{ fontSize: '0.82rem', padding: '0.6rem 1.15rem' }}
        >
          Contáctame <ArrowRight size={14} />
        </a>

        {/* hamburguesa */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* menú móvil (fuera de la píldora para que el fondo sólido y la animación funcionen) */}
      {menuOpen && (
        <>
          <div className="mnav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <nav id="menu-movil" className="mnav" aria-label="Menú principal">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`mnav-link ${active === l.href ? 'is-active' : ''}`}
                style={{ animationDelay: `${0.04 + i * 0.035}s` }}
              >
                <span className="mnav-num">0{i + 1}</span>
                <span className="mnav-label">{l.label}</span>
                <ArrowRight size={16} className="mnav-arrow" />
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary mnav-cta"
            >
              Contáctame <ArrowRight size={15} />
            </a>
          </nav>
        </>
      )}

      <style>{`
        .nav-burger {
          display: none;
          place-items: center;
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.04);
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .nav-burger:hover { border-color: rgba(255,122,26,0.5); }
        .nav-burger.is-open { background: var(--accent-soft); border-color: rgba(255,122,26,0.5); color: var(--accent); }
        .nav-burger svg { animation: navIcon 0.25s ease; }
        @keyframes navIcon { from { transform: rotate(-90deg) scale(0.6); opacity: 0; } }

        .mnav-backdrop {
          position: fixed; inset: 0; z-index: -1;
          pointer-events: auto;
          background: rgba(5,5,6,0.6);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          animation: mnavFade 0.25s ease;
        }
        .mnav {
          pointer-events: auto;
          position: absolute;
          top: calc(100% + 0.6rem);
          left: 1rem; right: 1rem;
          max-width: 520px; margin: 0 auto;
          display: flex; flex-direction: column; gap: 0.15rem;
          padding: 0.6rem;
          background: #111113;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
          transform-origin: top center;
          animation: mnavIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes mnavFade { from { opacity: 0; } }
        @keyframes mnavIn { from { opacity: 0; transform: translateY(-8px) scale(0.98); } }

        .mnav-link {
          display: flex; align-items: center; gap: 0.9rem;
          padding: 0.85rem 0.9rem;
          border-radius: 12px;
          color: var(--text-secondary);
          font-size: 1rem; font-weight: 600;
          transition: background 0.2s ease, color 0.2s ease;
          animation: mnavItem 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes mnavItem { from { opacity: 0; transform: translateY(-4px); } }
        .mnav-link:hover, .mnav-link:active { background: rgba(255,255,255,0.04); color: var(--text-primary); }
        .mnav-link.is-active { background: rgba(255,122,26,0.08); color: var(--text-primary); }
        .mnav-num {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 0.7rem; color: rgba(138,138,146,0.7);
          width: 1.3rem;
        }
        .mnav-link.is-active .mnav-num { color: var(--accent); }
        .mnav-label { flex: 1; }
        .mnav-arrow { opacity: 0; transform: translateX(-4px); transition: opacity 0.2s ease, transform 0.2s ease; color: var(--accent); }
        .mnav-link:hover .mnav-arrow, .mnav-link.is-active .mnav-arrow { opacity: 1; transform: none; }
        .mnav-cta {
          justify-content: center;
          margin-top: 0.45rem;
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
          border-radius: 12px;
          animation: mnavItem 0.35s 0.22s cubic-bezier(0.16,1,0.3,1) both;
        }

        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none !important; }
          .nav-burger { display: grid; }
          .nav-pill {
            width: 100%;
            max-width: 520px;
            justify-content: space-between;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .mnav, .mnav-link, .mnav-cta, .mnav-backdrop, .nav-burger svg { animation: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;
