# Reporte de incidente — Clínica San Gabriel (CASO FICTICIO)

> Caso inventado para pruebas. Organización, personas y datos son ficticios.

**De:** Jefe de TI, Clínica San Gabriel S.A.C. (Arequipa)
**Para:** Oficial de Datos Personales
**Fecha del correo:** 2026-09-29, 08:40

Hoy a las 07:15, al llegar, el personal de admisión encontró que no podía abrir el sistema de historias clínicas. En las pantallas de 6 computadoras aparece un mensaje que dice que los archivos fueron cifrados y que, si no pagamos 3 BTC en 72 horas, publicarán "la base de pacientes" en un sitio web.

Lo que sabemos:
- El servidor de archivos y la base de datos del sistema de historias clínicas tienen las extensiones cambiadas a `.lck`.
- La base tiene alrededor de **18 000 pacientes**: nombres, DNI, fecha de nacimiento, teléfono, dirección, diagnósticos, resultados de laboratorio, y datos del seguro.
- El antivirus envió una alerta ayer a las 23:50 sobre un archivo adjunto de un correo de "factura pendiente" abierto en la PC de facturación, pero nadie la revisó.
- El último respaldo completo es de hace 3 semanas, en un disco conectado permanentemente al servidor (no sabemos si también se cifró).
- Ya desconecté el cable de red del servidor. Las PCs siguen prendidas.
- No sabemos si sacaron datos antes de cifrar.

Atención de pacientes está trabajando en papel. ¿Qué hacemos? ¿Hay que avisar a alguien?
