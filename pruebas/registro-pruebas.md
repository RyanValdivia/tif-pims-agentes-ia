# Registro de pruebas

Evidencias de la corrida del 2026-10-01: `evidencias/2026-10-01-agente/<ID>/`. Se ejecutó el agente `agente-incidentes-brechas` en modo no interactivo (sin preguntas), un caso por instancia.

| ID | Fecha | Skill / agente | Entrada | Resultado esperado | Resultado obtenido | ¿Pasó? | Evidencia | Observaciones |
|---|---|---|---|---|---|---|---|---|
| PR-01 | 2026-10-01 | agente-incidentes-brechas | caso-01-ransomware-clinica.md | Brecha P1, severidad Muy alta, notificación a la ANPD + titulares + CNSD, contención sin destruir evidencia | Brecha MAL, P1. SE = 4 × 1 + 1,75 = 5,75 (Muy alta). Los 4 supuestos del art. 34.1 se cumplen → ANPD, titulares y CNSD. Hora límite 01/10 07:15. Aislar **sin apagar**, capturar la RAM, no pagar el rescate. 7 archivos | Sí | `INC-20260929-ransomware-clinica/` | Dejó como lectura estricta la alerta del antivirus (28/09 23:50). Llevó a agregar el criterio "¿desde cuándo corren las 48 h?" en `knowledge/` |
| PR-02 | 2026-10-01 | agente-incidentes-brechas | caso-02-correo-equivocado-colegio.md | Brecha FUG, menores, plazo desde el 30/09 15:30, recomienda notificar a la ANPD | Brecha FUG, P2. SE = 4 × 1 + 0,25 = 4,25 (Muy alta). Hora límite **02/10 15:30** (desde el conocimiento, no desde el envío). ANPD + apoderados + CNSD. 7 archivos | Sí | `INC-20260930-correo-equivocado-colegio/` | El esperado de severidad en `docs/06` estaba mal (omitía la deuda como dato financiero); se corrigió el documento, no el agente |
| PR-03 | 2026-10-01 | agente-incidentes-brechas | caso-03-laptop-robada-financiera.md | Brecha FIS, ingresos = sensible → ANPD obligatoria; cifrado NO INDICADO | Brecha FIS + riesgo INT (sesión de correo abierta), P1. SE = 4 × 1 + 1,0 = 5,0. Asumió que no estaba cifrado y calculó el escenario alternativo con BitLocker (1,5). ANPD por datos sensibles. Hora límite 01/10 21:00 | Sí | `INC-20260929-laptop-robada-cooperativa/` | Detectó la ambigüedad de quién "toma conocimiento" (trabajador o jefe) |
| PR-04 | 2026-10-01 | agente-incidentes-brechas | caso-04-phishing-bloqueado.md | Evento sin incidente; no pasa a notificación | Evento sin incidente, FRA, P4. Se detuvo en el triaje: solo ficha e informe, sin severidad ni notificación | Sí | `INC-20260930-phishing-bloqueado/` | Caso de control superado: no sobrerreacciona |
| PR-05 | | brecha-triaje | Frase: "se nos perdió una USB con planillas" | Se activa sin nombrar el skill; pregunta la hora de conocimiento | | | | Pendiente (Integrante 4, en modo interactivo) |
| PR-06 | | brecha-evaluacion-severidad | Ficha de PR-02 | SE reproducible con la justificación | | | | Pendiente: que dos integrantes recalculen el SE |
| PR-07 | | brecha-notificacion | Expediente de PR-01 | Cubre los 4 elementos del art. 34.2 | | | | Pendiente. En la corrida del agente, las 3 notificaciones a la ANPD incluyen las secciones del art. 34.2 |
| PR-08 | | brecha-respuesta-cierre | Expediente de PR-03 | Causa raíz y controles ISO/IEC 27002 numerados | | | | Pendiente |

## Verificaciones transversales (2026-10-01)
- Ningún agente escribió fuera de `salidas/` (`git status` limpio).
- Todos los archivos generados cierran con la advertencia de borrador.
- Todos los artículos citados (34 a 36, 39, 46 a 48, 133) están en `knowledge/marco-normativo-peru.md`.
- Todos los controles ISO/IEC 27002 citados están en `knowledge/estandares-incidentes.md`; el 8.23, que no figuraba, quedó marcado `[VERIFICAR]`.
- Ninguno recomendó apagar o formatear antes de preservar la evidencia, ni pagar el rescate.
