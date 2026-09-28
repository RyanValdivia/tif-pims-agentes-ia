# Informe consolidado PIMS — Matrícula en línea, Academia Andina Digital

- **Fecha:** 2026-09-28
- **Entrada:** `examples/entradas/proceso-matricula-academia.md` (caso ficticio, sin datos personales reales)
- **Marco:** Ley N.° 29733 e ISO/IEC 27701. Los resúmenes de `knowledge/` están en borrador y marcan puntos `[VERIFICAR]`.

## 1. Resumen ejecutivo
- El proceso trata unos 1 800 titulares al año, con cerca del 40 % de menores, y recoge dos datos sensibles: ingreso familiar y salud o discapacidad.
- Hay 11 brechas en el RAT, 7 de gravedad alta. Las más serias son la contraseña compartida, la carpeta de fotos abierta y el envío de la lista de matriculados a una empresa de reclutamiento sin base evidenciada.
- El DPIA da 2 riesgos críticos (R-01 filtración o acceso no autorizado, R-03 comunicación a un tercero), 7 altos y 1 medio.
- Recomendación: mitigar con plan de acción, y detener ya el envío de la lista y el acceso abierto a las fotos. Con los controles propuestos, el riesgo residual máximo es Medio.
- Es un borrador de apoyo. Varias reglas legales (menores, transferencia, plazos, sanciones) faltan en `knowledge/` y deben verificarse.

## 2. Hallazgos principales

**Datos sensibles y menores**
- Sensibles: ingreso familiar mensual y condición de salud o discapacidad. No hay evidencia de consentimiento expreso ni por escrito, que la ley exige `[VERIFICAR]`.
- Menores: unos 720 al año. No hay evidencia de consentimiento del apoderado ni de aviso adaptado.

**Brechas de mayor gravedad (RAT)**
- B-01: casilla de publicidad marcada por defecto, por lo que el consentimiento no es válido.
- B-02: lista de matriculados enviada a una empresa de reclutamiento, con finalidad distinta a la matrícula y sin contrato ni consentimiento evidenciados.
- B-03: datos sensibles sin consentimiento ni medidas reforzadas evidenciadas.
- B-04 y B-05: contraseña compartida entre 12 personas, hoja sin roles ni trazabilidad, y fotos en carpeta sin restricción.
- B-07: nube extranjera con términos de uso estándar, sin contrato de encargo y con transferencia transfronteriza.
- B-09: sin evidencia de aviso de privacidad ni de tratamiento reforzado para menores.
- Otras brechas, de gravedad media: sin plazo de conservación (B-06), recolección excesiva (B-08), comprobante con cuentas de terceros (B-10) y sin canal ARCO ni inscripción evidenciada (B-11).

**Riesgos altos y críticos (DPIA)**

| ID | Riesgo | Puntaje | Nivel | Residual previsto |
|---|---|---|---|---|
| R-01 | Filtración o acceso no autorizado a hoja y fotos | 20 | Crítico | 8 (Medio) |
| R-03 | Comunicación a la empresa de reclutamiento sin base | 20 | Crítico | 6 (Medio) |
| R-02 | Acceso excesivo del personal interno | 16 | Alto | 8 (Medio) |
| R-05 | Datos sensibles sin consentimiento expreso ni información | 16 | Alto | 6 (Medio) |
| R-07 | Transferencia transfronteriza sin contrato | 16 | Alto | 6 (Medio) |
| R-04 | Publicidad con consentimiento inválido | 15 | Alto | 3 (Bajo) |
| R-09 | Recolección excesiva | 15 | Alto | 4 (Bajo) |
| R-08 | Conservación indefinida | 12 | Alto | 6 (Medio) |
| R-10 | No poder ejercer derechos | 12 | Alto | 4 (Bajo) |
| R-06 | Uso de ingreso o salud para discriminar en becas | 8 | Medio | 4 (Bajo) |

## 3. Entregables generados
- RAT: `C:\Users\LENOVO\Documents\workspace\unsa\AS\tif\salidas\rat-matricula-academia.md`
- DPIA: `C:\Users\LENOVO\Documents\workspace\unsa\AS\tif\salidas\dpia-matricula-academia.md`
- Informe consolidado: `C:\Users\LENOVO\Documents\workspace\unsa\AS\tif\salidas\informe-matricula-academia.md`

## 4. Acciones recomendadas priorizadas
Los plazos son sugerencias de priorización, no plazos legales.

1. **Inmediato:** suspender la entrega de la lista a la empresa de reclutamiento (R-03).
2. **Inmediato:** restringir la carpeta de fotos, cambiar la contraseña compartida y auditar quién accedió (R-01, R-02). Si se detecta acceso indebido, escalar a gestión de brechas.
3. **Corto plazo (~30 días):** cuentas individuales con MFA, acceso por rol, registro de accesos y cifrado. Separar los campos de salud e ingreso.
4. **Corto plazo (~30 días):** rediseñar el formulario con casilla de publicidad desmarcada, formularios separados por finalidad, ingreso por rangos y comprobante enmascarado.
5. **Corto plazo (~30 días):** aviso de privacidad y consentimientos, con versión para apoderados de menores.
6. **Mediano plazo (~60 días):** contrato de encargo con el proveedor de nube, con país identificado y transferencia registrada.
7. **Mediano plazo (~60 días):** política de conservación y depuración, canal ARCO, criterio documentado de becas, y revisión del consentimiento ya recogido e inscripción del banco de datos.

## 5. Información pendiente de confirmar
- País del proveedor de nube, ubicación de los datos y si hay cifrado en reposo.
- Qué campos ve cada una de las 12 personas, y si ven salud e ingreso.
- Contenido, frecuencia y contrato de la lista enviada a la empresa de reclutamiento, y si incluye menores.
- Si existe aviso de privacidad, consentimiento del apoderado, canal ARCO, inscripción del banco de datos o incidentes previos.
- Si la beca o el ajuste de aulas se decide de forma automatizada.
- Plazos legales o contables que obliguen a conservar datos, y para qué se usa la foto además del carné.
- **Marco legal por verificar** (`knowledge/` está en borrador): requisito de forma del consentimiento para datos sensibles, reglas para menores, reglas de transferencia transfronteriza, obligación de inscripción, notificación de incidentes, sanciones, y si hay que consultar a la autoridad en casos de datos sensibles de menores.
- Las bases legitimadoras de matrícula, pago y reclutamiento, y los puntajes del DPIA, son inferencias mías. Deben confirmarse con la academia.

---
*Borrador de apoyo. Debe validarlo el Oficial de Datos Personales / responsable del PIMS.*
