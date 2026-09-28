# DPIA — Matrícula en línea, Academia Andina Digital

- **Fecha:** 2026-09-28
- **Responsable del tratamiento:** Academia Andina Digital (caso ficticio)
- **Insumo:** `salidas/rat-matricula-academia.md` (fuente original: `examples/entradas/proceso-matricula-academia.md`)
- **Marco:** Ley N.° 29733 e ISO/IEC 27701 (A.7.2.5). Escala de `knowledge/escala-riesgos.md`. Riesgo = P × I, medido sobre el titular.
- **Convención:** **[H]** = hecho del documento. **[I]** = inferencia por confirmar.

## 1. Descripción del tratamiento

- **Finalidad:** matricular estudiantes y crear su cuenta en el aula virtual. Calcular becas según ingreso familiar. Adaptar aulas según salud o discapacidad. Enviar publicidad por correo y WhatsApp. Compartir la lista de matriculados con una empresa de reclutamiento [H].
- **Categorías de titulares y volumen:** ~1 800 estudiantes por año, con ~40 % de menores (unos 720) [H]. Además, apoderados de menores y pagadores de los comprobantes. El ingreso familiar toca también al núcleo familiar [I].
- **Datos tratados:**
  - Identificativos y de contacto: nombres, DNI, fecha de nacimiento, dirección, correo y celular, del estudiante y del apoderado.
  - Académicos: colegio o universidad y grado.
  - Imagen: foto carné.
  - Financieros: comprobante de pago con nombre y número de cuenta del pagador.
  - **Sensibles: ingreso familiar y condición de salud o discapacidad.**
  - **Menores de edad: ~40 %.**
- **Flujo de los datos:**
  1. **Recogida:** formulario web en una nube de proveedor extranjero [H].
  2. **Uso:** matrícula, beca, adaptación de aulas y publicidad.
  3. **Almacenamiento:** hoja de cálculo en la nube compartida con 12 personas y contraseña compartida. Fotos en carpeta compartida sin restricción [H].
  4. **Destinatarios:** personal administrativo, proveedor de nube y empresa aliada de reclutamiento (esta última recibe la lista de matriculados) [H].
  5. **Eliminación:** no definida, "mientras exista la academia" [H].

## 2. Necesidad y proporcionalidad

| Dato / operación | ¿Necesario para la finalidad? | Alternativa menos intrusiva |
|---|---|---|
| Nombres, DNI, fecha de nacimiento, contacto del estudiante | Sí, para matricular y crear la cuenta. Que el DNI sea imprescindible se debe confirmar [I] | Pedir el DNI solo cuando se emita certificado o se valide la identidad |
| Datos del apoderado (menores) | Sí, para obtener su consentimiento y contactarlo | Limitar el apoderado a nombre, DNI y un medio de contacto, sin datos adicionales |
| Dirección | Dudoso: no se indica un uso [I] | Omitirla, o pedirla solo si hay entregas físicas o certificados |
| Colegio o universidad y grado | Probablemente sí, para ubicar el nivel del curso [I] | Campo opcional |
| Foto carné | Dudoso: el aula virtual no la requiere obligatoriamente [I] | Foto opcional, con almacenamiento restringido |
| Ingreso familiar mensual | **Solo para quien solicita beca.** Pedirlo a todos es excesivo | Formulario aparte para la beca, con rangos de ingreso en vez del monto exacto. Borrarlo tras la decisión |
| Salud o discapacidad | **Solo para quien pide un ajuste.** Pedirlo a todos es excesivo | Preguntar "¿necesita algún ajuste?" sin detallar el diagnóstico, y derivar a un canal confidencial |
| Comprobante de pago con datos de cuenta | No en su totalidad: basta con verificar el pago | Pedir solo el número de operación, o recortar o enmascarar la cuenta |
| Publicidad por correo y WhatsApp | No es necesaria para la matrícula. Requiere consentimiento propio | Opt-in separado, desmarcado y revocable |
| Lista de matriculados a la empresa de reclutamiento | **No** es necesaria para la matrícula. Es una finalidad distinta | Opt-in específico. Compartir solo lo necesario, y nunca datos de menores |
| Conservación "mientras exista la academia" | No es proporcional | Plazos por categoría, con eliminación o desidentificación posterior |

## 3. Matriz de riesgos

