---
name: pims-derechos-arco
description: Gestiona una solicitud de un titular de datos personales (derechos de acceso, rectificación, cancelación/supresión y oposición, ARCO). Clasifica el derecho, verifica requisitos y plazo, arma el checklist interno y redacta el borrador de respuesta. Úsalo cuando llegue una solicitud, reclamo o consulta de una persona sobre sus datos personales, o cuando se pida un procedimiento de atención ARCO.
---

# Skill: Atención de derechos del titular (ARCO)

Procesa una solicitud de un titular de datos de principio a fin. Se apoya en ISO/IEC 27701 (A.7.3.x, obligaciones hacia los titulares) y en la Ley N.° 29733.

## Cuándo se activa
- "Un usuario pide que borremos sus datos / quiere saber qué datos tenemos de él."
- "Responde esta solicitud ARCO."
- "Arma el procedimiento de atención de derechos."

## Entradas
Texto de la solicitud (correo, formulario, carta). Opcional: RAT en `salidas/rat-*.md` para ubicar dónde están los datos, y fecha de recepción para calcular plazos.

## Pasos
1. **Clasificar el derecho** (uno o varios): Información, Acceso, Rectificación/Actualización, Cancelación/Supresión, Oposición, Revocación del consentimiento. Guía en `knowledge/ley-29733-resumen.md`.
2. **Verificar requisitos formales:** identidad del solicitante (o representante con poder), datos de contacto, descripción clara del pedido. Si falta algo, la respuesta correcta es **solicitar subsanación**, no rechazar.
3. **Calcular plazos** desde la fecha de recepción usando la tabla de `knowledge/ley-29733-resumen.md`. Si no hay fecha, pídela. Recuerda que los plazos están marcados **"verificar en normativa vigente"**: indica esa advertencia en la salida.
4. **Evaluar procedencia.** ¿Hay obligación legal de conservar los datos? ¿La solicitud es manifiestamente infundada? Una negativa siempre debe ser motivada.
5. **Ubicar los datos** (si hay RAT): sistemas, áreas y encargados que deben actuar o ser notificados (control A.7.3.7).
6. **Armar el checklist interno:** qué acción hace cada área y en qué fecha.
7. **Redactar la respuesta** con `plantilla-respuesta.md` (procedente / parcial / improcedente / subsanación).
8. **Registrar** la solicitud en `salidas/registro-arco.md` (una fila por caso: fecha, derecho, estado, plazo límite).
9. **Entregar** en `salidas/arco-<slug>.md`.

## Reglas
- Sé **empático y claro** en el borrador de respuesta; nada de jerga legal innecesaria.
- Nunca reveles datos de otras personas en una respuesta de acceso.
- Nunca confirmes una supresión ya ejecutada: redacta como "se realizará", salvo que el usuario indique lo contrario.
- Si la solicitud parece un **incidente de seguridad** (ej. "alguien usó mis datos"), sugiere escalar al proceso de gestión de brechas.
- Cierra con: *"Borrador de apoyo. Debe revisarlo y firmarlo el Oficial de Datos Personales."*
