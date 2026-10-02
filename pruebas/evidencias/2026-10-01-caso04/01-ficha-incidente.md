# Ficha de incidente — INC-20260930-phishing-bloqueado-cayma

- **Organización (responsable del tratamiento):** Municipalidad Distrital de Cayma (caso ficticio)
- **Reportado por:** Asistente de la Gerencia de Rentas — ¿Es encargado del tratamiento? No (personal propio)
- **Canal de reporte:** Reenvío del correo sospechoso a soporte

## 1. Línea de tiempo

| Hito | Fecha y hora | Fuente / certeza |
|---|---|---|
| Ocurrencia (recepción del correo) | 2026-09-30, antes de 11:45 | Hecho, hora exacta NO INDICADO |
| Toma de conocimiento | 2026-09-30, 11:45 | Hecho |
| Confirmación de soporte | 2026-09-30, 12:10 | Hecho |
| Hora límite de notificación (48 h, art. 34.1) | **No aplica**: no hay incidente de seguridad de datos personales | Calculada |

## 2. Descripción de lo ocurrido
37 buzones institucionales recibieron un correo que suplantaba a un banco y pedía "validar la cuenta institucional" mediante un enlace. La asistente que reportó no hizo clic. El filtro de correo ya lo había marcado como sospechoso. Soporte verificó en el registro del proxy que **nadie accedió** al dominio, bloqueó el dominio y eliminó el correo de los 37 buzones.

## 3. Decisión de triaje
- **Resultado:** ☒ **Evento sin incidente** ☐ Incidente de seguridad (sin datos personales) ☐ Incidente de seguridad de datos personales (brecha)
- **Fundamento:**
  - Árbol de `knowledge/taxonomia-incidentes.md` §3: no hay indicios de que se vulnerara un control. Al contrario, los controles funcionaron (filtro, usuario capacitado, revisión del proxy).
  - Art. III num. 16, D.S. 016-2024-JUS: no hubo "destrucción, pérdida, alteración ilícita [...] o la comunicación o exposición no autorizada" de datos personales.
  - ISO/IEC 27035-1:2023, fase "Evaluar y decidir", e ISO/IEC 27002:2022, 5.25: el evento se registra y no escala a incidente.

## 4. Clasificación
- **Tipo:** ninguno (no se afectó la confidencialidad, la integridad ni la disponibilidad)
- **Categoría:** FRA — Fraude e ingeniería social (intento de phishing)
- **Entorno digital:** Sí → notificación al CNSD (art. 34.5): **No**, porque no existe un incidente de datos personales que notificar
- **Prioridad:** **P4 Baja**: evento sin impacto

## 5. Datos y titulares afectados

| Categoría de datos | ¿Sensible? | Categoría de titulares | ¿Menores? | N.° aprox. de titulares | Certeza |
|---|---|---|---|---|---|
| Ninguno expuesto | — | — | — | 0 | Hecho (registro del proxy sin accesos) |

## 6. Sistemas, activos y terceros involucrados
- Servicio de correo institucional (37 buzones receptores).
- Filtro antispam/antiphishing y proxy web.

## 7. Medidas ya adoptadas (según el reporte)
- El dominio malicioso se bloqueó.
- El correo se eliminó de los 37 buzones.
- Se revisó el registro del proxy: sin accesos.

## 8. Acciones inmediatas sugeridas
| # | Acción | Objetivo | Responsable sugerido |
|---|---|---|---|
| 1 | Conservar una copia del correo original con cabeceras y del extracto del registro del proxy | Preservar evidencia (ISO/IEC 27002 5.28) por si aparecen variantes | Soporte TI |
| 2 | Confirmar que el registro del proxy cubre todos los equipos y también el acceso desde celulares o fuera de la red institucional | Descartar clics no visibles para el proxy | Soporte TI |
| 3 | Revisar los inicios de sesión del correo de los 37 destinatarios en las 24 h siguientes | Descartar credenciales comprometidas por otra vía | Soporte TI |
| 4 | Agradecer y reconocer el reporte de la asistente | Reforzar la cultura de reporte (ISO/IEC 27002 6.8) | Jefatura / Seguridad |
| 5 | Compartir el indicador (dominio) con el CSIRT o CNSD como inteligencia de amenazas, de forma voluntaria `[VERIFICAR canal]` | Prevención | Responsable de seguridad |

## 9. Preguntas pendientes
1. ¿El registro del proxy cubre los dispositivos móviles y el acceso remoto? Si no lo cubre, la conclusión "nadie hizo clic" es parcial.
2. ¿Hora exacta de recepción del correo?

## 10. Siguiente paso
☒ **Cerrar como evento** (sujeto a confirmar la pregunta 1) ☐ Pasar a `brecha-evaluacion-severidad`

---
*Borrador de apoyo. Debe validarlo el Oficial de Datos Personales / responsable de seguridad.*
