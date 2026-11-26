// Despliegue a Hostinger: compila un commit, agrega hostinger/ y sube el resultado a la
// rama "deploy". Hostinger (hPanel > GIT, auto-deploy) toma esa rama y publica
// ingenieroandres.dev.
//
// Uso:  npm run deploy            -> despliega HEAD
//       node scripts/deploy.js SHA -> despliega ese commit (lo usa .githooks/pre-push)
//
// Compila en una copia temporal del commit (git worktree), asi los cambios sin commit
// nunca se publican.
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const ghpages = require('gh-pages');

const raiz = path.join(__dirname, '..');
const git = (args) => execSync(`git ${args}`, { cwd: raiz }).toString().trim();

const sha = git(`rev-parse --verify "${process.argv[2] || 'HEAD'}^{commit}"`);
const corto = sha.slice(0, 7);

if (!process.argv[2] && git('status --porcelain')) {
  console.log('Aviso: hay cambios sin commit; NO se incluyen en el deploy.');
}

const copia = fs.mkdtempSync(path.join(os.tmpdir(), 'portafolio-deploy-'));
const limpiar = () => {
  try { git(`worktree remove --force "${copia}"`); } catch { /* ya no existe */ }
  fs.rmSync(copia, { recursive: true, force: true });
};

try {
  console.log(`\n> Preparando copia del commit ${corto}...`);
  git(`worktree add --detach "${copia}" ${sha}`);
  // Reusar las dependencias ya instaladas (junction: no necesita permisos en Windows)
  fs.symlinkSync(path.join(raiz, 'node_modules'), path.join(copia, 'node_modules'), 'junction');

  console.log('\n> Compilando React...');
  execSync('npm run build', { cwd: copia, stdio: 'inherit' });

  const build = path.join(copia, 'build');
  console.log('\n> Copiando archivos de hostinger/ (.htaccess + chatbot PHP)...');
  fs.cpSync(path.join(copia, 'hostinger'), build, { recursive: true });
  fs.rmSync(path.join(build, 'api', 'clave.php'), { force: true }); // por si acaso
  // Para saber que version esta en vivo: https://ingenieroandres.dev/version.txt
  fs.writeFileSync(path.join(build, 'version.txt'), `${corto} ${new Date().toISOString()}\n`);

  console.log('\n> Subiendo a la rama deploy...');
  ghpages.publish(
    build,
    {
      branch: 'deploy',
      dotfiles: true,
      // borrar TODO lo anterior, incluidos dotfiles (.htaccess, .github, ...)
      remove: ['**/*', '.*', '**/.*', '.*/**'],
      message: `Deploy ${sha}`,
      history: true,
    },
    (err) => {
      limpiar();
      if (err) {
        console.error('\nError al subir la rama deploy:', err.message || err);
        process.exit(1);
      }
      console.log(`\nListo: ${corto} enviado. Hostinger lo publica en ~15 s (ver /version.txt).`);
    }
  );
} catch (err) {
  limpiar();
  console.error('\nEl deploy fallo:', err.message || err);
  process.exit(1);
}
