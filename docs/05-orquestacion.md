# Etapa 5 — Orquestación y automatización

**Objetivo:** coordinar skills, agente y flujos.

## Niveles de orquestación

| Nivel | Mecanismo | Qué automatiza |
|---|---|---|
| 1. Skill individual | Frase del usuario activa el skill | Una tarea |
| 2. Agente | `pims-orquestador` decide y encadena skills | Flujo completo según la entrada |
| 3. Comando | `/pims-analizar <entrada>` | Lanza el agente con un solo paso |

## Reglas de enrutamiento

| Entrada | Secuencia |
|---|---|
| Proceso o documento | `pims-inventario-datos` → (si hay señales de DPIA) `pims-dpia` → informe consolidado |
| Solicitud de titular | `pims-derechos-arco` (consulta el RAT si existe) |
| Solicitud que parece un incidente | ARCO + recomendación de escalar a gestión de brechas |
| Ambigua | Una pregunta de aclaración |

## Traspaso de datos entre skills
Los skills se comunican por **archivos** en `salidas/`:

```
inventario  ──►  salidas/rat-<slug>.md   ──►  dpia
                                          └──►  arco (ubicar datos)
todos       ──►  salidas/informe-<slug>.md
```

Ventajas: cada paso es auditable, se puede retomar un flujo a medias y el humano puede corregir el RAT antes de que el DPIA lo use.

## Puntos de control humano
1. Tras el RAT: el usuario puede corregir o completar información faltante.
2. Tras el DPIA: decisión de aceptar / mitigar / evitar el riesgo.
3. Antes de enviar cualquier respuesta a un titular.

## Automatizaciones futuras (fuera del alcance actual)
- Ejecución programada de revisiones del RAT.
- Conexión a un formulario o correo de solicitudes ARCO.
- Alertas cuando venzan los plazos de atención.
