# Etapa 1 — De prompt a skill

**Objetivo:** transformar una tarea que hacíamos con un prompt suelto en un proceso reutilizable.

## Problema con el prompt suelto
Un prompt escrito cada vez produce resultados distintos, depende de quién lo escribe y no deja registro de cómo se llegó al resultado.

## Los tres prompts originales

### Prompt 1 — Inventario de datos
> "Dime qué datos personales tiene este formulario."

### Prompt 2 — DPIA
> "Haz una evaluación de riesgos de privacidad de este proceso."

### Prompt 3 — Derechos ARCO
> "Un usuario quiere que borremos sus datos, ayúdame a responderle."

## Qué les faltaba

| Carencia | Consecuencia |
|---|---|
| Sin formato de salida definido | Cada respuesta tenía otra estructura |
| Sin criterios (qué es dato sensible, cómo puntuar riesgo) | Resultados subjetivos e inconsistentes |
| Sin marco normativo | Podía inventar artículos o plazos |
| Sin paso de verificación ni advertencias | No distinguía hecho de suposición |
| Sin conexión entre tareas | El RAT no alimentaba al DPIA ni al ARCO |

## Proceso de transformación

1. **Ejecutar** el prompt con un caso ficticio (`examples/entradas/`) y anotar qué salió mal.
2. **Descomponer** la tarea en pasos que un analista humano seguiría.
3. **Fijar criterios** en archivos de conocimiento (`knowledge/`) en lugar de repetirlos en cada prompt.
4. **Definir la salida** con una plantilla fija.
5. **Añadir reglas** (no inventar, marcar inferencias, borrador para revisión humana).
6. **Definir cuándo se activa** con una descripción precisa (ver etapa 2).
7. **Probar** con casos distintos y ajustar (ver `pruebas/`).

## Resultado

| Prompt original | Skill resultante |
|---|---|
| Prompt 1 | `pims-inventario-datos` |
| Prompt 2 | `pims-dpia` |
| Prompt 3 | `pims-derechos-arco` |

## Ganancias esperadas
- **Consistencia:** misma estructura en cada ejecución.
- **Trazabilidad:** cada brecha o riesgo enlaza a un principio o control.
- **Reutilización:** cualquier integrante obtiene el mismo resultado con una frase.
- **Encadenamiento:** las salidas de un skill son la entrada del siguiente.
