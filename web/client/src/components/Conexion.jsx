import React, { useState } from 'react';
import { post, del } from '../api.js';

const FUENTE = { interfaz: 'Guardada desde esta página', entorno: 'Variable de entorno', ninguna: 'Ninguna' };
const TIPO = { api_key: 'API key de Anthropic', oauth_token: 'Token de suscripción de Claude' };

export default function Conexion({ estado, recarga }) {
  const [tipo, setTipo] = useState('api_key');
  const [valor, setValor] = useState('');
  const [msg, setMsg] = useState('');
  const [prueba, setPrueba] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!estado) return <div className="empty">Comprobando…</div>;
  const { claude, sesion, credencial } = estado;
  const listo = claude.ok && (sesion.logueado || credencial.fuente !== 'ninguna');

  async function guardar() {
    setBusy(true); setMsg('');
    try { await post('/api/auth', { tipo, valor }); setValor(''); setMsg('Credencial guardada.'); setPrueba(null); await recarga(true); }
    catch (e) { setMsg(e.message); }
    setBusy(false);
  }
  async function quitar() { await del('/api/auth'); setMsg('Credencial quitada.'); setPrueba(null); await recarga(true); }
  async function probar() {
    setBusy(true); setPrueba(null);
    try { setPrueba(await post('/api/auth/probar')); } catch (e) { setPrueba({ ok: false, mensaje: e.message }); }
    setBusy(false);
  }

  return (
    <div className="grid2">
      <div style={{ display: 'grid', gap: 20 }}>
        <div className="card">
          <header><h2>Estado de la conexión</h2><span className="sp" /><span className={'pill ' + (listo ? 'ok' : 'bad')}>{listo ? 'Listo para analizar' : 'Falta configurar'}</span></header>
          <div className="body">
            <dl className="kv">
              <dt>Claude Code</dt><dd>{claude.ok ? <>Instalado · {claude.version}</> : <span className="err" style={{ margin: 0 }}>No encontrado. {claude.detalle}</span>}</dd>
              <dt>Credencial</dt><dd>{credencial.fuente === 'ninguna' ? 'Ninguna configurada' : <>{TIPO[credencial.tipo]} · <code>{credencial.valor}</code> · {FUENTE[credencial.fuente]}</>}</dd>
              <dt>Sesión de Claude</dt><dd>{sesion.logueado ? <>Iniciada · {sesion.metodo}{sesion.email ? ` · ${sesion.email}` : ''}</> : 'Sin sesión iniciada'}</dd>
              <dt>Agente y skills</dt><dd>{estado.agente ? 'Agente cargado' : 'Falta el agente'} · {estado.skills} de 4 skills</dd>
              <dt>Entorno</dt><dd>{estado.docker ? 'Contenedor Docker' : 'Equipo local'}</dd>
            </dl>
            <div className="actions">
              <button className="btn primary" onClick={probar} disabled={busy || !claude.ok}>Probar conexión</button>
              <span className="grow hint">{busy && !prueba ? 'Probando…' : ''}</span>
            </div>
            {prueba && <p className={prueba.ok ? 'ok-t' : 'err'} style={{ marginBottom: 0 }}>{prueba.ok ? `Conexión correcta (${(prueba.ms / 1000).toFixed(1)} s).` : prueba.mensaje}</p>}
          </div>
        </div>

        <div className="card">
          <header><h2>Usar una credencial propia</h2></header>
          <div className="body">
            <p className="hint" style={{ margin: 0 }}>Se guarda en el servidor, en <code>.ib-data/</code>, y solo se usa para lanzar al agente. Nunca vuelve al navegador.</p>
            <label className="l">Tipo</label>
            <div className="seg" role="group">
              <button aria-pressed={tipo === 'api_key'} onClick={() => setTipo('api_key')}>API key</button>
              <button aria-pressed={tipo === 'oauth_token'} onClick={() => setTipo('oauth_token')}>Token de suscripción</button>
            </div>
            <label className="l" htmlFor="cred">{TIPO[tipo]}</label>
            <input id="cred" className="field" type="password" autoComplete="off" value={valor} onChange={e => setValor(e.target.value)} placeholder="sk-ant-…" />
            <div className="actions">
              <button className="btn primary" onClick={guardar} disabled={busy || valor.length < 10}>Guardar</button>
              {credencial.fuente === 'interfaz' && <button className="btn danger" onClick={quitar}>Quitar la guardada</button>}
              <span className="grow hint">{msg}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <header><h2>Cómo conectar el agente</h2></header>
        <div className="body modes">
          <div className="mode"><h3>Con su suscripción de Claude <span className="pill acc">Recomendado</span></h3>
            <p>Usa su plan, sin costo por token aparte. En su equipo abra una terminal, ejecute el comando, inicie sesión en el navegador y pegue el token que le entrega aquí o en <code>.env</code> como <code>CLAUDE_CODE_OAUTH_TOKEN</code>.</p>
            <pre className="cmd">claude setup-token</pre></div>
          <div className="mode"><h3>Con una API key</h3>
            <p>Se cobra por uso. Créela en console.anthropic.com. Pégela aquí o póngala en <code>.env</code> como <code>ANTHROPIC_API_KEY</code>.</p></div>
          <div className="mode"><h3>Sin Docker, ya con la sesión iniciada</h3>
            <p>Si ejecuta <code>npm start</code> en un equipo donde ya usa Claude Code, no necesita configurar nada: el agente usa esa sesión.</p></div>
          <div className="mode"><h3>Con Docker</h3>
            <p>El contenedor no ve su sesión. Copie <code>.env.example</code> a <code>.env</code>, ponga una de las dos credenciales y ejecute:</p>
            <pre className="cmd">docker compose up --build</pre></div>
        </div>
      </div>
    </div>
  );
}
