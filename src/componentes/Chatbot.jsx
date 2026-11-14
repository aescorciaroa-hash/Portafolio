import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, ArrowUp, Bot, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

// Endpoint serverless (api/chat.js) que responde con Claude. La API key vive en el servidor.
// Si falla o no existe (p. ej. con `npm start` sin `vercel dev`), el bot usa la
// base de conocimiento local de abajo como respaldo.
const CHAT_ENDPOINT = process.env.REACT_APP_CHAT_ENDPOINT ?? '/api/chat';

const EMAIL = 'andrescamilodev@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/ingenieroandres';
const TELEFONO = '+57 311 248 7793';
const GITHUB = 'https://github.com/aescorciaroa-hash';

const BIENVENIDA = '¡Hola! 👋 Soy el asistente del portafolio de **Andres**. Pregúntame lo que quieras sobre su perfil, proyectos o experiencia.';

// Tarjetas que se muestran al abrir el chat
const iniciales = [
  { label: '¿Quién es Andres?', emoji: '👤' },
  { label: '¿Qué tecnologías usa?', emoji: '⚡' },
  { label: 'Proyectos', emoji: '🚀' },
  { label: '¿Cómo lo contacto?', emoji: '✉️' },
];

const respuestas = [
  {
    id: 'hola',
    keys: ['hola', 'buenas', 'hey', 'saludos', 'buenos dias', 'buenas tardes', 'buenas noches'],
    text: '¡Hola! 👋 Puedo contarte sobre el perfil de Andres, sus tecnologías, proyectos, certificados o cómo contactarlo.',
    follow: ['¿Quién es Andres?', 'Proyectos'],
  },
  {
    id: 'perfil',
    keys: ['quien', 'eres', 'sobre ti', 'sobre el', 'perfil', 'presentate'],
    text: '**Andres Camilo Escorcia Roa** es **desarrollador de software**: construye aplicaciones web completas con React, PHP y MySQL, y les integra **inteligencia artificial** para automatizar procesos.\n\nSu proyecto más reciente, CopiwayPRO, ya está en producción.',
    action: { label: 'Ver sobre mí', target: 'sobremi' },
    follow: ['¿Qué estudia?', '¿Qué tecnologías usa?'],
  },
  {
    id: 'estudios',
    keys: ['estudio', 'estudia', 'formacion', 'programa', 'sena', 'adso', 'carrera', 'academic', 'universidad'],
    text: 'Cursa el tecnólogo en **Análisis y Desarrollo de Software (ADSO)** en el SENA y es Bachiller Académico (2024) del Colegio Campestre Padre Arturo, en Neiva.\n\nBusca un **contrato de aprendizaje** para su etapa productiva.',
    follow: ['Certificados', '¿Cómo lo contacto?'],
  },
  {
    id: 'certificados',
    keys: ['certifica', 'curso', 'diploma', 'titulo', 'capacitacion'],
    text: 'Tiene **9 certificaciones**, entre ellas:\n• Implementación de Soluciones de IA\n• Mantenimiento de Computadores\n• Emprendimiento Digital\n• Informática (Word, Excel e Internet)\n• English Does Work Level 1 y 2\n• SolidWorks (Semillero SYSCOM, CUH)\n\nTodas son verificables en el SENA.',
    action: { label: 'Ver certificados', target: 'certificados' },
    follow: ['¿Habla inglés?', 'Proyectos'],
  },
  {
    id: 'idiomas',
    keys: ['idioma', 'ingles', 'english', 'espanol', 'habla'],
    text: 'Español nativo e **inglés básico**. Aprobó English Does Work Level 1 y Level 2 en el SENA, ambos con nota de **4.5**.',
    follow: ['Certificados', '¿Qué tecnologías usa?'],
  },
  {
    id: 'stack',
    keys: ['tecnolog', 'stack', 'lenguaje', 'habilidad', 'skills', 'sabe', 'usa', 'herramienta', 'programa en'],
    text: '**Backend:** Java, Python, PHP, Laravel, Node.js\n**Frontend:** JavaScript, TypeScript, React, HTML5, CSS3, Tailwind CSS\n**Datos y más:** MySQL, Git, IA / LLMs',
    action: { label: 'Ver habilidades', target: 'sobremi' },
    follow: ['¿Qué está aprendiendo?', 'Proyectos'],
  },
  {
    id: 'ia',
    keys: ['ia', 'inteligencia', 'machine', 'llm', 'prompt', 'aprendiendo', 'ahora'],
    text: 'Ahora mismo está estudiando **Inteligencia Artificial**:\n• Integración de modelos de IA en apps\n• Machine Learning con Python\n• Ingeniería de prompts\n• APIs de IA',
    follow: ['Proyectos', 'Certificados'],
  },
  {
    id: 'proyectos',
    keys: ['proyecto', 'copiway', 'portafolio', 'trabajo', 'hecho', 'construido', 'experiencia'],
    text: 'Su proyecto principal es **CopiwayPRO**: un sistema de gestión para una dark kitchen de hamburguesas a domicilio, con 5 roles (cliente, cocina, domiciliario, administrador y programador).\n\nIncluye pedidos en línea con armador de hamburguesas, pagos digitales, tablero de cocina, mapa de entregas con PIN, inventario automático, puntos de fidelidad y cierre de caja con reportes PDF.\n\nHecho con React, TypeScript, Tailwind CSS, PHP 8 (MVC sin framework) y MySQL. Ya está en línea en https://www.copiwaypro.com',
    action: { label: 'Ver proyectos', target: 'proyectos' },
    follow: ['¿Qué tecnologías usa?', '¿Cómo lo contacto?'],
  },
  {
    id: 'fortalezas',
    keys: ['fortaleza', 'blanda', 'cualidad', 'virtud', 'equipo', 'por que contratar'],
    text: 'Sus fortalezas: **resolución de problemas**, **aprendizaje autónomo**, **trabajo en equipo** y **atención al detalle**.',
    follow: ['Proyectos', '¿Cómo lo contacto?'],
  },
  {
    id: 'contacto',
    keys: ['contact', 'correo', 'email', 'mail', 'escribir', 'escribe', 'linkedin', 'github', 'redes', 'hablar', 'contratar', 'vacante', 'disponible', 'telefono', 'teléfono', 'celular', 'numero', 'número', 'whatsapp', 'llamar', 'llamada'],
    text: `Puedes escribirle a ${EMAIL}\n\nWhatsApp o llamada: ${TELEFONO}\nLinkedIn: ${LINKEDIN}\nGitHub: ${GITHUB}\n\nSuele responder en menos de **24 horas**.`,
    action: { label: 'Ir al formulario', target: 'contacto' },
    follow: ['¿Quién es Andres?', 'Proyectos'],
  },
  {
    id: 'gracias',
    keys: ['gracias', 'genial', 'perfecto', 'excelente', 'chao', 'adios', 'hasta luego'],
    text: '¡Con gusto! Si quieres saber algo más, aquí estoy. 🙌',
    follow: ['Proyectos', '¿Cómo lo contacto?'],
  },
];

