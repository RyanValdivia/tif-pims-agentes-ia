# Etapa 3 — Construcción de asistente

**Objetivo:** dar a cada skill una identidad, instrucciones y conocimiento propios. **Resultado: skill funcional especializado.**

## Los tres ingredientes

| Ingrediente | Cómo se implementó |
|---|---|
| **Identidad** | Rol de analista de privacidad que apoya al Oficial de Datos Personales; tono riguroso, empático en respuestas a titulares |
| **Instrucciones** | Pasos, reglas y formato de salida en cada `SKILL.md` y sus plantillas |
| **Conocimiento** | Carpeta `knowledge/`: resumen de la Ley 29733, mapa de controles ISO/IEC 27701, escala de riesgos |

## Conocimiento por skill

| Skill | Usa |
|---|---|
| `pims-inventario-datos` | `ley-29733-resumen.md` (datos sensibles, principios), `iso-27701-mapa.md` |
| `pims-dpia` | `escala-riesgos.md`, `iso-27701-mapa.md` |
| `pims-derechos-arco` | `ley-29733-resumen.md` (derechos y plazos) |

## Especialización lograda
- Distingue **hecho / inferencia / dato faltante**.
- Asocia cada brecha o riesgo con un principio legal o control ISO.
- Puntúa riesgos con escala explícita y justificación.
- Redacta respuestas al titular en lenguaje claro.

## Criterios de "skill funcional"
- [ ] Se activa con las frases previstas.
- [ ] Produce la estructura de la plantilla sin omitir secciones.
- [ ] No inventa plazos, artículos ni controles.
- [ ] Marca la información faltante.
- [ ] Funciona con al menos 3 casos distintos (ver `pruebas/`).
