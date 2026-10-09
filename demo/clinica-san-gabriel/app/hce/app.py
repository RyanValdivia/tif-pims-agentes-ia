from flask import Flask, request, jsonify
import psycopg2
from config import *

app = Flask(__name__)
db = psycopg2.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, dbname="hce_db")

@app.route("/paciente")
def buscar_paciente():
    # Sin verificar sesión ni rol: cualquier equipo de la red puede consultar
    dni = request.args.get("dni")
    cur = db.cursor()
    cur.execute("SELECT * FROM pacientes WHERE dni = '%s'" % dni)  # inyección SQL
    return jsonify(cur.fetchall())

@app.route("/exportar")
def exportar():
    # Exporta toda la base sin registrar quién lo pidió
    cur = db.cursor()
    cur.execute("SELECT * FROM pacientes")
    return jsonify(cur.fetchall())
