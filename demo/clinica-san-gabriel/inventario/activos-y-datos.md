# Inventario de activos y datos personales — Clínica San Gabriel S.A.C.

Versión del documento de seguridad: 2025-11 (vigente). Responsable del banco de datos: Clínica San Gabriel S.A.C.

## Sistemas

| ID | Sistema | Tipo | Ubicación | Cifrado en reposo | Respaldo | Observaciones |
|---|---|---|---|---|---|---|
| S-01 | SRV-HCE (base de datos de la HCE, PostgreSQL) | Servidor | Sala técnica, sede Cercado | No | Disco USB `BKP-01` conectado permanentemente (semanal manual, último: 2026-09-08) | Único servidor de la HCE |
| S-02 | SRV-ARCH (archivos: resultados de laboratorio PDF, imágenes) | Servidor | Sala técnica | No | Mismo disco `BKP-01` | Carpeta compartida abierta a todo el dominio |
| S-03 | PC-FACT-01 (facturación) | Estación | Admisión/Facturación | No | Ninguno | Tiene sesión de administrador local y acceso a SRV-HCE |
| S-04 | PC-ADM-01…05 (admisión) | Estaciones | Admisión | No | Ninguno | |
| S-05 | App web HCE (`app/hce/`) | Aplicación | SRV-HCE | — | — | Desarrollada por el proveedor SoftSalud |
| S-06 | Correo institucional (Microsoft 365) | SaaS | Nube | Sí (proveedor) | Proveedor | Sin filtrado avanzado de adjuntos |
| S-07 | Firewall perimetral | Red | Sede | — | — | Logs 30 días |

## Categorías de datos personales

| Banco / tratamiento | Titulares aprox. | Datos | ¿Sensibles? | Sistema |
|---|---|---|---|---|
| Historias clínicas (pacientes) | **18 000** | Nombres, DNI, fecha de nacimiento, teléfono, dirección, diagnósticos, evolución, recetas | **Sí** (salud) | S-01 |
| Resultados de laboratorio e imágenes | ~18 000 (misma población) | Resultados, informes, imágenes diagnósticas | **Sí** (salud) | S-02 |
| Datos de seguro | ~6 500 | Aseguradora, n.° de póliza, titular del seguro | No (financiero/identificación) | S-01 |
| Facturación | ~12 000 | Nombre, DNI/RUC, dirección, montos | No | S-03 / S-01 |
| Personal | 74 | Planillas, contratos, certificados médicos | Parcial (salud en certificados) | S-02 |
| Menores de edad | ~3 100 de los 18 000 | Mismos datos de la HCE | **Sí** | S-01 |

## Controles existentes (resumen)
- Autenticación de la HCE: usuario y contraseña; **sin MFA**; cuentas compartidas en admisión (`admision1`, `admision2`).
- Acceso remoto: VPN del proveedor con contraseña; sin MFA.
- Antivirus: consola local, alertas solo por correo a `ti@clinicasangabriel.example`.
- Registros de acceso a la HCE: se guardan 90 días (el art. 46.3 exige mínimo 2 años).
- Última prueba de restauración del respaldo: nunca.
