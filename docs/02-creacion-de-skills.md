# Etapa 2 — Creación de skills

**Objetivo:** definir activación, estructura y pasos de cada skill.

## Anatomía de un skill

```
.claude/skills/<nombre>/
├── SKILL.md           # frontmatter + instrucciones
└── plantilla-*.md     # formato de salida
```

`SKILL.md` tiene dos partes:

1. **Frontmatter YAML**
   - `name`: identificador (coincide con el nombre de la carpeta).
   - `description`: **qué hace y cuándo activarlo**. Es lo que Claude lee para decidir si usa el skill, así que incluye las frases con las que un usuario lo pediría.
2. **Cuerpo en Markdown:** cuándo se activa, entradas, pasos numerados, reglas, salida.

## Tabla resumen de los skills

| Skill | Se activa cuando... | Entrada | Salida |
|---|---|---|---|
| `pims-inventario-datos` | piden identificar datos personales o armar un RAT | proceso, formulario o documento | `salidas/rat-<slug>.md` |
| `pims-dpia` | piden evaluar riesgos de privacidad o el RAT marca DPIA | RAT o descripción | `salidas/dpia-<slug>.md` |
| `pims-derechos-arco` | llega una solicitud de un titular | texto de la solicitud (+ RAT opcional) | `salidas/arco-<slug>.md` |

## Pasos de cada skill

### pims-inventario-datos
1. Delimitar actividades → 2. Extraer y clasificar datos → 3. Identificar titulares → 4. Finalidad y base legal → 5. Destinatarios y transferencias → 6. Conservación y seguridad → 7. Detectar brechas → 8. Evaluar señales de DPIA → 9. Entregar con plantilla.

### pims-dpia
1. Describir el tratamiento → 2. Necesidad y proporcionalidad → 3. Identificar riesgos → 4. Puntuar (P × I) → 5. Controles existentes → 6. Controles propuestos (ISO 27701) → 7. Riesgo residual → 8. Decisión → 9. Entregar con plantilla.

### pims-derechos-arco
1. Clasificar el derecho → 2. Verificar requisitos → 3. Calcular plazos → 4. Evaluar procedencia → 5. Ubicar datos → 6. Checklist interno → 7. Redactar respuesta → 8. Registrar → 9. Entregar.

## Decisiones de diseño

| Decisión | Motivo |
|---|---|
| Criterios en `knowledge/`, no dentro del `SKILL.md` | Se actualizan en un solo lugar y los tres skills los comparten |
| Plantillas separadas | Formato de salida fijo y fácil de cambiar |
| Marcadores `NO INDICADO` y `[VERIFICAR]` | Evitan que el modelo invente datos, plazos o artículos |
| Cierre obligatorio "borrador para revisión humana" | El PIMS requiere responsabilidad humana |
| `description` con frases de activación | Mejora que el skill se dispare en el momento correcto |
