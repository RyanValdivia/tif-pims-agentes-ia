# Etapa 6 — Proyecto agéntico

**Objetivo:** integrar todo en una solución funcional. **Resultado: proyecto agéntico.**

## Solución integrada

| Capa | Componentes |
|---|---|
| Conocimiento | `knowledge/` |
| Skills | `pims-inventario-datos`, `pims-dpia`, `pims-derechos-arco` |
| Agente | `pims-orquestador` |
| Automatización | Comando `/pims-analizar` |
| Casos de prueba | `examples/entradas/` |
| Resultados | `salidas/` |

## Escenarios de demostración

### Escenario A — Análisis de un proceso
```
/pims-analizar examples/entradas/proceso-matricula-academia.md
```
Resultado esperado: RAT con datos sensibles y de menores señalados, brechas (casilla premarcada, contraseña compartida, sin plazo de conservación, transferencia a terceros, proveedor sin contrato), recomendación de DPIA, DPIA con riesgos puntuados, informe consolidado.

### Escenario B — Solicitud de un titular
```
/pims-analizar examples/entradas/solicitud-arco-ejemplo.md
```
Resultado esperado: solicitud clasificada (información/acceso, cancelación, oposición y revocación del consentimiento para publicidad), verificación pendiente de identidad, plazos con advertencia de verificación, checklist interno, borrador de respuesta y sospecha de tratamiento sin consentimiento (comparte con terceros).

## Criterios de éxito

| Criterio | Cómo se verifica |
|---|---|
| El flujo completo corre sin intervención intermedia | Escenario A |
| Las salidas siguen las plantillas | Revisión contra `plantilla-*.md` |
| No hay plazos o artículos inventados | Revisión manual, buscar `[VERIFICAR]` |
| El agente enruta bien | Escenarios A y B llevan a caminos distintos |
| Los hallazgos coinciden con los defectos sembrados en el caso | Comparar con la lista del Escenario A |

## Limitaciones
- Base de conocimiento en borrador: requiere validación con las fuentes oficiales.
- Analiza solo lo que dice el documento; no audita sistemas reales.
- No sustituye al Oficial de Datos Personales ni asesoría legal.
- Pruebas con casos ficticios.

## Trabajo futuro
- Skill de gestión de brechas de seguridad.
- Skill de revisión de contratos con encargados de tratamiento.
- Integración con formularios o correo real.
