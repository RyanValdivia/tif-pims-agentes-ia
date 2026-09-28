# Reparto del equipo

| Persona | Qué hace |
|---|---|
| **Ryan** | Los 3 skills (`SKILL.md`), diseño del agente, orquestación, proyecto agéntico integrado y pruebas técnicas |
| **Compañero 2** | **Investigación:** ley 29733, ISO 27701, casos de uso PIMS. Reúne plantillas y documentos de ejemplo (base de conocimiento). Redacta **marco teórico** y **conclusiones** del informe |
| **Compañero 3** | **Pruebas y presentación:** prueba cada skill con 3 casos reales y guarda capturas. Arma las **diapositivas**, el **guion de demo** y da formato al informe |

## Tareas concretas

### Compañero 2 — Investigación
- [ ] Completar y validar `knowledge/ley-29733-resumen.md`: resolver cada `[VERIFICAR]` con el texto oficial y citar artículo.
- [ ] Validar `knowledge/iso-27701-mapa.md` con la edición de la norma que use el grupo.
- [ ] Agregar sanciones, transferencia transfronteriza y menores de edad.
- [ ] Redactar `docs/informe/01-marco-teorico.md` (PIMS, ISO 27701, Ley 29733, agentes y skills de IA).
- [ ] Redactar `docs/informe/04-conclusiones.md` cuando el proyecto esté probado.
- [ ] Buscar 2 casos ficticios adicionales para probar los skills y dejarlos en `examples/entradas/`.

### Compañero 3 — Pruebas y presentación
- [ ] Leer `pruebas/README.md` y ejecutar los skills con los casos (`examples/entradas/` y los nuevos).
- [ ] Llenar `pruebas/registro-pruebas.md` y guardar capturas en `pruebas/evidencias/`.
- [ ] Reportar fallos y mejoras a Ryan (issues en el repositorio).
- [ ] Armar diapositivas y el guion de demo en `presentacion/`.
- [ ] Dar formato final al informe (`docs/informe/`).

### Ryan — Construcción
- [x] Estructura del repositorio, skills, agente y comando.
- [x] Documentación de las etapas del TIF.
- [ ] Probar los skills y ajustar según las pruebas.
- [ ] Integrar el conocimiento validado por el Compañero 2.
- [ ] Escribir `docs/informe/02-desarrollo.md` y `03-resultados.md`.
- [ ] Sesión de 30 min para explicar todo el proyecto al equipo.

## Reglas de trabajo en el repositorio
- Cada quien trabaja en su rama: `ryan/...`, `comp2/...`, `comp3/...`. Se une a `main` con Pull Request.
- No subir datos personales reales. Solo casos ficticios.
- Mensajes de commit claros: `docs: agrega marco teórico`, `test: registra pruebas del skill dpia`.

## Reunión de sincronización
Semanal, 20 minutos: qué hice, qué haré, qué me bloquea.

## Mensaje para el grupo (copiar y pegar)
> Chicos, ya tengo armada la estructura del TIF en el repositorio **[enlace]**. Yo construyo los skills y el agente con Claude. Necesito su ayuda en:
> - **[Compañero 2]:** investigar ley 29733 e ISO 27701. Ya hay borradores en `knowledge/` con marcas `[VERIFICAR]` que hay que confirmar. También el marco teórico y las conclusiones del informe. Fecha: **[X]**
> - **[Compañero 3]:** probar los skills (3 casos c/u con capturas), diapositivas, guion de demo y formato del informe. Fecha: **[Y]**
>
> Lean el `README.md` y hagamos una reunión corta el **[día/hora]** para explicarles cómo funciona, así todos podemos exponer.
