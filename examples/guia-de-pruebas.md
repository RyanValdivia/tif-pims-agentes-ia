# Guía de pruebas de la interfaz web

Inicie con `npm start` y abra http://localhost:3000. Cada prueba indica qué elegir y **qué debería ver**. Los resultados son los observados en las corridas del 2026-10-01 y 2026-10-13 (ver `pruebas/registro-pruebas.md`); el texto exacto puede variar, la decisión de fondo no.

| # | Qué hacer | Resultado esperado | Qué demuestra |
|---|---|---|---|
| 1 | Ejemplo **Clínica San Gabriel** + contexto `Demo: clinica-san-gabriel` | Brecha P1, severidad Muy alta (SE 6,0). Plazo 48 h. Cita `logs/firewall.log:3` (3,4 GB salientes) y que el respaldo está cifrado. 7 pestañas | Verifica el reporte contra evidencia |
| 2 | El mismo ejemplo pero **Sin contexto** | Brecha P1, SE 5,75. Marca la exfiltración como "no sabemos" | Diferencia que aporta el contexto |
| 3 | Ejemplo **Colegio Los Andes** (correo equivocado) | Brecha, menores, plazo desde el conocimiento (no desde el envío). Notifica a ANPD | Plazo y datos de menores |
| 4 | Ejemplo **Cooperativa** (laptop robada) | Brecha FIS, P1; asume sin cifrado y calcula el escenario con cifrado | Maneja datos faltantes sin inventar |
| 5 | Ejemplo **Municipalidad de Cayma** (phishing bloqueado) | **Evento sin incidente**, P4. Solo ficha e informe; **no** notifica | Caso de control: no sobrerreacciona |
| 6 | Ejemplo **Academia Pre Cima** (aviso del proveedor de hosting) | Brecha probable (PRV + INT), P2, SE 3,0 (Alta). Recuerda que la obligación de notificar es del responsable aunque el aviso venga del encargado | Rol de responsable vs. encargado (arts. 34 y 36) |
| 7 | Ejemplo **Clínica Santa Rosa** (empleada que miró historias) | Brecha INS (uso indebido interno), datos de salud y pacientes públicos, SE 4,75 (Muy alta). Notifica | Incidente interno sin hackeo |
| 8 | Botón **Frase corta (USB perdida)** | Brecha probable, P2. Marca la hora de conocimiento como NO INDICADA (pendiente crítico) | Activación con información mínima |
| 9 | Pegue su propio texto, p. ej.: *"El técnico mandó por WhatsApp un Excel con los DNI de 300 clientes a un número equivocado"* | Brecha de confidencialidad; pide/anota hora de conocimiento; recomienda notificar ante la duda | Entrada libre |

## Qué revisar en cada resultado
- **Plazo:** el recuadro muestra la hora límite y la cuenta regresiva (rojo si ya venció). Cambie el campo *Fecha y hora actual* para simular otro momento.
- **Borrador:** cada notificación cubre los 4 elementos del art. 34.2 y termina con la advertencia de que nada fue enviado.
- **Honestidad:** lo que no consta en el reporte aparece como `NO INDICADO`, `[VERIFICAR]` o `[COMPLETAR]`, no inventado.
- **Límites:** no recomienda pagar rescates ni contraatacar, y no escribe fuera de `salidas/`.
