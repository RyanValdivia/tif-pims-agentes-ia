# Atención de solicitud ARCO — ARCO-2026-001

- **Fecha del análisis:** 2026-09-28
- **Fuente:** `examples/entradas/solicitud-arco-ejemplo.md` (caso ficticio; DNI y celular declarados como ficticios, no hace falta anonimizar)
- **RAT usado para ubicar datos:** `salidas/rat-matricula-academia.md`
- **Convención:** **[H]** = hecho (lo dice la solicitud o el RAT). **[I]** = inferencia mía, por confirmar. `[VERIFICAR]` = depende de `knowledge/`, que está en borrador.

> **Alerta de plazos.** Con el cálculo de trabajo de la sección 1, el plazo de Información (8 días hábiles) ya venció el 2026-09-24 y el de Cancelación/Oposición (10 días hábiles) vence **hoy, 2026-09-28**. Hay que responder de inmediato. Los plazos están marcados **"verificar en normativa vigente"**.

## 1. Ficha del caso

| Campo | Valor |
|---|---|
| ID de caso | ARCO-2026-001 |
| Fecha de recepción | 2026-09-14 (lunes) [H] |
| Canal | Correo electrónico a `contacto@academiaandinadigital.example` [H] |
| Solicitante | Lucía Mendoza (ficticia), extitular matriculada en un curso de Python "el año pasado" [H] |
| Derecho(s) invocado(s) | Información, Acceso, Cancelación/Supresión, Oposición (publicidad), Revocación del consentimiento, Impedir el suministro a terceros (ver sección 2) |
| Identidad verificada | **Pendiente**. Declara DNI y celular en el texto, pero no adjunta copia del documento ni hay validación contra la matrícula [H] |
| Estado | Recibida. Requiere subsanación (identidad) |

### Plazos (referencia de trabajo, **verificar en normativa vigente**)

Método: días hábiles contados desde el día siguiente a la recepción, excluyendo sábados y domingos. **No se descontaron feriados** y el criterio de cómputo (día de inicio, suspensión por subsanación) no está en `knowledge/` `[VERIFICAR]`. Valores del reglamento anterior (D.S. 003-2013-JUS), que pudieron cambiar con el nuevo reglamento.

| Parte del pedido | Derecho | Plazo (días hábiles) | Fecha límite calculada | Situación al 2026-09-28 |
|---|---|---|---|---|
| "A quién se los han enviado", finalidad | Información | 8 | 2026-09-24 | **Vencido** (4 días naturales) |
| "Borren toda mi información" | Cancelación | 10 | 2026-09-28 | **Vence hoy** |
| "Dejen de escribirme" | Oposición / revocación | 10 | 2026-09-28 | **Vence hoy** |
| "Qué datos míos tienen" | Acceso | 20 | 2026-10-12 | En plazo. Si el 8 de octubre es feriado, pasaría al 2026-10-13 `[VERIFICAR calendario de feriados]` |

Para no fallar, aplico el plazo más corto a cada parte cuando el encaje entre derechos es dudoso (ej. "a quién se los han enviado" puede leerse como Información o como Acceso). Recomendación: contestar todo en una sola respuesta lo antes posible, sin esperar al plazo de Acceso.

## 2. Análisis

### Resumen del pedido
La titular afirma que desde su matrícula recibe publicidad por WhatsApp y correo de empresas que no conoce, y que no autorizó compartir su información con terceros [H]. Pide: (a) saber qué datos suyos hay y a quién se enviaron; (b) borrar toda su información; (c) que dejen de escribirle [H].

### Clasificación de derechos (`knowledge/ley-29733-resumen.md`)