const fallback = {
  text: `No estoy seguro de eso 🤔. Puedo contarte sobre su perfil, tecnologías, proyectos, certificados o cómo contactarlo.\n\nPara otra cosa, escríbele a ${EMAIL}`,
  follow: ['¿Quién es Andres?', '¿Qué tecnologías usa?', 'Proyectos'],
};

const normalizar = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const responderLocal = (texto) => {
  const t = ` ${normalizar(texto).replace(/[¿?¡!.,]/g, ' ')} `;
  let mejor = null;
  let puntaje = 0;
  for (const r of respuestas) {
    // las claves cortas (ej. "ia") deben coincidir como palabra completa
    const p = r.keys.reduce((acc, k) => {
      const hit = k.length <= 3 ? t.includes(` ${k} `) : t.includes(k);
      return acc + (hit ? 1 : 0);
    }, 0);
    if (p > puntaje) {
      puntaje = p;
      mejor = r;
    }
  }
  return mejor || fallback;
};

// ---- Ahorro de tokens ----
// 1) Lo que la base local reconoce se responde sin llamar a la IA (0 tokens).
// 2) Las preguntas repetidas se responden desde memoria.
// 3) Máximo de llamadas a la IA por visita; después, solo respuestas locales.
const MAX_LLAMADAS_IA = 5;
let llamadasIA = 0;
const cacheIA = new Map();

