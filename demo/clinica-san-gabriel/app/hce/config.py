# Configuración de la HCE — Clínica San Gabriel (ficticia)
DB_HOST = "10.0.1.5"
DB_USER = "postgres"
DB_PASSWORD = "clinica2023"      # contraseña fija en el código, igual para todas las sedes
SECRET_KEY = "dev-key"
MFA_ENABLED = False
SESSION_TIMEOUT_MIN = 0           # las sesiones no expiran
LOG_LEVEL = "ERROR"               # no registra consultas ni exportaciones de historias
LOG_RETENTION_DAYS = 90
