# Demo — Clínica San Gabriel S.A.C. (ORGANIZACIÓN FICTICIA)

> Proyecto inventado para demostrar el agente `agente-incidentes-brechas`. Nombres, personas, IP y datos son ficticios (las IP usan los rangos reservados para documentación, RFC 5737). No contiene datos personales reales.

Representa el entorno de TI de una clínica de Arequipa en el momento del **caso 1 (ransomware)**: `examples/entradas/caso-01-ransomware-clinica.md`. A diferencia del caso suelto, aquí el agente puede **verificar los hechos del reporte** contra evidencia del entorno.

| Carpeta | Contenido | Para qué lo usa el agente |
|---|---|---|
| `inventario/activos-y-datos.md` | Sistemas, categorías de datos, volúmenes, cifrado y respaldos | Tipos y cantidad de titulares afectados; datos sensibles |
| `inventario/contactos.md` | Oficial de Datos Personales, TI, proveedores | Datos de contacto del art. 34.2 |
| `logs/` | Antivirus, pasarela de correo, autenticación de la HCE, firewall, respaldos | Línea de tiempo, hora de toma de conocimiento, posible exfiltración |
| `politicas/` | Extracto del documento de seguridad y plan de respuesta vigente | Brechas de control y causa raíz |
| `app/hce/` | Código de la app de historias clínicas | Vulnerabilidades que explican el acceso y la causa raíz |

## Cómo correr la demo

Desde la raíz del repositorio, en una sesión de Claude Code:

```
/gestionar-incidente examples/entradas/caso-01-ransomware-clinica.md  contexto: demo/clinica-san-gabriel
```

Lo que debería mostrar el agente respecto al caso sin contexto:
1. **Verifica** las afirmaciones del reporte con los logs y las cita (`archivo:línea`).
2. Encuentra lo que el reporte **no sabía**: una transferencia saliente de ~3,4 GB la madrugada del 29/09 (posible exfiltración, amenaza de publicación creíble) y que el respaldo también quedó cifrado.
3. Ajusta la evaluación: la confidencialidad pasa de "no sabemos" a "probable".
4. Rellena la notificación a la ANPD con el contacto real del ODP (en vez de `[COMPLETAR]`) y los volúmenes del inventario.
5. Propone la causa raíz con base en la app y las políticas (sin MFA, VPN con contraseña, respaldo sin aislar, alerta sin revisar).

Hora de referencia sugerida para el cálculo del plazo: **2026-09-29 09:00** (la hora real del sistema también sirve; el agente indicará si el plazo ya venció).
