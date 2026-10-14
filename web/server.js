// Servidor local sin dependencias: sirve la interfaz y lanza el agente con `claude -p`.
// Uso: node web/server.js   (abre http://localhost:3000)
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SALIDAS = path.join(ROOT, 'salidas');
const PUBLIC = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
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
  const child = spawn(CLAUDE_BIN, args, { cwd: ROOT, shell: process.platform === 'win32' });
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
    job.fin = Date.now();
  });
  job.kill = () => { try { child.kill(); } catch { /* ya terminó */ } };
  return job;
}

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  try {
    if (req.method === 'GET' && p === '/api/config') {
      const ejemplos = ls(path.join(ROOT, 'examples/entradas')).filter(f => f.name.endsWith('.md'))
        .map(f => ({ nombre: f.name, titulo: read(path.join(ROOT, 'examples/entradas', f.name)).split('\n')[0].replace(/^#\s*/, '') }));
      const contextos = ls(path.join(ROOT, 'demo')).filter(f => f.isDirectory()).map(f => 'demo/' + f.name);
      const expedientes = ls(SALIDAS).filter(f => f.isDirectory() && f.name.startsWith('INC-')).map(f => expedienteInfo(f.name)).sort((a, b) => b.mtime - a.mtime);
      return json(res, 200, { ejemplos, contextos, expedientes, ahora: nowStamp() });
    }
    if (req.method === 'GET' && p === '/api/ejemplo') {
      const n = url.searchParams.get('f');
      if (!safeId(n)) return json(res, 400, { error: 'nombre inválido' });
      return json(res, 200, { texto: read(path.join(ROOT, 'examples/entradas', n)) });
    }
    if (req.method === 'POST' && p === '/api/analizar') {
      let body = '';
      req.on('data', d => { body += d; if (body.length > 2e6) req.destroy(); });
      req.on('end', () => {
        let data;
        try { data = JSON.parse(body || '{}'); } catch { return json(res, 400, { error: 'JSON inválido' }); }
        const { reporte, contexto, ahora } = data;
        if (!reporte || reporte.trim().length < 20) return json(res, 400, { error: 'El reporte es muy corto.' });
        if (contexto && !/^demo\/[\w.-]+$/.test(contexto)) return json(res, 400, { error: 'Contexto inválido.' });
        json(res, 202, { job: startJob({ reporte, contexto, ahora }).id });
      });
      return;
    }
    let m;
    if (req.method === 'GET' && (m = p.match(/^\/api\/job\/(job\d+)$/))) {
      const j = jobs.get(m[1]);
      if (!j) return json(res, 404, { error: 'no existe' });
      return json(res, 200, { status: j.status, segundos: Math.round(((j.fin || Date.now()) - j.start) / 1000), eventos: j.eventos.slice(-40), incidente: j.incidente, resultado: j.resultado, error: j.error });
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
    const f = path.join(PUBLIC, p === '/' ? 'index.html' : p);
    if (f.startsWith(PUBLIC) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      return res.end(fs.readFileSync(f));
    }
    json(res, 404, { error: 'no encontrado' });
  } catch (e) { json(res, 500, { error: String(e.message || e) }); }
}).listen(PORT, '127.0.0.1', () => console.log(`Agente de incidentes y brechas → http://localhost:${PORT}`));
