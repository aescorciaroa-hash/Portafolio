<?php
// Formulario de contacto del portafolio. Recibe el POST del formulario (FormData)
// y lo envia por correo con mail() del hosting de Hostinger.
// POST name, email, message (+ campo trampa "website" que debe ir vacio) -> { ok } | { error }

header('Content-Type: application/json; charset=utf-8');

const DESTINO = 'andrescamilodev@gmail.com';
const REMITENTE = 'no-reply@ingenieroandres.dev'; // debe ser del dominio para que no lo marquen como spam
const MAX_NOMBRE = 100;
const MAX_MENSAJE = 5000;
const LIMITE = 3;      // mensajes por IP...
const VENTANA = 600;   // ...cada 10 minutos (segundos)

function responder($status, $datos)
{
    http_response_code($status);
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    responder(405, ['error' => 'Método no permitido']);
}

// Bots: si llenan el campo oculto, fingimos exito y no enviamos nada
if (trim($_POST['website'] ?? '') !== '') {
    responder(200, ['ok' => true]);
}

// Quitar saltos de linea evita que inyecten cabeceras en el correo
$limpiar = fn($s) => trim(preg_replace('/[\r\n]+/', ' ', (string) $s));

$nombre = mb_substr($limpiar($_POST['name'] ?? ''), 0, MAX_NOMBRE);
$correo = $limpiar($_POST['email'] ?? '');
$mensaje = trim((string) ($_POST['message'] ?? ''));

if ($nombre === '' || $mensaje === '') {
    responder(400, ['error' => 'Faltan datos']);
}
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    responder(400, ['error' => 'Correo no válido']);
}
if (mb_strlen($mensaje) > MAX_MENSAJE) {
    responder(400, ['error' => 'El mensaje es muy largo']);
}

// Limite por IP
$ip = trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '')[0]) ?: ($_SERVER['REMOTE_ADDR'] ?? 'anon');
$archivoLimite = sys_get_temp_dir() . '/portafolio_contacto_' . md5($ip) . '.json';
$ahora = time();
$recientes = is_file($archivoLimite) ? (json_decode((string) @file_get_contents($archivoLimite), true) ?: []) : [];
$recientes = array_values(array_filter($recientes, fn($t) => $ahora - $t < VENTANA));
if (count($recientes) >= LIMITE) {
    responder(429, ['error' => 'Demasiados mensajes, intenta más tarde']);
}

$asunto = '=?UTF-8?B?' . base64_encode("Portafolio: mensaje de $nombre") . '?=';
$cuerpo = "Nombre: $nombre\nCorreo: $correo\n\n$mensaje\n";
$nombreCabecera = '=?UTF-8?B?' . base64_encode($nombre) . '?=';
$cabeceras = implode("\r\n", [
    'From: Portafolio <' . REMITENTE . '>',
    "Reply-To: $nombreCabecera <$correo>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

if (!mail(DESTINO, $asunto, $cuerpo, $cabeceras, '-f' . REMITENTE)) {
    responder(500, ['error' => 'No se pudo enviar']);
}

$recientes[] = $ahora;
@file_put_contents($archivoLimite, json_encode($recientes));

responder(200, ['ok' => true]);
