# Registro de pruebas

| ID | Fecha | Skill / agente | Entrada | Resultado esperado | Resultado obtenido | ¿Pasó? | Evidencia | Observaciones |
|---|---|---|---|---|---|---|---|---|
| PR-01 | | agente-incidentes-brechas | caso-01-ransomware-clinica.md | Brecha P1, severidad Muy alta, notificación a la ANPD + titulares + CNSD, contención sin destruir evidencia | | | | |
| PR-02 | | agente-incidentes-brechas | caso-02-correo-equivocado-colegio.md | Brecha FUG, menores, plazo desde el 30/09 15:30, recomienda notificar a la ANPD | | | | |
| PR-03 | | agente-incidentes-brechas | caso-03-laptop-robada-financiera.md | Brecha FIS, ingresos = sensible → ANPD obligatoria; cifrado NO INDICADO | | | | |
| PR-04 | 2026-10-01 | agente-incidentes-brechas (flujo ejecutado en la sesión de Ryan) | caso-04-phishing-bloqueado.md | Evento sin incidente; no pasa a notificación | Evento sin incidente, FRA, P4. Se detuvo en el triaje: sin severidad ni notificación. Dejó una pregunta pendiente sobre la cobertura del proxy | Sí | `evidencias/2026-10-01-caso04/` | Prueba de humo. Repetir con /gestionar-incidente en una sesión nueva (Integrante 4) |
| PR-05 | | brecha-triaje | Frase: "se nos perdió una USB con planillas" | Se activa sin nombrar el skill; pregunta la hora de conocimiento | | | | |
| PR-06 | | brecha-evaluacion-severidad | Ficha de PR-02 | SE reproducible con la justificación | | | | |
| PR-07 | | brecha-notificacion | Expediente de PR-01 | Cubre los 4 elementos del art. 34.2 | | | | |
| PR-08 | | brecha-respuesta-cierre | Expediente de PR-03 | Causa raíz y controles ISO/IEC 27002 numerados | | | | |
