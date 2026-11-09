import React, { useEffect, useState } from 'react';
import Header from './componentes/Header';
import Presentacion from './componentes/Presentacion';
import SobreMi from './componentes/SobreMi';
import Proyectos from './componentes/Proyectos';
import Certificados from './componentes/Certificados';
import Contacto from './componentes/Contacto';
import Footer from './componentes/Footer';
import Chatbot from './componentes/Chatbot';

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(100, Math.max(0, scrolled * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="App">
      <div className="aurora-bg" />
      <div className="aurora-blob-3" />
      <div className="grain" />
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <Header />
      <Presentacion />
      <SobreMi />
      <Proyectos />
      <Certificados />
      <Contacto />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
