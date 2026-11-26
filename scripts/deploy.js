// Despliegue a Hostinger: compila, agrega hostinger/ y sube build/ a la rama "deploy".
// Hostinger (hPanel > GIT, auto-deploy) toma esa rama y publica ingenieroandres.dev.
// Uso: npm run deploy
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');

const raiz = path.join(__dirname, '..');
const build = path.join(raiz, 'build');
const run = (cmd) => execSync(cmd, { cwd: raiz, stdio: 'inherit' });

// No desplegar cosas que no estan en git (main y deploy quedan alineados)
const pendientes = execSync('git status --porcelain', { cwd: raiz }).toString().trim();
if (pendientes) {
  console.error('\nHay cambios sin commit. Haz commit (y push) antes de desplegar:\n' + pendientes);
  process.exit(1);
}
const commit = execSync('git rev-parse --short HEAD', { cwd: raiz }).toString().trim();

console.log('\n> Compilando React...');
run('npm run build');

console.log('\n> Copiando archivos de hostinger/ (.htaccess + chatbot PHP)...');
fs.cpSync(path.join(raiz, 'hostinger'), build, { recursive: true });
fs.rmSync(path.join(build, 'api', 'clave.php'), { force: true }); // por si acaso

console.log('\n> Subiendo build/ a la rama deploy...');
ghpages.publish(
  build,
  { branch: 'deploy', dotfiles: true, message: `Deploy ${commit}`, history: true },
  (err) => {
    if (err) {
      console.error('\nError al subir la rama deploy:', err.message || err);
      process.exit(1);
    }
    console.log(`\nListo: rama deploy actualizada (${commit}). Hostinger la publicara en unos segundos.`);
  }
);
