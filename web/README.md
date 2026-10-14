# Interfaz web del agente

Página local para usar el agente `agente-incidentes-brechas` sin la terminal. No tiene dependencias: solo **Node 18+** y **Claude Code** instalado y con sesión iniciada (usa su suscripción, no pide API key).

```
npm start          # o: node web/server.js
```
Abrir http://localhost:3000. Si `claude` no está en el PATH: `CLAUDE_BIN=ruta/a/claude node web/server.js`. Puerto distinto: `PORT=4000`.

## Qué evalúa
Un **reporte de incidente o evento de seguridad** (el correo o mensaje que alguien manda cuando "pasó algo" con información o sistemas). El agente determina:

| Pregunta | Resultado en la página |
|---|---|
| ¿Es evento, incidente o brecha de datos personales? | Clasificación y prioridad (P1 a P4) |
| ¿Qué tan grave es para los titulares? | Severidad ENISA: SE = DPC × EI + CB |
| ¿Hay que notificar? ¿A quién? ¿Hasta cuándo? | Obligación (art. 34 del D.S. 016-2024-JUS) y **cuenta regresiva de 48 h** |
| ¿Qué se dice a la ANPD, a los afectados y al CNSD? | Borradores listos para revisar |
| ¿Cómo se contiene y qué se aprende? | Plan de respuesta, causa raíz y controles ISO/IEC 27002 |

Opcionalmente se le pasa un **contexto de la organización** (carpeta `demo/…` con inventario, logs y políticas): entonces el agente **verifica el reporte** contra esa evidencia y cita `archivo:línea`.

## Qué se le puede pasar
1. **Texto libre** pegado en el cuadro (correo, chat, nota). Puede ser una sola frase.
2. **Un ejemplo** de `examples/entradas/` con un clic.
3. **Un contexto** (opcional) de `demo/`. Para auditar otra organización, cree `demo/<nombre>/` con las mismas carpetas (`inventario/`, `logs/`, `politicas/`, `app/`) y aparecerá en la lista.

No pegue datos personales reales de afectados: use categorías y cantidades.

## Cómo probarlo
Ver [../examples/guia-de-pruebas.md](../examples/guia-de-pruebas.md).

## Cómo funciona
`server.js` guarda el reporte en `salidas/_entradas/`, ejecuta `claude -p --agent agente-incidentes-brechas` en la raíz del repo (con los skills y las reglas de `.claude/settings.json`: solo escribe en `salidas/`), muestra el avance leyendo el flujo de eventos y, al terminar, lee `salidas/INC-…/` y lo presenta en pestañas. Escucha solo en `127.0.0.1`.
