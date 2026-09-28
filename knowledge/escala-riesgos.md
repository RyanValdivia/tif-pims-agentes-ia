# Escala de riesgos para el DPIA

Riesgo = **Probabilidad (P) × Impacto (I)**, ambos de 1 a 5. El impacto se mide **sobre el titular de los datos**.

## Probabilidad
| Valor | Nivel | Criterio |
|---|---|---|
| 1 | Muy baja | Casi imposible; sin antecedentes |
| 2 | Baja | Poco probable en un año |
| 3 | Media | Puede ocurrir en un año |
| 4 | Alta | Probable varias veces al año |
| 5 | Muy alta | Ocurre o es casi seguro |

## Impacto en el titular
| Valor | Nivel | Criterio |
|---|---|---|
| 1 | Insignificante | Molestia mínima |
| 2 | Menor | Inconvenientes superables sin esfuerzo |
| 3 | Moderado | Dificultades significativas, superables (ej. spam dirigido, trámite adicional) |
| 4 | Mayor | Daño serio (ej. suplantación de identidad, pérdida económica, discriminación) |
| 5 | Crítico | Daño grave o irreversible (ej. exposición de salud, riesgo físico, daño a menores) |

## Nivel de riesgo
| Puntaje | Nivel | Acción |
|---|---|---|
| 1 – 4 | Bajo | Aceptar y monitorear |
| 5 – 9 | Medio | Mitigar en plazo razonable |
| 10 – 16 | Alto | Mitigar de forma prioritaria |
| 20 – 25 | Crítico | Evitar o detener hasta mitigar; evaluar consulta a la autoridad |

Valores posibles del producto: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20, 25. El 15 se trata como **Alto**.

## Catálogo de amenazas (punto de partida)
| Amenaza | Consecuencia típica para el titular |
|---|---|
| Acceso no autorizado a los datos | Suplantación, exposición de información privada |
| Pérdida o filtración de datos (brecha) | Fraude, daño reputacional |
| Uso para una finalidad distinta a la informada | Pérdida de control, perfilado no deseado |
| Recolección excesiva de datos | Mayor exposición sin beneficio |
| Conservación más allá de lo necesario | Mayor superficie de exposición, datos desactualizados |
| Transferencia a terceros o al extranjero sin garantías | Pérdida de control, protección inferior |
| Falta de transparencia / consentimiento inválido | No puede ejercer sus derechos |
| Datos inexactos o desactualizados | Decisiones erróneas sobre la persona |
| Reidentificación de datos anonimizados | Exposición de identidad |
| Incapacidad de atender derechos ARCO a tiempo | Vulneración de derechos, reclamos |
| Acceso excesivo de personal interno | Uso indebido, curiosidad |
| Dependencia de proveedor sin contrato de encargo | Tratamiento fuera de control |

## Ejemplo de puntuación justificada
> **R-03 Filtración de la base de alumnos.** P = 3 (base en hoja de cálculo compartida sin control de acceso; sin evidencia de cifrado). I = 4 (incluye DNI y ingresos familiares: riesgo de suplantación y fraude). Puntaje 12 → **Alto**.
