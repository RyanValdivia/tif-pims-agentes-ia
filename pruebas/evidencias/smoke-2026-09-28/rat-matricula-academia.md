# RAT — Matrícula en línea, Academia Andina Digital

- **Fecha:** 2026-09-28
- **Responsable del tratamiento:** Academia Andina Digital (caso ficticio)
- **Fuente analizada:** `examples/entradas/proceso-matricula-academia.md`
- **Marco:** Ley N.° 29733 e ISO/IEC 27701 (A.7.2.8). Los puntos marcados `[VERIFICAR]` dependen de `knowledge/`, que está en borrador.
- **Convención:** **[H]** = hecho (lo dice el documento). **[I]** = inferencia mía, por confirmar.

## 1. Registro de actividades de tratamiento

| ID | Actividad | Titulares | Datos personales | ¿Sensibles? | Finalidad | Base legitimadora | Destinatarios / transferencias | Conservación | Medidas de seguridad |
|---|---|---|---|---|---|---|---|---|---|
| T-01 | Matrícula y creación de cuenta en el aula virtual | Estudiantes (secundaria y universitarios, ~40 % menores de edad); apoderados de los menores | Estudiante: nombres y apellidos, DNI, fecha de nacimiento, dirección, correo, celular, colegio o universidad y grado, foto carné. Apoderado: nombres, DNI y celular | No, salvo que la foto se use con fines biométricos (NO INDICADO) | Matricular al estudiante y crear su cuenta [H] | NO INDICADO. [I] Ejecución de la relación con el alumno. Para menores hay que definir quién consiente (apoderado) | Personal administrativo (12 personas) [H]. Proveedor de nube extranjero, sin contrato de encargo [H]. País del proveedor: NO INDICADO | "Mientras exista la academia" [H]. No hay plazo definido | Hoja de cálculo en la nube con contraseña compartida [H]. Fotos en carpeta compartida sin restricción de acceso [H]. Sin evidencia de cifrado ni logs |
| T-02 | Evaluación de becas según ingreso familiar | Estudiantes y, de forma indirecta, su grupo familiar (incluye menores) | Ingreso familiar mensual | **Sí**: ingresos económicos (ley 29733, datos sensibles) | Calcular becas [H] | NO INDICADO. Sin evidencia de consentimiento por escrito, que la ley exige para datos sensibles `[VERIFICAR]` | Igual que T-01: 12 personas y proveedor de nube [H] | Sin plazo [H] | Igual que T-01. El dato está en la misma hoja compartida [I] |
| T-03 | Adaptación de aulas según salud o discapacidad | Estudiantes (incluye menores) | Condición de salud o discapacidad (campo opcional) | **Sí**: salud | "Para adaptar las aulas" [H] | NO INDICADO. El campo es opcional, pero no hay evidencia de consentimiento expreso ni por escrito `[VERIFICAR]` | Igual que T-01. Si los 12 usuarios ven este campo, hay acceso excesivo [I] | Sin plazo [H] | Igual que T-01. Sin separación del dato de salud [I] |
| T-04 | Publicidad de nuevos cursos por correo y WhatsApp | Estudiantes y apoderados (contacto) [I] | Correo y celular (y nombre) | No | Marketing [H] | Consentimiento, con casilla marcada por defecto [H]. **No es consentimiento válido** (debe ser libre, previo, expreso, informado e inequívoco) | Canales de correo y WhatsApp. WhatsApp implica un tercero, posiblemente en el extranjero [I] | Sin plazo [H] | Sin evidencia |
| T-05 | Comunicación de la lista de matriculados a una empresa aliada de reclutamiento | Estudiantes matriculados, incluidos menores [I]: la lista podría incluirlos | Contenido de la "lista de matriculados": NO INDICADO. Como mínimo, nombres [I] | Depende del contenido de la lista: NO INDICADO | Reclutamiento de talento, ajena a la matrícula [H] | NO INDICADO. Sin evidencia de consentimiento específico | Empresa aliada. Sin evidencia de contrato ni de cláusulas [H: no se mencionan] | NO INDICADO (en poder del tercero) | NO INDICADO |
| T-06 | Recepción y validación del pago | Estudiantes, apoderados o quien pague [I] | Captura del depósito: nombre y número de cuenta del pagador | No es sensible por ley, pero es dato económico y financiero de alto riesgo | Confirmar el pago de la matrícula [I] | [I] Ejecución de la relación. Por confirmar | Igual que T-01 | Sin plazo [H] | Igual que T-01. Las capturas parecen estar en la misma carpeta o hoja [I] |

## 2. Clasificación de datos

| Categoría | Datos encontrados |
|---|---|
| Identificativos | Nombres y apellidos, DNI, fecha de nacimiento (estudiante y apoderado) |
| Contacto | Dirección, correo electrónico, celular |
| Académicos | Colegio o universidad de procedencia, grado |
| Económicos y financieros | Comprobante de pago (nombre y número de cuenta del pagador). El ingreso familiar se cuenta como sensible |
| Imagen | Foto tipo carné |
| Sensibles | Ingreso familiar mensual (ingresos económicos). Condición de salud o discapacidad (salud) |
| Biométricos | No indicados. La foto no es biométrica salvo que se use para reconocimiento facial (NO INDICADO) |
| Localización | Dirección postal. No hay geolocalización |
| Menores de edad | **Sí**: ~40 % de ~1 800 estudiantes por año, unos 720 menores anuales [I: cálculo aproximado] |
| Terceros (no son estudiantes) | Apoderados, pagadores del comprobante y núcleo familiar (por el ingreso) |

