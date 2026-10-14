/* Metadatos de presentación: nada de esto altera lo que decide el agente. */

export const EJEMPLOS = {
  '01': { t: 'Ransomware en clínica', s: 'Salud · 18 000 pacientes', esp: 'Muy alta', tag: 'Con contexto' },
  '02': { t: 'Correo equivocado', s: 'Colegio · menores', esp: 'Muy alta' },
  '03': { t: 'Laptop robada', s: 'Cooperativa · datos financieros', esp: 'Alta' },
  '04': { t: 'Phishing bloqueado', s: 'Municipalidad', esp: 'Sin incidente', tag: 'Control' },
  '05': { t: 'Aviso del proveedor', s: 'Hosting · alumnos y menores', esp: 'Alta', tag: 'Encargado' },
  '06': { t: 'Acceso indebido interno', s: 'Clínica · historias clínicas', esp: 'Muy alta' },
  '07': { t: 'Bucket público', s: 'Tienda online · 9 500 clientes' },
  '08': { t: 'Inyección SQL', s: 'Instituto · postulantes y menores' },
  '09': { t: 'Exempleado se lleva la cartera', s: 'Distribuidora · clientes' },
  '10': { t: 'Papeles botados', s: 'Centro de salud · VIH' },
  '11': { t: 'Ataque DDoS', s: 'Municipalidad · sin datos', esp: 'Sin datos personales', tag: 'Control' },
  '12': { t: 'Ransomware con respaldo', s: 'Estudio contable · 120 clientes', tag: 'Caso gris' },
};

/* Casos de la UNSA (escenarios simulados). El campo r es el resultado observado al ejecutarlos. */
export const CTX_BASE = 'unsa-base';
export const UNSA = {
  'unsa-01': { c: 'unsa-ransomware', t: 'Ransomware en el Registro Académico', u: 'Oficina de TI · Centro de Cómputo', k: 'Ransomware' },
  'unsa-02': { t: 'Correo masivo con datos de ingresantes', u: 'Oficina de Admisión', k: 'Fuga por correo' },
  'unsa-03': { t: 'Laptop robada con fichas de psicología', u: 'Bienestar Universitario', k: 'Robo de equipo' },
  'unsa-04': { t: 'Phishing a docentes, bloqueado', u: 'Oficina de TI', k: 'Control: evento' },
  'unsa-05': { t: 'Aviso del proveedor del Campus Virtual', u: 'Campus Virtual', k: 'Encargado del tratamiento' },
  'unsa-06': { c: 'unsa-admision', t: 'Portal de admisión: inyección SQL', u: 'Oficina de Admisión · Desarrollo', k: 'Ataque web' },
  'unsa-07': { c: 'unsa-notas', t: 'Cambio indebido de notas', u: 'Registros Académicos', k: 'Alteración de datos' },
  'unsa-08': { t: 'Planilla CAS en enlace público', u: 'Recursos Humanos', k: 'Exposición en la nube' },
  'unsa-09': { t: 'DDoS en la matrícula en línea', u: 'Centro de Cómputo', k: 'Control: sin datos' },
};

export const ETAPAS = [
  { p: '01-', t: 'Triaje', f: 'Detectar y evaluar' },
  { p: '02-', t: 'Severidad', f: 'Evaluar y decidir' },
  { p: '03-', t: 'Notificación', f: 'Responder' },
  { p: '04-', t: 'Respuesta y cierre', f: 'Responder · aprender' },
  { p: '00-', t: 'Informe', f: 'Decisión humana' },
];

export const NOMBRES = {
  '00-informe.md': 'Informe',
  '01-ficha-incidente.md': 'Ficha de triaje',
  '02-evaluacion-severidad.md': 'Severidad y decisión',
  '03-notificacion-anpd.md': 'Notificación a la ANPD',
  '03-comunicacion-titulares.md': 'Aviso a los titulares',
  '03-aviso-cnsd.md': 'Aviso al CNSD',
  '04-respuesta-y-cierre.md': 'Respuesta y cierre',
};

export const GRUPOS = [
  ['Resumen', ['00-informe.md']],
  ['Evaluación', ['01-ficha-incidente.md', '02-evaluacion-severidad.md']],
  ['Notificaciones', ['03-notificacion-anpd.md', '03-comunicacion-titulares.md', '03-aviso-cnsd.md']],
  ['Respuesta', ['04-respuesta-y-cierre.md']],
];

export const NORMAS = ['ISO/IEC 27035', 'ISO/IEC 27001/27002', 'ISO/IEC 27701', 'ISO/IEC 27037', 'NIST SP 800-61r3', 'ENISA', 'D.S. 016-2024-JUS'];

export const nivel = s => (/muy alta|cr[ií]tica/i.test(s || '') ? 'bad' : /alta|media/i.test(s || '') ? 'warn' : s ? 'ok' : '');

export const fmtRestante = ms => {
  const a = Math.abs(ms), h = Math.floor(a / 36e5), m = Math.floor((a % 36e5) / 6e4);
  return `${h} h ${String(m).padStart(2, '0')} min`;
};
