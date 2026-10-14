# Contexto simulado — UNSA, con los logs de un incidente

> ESCENARIO SIMULADO para fines académicos. Usa la estructura general de una universidad pública (registro académico, admisión, campus virtual, bienestar, recursos humanos), pero los sistemas, cifras, cuentas, direcciones IP y personas son inventados. No describe hechos ni vulnerabilidades reales de la UNSA. Los dominios usan `.example` y las IP los rangos reservados para documentación.

Contiene el inventario, los contactos y las políticas de la situación base, más los logs de **un solo incidente**: sra-auditoria-notas.log. Se usa con los casos en que el reporte no trae evidencia técnica propia. Los contextos con logs de un incidente concreto son:

| Contexto | Logs que añade | Caso |
|---|---|---|
| `unsa-ransomware` | VPN, firewall, antivirus, auditoría y respaldos | unsa-01 |
| `unsa-admision` | Accesos del portal de admisión | unsa-06 |
| `unsa-notas` | Auditoría del Sistema de Registro Académico | unsa-07 |