| ID | Amenaza | Causa | Consecuencia para el titular | P | I | Puntaje | Nivel | Justificación |
|---|---|---|---|---|---|---|---|---|
| R-01 | Acceso no autorizado o filtración de la hoja de cálculo y de la carpeta de fotos | Contraseña compartida, carpeta de fotos sin restricción, sin evidencia de cifrado ni de registro de accesos [H] | Suplantación de identidad, exposición de salud e ingresos, fraude con datos bancarios y daño a menores | 4 | 5 | 20 | **Crítico** | P=4: contraseña compartida entre varias personas y carpeta abierta, sin ningún control evidenciado. I=5: la misma base junta DNI, datos de menores, salud, ingresos y cuentas bancarias |
| R-02 | Acceso excesivo del personal interno | 12 personas ven todos los campos, sin roles ni trazabilidad [H] | Uso indebido o curiosidad sobre salud e ingresos, discriminación, imposibilidad de saber quién accedió | 4 | 4 | 16 | **Alto** | P=4: no hay control por rol, así que todo acceso es posible y no queda huella. I=4: daño serio por discriminación o exposición de datos sensibles (se deja en 4 y no en 5 porque el actor es interno y conocido) |
| R-03 | Uso para una finalidad distinta, con comunicación a terceros sin base | La lista de matriculados va a una empresa de reclutamiento sin consentimiento evidenciado [H] | Pérdida de control, contacto o perfilado por un tercero, posibles menores involucrados | 5 | 4 | 20 | **Crítico** | P=5: es una práctica declarada, ya ocurre. I=4: pérdida de control con exposición a un tercero desconocido y posible inclusión de menores. No baja a 3 por los menores |
| R-04 | Consentimiento inválido para publicidad | Casilla marcada por defecto [H] | Spam dirigido por correo y WhatsApp, incluso a menores, y sin control de sus datos | 5 | 3 | 15 | **Alto** | P=5: la casilla por defecto hace casi seguro que se envíe sin consentimiento válido. I=3: spam dirigido, según ejemplo de la escala |
| R-05 | Datos sensibles sin consentimiento expreso ni información suficiente | No se evidencia aviso de privacidad ni consentimiento por escrito (salud e ingresos) [H: ausencia de evidencia] | Trato desigual, imposibilidad de ejercer derechos y desconocimiento de para qué se usa su salud | 4 | 4 | 16 | **Alto** | P=4: no hay evidencia de ningún mecanismo. I=4: afecta datos sensibles de titulares, incluidos menores, y el requisito de forma debe verificarse `[VERIFICAR]` |
| R-06 | Uso de ingreso o salud para discriminar o decidir mal en las becas y ajustes | Criterio de beca no documentado y sin límites de uso, acceso amplio [I] | Negación injusta de beca, estigmatización | 2 | 4 | 8 | **Medio** | P=2: no hay evidencia de que ocurra, pero tampoco de que se prevenga. I=4: daño serio por discriminación |
| R-07 | Transferencia transfronteriza y proveedor sin contrato de encargo | Nube extranjera con términos de uso estándar, sin cláusulas de protección de datos [H] | Pérdida de control sobre los datos, protección inferior y proveedor que podría usarlos para otros fines | 4 | 4 | 16 | **Alto** | P=4: la transferencia ya existe y no hay garantías contractuales. I=4: incluye datos sensibles y de menores. País del proveedor NO INDICADO |
| R-08 | Conservación más allá de lo necesario | Retención "mientras exista la academia" [H] | Mayor exposición futura, datos desactualizados, menores que siguen registrados ya adultos | 4 | 3 | 12 | **Alto** | P=4: la retención indefinida es la regla actual, y cada año se acumulan datos. I=3: el daño es moderado y diferido, pero real |
| R-09 | Recolección excesiva de datos | Ingreso y salud pedidos a todos, dirección sin uso claro, comprobante con cuenta completa [H] | Mayor exposición sin beneficio | 5 | 3 | 15 | **Alto** | P=5: el exceso ya ocurre en el formulario actual. I=3: exposición innecesaria de datos, algunos sensibles |
| R-10 | No poder ejercer derechos (información, acceso, supresión, revocación) | No hay procedimiento ARCO ni información al titular evidenciados. Menores y apoderados sin canal claro [H: ausencia de evidencia] | Vulneración de derechos, reclamos, no poder retirar el consentimiento de publicidad o reclutamiento | 4 | 3 | 12 | **Alto** | P=4: sin canal ni proceso, es probable que una solicitud no se atienda a tiempo. I=3: dificultades significativas, superables |

