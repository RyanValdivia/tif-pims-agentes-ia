// Servidor local sin dependencias: sirve la interfaz y lanza el agente con `claude -p`.
// Uso: node web/server.js   (abre http://localhost:3000)
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SALIDAS = path.join(ROOT, 'salidas');
const DIST = path.join(__dirname, 'client', 'dist');
const PUBLIC = DIST;
const HOST = process.env.HOST || '127.0.0.1';
const DATA = process.env.IB_DATA || path.join(ROOT, '.ib-data');
const AUTH_FILE = path.join(DATA, 'auth.json');
const PORT = process.env.PORT || 3100;
const CLAUDE_BIN = process.env.CLAUDE_BIN || (process.platform === 'win32' ? 'claude.cmd' : 'claude');
const jobs = new Map();

const json = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(obj)); };
const safeId = s => /^[\w.-]+$/.test(s || '') && !String(s).includes('..');
const read = p => fs.readFileSync(p, 'utf8');
const ls = d => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }) : []);

function nowStamp() {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  const off = -d.getTimezoneOffset(), sg = off >= 0 ? '+' : '-';
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())} (${sg}${p(Math.floor(Math.abs(off) / 60))}${p(Math.abs(off) % 60)})`;
}

function expedienteInfo(id) {
  const dir = path.join(SALIDAS, id);
  const files = ls(dir).filter(f => f.isFile() && f.name.endsWith('.md')).map(f => f.name).sort();
  let limite = null, clasif = null, sev = null;
  const inf = path.join(dir, '00-informe.md');
  if (fs.existsSync(inf)) {
    const lines = read(inf).split('\n');
    const l = lines.find(x => /hora l[ií]mite/i.test(x));
    const m = l && l.match(/(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2})/);
    if (m) limite = `${m[1]}T${m[2]}:00`;
    const cell = re => { const x = lines.find(y => re.test(y)); return x ? (x.split('|')[2] || '').replace(/\*/g, '').trim() : null; };
    clasif = cell(/^\|\s*Clasificaci[oó]n/i);
    sev = cell(/^\|\s*Severidad/i);
  }
  return { id, files, limite, clasif, sev, mtime: fs.existsSync(dir) ? fs.statSync(dir).mtimeMs : 0 };
}

function startJob({ reporte, contexto, ahora }) {
  const id = 'job' + Date.now();
  fs.mkdirSync(path.join(SALIDAS, '_entradas'), { recursive: true });
  const rel = `salidas/_entradas/${id}.md`;
  fs.writeFileSync(path.join(ROOT, rel), reporte);
  const prompt = [
    `Fecha y hora actual: ${ahora || nowStamp()}.`,
    'Usa el agente agente-incidentes-brechas para gestionar este reporte de incidente:',
    rel + ' (archivo temporal de entrada: NO uses su nombre como ID)',
    contexto ? `contexto: ${contexto}` : '',
    'Léelo primero. Calcula el tiempo restante hasta la hora límite de 48 h con la fecha actual. Sigue tu flujo (ciclo ISO/IEC 27035), guarda todo en salidas/<ID>/ con ID = INC-<AAAAMMDD de la fecha del incidente>-<slug corto>, y termina mostrando clasificación, severidad, hora límite y tiempo restante, decisiones humanas pendientes y rutas generadas.',
  ].filter(Boolean).join('\n');
  const job = { id, status: 'running', start: Date.now(), eventos: [], incidente: null, resultado: null, error: null };
  jobs.set(id, job);
  // El prompt va por stdin para no depender del quoting del shell en Windows.
  const args = ['-p', '--agent', 'agente-incidentes-brechas', '--output-format', 'stream-json', '--verbose', '--permission-mode', 'acceptEdits'];
  const child = spawn(CLAUDE_BIN, args, { cwd: ROOT, shell: process.platform === 'win32', env: claudeEnv() });
  child.stdin.end(prompt);
  let buf = '', errBuf = '';
  child.stdout.setEncoding('utf8'); child.stderr.setEncoding('utf8');
  const note = t => job.eventos.push({ t: Date.now() - job.start, texto: t });
  child.stdout.on('data', d => {
    buf += d;
    let i;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
      if (!line) continue;
      try {
        const ev = JSON.parse(line);
        if (ev.type === 'assistant') for (const b of ev.message?.content || []) {
          if (b.type !== 'tool_use') continue;
          const f = b.input?.file_path || b.input?.pattern || b.input?.skill || '';
          const short = String(f).replace(ROOT, '').replace(/\\/g, '/').replace(/^\//, '');
          const verbo = { Read: 'Leyendo', Write: 'Escribiendo', Grep: 'Buscando', Glob: 'Listando', Skill: 'Skill' }[b.name] || b.name;
          note(`${verbo} ${short}`);
          const m = short.match(/^salidas\/(INC-[\w.-]+)\//);
          if (m) job.incidente = m[1];
        }
        if (ev.type === 'result') { job.resultado = ev.result; if (ev.is_error) job.error = ev.result; }
      } catch { /* línea parcial */ }
    }
  });
  child.stderr.on('data', d => { errBuf += d; });
  child.on('error', e => { job.status = 'error'; job.error = `No se pudo ejecutar "${CLAUDE_BIN}": ${e.message}`; job.fin = Date.now(); });
  child.on('close', code => {
    if (job.status === 'error') return;
    job.status = code === 0 && !job.error ? 'done' : 'error';
    if (job.status === 'error' && !job.error) job.error = errBuf.slice(-800) || `salió con código ${code}`;
    if (job.error) job.error = traduceError(job.error);
    job.fin = Date.now();
  });
  job.kill = () => { try { child.kill(); } catch { /* ya terminó */ } };
  return job;
}


// ---- Contextos de organización: demo/ (incluidos) y contextos/ (subidos desde la interfaz)
const CTX_DIRS = { demo: path.join(ROOT, 'demo'), contextos: path.join(ROOT, 'contextos') };
const CTX_RE = /^(demo|contextos)\/[a-z0-9][a-z0-9-]{0,59}$/;
const MAX_ARCHIVO = 1.5e6, MAX_ARCHIVOS = 60;
const slug = n => String(n || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const ctxPath = c => { if (!CTX_RE.test(c || '')) return null; const [t, n] = c.split('/'); return path.join(CTX_DIRS[t], n); };
function walk(dir, base = dir, out = []) {
  for (const f of ls(dir)) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, base, out);
    else if (out.length < 300) out.push({ ruta: path.relative(base, p).replace(/\\/g, '/'), bytes: fs.statSync(p).size });
  }
  return out;
}
function listarContextos() {
  const out = [];
  for (const [tipo, dir] of Object.entries(CTX_DIRS))
    for (const d of ls(dir).filter(x => x.isDirectory() && /^[a-z0-9][a-z0-9-]*$/.test(x.name)))
      out.push({ ruta: `${tipo}/${d.name}`, nombre: d.name, propio: tipo === 'contextos', archivos: walk(path.join(dir, d.name)).sort((a, b) => a.ruta.localeCompare(b.ruta)) });
  return out;
}
function limpiaRuta(r) {
  const seg = String(r || '').replace(/\\/g, '/').split('/').filter(Boolean);
  if (!seg.length || seg.length > 4) return null;
  const ok = seg.map(x => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w.-]+/g, '_'));
  if (ok.some(x => x.startsWith('.') || x.includes('..'))) return null;
  return ok.join('/');
}
function guardaContexto(nombre, archivos) {
  const s = slug(nombre);
  if (!s) throw new Error('Escriba un nombre para la organización.');
  if (!Array.isArray(archivos) || !archivos.length) throw new Error('No hay archivos para guardar.');
  if (archivos.length > MAX_ARCHIVOS) throw new Error(`Máximo ${MAX_ARCHIVOS} archivos por carga.`);
  const base = path.join(CTX_DIRS.contextos, s), guardados = [], omitidos = [];
  for (const a of archivos) {
    const r = limpiaRuta(a.ruta), t = a.texto;
    if (!r || typeof t !== 'string') { omitidos.push(`${a.ruta}: nombre inválido`); continue; }
    if (t.includes('\u0000')) { omitidos.push(`${a.ruta}: no es un archivo de texto`); continue; }
    if (t.length > MAX_ARCHIVO) { omitidos.push(`${a.ruta}: supera 1,5 MB`); continue; }
    const dest = path.join(base, r);
    if (!dest.startsWith(base + path.sep)) { omitidos.push(`${a.ruta}: ruta inválida`); continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, t);
    guardados.push(r);
  }
  return { ruta: `contextos/${s}`, guardados, omitidos };
}

// ---- Credenciales: variables de entorno, archivo guardado desde la interfaz o sesión local de Claude Code
const TIPOS = { api_key: 'ANTHROPIC_API_KEY', oauth_token: 'CLAUDE_CODE_OAUTH_TOKEN' };
const mask = v => (v ? v.slice(0, 8) + '…' + v.slice(-4) : '');
function authGuardada() { try { return JSON.parse(read(AUTH_FILE)); } catch { return null; } }
function authEnv() {
  const a = authGuardada();
  return a && TIPOS[a.tipo] && a.valor ? { [TIPOS[a.tipo]]: a.valor } : {};
}
function claudeEnv() {
  const e = { ...process.env, ...authEnv() };
  for (const k of Object.values(TIPOS)) if (!e[k]) delete e[k];   // variables vacías (docker compose) no cuentan
  return e;
}
function corre(args, { timeout = 20000, stdin } = {}) {
  return new Promise(resolve => {
    let out = '', err = '', fin = false;
    const fn = r => { if (!fin) { fin = true; clearTimeout(t); resolve(r); } };
    let c;
    try { c = spawn(CLAUDE_BIN, args, { cwd: ROOT, shell: process.platform === 'win32', env: claudeEnv() }); }
    catch (e) { return resolve({ code: -1, out: '', err: e.message }); }
    const t = setTimeout(() => { try { c.kill(); } catch {} fn({ code: -2, out, err: err || 'sin respuesta' }); }, timeout);
    c.stdout.setEncoding('utf8'); c.stderr.setEncoding('utf8');
    c.stdout.on('data', d => { out += d; }); c.stderr.on('data', d => { err += d; });
    c.on('error', e => fn({ code: -1, out, err: e.message }));
    c.on('close', code => fn({ code, out, err }));
    if (stdin) c.stdin.end(stdin); else c.stdin.end();
  });
}
let estadoCache = null;
async function estado(fresh) {
  if (!fresh && estadoCache && Date.now() - estadoCache.t < 30000) return estadoCache.v;
  const g = authGuardada();
  const v = {
    claude: { ok: false, version: '', detalle: '' },
    sesion: { logueado: false, metodo: '', email: '' },
    credencial: g && TIPOS[g.tipo] ? { fuente: 'interfaz', tipo: g.tipo, valor: mask(g.valor) }
      : process.env.ANTHROPIC_API_KEY ? { fuente: 'entorno', tipo: 'api_key', valor: mask(process.env.ANTHROPIC_API_KEY) }
      : process.env.CLAUDE_CODE_OAUTH_TOKEN ? { fuente: 'entorno', tipo: 'oauth_token', valor: mask(process.env.CLAUDE_CODE_OAUTH_TOKEN) }
      : { fuente: 'ninguna', tipo: '', valor: '' },
    agente: fs.existsSync(path.join(ROOT, '.claude/agents/agente-incidentes-brechas.md')),
    skills: ls(path.join(ROOT, '.claude/skills')).filter(d => d.isDirectory()).length,
    docker: fs.existsSync('/.dockerenv'),
  };
  const ver = await corre(['--version'], { timeout: 10000 });
  v.claude.ok = ver.code === 0 && /Claude Code/i.test(ver.out);
  v.claude.version = ver.out.trim().slice(0, 40);
  v.claude.detalle = v.claude.ok ? '' : (ver.err || ver.out || `código ${ver.code}`).trim().slice(0, 160);
  if (v.claude.ok) {
    const st = await corre(['auth', 'status'], { timeout: 10000 });
    try { const j = JSON.parse(st.out); v.sesion = { logueado: !!j.loggedIn, metodo: j.authMethod || '', email: j.email || '' }; } catch { /* sin json */ }
  }
  estadoCache = { t: Date.now(), v };
  return v;
}
async function probarConexion() {
  const t0 = Date.now();
  const r = await corre(['-p', 'Responde solo con la palabra: ok', '--output-format', 'json', '--max-turns', '1'], { timeout: 60000 });
  let j = null; try { j = JSON.parse(r.out); } catch { /* texto plano */ }
  const ok = r.code === 0 && j && !j.is_error;
  return { ok, ms: Date.now() - t0, mensaje: ok ? 'Conexión correcta.' : traduceError((j && j.result) || r.err || r.out || `código ${r.code}`) };
}
function traduceError(t) {
  const x = String(t || '');
  if (/not logged in|please run \/login|invalid api key|authentication|unauthorized|401|oauth token|credit balance/i.test(x))
    return 'Claude Code no tiene credenciales válidas. Configure su API key o su token de suscripción en la sección Conexión. Detalle: ' + x.slice(0, 200);
  return x.slice(0, 400);
}

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.ico': 'image/x-icon', '.png': 'image/png' };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  try {
    let m;

    if (req.method === 'GET' && p === '/api/archivos-demo') {
      const base = path.join(ROOT, 'archivos-demo');
      const lista = d => ls(path.join(base, d)).filter(f => f.isFile()).map(f => ({ nombre: f.name, bytes: fs.statSync(path.join(base, d, f.name)).size })).sort((a, b) => a.nombre.localeCompare(b.nombre));
      return json(res, 200, { reportes: lista('reportes'), contexto: lista('contexto-nuevo') });
    }
    if (req.method === 'GET' && (m = p.match(/^\/api\/archivos-demo\/(reportes|contexto-nuevo)\/([\w.-]+)$/))) {
      const f = path.join(ROOT, 'archivos-demo', m[1], m[2]);
      if (!safeId(m[2]) || !fs.existsSync(f)) return json(res, 404, { error: 'no existe' });
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Disposition': `attachment; filename="${m[2]}"` });
      return res.end(fs.readFileSync(f));
    }
    if (req.method === 'GET' && p === '/api/config') {
      const EJ = { unsa: 'examples/unsa' };
      const ejemplos = Object.entries(EJ).flatMap(([grupo, d]) => ls(path.join(ROOT, d)).filter(f => f.name.endsWith('.md'))
        .map(f => ({ grupo, nombre: f.name, titulo: read(path.join(ROOT, d, f.name)).split('\n')[0].replace(/^#\s*/, '') })));
      const contextos = listarContextos();
      const expedientes = ls(SALIDAS).filter(f => f.isDirectory() && f.name.startsWith('INC-')).map(f => expedienteInfo(f.name)).sort((a, b) => b.mtime - a.mtime);
      return json(res, 200, { ejemplos, contextos, expedientes, ahora: nowStamp() });
    }
    if (req.method === 'GET' && p === '/api/ejemplo') {
      const n = url.searchParams.get('f'), g = url.searchParams.get('g') === 'unsa' ? 'unsa' : 'entradas';
      if (!safeId(n)) return json(res, 400, { error: 'nombre inválido' });
      return json(res, 200, { texto: read(path.join(ROOT, 'examples', g, n)) });
    }
    if (req.method === 'POST' && p === '/api/analizar') {
      let body = '';
      req.on('data', d => { body += d; if (body.length > 2e6) req.destroy(); });
      req.on('end', () => {
        let data;
        try { data = JSON.parse(body || '{}'); } catch { return json(res, 400, { error: 'JSON inválido' }); }
        const { reporte, contexto, ahora } = data;
        if (!reporte || reporte.trim().length < 20) return json(res, 400, { error: 'El reporte es muy corto.' });
        if (contexto && !(CTX_RE.test(contexto) && fs.existsSync(ctxPath(contexto)))) return json(res, 400, { error: 'Contexto inválido o inexistente.' });
        json(res, 202, { job: startJob({ reporte, contexto, ahora }).id });
      });
      return;
    }

    if (req.method === 'GET' && p === '/api/estado') return estado(url.searchParams.get('fresh') === '1').then(v => json(res, 200, v));
    if (req.method === 'POST' && p === '/api/auth/probar') return probarConexion().then(v => json(res, 200, v));
    if (req.method === 'POST' && p === '/api/auth') {
      let body = '';
      req.on('data', d => { body += d; if (body.length > 1e4) req.destroy(); });
      req.on('end', () => {
        try {
          const { tipo, valor } = JSON.parse(body || '{}');
          const v = String(valor || '').trim();
          if (!TIPOS[tipo]) return json(res, 400, { error: 'Tipo de credencial inválido.' });
          if (!/^sk-ant-[\w-]{20,}$/.test(v)) return json(res, 400, { error: 'El valor no parece una credencial de Anthropic (debe empezar con sk-ant-).' });
          fs.mkdirSync(DATA, { recursive: true, mode: 0o700 });
          fs.writeFileSync(AUTH_FILE, JSON.stringify({ tipo, valor: v }), { mode: 0o600 });
          estadoCache = null;
          json(res, 200, { ok: true, valor: mask(v) });
        } catch (e) { json(res, 400, { error: String(e.message || e) }); }
      });
      return;
    }
    if (req.method === 'DELETE' && p === '/api/auth') { try { fs.rmSync(AUTH_FILE, { force: true }); } catch {} estadoCache = null; return json(res, 200, { ok: true }); }
    if (req.method === 'GET' && p === '/api/contexto-archivo') {
      const base = ctxPath(url.searchParams.get('c')), r = limpiaRuta(url.searchParams.get('f'));
      const f = base && r && path.join(base, r);
      if (!f || !f.startsWith(base + path.sep) || !fs.existsSync(f)) return json(res, 404, { error: 'no existe' });
      return json(res, 200, { texto: read(f).slice(0, 400000) });
    }
    if (req.method === 'POST' && p === '/api/contexto') {
      let body = '';
      req.on('data', d => { body += d; if (body.length > 12e6) req.destroy(); });
      req.on('end', () => {
        try { const { nombre, archivos } = JSON.parse(body || '{}'); json(res, 200, guardaContexto(nombre, archivos)); }
        catch (e) { json(res, 400, { error: String(e.message || e) }); }
      });
      return;
    }
    if (req.method === 'DELETE' && p === '/api/contexto') {
      const c = url.searchParams.get('c'), base = ctxPath(c);
      if (!base || !c.startsWith('contextos/')) return json(res, 400, { error: 'Solo se pueden borrar contextos subidos.' });
      const r = url.searchParams.get('f');
      if (r) { const rr = limpiaRuta(r), f = rr && path.join(base, rr); if (f && f.startsWith(base + path.sep) && fs.existsSync(f)) fs.rmSync(f); }
      else fs.rmSync(base, { recursive: true, force: true });
      return json(res, 200, { ok: true });
    }
    if (req.method === 'GET' && (m = p.match(/^\/api\/job\/(job\d+)$/))) {
      const j = jobs.get(m[1]);
      if (!j) return json(res, 404, { error: 'no existe' });
      return json(res, 200, { status: j.status, segundos: Math.round(((j.fin || Date.now()) - j.start) / 1000), eventos: j.eventos.slice(-300), incidente: j.incidente, resultado: j.resultado, error: j.error });
    }
    if (req.method === 'DELETE' && (m = p.match(/^\/api\/job\/(job\d+)$/))) {
      const j = jobs.get(m[1]); if (j && j.kill) j.kill();
      return json(res, 200, { ok: true });
    }
    if (req.method === 'GET' && (m = p.match(/^\/api\/expediente\/([\w.-]+)$/))) {
      if (!safeId(m[1])) return json(res, 400, { error: 'id inválido' });
      const info = expedienteInfo(m[1]);
      const docs = Object.fromEntries(info.files.map(f => [f, read(path.join(SALIDAS, m[1], f))]));
      return json(res, 200, { ...info, docs });
    }
    let f = path.join(PUBLIC, p === '/' ? 'index.html' : p);
    if (!(f.startsWith(PUBLIC) && fs.existsSync(f) && fs.statSync(f).isFile()) && req.method === 'GET' && !p.startsWith('/api/') && !p.startsWith('/assets/')) f = path.join(PUBLIC, 'index.html');
    if (f.startsWith(PUBLIC) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      const cache = /\/assets\//.test(f.replace(/\\/g, '/')) ? 'public, max-age=31536000, immutable' : 'no-cache';
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': cache });
      return res.end(fs.readFileSync(f));
    }
    if (!fs.existsSync(path.join(DIST, 'index.html'))) { res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Falta compilar la interfaz. Ejecute: npm run build'); }
    json(res, 404, { error: 'no encontrado' });
  } catch (e) { json(res, 500, { error: String(e.message || e) }); }
}).listen(PORT, HOST, () => console.log(`Agente de incidentes y brechas → http://localhost:${PORT}`));
