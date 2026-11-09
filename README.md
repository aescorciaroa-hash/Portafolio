# Portafolio de Andres Camilo Escorcia Roa

Portafolio personal hecho en React (Create React App). Estilo oscuro, con
efecto de partículas, typewriter en el hero y formulario de contacto.

## 1. Instalación

```bash
npm install
npm start
```

Esto abre el proyecto en `http://localhost:3000`.

## 2. Estructura

```
src/
  componentes/
    Header.jsx        -> barra de navegación
    Presentacion.jsx   -> hero (nombre, roles, foto)
    SobreMi.jsx         -> sección "sobre mí"
    Habilidades.jsx     -> grid de tecnologías
    Proyectos.jsx       -> tarjetas de proyectos
    Contacto.jsx        -> formulario de contacto
    Footer.jsx
    Particles.jsx        -> fondo animado de partículas
  hooks/
    useTypewriter.js
  img/                  -> pon aquí tus imágenes (foto, proyectos)
```

## 3. Pendientes marcados con TODO

- **Foto de perfil**: en `Presentacion.jsx` hay un placeholder circular.
  Cuando tengas tu foto, guárdala en `src/img/`, impórtala arriba del
  archivo (`import miFoto from '../img/mifoto.jpg'`) y reemplaza el `div`
  del placeholder por `<img src={miFoto} ... />`.
- **Proyectos**: en `Proyectos.jsx` hay 3 proyectos de ejemplo. Reemplázalos
  por los tuyos cuando los termines (título, descripción, tags, links).
- **Formulario de contacto**: crea una cuenta gratis en
  [formspree.io](https://formspree.io), copia tu endpoint y reemplaza
  `FORMSPREE_ENDPOINT` en `Contacto.jsx`.
- **LinkedIn**: el link de LinkedIn en `Presentacion.jsx` y `Contacto.jsx`
  está vacío/genérico, cámbialo por el tuyo si tienes.

## 4. Cómo seguir personalizándolo con Claude Code en VS Code

1. Instala [VS Code](https://code.visualstudio.com/) si no lo tienes.
2. Instala Claude Code:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
   (o instala la extensión "Claude Code" desde el marketplace de VS Code).
3. Abre esta carpeta del proyecto en VS Code.
4. Abre la terminal integrada y ejecuta `claude` para iniciar una sesión
   de Claude Code (o abre el panel de la extensión).
5. Pídele cosas concretas, por ejemplo:
   - "Reemplaza el placeholder de foto en Presentacion.jsx por la imagen
     src/img/mifoto.jpg que acabo de agregar"
   - "Actualiza Proyectos.jsx con esta info: [pega tus proyectos reales]"
   - "Agrega una sección de experiencia laboral entre SobreMi y Habilidades"
   - "Cambia el color de acento (--accent) en index.css por #2ecc71"
   - "Prepara el proyecto para desplegarlo en Vercel"
6. Después de cada cambio, corre `npm start` y revisa en el navegador.
7. Cuando esté listo: `npm run build` genera la versión de producción en
   la carpeta `build/`, lista para subir a Vercel, Netlify o GitHub Pages.

## 5. Deploy rápido (Vercel)

```bash
npm install -g vercel
vercel
```

Sigue las instrucciones en pantalla (te pedirá conectar tu cuenta de
GitHub/Vercel). También puedes pedirle a Claude Code que te guíe paso a
paso en el momento del deploy.
