# Inventario de activos y datos personales — UNSA (SIMULADO)

Versión del documento de seguridad: 2025-09 (vigente). Responsable del banco de datos: Universidad Nacional de San Agustín (simulado).

## Sistemas

| ID | Sistema | Responsable | Ubicación | Cifrado en reposo | Respaldo |
|---|---|---|---|---|---|
| S-01 | Sistema de Registro Académico (SRA): aplicación SRV-SRA-APP y base SRV-SRA-DB | Oficina de Registros Académicos / OTI | Centro de Cómputo | No | NAS `NAS-BKP-01` conectado permanentemente (semanal; último completo 2026-10-04) |
| S-02 | Carpeta de actas escaneadas (SRV-ARCH) | Registros Académicos | Centro de Cómputo | No | Mismo NAS |
| S-03 | Campus Virtual (aulas) | Coordinación del Campus Virtual | Hosting externo: ProveedorEdu S.A.C. (servidor compartido) | Desconocido | Del proveedor |
| S-04 | Portal de admisión y resultados | Oficina de Admisión / Desarrollo de Sistemas | Servidor web propio SRV-WEB-ADM | No | Ninguno |
| S-05 | Fichas del Servicio de Bienestar (psicología y social) | Bienestar Universitario | Laptops institucionales y carpeta local | No | Ninguno |
| S-06 | Planillas CAS y recursos humanos | Recursos Humanos | Hojas de cálculo y sistema de planillas | No | Parcial |
| S-07 | Correo institucional | OTI | Nube del proveedor | Sí (proveedor) | Proveedor |
| S-08 | Portal de matrícula en línea | OTI | SRV-WEB-MAT | No | Ninguno |

## Bancos de datos personales

| Tratamiento | Titulares aprox. | Datos | ¿Sensibles? | Sistema |
|---|---|---|---|---|
| Estudiantes y egresados | **28 000 activos y 61 000 históricos** | Nombres, DNI, fecha de nacimiento, domicilio, correo, teléfono, escuela, notas, situación académica | Parcial (**menores de edad**: ~900 activos con 17 años o menos) | S-01, S-02 |
| Campus Virtual | **22 000** usuarios (estudiantes y docentes) | Nombres, DNI, correo, calificaciones, mensajes, actividad | No | S-03 |
| Postulantes a admisión | **18 000** (tres procesos) | Nombres, DNI, correo, celular, colegio, puntaje, dirección y **tipo de discapacidad** (exoneración) | **Sí** (salud) y menores | S-04 |
| Ingresantes (proceso actual) | 612 | Datos para el carné; condición (discapacidad, deportista) | Sí (salud) y ~40 menores | S-04 |
| Atención psicológica y social | **~4 200 fichas** (histórico); 150 del semestre | Motivo de consulta (salud mental, violencia familiar), situación económica, notas de sesión | **Sí** (salud) y menores | S-05 |
| Personal docente y administrativo | **3 100** (320 en régimen CAS) | Nombres, DNI, cargo, cuenta bancaria, remuneración, descuentos | Parcial (financieros) | S-06 |

## Controles existentes (resumen)
- Autenticación del SRA: usuario y contraseña; sin MFA; **las cuentas de docentes jubilados no se dan de baja** de forma regular.
- Acceso remoto: VPN con usuario y contraseña; sin MFA ni bloqueo por intentos fallidos.
- Antivirus: consola local; las alertas llegan al correo de la bandeja de seguridad (`seguridad@unsa.example`), sin guardia de fin de semana.
- Registros de auditoría del SRA: se guardan 60 días (el art. 46.3 del reglamento exige mínimo 2 años).
- Última prueba de restauración del respaldo: nunca.
- Los archivos con datos personales se comparten por enlaces en la nube sin política de uso aprobada.
