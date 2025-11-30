from flask import Flask, jsonify
from flask_cors import CORS  
from ai_engine import EcoHullAI
import pandas as pd
import random

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

ai = EcoHullAI()
CURRENT_MODE = 'normal'

def load_ships():
    try:
        df = pd.read_csv('Dados navios Hackathon.xlsx - Dados navios.csv') 
        return df.to_dict(orient='records')
    except:
        return []

FLEET_DATA = load_ships()

@app.route('/api/dashboard-data')
def get_dashboard_data():
    sensor_data = ai.get_sensor_data(mode=CURRENT_MODE)
    ai_result = ai.analyze_and_plot(sensor_data)
    
    ship_info = FLEET_DATA[0] if FLEET_DATA else {}
    
    response = {
        "status": ai_result['status'], 
        "vibration_level": ai_result['raw_vibration'],
        "anomaly_score": ai_result['status'],
        "fuel_waste": 0 if ai_result['status'] == 'clean' else random.randint(2000, 5000),
        "chart_image": ai_result['plot_image'], 
        "ship_name": ship_info.get("Nome do navio", "Desconhecido")
    }
    return jsonify(response)

@app.route('/api/toggle-mode/<mode>')
def toggle_mode(mode):
    global CURRENT_MODE
    CURRENT_MODE = mode
    return jsonify({"status": "success", "mode": mode})

if __name__ == '__main__':
    app.run(debug=True, port=5000)