| Pedido | Derecho | Control ISO 27701 (`knowledge/`) |
|---|---|---|
| Qué datos tienen | Acceso | A.7.3.6, A.7.3.8 |
| A quién se enviaron, con qué finalidad | Información (destinatarios) | A.7.3.1 a A.7.3.3 |
| Borrar toda mi información | Cancelación / supresión | A.7.3.6, A.7.4.8 |
| Dejen de escribirme | Oposición y revocación del consentimiento de marketing | A.7.3.4, A.7.3.5 |
| "No autoricé que compartan mi información" | Impedir el suministro a terceros | A.7.5.4 (registros de divulgación), A.7.3.7 (informar a terceros) |

### Requisitos formales
- Identidad: **falta verificar**. El DNI declarado hay que cotejarlo con la matrícula y, si no basta, pedir copia del documento. Sin verificación no se debe entregar ningún dato personal (acceso) ni ejecutar la supresión completa.
- Datos de contacto: cumple (correo y celular) [H].
- Descripción clara del pedido: cumple [H].
- Representación: no aplica. No hay indicios de que sea menor de edad; el RAT indica que ~40 % de los estudiantes lo son, así que hay que confirmar la edad en la matrícula [I].

### Procedencia
**Requiere subsanación** (solo identidad). Una vez verificada, la procedencia esperada es **parcial a total**: [I]
- **Oposición y cese de publicidad:** procedente. Según el RAT, la casilla de publicidad viene marcada por defecto (T-04, brecha B-01) [H, del RAT], lo que debilita cualquier defensa de que hubo consentimiento válido.
- **Supresión:** procedente en principio. Puede haber datos que deban conservarse por obligación legal, por ejemplo comprobantes de pago (contable o tributaria) o datos académicos. Esto **no está confirmado** (RAT, pregunta pendiente 6) y no puedo citar plazos ni normas porque no están en `knowledge/`: **verificar**. Si algo debe conservarse, se bloquea, se limita a esa finalidad y se le explica a la titular con motivo.
- **Acceso e información:** procedentes. Ojo: la academia debe poder decir a quién se enviaron sus datos. El RAT solo evidencia la lista de matriculados enviada a una empresa aliada de reclutamiento (T-05) y no contiene registro de destinatarios de publicidad. Sin registro de divulgación (A.7.5.4) la respuesta completa puede no ser posible: **hallazgo a confirmar**.

### Fundamento y vínculo con el RAT
- **[H, RAT]** La academia comparte la lista de matriculados con una empresa aliada de reclutamiento, con finalidad ajena a la matrícula y sin consentimiento ni contrato evidenciados (T-05, B-02).
- **[H, RAT]** El marketing se apoya en una casilla premarcada (T-04, B-01) y usa correo y WhatsApp.
- **[I]** Estos dos hechos son coherentes con lo que denuncia la titular, pero **no confirman** que la publicidad provenga de esos flujos. No se le debe afirmar ni negar nada hasta investigar internamente.

### Posible incidente
La denuncia implica una posible **divulgación a terceros sin base legitimadora**. Recomiendo **escalar al proceso de gestión de brechas / incidentes** en paralelo y no esperar a cerrar el caso ARCO. La notificación de incidentes y sus plazos están marcados `[VERIFICAR]` en `knowledge/`; no los cito.

## 3. Ubicación de los datos (según RAT) y checklist interno

Dónde pueden estar los datos de la titular [según RAT]:

| Sistema / ubicación | Datos | Actividad RAT |
|---|---|---|
| Hoja de cálculo en la nube (contraseña compartida, 12 usuarios) | Nombres, DNI, fecha de nacimiento, dirección, correo, celular, colegio o universidad, grado; posibles ingreso familiar y salud (campos opcionales) | T-01, T-02, T-03 |
| Carpeta compartida de fotos | Foto carné | T-01 |
| Capturas de comprobantes de pago | Nombre y cuenta del pagador | T-06 |
| Listas de correo y WhatsApp de marketing | Correo, celular, nombre | T-04 |
| Lista enviada a la empresa aliada de reclutamiento | Contenido exacto: NO INDICADO | T-05 |
| Aula virtual (cuenta) | Cuenta creada en la matrícula [I] | T-01 |
| Copias en el proveedor de nube (sin contrato de encargo, país NO INDICADO) | Todo lo anterior | T-01 a T-06 |