const obtenerRespuesta = async (texto, historial) => {
  const local = responderLocal(texto);
  if (!CHAT_ENDPOINT || local !== fallback) return local;
  if (texto.trim().length < 4) return local;

  const clave = normalizar(texto).replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  if (cacheIA.has(clave)) return cacheIA.get(clave);
  if (llamadasIA >= MAX_LLAMADAS_IA) return local;
  llamadasIA += 1;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: texto.slice(0, 300),
        history: historial.slice(-2).map(({ from, text }) => ({ from, text: text.slice(0, 280) })),
      }),
      signal: ctrl.signal,
    });
    if (res.status === 429 || res.status === 400) {
      const data = await res.json();
      if (data.reply) return { text: data.reply };
    }
    if (!res.ok) throw new Error('bad status');
    const data = await res.json();
    if (!data.reply) throw new Error('empty reply');
    // La IA escribe la respuesta; las sugerencias de seguimiento salen de la base local
    const respuesta = { text: data.reply, action: data.action, follow: local.follow };
    cacheIA.set(clave, respuesta);
    return respuesta;
  } catch (e) {
    return responderLocal(texto);
  } finally {
    clearTimeout(timer);
  }
};

const hora = () =>
  new Date().toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' });

// Convierte **negrita**, correos y URLs en elementos React
const TOKEN = /(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s]+)/g;
const formatear = (texto) =>
  texto.split(TOKEN).map((parte, i) => {
    if (!parte) return null;
    if (parte.startsWith('**')) return <strong key={i}>{parte.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(parte)) {
      const corto = parte.replace(/^https?:\/\/(www\.)?/, '');
      return <a key={i} href={parte} target="_blank" rel="noopener noreferrer">{corto}</a>;
    }
    if (/^[\w.+-]+@/.test(parte)) return <a key={i} href={`mailto:${parte}`}>{parte}</a>;
    return parte;
  });

