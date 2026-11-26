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
6. Después de cada cambio, corre `npm start` y revisa en el navegador.
7. Cuando esté listo, haz commit y `git push`: se publica solo (ver sección 5).

## 5. Deploy (Hostinger · ingenieroandres.dev)

Cada `git push` a `main` desde este PC se publica solo: el hook `.githooks/pre-push`
corre `npm run deploy`, que compila el commit, le agrega `hostinger/` (`.htaccess` y el
chatbot en PHP) y lo sube a la rama `deploy`. Hostinger (hPanel → GIT, auto-deploy)
toma esa rama y la publica en `public_html` en unos segundos.

- Activar el hook en un PC nuevo: `git config core.hooksPath .githooks`
- Publicar a mano: `npm run deploy`
- Ver qué versión está en vivo: https://ingenieroandres.dev/version.txt
- La API key de Anthropic va en `clave.php` en la carpeta que **contiene** a
  `public_html` (no dentro: el deploy borra `public_html`). Ver
  `hostinger/api/clave.example.php`.
