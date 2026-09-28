# Registro de pruebas

| ID | Fecha | Skill / agente | Entrada | Resultado esperado | Resultado obtenido | ¿Pasó? | Evidencia | Observaciones |
|---|---|---|---|---|---|---|---|---|
| PR-01 | | pims-inventario-datos | proceso-matricula-academia.md | RAT con sensibles, menores y brechas | | | | |
| PR-02 | | pims-dpia | RAT de PR-01 | DPIA con riesgos puntuados | | | | |
| PR-03 | | pims-derechos-arco | solicitud-arco-ejemplo.md | Clasificación, checklist y borrador de respuesta | | | | |
| PR-04 | 2026-09-28 | pims-orquestador | proceso-matricula-academia.md | Flujo completo hasta informe | RAT (11 brechas, 7 altas), DPIA (2 críticos, 7 altos, 1 medio) e informe. Detectó todos los defectos sembrados | Sí | `evidencias/smoke-2026-09-28/` | Prueba de humo de Ryan (modo no interactivo). Repetir por Compañero 3 |
| PR-05 | 2026-09-28 | pims-orquestador | solicitud-arco-ejemplo.md | Enruta a ARCO, no a inventario | Enrutó a ARCO: 6 derechos, plazos, checklist, 2 borradores, registro. No generó informe consolidado (el flujo no lo prevé para ARCO) | Sí | `evidencias/smoke-2026-09-28/` | Prueba de humo de Ryan. Repetir por Compañero 3 |