**Nota aparte, riesgos de la organización (no del titular).** Posibles sanciones de la autoridad, daño reputacional para la academia, y dependencia operativa de un proveedor sin contrato. No se puntúan aquí. Los montos y criterios de sanción no están en `knowledge/`: `[VERIFICAR]`.

## 4. Tratamiento de riesgos

| ID | Controles existentes (evidenciados) | Controles propuestos | Control ISO/IEC 27701 | P res. | I res. | Residual | Nivel residual |
|---|---|---|---|---|---|---|---|
| R-01 | Solo una contraseña, compartida y por tanto insuficiente. Ninguno más evidenciado | Cuentas individuales con MFA. Restringir de inmediato la carpeta de fotos y auditar quién tuvo acceso. Cifrado en tránsito y en reposo. Registro de accesos. Sacar los datos sensibles de la hoja general | ISO/IEC 27002 (control de acceso, cifrado, logs). A.7.4.9 (controles de transmisión) | 2 | 4 | 8 | Medio |
| R-02 | Ninguno. Los 12 usuarios comparten credenciales | Acceso por rol y mínimo privilegio: solo Becas ve ingresos, solo un responsable designado ve salud. Vistas o pestañas separadas. Revisión trimestral de accesos. Compromiso de confidencialidad del personal | ISO/IEC 27002 (control de acceso, capacitación). A.7.4.2 | 2 | 4 | 8 | Medio |
| R-03 | Ninguno evidenciado | **Suspender el envío de la lista ya.** Reactivarlo solo con opt-in específico y opcional, sin datos de menores. Contrato y registro de cada entrega | A.7.2.1, A.7.2.3 / A.7.2.4, A.7.5.4 | 2 | 3 | 6 | Medio |
| R-04 | Ninguno. La casilla marcada por defecto es un factor de riesgo, no un control | Casilla desmarcada y separada de la matrícula. Registrar fecha y prueba del consentimiento. Enlace de baja en cada envío. Revisar el consentimiento ya recogido | A.7.2.3 / A.7.2.4, A.7.3.4 | 1 | 3 | 3 | Bajo |
| R-05 | El campo de salud es opcional [H], lo que ayuda pero no basta | Aviso de privacidad claro, con lenguaje para menores y apoderados. Consentimiento expreso y por escrito para salud e ingreso, dado por el apoderado en el caso de menores. Verificar la forma exigida | A.7.2.2, A.7.2.3 / A.7.2.4, A.7.3.1 a A.7.3.3 | 2 | 3 | 6 | Medio |
| R-06 | Ninguno evidenciado | Documentar el criterio de beca. Definir quién decide y quién accede. Prohibir el uso de estos datos para otros fines. Borrar el ingreso tras resolver la beca | A.7.2.1, A.7.4.2, A.7.3.10 (si la decisión es automática, NO INDICADO) | 1 | 4 | 4 | Bajo |
| R-07 | Solo los términos de uso estándar del proveedor | Contrato o cláusulas de encargo. Confirmar país y ubicación de los datos. Registrar la transferencia. Evaluar un proveedor con garantías o región adecuada | A.7.2.6, A.7.5.1, A.7.5.3 `[VERIFICAR reglas de transferencia]` | 2 | 3 | 6 | Medio |
| R-08 | Ninguno | Política de conservación por categoría de dato. Eliminación o desidentificación al vencer el plazo. Depurar los datos actuales | A.7.4.5, A.7.4.7, A.7.4.8 | 2 | 3 | 6 | Medio |
| R-09 | Solo que el campo de salud es opcional | Formularios por finalidad (matrícula, beca, ajuste). Ingreso por rangos. Comprobante con datos de cuenta enmascarados. Quitar la dirección si no tiene uso | A.7.4.1, A.7.4.4 | 2 | 2 | 4 | Bajo |
| R-10 | Ninguno | Canal ARCO con responsable y plazos internos (verificar plazos vigentes). Registro de solicitudes. Procedimiento para informar a terceros (proveedor, reclutadora) de supresiones | A.7.3.6, A.7.3.7, A.7.3.9 | 2 | 2 | 4 | Bajo |

