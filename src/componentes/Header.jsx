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
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-burger"
          aria-label="Menú"
          style={{
            display: 'none',
            placeItems: 'center',
            width: 38,
            height: 38,
            borderRadius: '999px',
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* menú móvil */}
        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.6rem)',
              left: 0,
              right: 0,
              background: 'rgba(11,11,13,0.96)',
              backdropFilter: 'blur(18px)',
              border: '1px solid var(--border)',
              borderRadius: '18px',
              display: 'flex',
              flexDirection: 'column',
              padding: '0.8rem',
              gap: '0.2rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: active === l.href ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  padding: '0.7rem 0.9rem',
                  borderRadius: '10px',
                  background: active === l.href ? 'rgba(255,255,255,0.05)' : 'transparent',
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: '0.4rem', justifyContent: 'center', fontSize: '0.85rem' }}
            >
              Contáctame <ArrowRight size={14} />
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none !important; }
          .nav-burger { display: grid !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
