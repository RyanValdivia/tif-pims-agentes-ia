# Etapa 4 — Diseño del agente

**Objetivo:** definir objetivo, datos, contexto y herramientas del agente. Definición en `.claude/agents/pims-orquestador.md`.

## Ficha del agente

| Elemento | Definición |
|---|---|
| **Nombre** | `pims-orquestador` |
| **Objetivo** | Convertir un proceso, documento o solicitud de un titular en entregables PIMS (RAT, DPIA, respuesta ARCO, informe) listos para revisión humana |
| **Usuario** | Oficial de Datos Personales o responsable del PIMS |
| **Entradas** | Archivos de proceso/documento, o texto de una solicitud de titular |
| **Datos / conocimiento** | `knowledge/` (ley, ISO 27701, escala de riesgos), `examples/entradas/` |
| **Contexto** | Organización peruana sujeta a Ley 29733; objetivo de alinearse a ISO/IEC 27701 |
| **Herramientas** | `Read`, `Glob`, `Grep` (leer); `Write` (solo en `salidas/`). Sin red ni ejecución de comandos |
| **Skills** | `pims-inventario-datos`, `pims-dpia`, `pims-derechos-arco` |
| **Salidas** | Archivos Markdown en `salidas/` + resumen ejecutivo |

## Diferencia entre skill y agente

| | Skill | Agente |
|---|---|---|
| Alcance | Una tarea concreta | Un objetivo que requiere varias tareas |
| Decisión | Sigue pasos fijos | **Decide** qué skills usar según la entrada |
| Estado | Sin memoria entre ejecuciones | Encadena resultados (RAT → DPIA → informe) |

## Autonomía y límites

| Puede hacer solo | Requiere humano |
|---|---|
| Leer entradas y conocimiento | Validar todo resultado |
| Ejecutar skills en el orden que corresponda | Decisiones legales o de aceptación de riesgo |
| Guardar borradores en `salidas/` | Enviar respuestas a titulares |
| Pedir una aclaración corta | Anonimizar datos reales antes de procesarlos |

## Riesgos del propio agente y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Inventar plazos o artículos | Marcadores `[VERIFICAR]`; regla de no inventar |
| Procesar datos personales reales | Aviso y sugerencia de anonimizar |
| Confiar en la respuesta sin revisarla | Cierre obligatorio "borrador para revisión humana" |
| Escribir fuera de la carpeta prevista | Regla y herramientas limitadas |
