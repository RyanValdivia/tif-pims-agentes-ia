# Reporte de incidente — Oficina de Tecnologías de Información, UNSA (ESCENARIO SIMULADO)

> ESCENARIO SIMULADO para fines académicos (TIF de Auditoría de Sistemas). Usa el contexto de la UNSA, pero el incidente, las personas, los sistemas y las cifras son inventados y no describen hechos reales de la universidad.

**De:** Jefe de la Oficina de Tecnologías de Información (OTI)
**Para:** Oficial de Datos Personales
**Fecha del correo:** 2026-10-11 (domingo), 08:00

Hoy a las 06:40 el personal de guardia del Centro de Cómputo encontró caído el Sistema de Registro Académico (notas, historial y matrícula). En la pantalla de los servidores aparece una nota que dice que los archivos fueron cifrados y que, si la Universidad no paga en 72 horas, publicarán "las notas y datos de todos los estudiantes". Mañana lunes empieza la matrícula del semestre.

Lo que sabemos:
- Los servidores del Sistema de Registro Académico (aplicación y base de datos) y la carpeta compartida de actas escaneadas tienen archivos con extensión `.lck`.
- La base guarda estudiantes y egresados: nombres, DNI, fecha de nacimiento, domicilio, correo, teléfono, escuela profesional, notas y situación académica.
- El antivirus envió una alerta a la bandeja del área de seguridad a las 05:12 y ayer a las 21:14 la VPN generó un aviso de "inicio de sesión inusual"; nadie los revisó porque era fin de semana.
- La copia de seguridad semanal está en un NAS conectado todo el tiempo a la red. No sabemos si también se cifró.
- Desconecté el servidor de la red. Las demás máquinas siguen encendidas.
- No sabemos si sacaron información antes de cifrar.

¿Qué hacemos? ¿Hay que avisar a alguien? La matrícula no puede esperar.
