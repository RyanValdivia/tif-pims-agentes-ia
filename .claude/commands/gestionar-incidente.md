---
description: Gestiona un incidente o brecha de datos personales de punta a punta (triaje, severidad, notificación, respuesta y cierre)
argument-hint: <ruta-del-reporte | texto del reporte>
---

Usa el agente `agente-incidentes-brechas` para gestionar este reporte de incidente:

$ARGUMENTS

Si es una ruta, léela primero. Sigue el flujo del agente (ciclo ISO/IEC 27035), guarda todo en `salidas/<ID>/` y termina mostrando: clasificación, severidad, **hora límite de notificación (48 h)**, decisiones humanas pendientes y las rutas de los archivos generados.
