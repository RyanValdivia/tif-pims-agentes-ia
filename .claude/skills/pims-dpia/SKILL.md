---
name: pims-dpia
description: Genera una Evaluación de Impacto en la Privacidad (DPIA/EIPD) para un tratamiento de datos personales. Identifica riesgos para los titulares, los puntúa con matriz probabilidad × impacto, propone controles ISO/IEC 27701 y calcula el riesgo residual. Úsalo cuando se pida evaluar riesgos de privacidad, hacer un DPIA/EIPD/PIA, o cuando el RAT recomiende evaluación de impacto.
---

# Skill: DPIA / Evaluación de impacto en la privacidad

Evalúa los riesgos **para las personas titulares de los datos** (no para la empresa) y propone cómo tratarlos. Se apoya en ISO/IEC 27701 (control A.7.2.5, evaluación de impacto de privacidad).

## Cuándo se activa
- "Haz un DPIA / EIPD / PIA de ..."
- "¿Qué riesgos de privacidad tiene este tratamiento?"
- El skill `pims-inventario-datos` marcó "Requiere DPIA: Sí".

## Entradas
Preferible: un RAT generado por `pims-inventario-datos` (`salidas/rat-*.md`).
Alternativa: descripción libre del tratamiento. Si falta contexto (volumen de titulares, proveedores, tecnologías), pregunta o márcalo `NO INDICADO`.

## Pasos
1. **Describir el tratamiento.** Naturaleza, alcance (volumen, categorías, menores), contexto y finalidad.
2. **Necesidad y proporcionalidad.** ¿Cada dato es necesario para la finalidad? ¿Existe una alternativa menos intrusiva? (minimización).
3. **Identificar riesgos.** Usa el catálogo de `knowledge/escala-riesgos.md` (sección "Catálogo de amenazas") como punto de partida; agrega los propios del caso.
4. **Puntuar.** Probabilidad (1-5) × Impacto en el titular (1-5), con la escala de `knowledge/escala-riesgos.md`. Nivel: Bajo / Medio / Alto / Crítico.
5. **Controles existentes.** Solo los que el documento evidencie. No supongas controles.
6. **Controles propuestos.** Para cada riesgo Medio o superior, propone medidas concretas y asócialas a un control de `knowledge/iso-27701-mapa.md`.
7. **Riesgo residual.** Re-puntúa asumiendo que los controles propuestos se implementan.
8. **Decisión recomendada.** Aceptar / Mitigar / Evitar el tratamiento / Consultar a la autoridad si el riesgo residual sigue siendo Alto o Crítico.
9. **Entregar** con `plantilla-dpia.md` (en esta carpeta) y guardar en `salidas/dpia-<slug>.md`.

## Reglas
- Cada riesgo debe tener: **amenaza → causa → consecuencia para el titular**.
- La puntuación debe ser reproducible: escribe brevemente por qué elegiste ese número.
- No mezcles riesgos de seguridad de la empresa (ej. multa) con riesgos al titular (ej. suplantación de identidad). Los primeros van en una nota aparte.
- Cierra con: *"Borrador de apoyo. La decisión final la toma el responsable del tratamiento con el Oficial de Datos Personales."*
