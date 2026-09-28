---
description: Ejecuta el flujo PIMS completo (inventario, DPIA si aplica, informe) sobre un archivo o solicitud
argument-hint: <ruta-de-archivo | texto de la solicitud>
---

Usa el agente `pims-orquestador` para procesar esta entrada:

$ARGUMENTS

Si es una ruta, léela primero. Sigue el flujo de decisión del agente, guarda todos los resultados en `salidas/` y termina mostrando el resumen ejecutivo del informe consolidado con las rutas de los archivos generados.