### Checklist

Los responsables son roles sugeridos, no personas. Fechas calculadas desde hoy, 2026-09-28.

| # | Acción | Área / sistema | Responsable sugerido | Fecha límite | Hecho |
|---|---|---|---|---|---|
| 1 | Enviar acuse de recibo y solicitud de subsanación de identidad (borrador A) | Correo de contacto | Oficial de Datos Personales | 2026-09-28 (hoy) | [ ] |
| 2 | **Suspender de inmediato** el envío de publicidad a la titular (correo y WhatsApp) y agregarla a una lista de exclusión | Marketing | Responsable de marketing | 2026-09-28 (hoy) | [ ] |
| 3 | Abrir gestión de incidente por posible divulgación a terceros sin consentimiento y pedir a Marketing y Administración que documenten a quién se envió qué y cuándo | Gestión de brechas | Oficial de Datos Personales | 2026-09-29 | [ ] |
| 4 | Verificar identidad contra la matrícula (DNI, edad, curso) | Matrícula / administración | Administración académica | Al recibir respuesta | [ ] |
| 5 | Localizar todos los datos de la titular (tabla anterior), incluida la lista de reclutamiento y las listas de marketing | Administración, TI, Marketing | Administración + TI | 2026-10-02 | [ ] |
| 6 | Identificar destinatarios reales (empresa aliada, proveedores de marketing, nube) y registrar la divulgación (A.7.5.4) | Administración, Marketing | Oficial de Datos Personales | 2026-10-02 | [ ] |
| 7 | Determinar qué datos deben conservarse por obligación legal (comprobantes, registros académicos). No se conserva nada "por si acaso" | Finanzas, área académica, Legal | Legal / Oficial de Datos Personales | 2026-10-02 | [ ] |
| 8 | Preparar la copia de los datos y el informe de destinatarios. No incluir datos de otras personas (ej. otros alumnos de la hoja) | Administración | Oficial de Datos Personales | 2026-10-06 | [ ] |
| 9 | Ejecutar la supresión de lo no conservable en hoja, carpeta de fotos, marketing, aula virtual y respaldos. Bloquear lo que deba conservarse | Administración, TI | TI | Tras verificar identidad y decidir el punto 7 | [ ] |
| 10 | Informar a terceros (empresa aliada, nube, marketing) de la supresión y la oposición para que actúen (A.7.3.7) | Oficial de Datos Personales | Oficial de Datos Personales | Tras el punto 9 | [ ] |
| 11 | Enviar respuesta de fondo (borrador B) | Oficial de Datos Personales | Oficial de Datos Personales | Lo antes posible; el límite de Acceso es 2026-10-12 `[VERIFICAR]` | [ ] |
| 12 | Actualizar `salidas/registro-arco.md` y conservar evidencia de cada acción | Oficial de Datos Personales | Oficial de Datos Personales | Continuo | [ ] |

## 4. Borradores de respuesta

Dos borradores: **A** para enviar ahora (subsanación) y **B** para enviar cuando se verifique la identidad y se completen las acciones internas. Redactados como "se realizará": no confirman que la supresión ya se ejecutó.

### Borrador A — Acuse y subsanación (enviar hoy)

**Asunto:** Respuesta a su solicitud sobre datos personales — Caso ARCO-2026-001

Estimada Lucía:

Recibimos su correo del 14 de setiembre de 2026 y lamentamos las molestias por los mensajes publicitarios que ha recibido. Entendemos que usted solicita: (1) saber qué datos suyos tenemos y a quiénes los hemos comunicado, (2) que eliminemos su información y (3) que dejemos de enviarle publicidad.

Hemos registrado su solicitud y ya hemos dado instrucciones para que **no se le envíen más comunicaciones comerciales** mientras atendemos su caso.