const irA = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const Chatbot = () => {
  const inicial = () => [{ from: 'bot', text: BIENVENIDA, time: hora() }];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(inicial);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const conversando = messages.length > 1;
  const ultimo = messages[messages.length - 1];

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return undefined;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const enviar = async (texto) => {
    const limpio = texto.trim();
    if (!limpio || typing) return;
    const historial = messages;
    setMessages((m) => [...m, { from: 'user', text: limpio, time: hora() }]);
    setInput('');
    setTyping(true);
    const [reply] = await Promise.all([
      obtenerRespuesta(limpio, historial),
      new Promise((r) => setTimeout(r, 650)),
    ]);
    setTyping(false);
    setMessages((m) => [...m, { from: 'bot', time: hora(), ...reply }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    enviar(input);
  };

  const reiniciar = () => {
    setMessages(inicial());
    setInput('');
    inputRef.current?.focus();
  };

  const seguir = !typing && ultimo.from === 'bot' && ultimo.follow ? ultimo.follow : [];

  return (
    <>
      {open && (
        <div className="cb-panel" role="dialog" aria-label="Asistente del portafolio">
          <header className="cb-head">
            <span className="cb-avatar">
              <Bot size={19} />
              <i className="cb-online" />
            </span>
            <div className="cb-head-text">
              <strong>Asistente de Andres</strong>
              <span>En línea · con IA de Claude</span>
            </div>
            {conversando && (
              <button type="button" className="cb-icon-btn" onClick={reiniciar} title="Nueva conversación" aria-label="Nueva conversación">
                <RotateCcw size={15} />
              </button>
            )}
            <button type="button" className="cb-icon-btn" onClick={() => setOpen(false)} title="Cerrar" aria-label="Cerrar chat">
              <X size={16} />
            </button>
          </header>

          <div className="cb-body" ref={bodyRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`cb-row ${m.from}`}>
                {m.from === 'bot' && <span className="cb-mini"><Bot size={13} /></span>}
                <div className="cb-col">
                  <div className={`cb-msg ${m.from}`}>
                    {formatear(m.text)}
                    {m.action && (
                      <button type="button" className="cb-action" onClick={() => irA(m.action.target)}>
                        {m.action.label} <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                  <time className="cb-time">{m.time}</time>
                </div>
              </div>
            ))}

            {!conversando && (
              <div className="cb-start">
                <p><Sparkles size={13} /> Prueba con una de estas</p>
                <div className="cb-start-grid">
                  {iniciales.map((s) => (
                    <button key={s.label} type="button" onClick={() => enviar(s.label)}>
                      <span>{s.emoji}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {typing && (
              <div className="cb-row bot">
                <span className="cb-mini"><Bot size={13} /></span>
                <div className="cb-msg bot cb-typing" aria-label="Escribiendo">
                  <i /><i /><i />
                </div>
              </div>
            )}

            {seguir.length > 0 && conversando && (
              <div className="cb-follow">
                {seguir.map((s) => (
                  <button key={s} type="button" onClick={() => enviar(s)}>{s}</button>
                ))}
              </div>
            )}
          </div>

          <form className="cb-form" onSubmit={onSubmit}>
            <div className="cb-input">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                maxLength={300}
                aria-label="Tu mensaje"
              />
              <button type="submit" disabled={!input.trim() || typing} aria-label="Enviar">
                <ArrowUp size={17} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`cb-fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
      >
        <span className="cb-fab-icon">{open ? <X size={22} /> : <MessageCircle size={22} />}</span>
        {!open && <span className="cb-fab-tip">¿Preguntas? Escríbeme</span>}
      </button>

      <style>{`
        /* ---------- Botón flotante ---------- */
        .cb-fab {
          position: fixed; right: 1.4rem; bottom: 1.4rem; z-index: 200;
          width: 56px; height: 56px;
          border-radius: 50%; border: none;
          display: grid; place-items: center;
          color: #fff;
          background: var(--gradient);
          box-shadow: 0 10px 30px rgba(255,106,0,0.35);
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
        }
        .cb-fab::before {
          content: ""; position: absolute; inset: 0; border-radius: 50%;
          background: var(--gradient);
          animation: cbPulse 2.6s ease-out infinite;
          z-index: -1;
        }
        .cb-fab.is-open::before { animation: none; }
        .cb-fab:hover { transform: translateY(-3px); box-shadow: 0 14px 34px rgba(255,106,0,0.45); }
        .cb-fab-icon { display: grid; animation: cbSpin 0.3s ease; }
        .cb-fab.is-open .cb-fab-icon { animation: cbSpin2 0.3s ease; }
        @keyframes cbSpin { from { transform: rotate(-90deg) scale(0.6); opacity: 0; } }
        @keyframes cbSpin2 { from { transform: rotate(90deg) scale(0.6); opacity: 0; } }
        @keyframes cbPulse {
          0% { transform: scale(1); opacity: 0.45; }
          70%, 100% { transform: scale(1.55); opacity: 0; }
        }
        .cb-fab-tip {
          position: absolute; right: calc(100% + 0.7rem); top: 50%;
          transform: translateY(-50%) translateX(6px);
          white-space: nowrap;
          padding: 0.45rem 0.75rem;
          border-radius: 10px;
          background: #1b1b1e;
          border: 1px solid var(--border);
          color: var(--text-primary);
          font-size: 0.76rem; font-weight: 500;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          opacity: 0; pointer-events: none;
          transition: opacity 0.2s ease, transform 0.25s ease;
        }
        .cb-fab:hover .cb-fab-tip { opacity: 1; transform: translateY(-50%) translateX(0); }

        /* ---------- Panel ---------- */
        .cb-panel {
          position: fixed; right: 1.4rem; bottom: 5.6rem; z-index: 200;
          width: min(380px, calc(100vw - 2rem));
          height: min(560px, calc(100vh - 8rem));
          display: flex; flex-direction: column;
          overflow: hidden;
          border-radius: 20px;
          background: #121214;
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow: 0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4);
          transform-origin: bottom right;
          animation: cbIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes cbIn {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to { opacity: 1; transform: none; }
        }

        .cb-head {
          position: relative;
          display: flex; align-items: center; gap: 0.7rem;
          padding: 0.95rem 0.9rem 0.95rem 1rem;
          background: linear-gradient(180deg, rgba(255,122,26,0.09), transparent);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cb-avatar {
          position: relative;
          display: grid; place-items: center;
          width: 38px; height: 38px; flex-shrink: 0;
          border-radius: 12px;
          background: var(--gradient);
          color: #fff;
          box-shadow: 0 6px 16px rgba(255,106,0,0.3);
        }
        .cb-online {
          position: absolute; right: -2px; bottom: -2px;
          width: 11px; height: 11px; border-radius: 50%;
          background: var(--accent-3);
          border: 2px solid #121214;
        }
        .cb-head-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.1rem; }
        .cb-head-text strong { font-size: 0.93rem; }
        .cb-head-text span { font-size: 0.7rem; color: var(--text-secondary); }
        .cb-icon-btn {
          display: grid; place-items: center;
          width: 32px; height: 32px; flex-shrink: 0;
          border-radius: 9px; border: none;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .cb-icon-btn:hover { background: rgba(255,255,255,0.07); color: var(--text-primary); }

        /* ---------- Mensajes ---------- */
        .cb-body {
          flex: 1; overflow-y: auto;
          padding: 1.1rem 1rem 0.6rem;
          display: flex; flex-direction: column; gap: 0.85rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.12) transparent;
        }
        .cb-body::-webkit-scrollbar { width: 6px; }
        .cb-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 6px; }
        .cb-body::-webkit-scrollbar-track { background: transparent; }

        .cb-row { display: flex; gap: 0.5rem; align-items: flex-end; animation: cbMsg 0.3s cubic-bezier(0.16,1,0.3,1); }
        .cb-row.user { justify-content: flex-end; }
        @keyframes cbMsg { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .cb-mini {
          display: grid; place-items: center;
          width: 24px; height: 24px; flex-shrink: 0;
          margin-bottom: 1.1rem;
          border-radius: 8px;
          background: var(--accent-soft);
          color: var(--accent);
        }
        .cb-col { display: flex; flex-direction: column; gap: 0.25rem; max-width: 82%; min-width: 0; }
        .cb-row.user .cb-col { align-items: flex-end; }
        .cb-msg {
          padding: 0.65rem 0.9rem;
          border-radius: 16px;
          font-size: 0.85rem; line-height: 1.55;
          white-space: pre-wrap; overflow-wrap: anywhere;
        }
        .cb-msg.bot {
          background: #1c1c1f;
          border: 1px solid rgba(255,255,255,0.06);
          color: #e8e8ea;
          border-bottom-left-radius: 5px;
        }
        .cb-msg.user {
          background: var(--gradient);
          color: #fff;
          border-bottom-right-radius: 5px;
          box-shadow: 0 4px 14px rgba(255,106,0,0.2);
        }
        .cb-msg strong { color: #fff; font-weight: 650; }
        .cb-msg a { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(255,122,26,0.35); }
        .cb-msg a:hover { border-bottom-color: var(--accent); }
        .cb-time { font-size: 0.62rem; color: rgba(138,138,146,0.75); padding: 0 0.3rem; }

        .cb-action {
          display: flex; align-items: center; justify-content: center; gap: 0.35rem;
          width: 100%;
          margin-top: 0.7rem;
          padding: 0.5rem 0.7rem;
          font: inherit; font-size: 0.76rem; font-weight: 600;
          color: var(--accent);
          background: rgba(255,122,26,0.08);
          border: 1px solid rgba(255,122,26,0.25);
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .cb-action:hover { background: rgba(255,122,26,0.15); border-color: rgba(255,122,26,0.5); }
        .cb-action svg { transition: transform 0.2s ease; }
        .cb-action:hover svg { transform: translateX(3px); }

        .cb-typing { display: flex; gap: 4px; padding: 0.85rem 1rem; }
        .cb-typing i {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--text-secondary);
          animation: cbDot 1.1s ease-in-out infinite;
        }
        .cb-typing i:nth-child(2) { animation-delay: 0.15s; }
        .cb-typing i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes cbDot {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }

        /* ---------- Sugerencias ---------- */
        .cb-start { margin-top: auto; animation: cbMsg 0.4s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
        .cb-start p {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 0.55rem;
        }
        .cb-start p svg { color: var(--accent); }
        .cb-start-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .cb-start-grid button {
          display: flex; flex-direction: column; align-items: flex-start; gap: 0.35rem;
          padding: 0.7rem 0.75rem;
          font: inherit; font-size: 0.78rem; font-weight: 500; text-align: left;
          color: var(--text-primary);
          background: #18181b;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .cb-start-grid button span { font-size: 1rem; }
        .cb-start-grid button:hover {
          border-color: rgba(255,122,26,0.45);
          background: #1d1a18;
          transform: translateY(-2px);
        }

        .cb-follow {
          display: flex; flex-wrap: wrap; gap: 0.4rem;
          padding-left: 2rem;
          animation: cbMsg 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .cb-follow button {
          font: inherit; font-size: 0.74rem;
          color: var(--accent);
          background: transparent;
          border: 1px solid rgba(255,122,26,0.3);
          border-radius: 999px;
          padding: 0.32rem 0.75rem;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .cb-follow button:hover { background: rgba(255,122,26,0.1); border-color: var(--accent); }

        /* ---------- Entrada ---------- */
        .cb-form { padding: 0.75rem 0.9rem 0.9rem; border-top: 1px solid rgba(255,255,255,0.06); }
        .cb-input {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.3rem 0.3rem 0.3rem 0.95rem;
          background: #1a1a1d;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cb-input:focus-within {
          border-color: rgba(255,122,26,0.6);
          box-shadow: 0 0 0 3px rgba(255,122,26,0.1);
        }
        .cb-input input {
          flex: 1; min-width: 0;
          font: inherit; font-size: 0.86rem;
          color: var(--text-primary);
          background: transparent;
          border: none; outline: none;
          padding: 0.45rem 0;
        }
        .cb-input input::placeholder { color: rgba(138,138,146,0.8); }
        .cb-input button {
          display: grid; place-items: center;
          width: 36px; height: 36px; flex-shrink: 0;
          border: none; border-radius: 10px;
          background: var(--gradient);
          color: #fff;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .cb-input button:hover:not(:disabled) { transform: scale(1.06); }
        .cb-input button:disabled { opacity: 0.3; cursor: not-allowed; filter: grayscale(0.4); }

        @media (max-width: 480px) {
          .cb-fab { right: 1rem; bottom: 1rem; }
          .cb-fab-tip { display: none; }
          /* panel compacto: deja ver parte de la página detrás */
          .cb-panel {
            right: 0.75rem; left: 0.75rem; bottom: 4.9rem;
            width: auto;
            height: min(440px, 62vh);
            height: min(440px, 62dvh);
            border-radius: 18px;
          }
          .cb-head { padding: 0.65rem 0.7rem 0.65rem 0.85rem; gap: 0.6rem; }
          .cb-avatar { width: 32px !important; height: 32px !important; border-radius: 10px; }
          .cb-avatar svg { width: 17px; height: 17px; }
          .cb-head-text strong { font-size: 0.88rem; }
          .cb-body { padding: 0.8rem !important; gap: 0.7rem !important; }
          .cb-msg { font-size: 0.82rem !important; padding: 0.65rem 0.85rem !important; }

          /* sugerencias: una fila deslizable de botones pequeños */
          .cb-start p { margin-bottom: 0.45rem !important; font-size: 0.62rem !important; }
          .cb-start-grid {
            display: flex; gap: 0.4rem;
            overflow-x: auto; scrollbar-width: none;
            margin: 0 -0.8rem; padding: 0 0.8rem 0.1rem;
          }
          .cb-start-grid::-webkit-scrollbar { display: none; }
          .cb-start-grid button {
            flex-direction: row !important; align-items: center !important;
            gap: 0.35rem !important;
            flex-shrink: 0; white-space: nowrap;
            padding: 0.5rem 0.8rem !important;
            border-radius: 999px !important;
            font-size: 0.76rem !important;
          }
          .cb-start-grid button span { font-size: 0.85rem !important; }
          .cb-form { padding: 0.55rem 0.7rem 0.7rem; }
          .cb-input input { font-size: 16px; } /* evita el zoom automático en iPhone */
        }
        @media (prefers-reduced-motion: reduce) {
          .cb-fab::before, .cb-row, .cb-panel, .cb-start, .cb-follow { animation: none; }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
