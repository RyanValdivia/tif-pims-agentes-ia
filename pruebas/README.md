# Pruebas de los skills y del agente

**Responsable: Compañero 3** (con apoyo de Ryan para interpretar fallos).

## Cómo probar
1. Abre Claude Code en la raíz del repositorio.
2. Ejecuta el caso: por ejemplo `/pims-analizar examples/entradas/proceso-matricula-academia.md`.
3. Revisa los archivos generados en `salidas/`.
4. Compara contra la lista de verificación de abajo.
5. Anota todo en `registro-pruebas.md` y guarda capturas en `evidencias/` (nombre: `PR-01-skill-dpia.png`).
6. Copia las salidas importantes a `evidencias/` (la carpeta `salidas/` no se versiona).

## Mínimo requerido
3 casos por skill, distintos entre sí (proceso simple, proceso con datos sensibles, entrada con información incompleta).

## Lista de verificación por prueba
- [ ] El skill o agente se activó con la frase o comando esperado.
- [ ] La salida respeta la plantilla (todas las secciones).
- [ ] No inventa plazos, artículos ni controles.
- [ ] Marca `NO INDICADO` cuando falta información.
- [ ] Distingue hechos de inferencias.
- [ ] Cierra con la advertencia de borrador para revisión humana.
- [ ] Los hallazgos coinciden con lo esperado (ver `docs/06-proyecto-agentico.md`).

## Reglas
- Usar solo datos ficticios.
- Un fallo que se repite se reporta como *issue* en el repositorio para que Ryan lo corrija.