Para poder entregarle la información y eliminar sus datos con seguridad, necesitamos confirmar que usted es la titular. Por favor responda a este correo adjuntando una copia legible de su DNI (puede tapar la foto y los datos que no sean el número y el nombre) y confirmando el curso en el que se matriculó. Solo usaremos esta copia para verificar su identidad.

Cuando recibamos esta confirmación le responderemos sobre cada uno de sus pedidos. Si no está conforme con la atención que reciba, tiene derecho a reclamar ante la autoridad de protección de datos personales `[VERIFICAR denominación y vía vigentes]`.

Atentamente,
Oficial de Datos Personales
Academia Andina Digital

### Borrador B — Respuesta de fondo (parcial; enviar tras verificar identidad)

**Asunto:** Respuesta a su solicitud sobre datos personales — Caso ARCO-2026-001

Estimada Lucía:

Gracias por confirmar su identidad. Respondemos a cada uno de sus pedidos.

**1. Qué datos suyos tenemos y a quién se los hemos comunicado.** Adjuntamos una copia de los datos personales suyos que figuran en nuestros registros: {{lista completa tras la localización, sección 3, puntos 5 y 8}}. Estos datos los recogimos al matricularla en el curso de {{curso}} para {{finalidad real: matrícula, comprobante de pago, comunicaciones}}. Sus datos fueron comunicados a: {{destinatarios confirmados; si hubo comunicación a terceros, indicar cuáles, con qué fin y en qué fecha. No completar con suposiciones}}.

**2. Eliminación de sus datos.** Se realizará la eliminación de sus datos de nuestros sistemas, incluidos el aula virtual, las listas de contacto y los archivos de matrícula. {{Si aplica: hay datos que debemos conservar por {{motivo legal confirmado}} durante {{plazo confirmado}}. Se mantendrán bloqueados, solo para ese fin, y luego se eliminarán.}} Además, comunicaremos su solicitud a las entidades que recibieron sus datos para que también dejen de usarlos {{si aplica}}.

**3. Comunicaciones publicitarias.** Ya no recibirá publicidad nuestra. Hemos registrado su oposición para que no se le contacte con fines comerciales.

Si no está conforme con esta respuesta, puede reclamar ante la autoridad de protección de datos personales `[VERIFICAR denominación y vía vigentes]`.

Atentamente,
Oficial de Datos Personales
Academia Andina Digital

**Notas para el Oficial antes de enviar B:**
- No incluir datos de otros alumnos ni de apoderados que estén en las mismas hojas.
- Si tras investigar se confirma una divulgación sin base legítima, no lo diga en la respuesta sin revisión de Legal; el tema sigue por gestión de brechas.
- Si se decide que la lista de exclusión guarda su correo y celular para respetar la oposición, decir en la respuesta que se conserva solo ese mínimo y por qué [I, buena práctica; verificar].

## 5. Información pendiente de confirmar
1. Identidad de la titular (DNI y curso) y su edad.
2. Calendario de feriados y criterio de cómputo de plazos (inicio, suspensión por subsanación) `[VERIFICAR]`. Plazos vigentes del nuevo reglamento `[VERIFICAR]`.
3. Origen real de la publicidad de "otras empresas". No hay evidencia de que venga de T-04 o T-05.
4. Destinatarios de sus datos. No existe registro de divulgación evidenciado.
5. Obligaciones legales de conservación de comprobantes y datos académicos: NO INDICADO.
6. Contenido de la lista enviada a la empresa aliada y si incluye a la titular.
7. Dónde están los respaldos y la copia en el proveedor de nube extranjero, y cómo se suprimirán allí.
8. Si la academia ya cuenta con un canal ARCO formal. El RAT indica que no se evidencia (B-11).

---
*Borrador de apoyo. Debe revisarlo y firmarlo el Oficial de Datos Personales.*