Los residuales suponen que **todos** los controles propuestos se implementan y funcionan. Si no se cumplen, se mantienen los niveles iniciales.

## 5. Decisión recomendada
- [ ] Aceptar   - [x] Mitigar (plan de acción)   - [x] Evitar el tratamiento (parcialmente: R-03, ya y hasta mitigar)   - [ ] Consultar a la autoridad

- **Fundamento:**
  - Hay **2 riesgos críticos** (R-01 y R-03), **7 altos** (R-02, R-04, R-05, R-07, R-08, R-09 y R-10) y 1 medio (R-06). La escala pide para el nivel Crítico evitar o detener hasta mitigar.
  - Recomiendo **detener la comunicación de la lista a la empresa de reclutamiento** y **restringir el acceso a la carpeta de fotos y a la hoja** de inmediato. Lo demás puede seguir con mitigación priorizada.
  - Con los controles propuestos, ningún riesgo queda en Alto o Crítico (máximo 8, Medio). Por eso no recomiendo consultar a la autoridad por ahora.
  - Si la academia no puede implementar R-01, R-03 o R-07, se debe reevaluar la decisión. El Oficial debe **verificar** si existe alguna obligación de consulta previa a la autoridad cuando hay datos sensibles de menores, porque `knowledge/` no lo cubre.

## 6. Plan de acción

Los plazos son **sugerencias de priorización**, no plazos legales.

| Acción | Responsable sugerido | Plazo sugerido | Riesgo(s) que cubre |
|---|---|---|---|
| Suspender la entrega de la lista a la empresa de reclutamiento | Dirección académica y Oficial de Datos Personales | Inmediato | R-03 |
| Restringir la carpeta de fotos, cambiar la contraseña compartida y auditar accesos | TI o administración | Inmediato (primeros días) | R-01, R-02 |
| Cuentas individuales con MFA, roles y registro de accesos | TI | Corto plazo (~30 días) | R-01, R-02 |
| Separar y proteger los campos de salud e ingreso, con cifrado | TI y responsable de Becas | Corto plazo (~30 días) | R-01, R-02, R-05, R-09 |
| Rediseñar el formulario: casilla desmarcada, formularios por finalidad, ingreso por rangos, comprobante enmascarado | Marketing, TI y Oficial | Corto plazo (~30 días) | R-04, R-05, R-09 |
| Redactar aviso de privacidad y modelos de consentimiento, con versión para apoderados | Oficial y Legal | Corto plazo (~30 días) | R-04, R-05, R-10 |
| Contrato de encargo con el proveedor de nube, identificar el país y registrar la transferencia | Legal y Oficial | Mediano plazo (~60 días) | R-07 |
| Política de conservación y depuración de datos antiguos | Oficial y administración | Mediano plazo (~60 días) | R-08 |
| Canal y procedimiento ARCO, con registro de solicitudes | Oficial | Mediano plazo (~60 días) | R-10 |
| Documentar el criterio de beca y de adaptación de aulas | Responsable de Becas | Mediano plazo (~60 días) | R-06 |
| Revisar el consentimiento ya recogido y resolver la inscripción del banco de datos | Oficial y Legal | Mediano plazo (~60 días) | R-04, R-05, R-10 |

## 7. Supuestos e información pendiente
- Se asume que la hoja de cálculo contiene todos los campos, incluidos salud e ingreso, y que los 12 usuarios los ven [I].
- No se sabe el país del proveedor de nube ni si hay cifrado en reposo.
- Contenido, frecuencia y contrato de la lista enviada a la empresa de reclutamiento: NO INDICADO. No se sabe si incluye menores.
- Si la beca o el ajuste de aulas se decide de forma automatizada: NO INDICADO.
- Existencia de aviso de privacidad, consentimiento del apoderado, inscripción del banco de datos e incidentes previos: NO INDICADO.
- Los artículos, plazos, reglas para menores y de transferencia de la Ley 29733 y su reglamento están en `knowledge/` como borrador: `[VERIFICAR]`.
- Los puntajes son mi propuesta razonada. El Oficial puede recalibrarlos con datos reales de incidentes y acceso.

---
*Borrador de apoyo. La decisión final la toma el responsable del tratamiento con el Oficial de Datos Personales.*
