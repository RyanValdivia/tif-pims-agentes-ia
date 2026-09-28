---
name: pims-inventario-datos
description: Inventaria los datos personales de un proceso, formulario, contrato o sistema y genera el Registro de Actividades de Tratamiento (RAT) del PIMS. Úsalo cuando se pida identificar datos personales, clasificar datos sensibles, armar un RAT o inventario de tratamientos, o revisar qué datos recoge un documento o proceso, aunque no se diga "RAT".
---

# Skill: Inventario de datos personales y RAT

Convierte la descripción de un proceso o documento en un **RAT** (Registro de Actividades de Tratamiento) alineado a la Ley N.° 29733 y a ISO/IEC 27701 (control A.7.2.8, registros de tratamiento).

## Cuándo se activa
- "¿Qué datos personales recoge este formulario / proceso / sistema?"
- "Arma el RAT / inventario de tratamientos de ..."
- "¿Hay datos sensibles en ...?"
- Otro skill o el agente `pims-orquestador` lo invoca como primer paso del flujo.

## Entradas
Una de estas: texto pegado, ruta a un archivo (`examples/entradas/...`), o descripción oral del proceso.
Si falta información clave (finalidad, quién recibe los datos, cuánto tiempo se guardan), **no la inventes**: márcala como `NO INDICADO` y lístala en "Preguntas pendientes".

## Pasos
1. **Leer y delimitar.** Identifica cada actividad de tratamiento distinta (ej. "inscripción", "facturación", "videovigilancia"). Una fila del RAT por actividad.
2. **Extraer datos personales.** Lista cada dato que identifica o hace identificable a una persona. Clasifícalos con `knowledge/ley-29733-resumen.md` (sección "Datos sensibles"):
   - identificativos, contacto, académicos/laborales, económicos/financieros, de localización, imagen/voz, **sensibles** (salud, biométricos, ingresos económicos, origen racial, convicciones, vida sexual, etc.).
3. **Identificar titulares.** Categorías de personas (alumnos, clientes, empleados, menores de edad, etc.). Marca si hay **menores de edad**.
4. **Finalidad y base legitimadora.** ¿Para qué se usan los datos? ¿Hay consentimiento u otra base (ejecución de contrato, obligación legal)? Si la finalidad es vaga, anótalo como brecha.
5. **Destinatarios y transferencias.** Encargados de tratamiento, terceros, transferencia transfronteriza (nube, proveedores en el extranjero).
6. **Conservación y seguridad.** Plazo de conservación, dónde se almacenan, medidas mencionadas (cifrado, control de acceso, etc.).
7. **Detectar brechas** contra los principios de la ley (finalidad, proporcionalidad/minimización, consentimiento, seguridad). Ver `knowledge/iso-27701-mapa.md` para el control ISO asociado a cada brecha.
8. **Evaluar señales de DPIA.** Si se cumple alguna, recomienda ejecutar `pims-dpia` (lista abajo).
9. **Entregar** usando `plantilla-rat.md` (en esta carpeta) y guardar en `salidas/rat-<slug-del-proceso>.md`.

## Señales que disparan un DPIA
- Datos sensibles o de menores de edad.
- Tratamiento a gran escala.
- Biometría, geolocalización continua o monitoreo sistemático.
- Perfilado o decisiones automatizadas con efecto sobre la persona.
- Transferencia transfronteriza o uso de tecnología nueva (IA, reconocimiento facial).

## Reglas
- Distingue **hecho** (lo que dice el documento) de **inferencia** (lo que tú deduces). Marca las inferencias.
- No afirmes que algo cumple la ley; indica "sin evidencia de cumplimiento" o "brecha probable".
- Usa solo datos ficticios en ejemplos y pruebas.
- Cierra con: *"Borrador de apoyo. Debe validarlo el Oficial de Datos Personales / responsable del PIMS."*
