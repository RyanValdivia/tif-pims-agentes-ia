# ISO/IEC 27701 — Mapa de controles para los skills

> **BORRADOR — verificar numeración con la edición que use el grupo** (ISO/IEC 27701:2019 e ISO/IEC 27701:2025).
> **Responsable de validar: Compañero 2.** Numeración abajo: edición 2019, Anexo A (responsable del tratamiento).

ISO/IEC 27701 extiende ISO/IEC 27001 y 27002 con requisitos de privacidad: eso es el **PIMS**.

## Controles del Anexo A (responsable / PII controller)

### A.7.2 Condiciones de recogida y tratamiento
| Control | Tema | Lo usa el skill |
|---|---|---|
| A.7.2.1 | Identificar y documentar la finalidad | inventario |
| A.7.2.2 | Identificar la base legal | inventario |
| A.7.2.3 / A.7.2.4 | Determinar y registrar el consentimiento | inventario |
| A.7.2.5 | Evaluación de impacto en la privacidad (DPIA) | **dpia** |
| A.7.2.6 | Contratos con encargados de tratamiento | inventario |
| A.7.2.8 | Registros relacionados con el tratamiento (RAT) | **inventario** |

### A.7.3 Obligaciones hacia los titulares
| Control | Tema | Lo usa el skill |
|---|---|---|
| A.7.3.1 / A.7.3.2 / A.7.3.3 | Determinar y proveer información al titular | arco |
| A.7.3.4 | Mecanismo para modificar o retirar el consentimiento | arco |
| A.7.3.5 | Mecanismo de oposición | arco |
| A.7.3.6 | Acceso, corrección y/o supresión | **arco** |
| A.7.3.7 | Informar a terceros de cambios (rectificación/supresión) | arco |
| A.7.3.8 | Entregar copia de los datos tratados | arco |
| A.7.3.9 | Gestión de solicitudes | **arco** |
| A.7.3.10 | Decisiones automatizadas | dpia |

### A.7.4 Privacidad por diseño y por defecto
| Control | Tema | Lo usa el skill |
|---|---|---|
| A.7.4.1 | Limitar la recogida | inventario, dpia |
| A.7.4.2 | Limitar el tratamiento | dpia |
| A.7.4.3 | Exactitud y calidad | arco |
| A.7.4.4 | Objetivos de minimización | dpia |
| A.7.4.5 | Desidentificación y supresión al finalizar | dpia |
| A.7.4.7 | Retención | inventario, dpia |
| A.7.4.8 | Eliminación | dpia, arco |
| A.7.4.9 | Controles de transmisión | dpia |

### A.7.5 Compartir, transferir y divulgar
| Control | Tema | Lo usa el skill |
|---|---|---|
| A.7.5.1 | Base para transferencias entre jurisdicciones | inventario, dpia |
| A.7.5.3 | Registros de transferencias | inventario |
| A.7.5.4 | Registros de divulgación a terceros | inventario |

## Controles de seguridad frecuentes (ISO/IEC 27002, para proponer en DPIA)
Control de acceso, cifrado en tránsito y reposo, registro y monitoreo (logs), respaldo, gestión de proveedores, capacitación, gestión de incidentes, seudonimización.

## Pendientes para el Compañero 2
- [ ] Verificar la numeración con la edición usada y citar la fuente.
- [ ] Agregar el Anexo B (encargado de tratamiento / PII processor) si el caso lo requiere.
- [ ] Agregar una tabla de correspondencia Ley 29733 ↔ ISO 27701.
