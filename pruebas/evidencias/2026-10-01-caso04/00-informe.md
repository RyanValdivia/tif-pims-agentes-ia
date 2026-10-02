# Informe del incidente — INC-20260930-phishing-bloqueado-cayma

## 1. Estado y reloj
| Campo | Valor |
|---|---|
| Clasificación | **Evento sin incidente**, categoría FRA (intento de phishing) |
| Severidad | **No se evalúa**: no hay brecha de datos personales |
| Hora límite de notificación | **No aplica**: no se cumple el art. III num. 16 ni el art. 34.1 del D.S. 016-2024-JUS |
| Prioridad | P4 Baja |
| Estado | Propuesto para cierre |

## 2. Resumen ejecutivo
37 buzones de la municipalidad recibieron un correo de phishing. El filtro lo marcó, la usuaria lo reportó sin hacer clic y soporte confirmó que nadie accedió al enlace, bloqueó el dominio y eliminó el correo. Los controles funcionaron y no hubo exposición de datos personales. Se recomienda registrar el evento y cerrarlo, después de confirmar que el registro del proxy también cubre los accesos desde dispositivos móviles.

## 3. Decisiones que debe tomar un humano
1. Confirmar la cobertura del registro del proxy (pregunta pendiente 1). Si hay huecos, reabrir el triaje.
2. Aprobar el cierre como evento.

## 4. Entregables
- [01-ficha-incidente.md](01-ficha-incidente.md)
- No se generan la evaluación de severidad, la notificación ni el informe de respuesta y cierre: el flujo termina en el triaje.

## 5. Trazabilidad normativa
| Paso | ISO/IEC 27035-1:2023 | ISO/IEC 27002:2022 | D.S. 016-2024-JUS |
|---|---|---|---|
| Recepción del reporte | Detectar y reportar | 6.8 | — |
| Decisión "evento sin incidente" | Evaluar y decidir | 5.25 | art. III num. 16 (no se cumple la definición) |
| Conservación de la evidencia | — | 5.28 | art. 35 (buena práctica; no es obligatorio sin incidente) |

## 6. Información pendiente
- Cobertura del proxy para dispositivos móviles y acceso remoto.
- Hora exacta de recepción del correo.

---
*Borrador de apoyo. Debe validarlo el Oficial de Datos Personales / responsable de seguridad.*