## 3. Brechas detectadas

| # | Brecha | Principio / control afectado | Gravedad | Recomendación |
|---|---|---|---|---|
| B-01 | La casilla de publicidad viene marcada por defecto, por lo que el consentimiento no es libre ni inequívoco | Consentimiento. ISO A.7.2.3 / A.7.2.4 | Alta | Casilla desmarcada y separada de la matrícula. Registrar la prueba del consentimiento. Revisar el consentimiento ya recogido |
| B-02 | La lista de matriculados se comparte con una empresa de reclutamiento. Es una finalidad distinta a la de matrícula, sin base ni consentimiento evidenciado. Puede incluir menores | Finalidad, consentimiento. ISO A.7.2.1, A.7.5.4 | Alta | Suspender el envío hasta contar con consentimiento específico y opcional (de apoderado en el caso de menores). Documentar el contrato y el registro de divulgación |
| B-03 | Datos sensibles (ingreso familiar y salud) sin evidencia de consentimiento por escrito ni de medidas reforzadas | Consentimiento, seguridad. ISO A.7.2.3, A.7.2.4 `[VERIFICAR requisito de forma]` | Alta | Consentimiento expreso y por escrito para cada finalidad. Separar y restringir el acceso a estos campos |
| B-04 | Contraseña compartida y hoja de cálculo abierta a 12 personas, sin control por rol, trazabilidad ni evidencia de cifrado | Seguridad. ISO/IEC 27002 (control de acceso, logs) | Alta | Cuentas individuales con MFA, acceso por rol (mínimo privilegio), registro de accesos |
| B-05 | Fotos en carpeta compartida sin restricción de acceso | Seguridad. ISO/IEC 27002 | Alta | Restringir el acceso de inmediato y auditar quién tuvo acceso |
| B-06 | No hay plazo de conservación ("mientras exista la academia") | Finalidad y proporcionalidad. ISO A.7.4.7, A.7.4.8 | Media | Definir plazos por categoría de dato y un procedimiento de eliminación |
| B-07 | El proveedor de nube solo tiene términos de uso estándar, sin contrato de encargo. Es extranjero, por lo que hay transferencia transfronteriza | Seguridad, nivel de protección adecuado. ISO A.7.2.6, A.7.5.1, A.7.5.3 `[VERIFICAR reglas de transferencia]` | Alta | Contrato o cláusulas de encargo. Identificar país y ubicación de los datos. Registrar la transferencia |
| B-08 | Minimización dudosa: el ingreso familiar es un dato excesivo si la beca no se concede por ese criterio, y la salud se pide para todos aunque es opcional | Proporcionalidad. ISO A.7.4.1 | Media | Pedir estos datos solo a quien solicite beca o adaptación, en un canal aparte |
| B-09 | No hay evidencia de información al titular (aviso de privacidad) ni de tratamiento reforzado para menores | Consentimiento informado, transparencia. ISO A.7.3.1 a A.7.3.3 | Alta | Aviso de privacidad claro, con lenguaje para menores y apoderados. Definir cómo se obtiene el consentimiento del apoderado `[VERIFICAR reglas para menores, pendientes en knowledge]` |
| B-10 | El comprobante de pago contiene datos bancarios de terceros que no son necesarios | Proporcionalidad. ISO A.7.4.1 | Media | Pedir solo el número de operación o enmascarar los datos de cuenta |
| B-11 | No se evidencia inscripción del banco de datos ni procedimiento ARCO | Obligaciones del titular del banco de datos, ARCO. ISO A.7.3.9 `[VERIFICAR vigencia]` | Media | Confirmar el estado del registro y crear un canal para ejercer derechos |

## 4. ¿Requiere DPIA?

- **Recomendación:** **Sí**
- **Motivo (señales detectadas):**
  - Datos sensibles: salud e ingresos económicos.
  - Menores de edad: ~40 %, unos 720 al año.
  - Transferencia transfronteriza, por el proveedor de nube extranjero.
  - Comunicación a terceros con finalidad distinta (reclutamiento).
  - Volumen: ~1 800 titulares al año. Si esto es "gran escala" depende del criterio de la autoridad `[VERIFICAR]`.
  - No hay señales de biometría, geolocalización, perfilado ni decisiones automatizadas. La beca se calcula "según ingreso familiar" y no se sabe si es automática (NO INDICADO).

## 5. Preguntas pendientes
1. Ubicación del proveedor de nube y de sus servidores, y cómo se cumple el requisito de nivel de protección adecuado.
2. Qué campos de la hoja ve cada una de las 12 personas. ¿Ven salud e ingreso?
3. Contenido exacto de la lista enviada a la empresa de reclutamiento, frecuencia, y si hay contrato con ella.
4. Cómo se recoge hoy el consentimiento. ¿Hay aviso de privacidad? ¿Firma el apoderado por los menores?
5. Criterio de las becas: ¿es automatizado o lo decide una persona? ¿Qué se hace con el ingreso familiar de quien no recibe beca?
6. Plazos legales o contables que obliguen a conservar comprobantes y datos académicos.
7. ¿Se usa la foto para algo más que el carné, por ejemplo reconocimiento facial en el aula virtual?
8. ¿Están inscritos los bancos de datos? ¿Existe un canal ARCO? ¿Hubo incidentes previos?
9. Las bases de las actividades T-01, T-05 y T-06 son inferencias mías. Deben confirmarse con la academia.

---
*Borrador de apoyo. Debe validarlo el Oficial de Datos Personales / responsable del PIMS.*
