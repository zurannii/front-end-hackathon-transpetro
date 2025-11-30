from flask import Flask, jsonify
from flask_cors import CORS
from ai_engine import EcoHullAI
import pandas as pd
import random

app = Flask(__name__)
# Habilita CORS para o Frontend React acessar
CORS(app, resources={r"/api/*": {"origins": "*"}})

ai = EcoHullAI()
CURRENT_MODE = 'normal'
CURRENT_SHIP_INDEX = 0

# Preço estimado do combustível (USD por tonelada - VLSFO)
FUEL_PRICE_USD = 600.0

def load_data():
    try:
        # Lê os arquivos CSV (Certifique-se que estão na pasta backend com estes nomes!)
        # navios.csv = O arquivo com k, dwt e dados técnicos
        # eventos.csv = O arquivo com histórico de navegação (ResultadoQueryEventos)
        df_navios = pd.read_csv('navios.csv', sep=None, engine='python')
        
        # Tenta ler eventos (se não existir, cria dataframe vazio para não quebrar)
        try:
            df_eventos = pd.read_csv('eventos.csv', sep=None, engine='python')
        except:
            df_eventos = pd.DataFrame()
        
        lista_final = []
        
        print("--- Iniciando Data Fusion... ---")
        
        for _, navio in df_navios.iterrows():
            nome = navio.get('ship_name', 'Desconhecido')
            
            # 1. Busca dados reais de operação (Do arquivo de Eventos)
            velocidade_real = 12.0
            calado_real = 10.0
            
            if not df_eventos.empty:
                historico = df_eventos[df_eventos['shipName'] == nome]
                if not historico.empty:
                    # Pega o último registro de navegação
                    ultimo = historico.iloc[-1]
                    velocidade_real = float(ultimo.get('speed', 12.0))
                    calado_real = float(ultimo.get('midDraft', 10.0))
            
            # 2. Aplica a Física Teórica (Do arquivo de Navios)
            # Fórmula Base: Consumo = k * (DWT ^ 0.7)
            try:
                k = float(navio.get('k', 0.15))
                dwt = float(navio.get('dwt', 100000))
                
                # FATOR DE CALIBRAÇÃO (0.1):
                # A fórmula crua gera ~600 (provavelmente kW/h ou índice).
                # Multiplicamos por 0.1 para chegar em ~60 toneladas/dia (realista para Suezmax).
                consumo_teorico_dia = (k * (dwt ** 0.7)) * 0.1
                
            except:
                consumo_teorico_dia = 50.0 # Valor médio de segurança
            
            lista_final.append({
                "nome": nome,
                "classe": navio.get('Tipo', 'Petroleiro'),
                "dwt": navio.get('dwt', 0),
                "consumo_teorico": consumo_teorico_dia,
                "velocidade_real": velocidade_real,
                "calado_real": calado_real
            })
            
        print(f"--- Sucesso: {len(lista_final)} navios carregados e calibrados! ---")
        return lista_final

    except Exception as e:
        print(f"--- ERRO CRÍTICO AO CARREGAR DADOS: {e} ---")
        # Retorna um navio de emergência para a demo não parar
        return [{
            "nome": "RAFAEL SANTOS (Demo)",
            "classe": "Suezmax",
            "consumo_teorico": 60.0
        }]

FLEET_DATA = load_data()

@app.route('/api/dashboard-data')
def get_dashboard_data():
    # 1. IA: Gera dados do sensor + Clima
    sensor_data, weather_intensity = ai.get_sensor_data(mode=CURRENT_MODE)
    
    # 2. IA: Analisa e GERA A IMAGEM do gráfico
    ai_result = ai.analyze_and_plot(sensor_data)
    
    # 3. Recupera o navio atual
    global CURRENT_SHIP_INDEX
    if not FLEET_DATA:
        ship = {"nome": "Sem Dados", "consumo_teorico": 50}
    else:
        if CURRENT_SHIP_INDEX >= len(FLEET_DATA): CURRENT_SHIP_INDEX = 0
        ship = FLEET_DATA[CURRENT_SHIP_INDEX]
    
    # 4. Cálculo Financeiro do Desperdício
    fuel_waste_money = 0
    if ai_result['status'] == 'dirty':
        # Estimativa: Craca aumenta 15% o consumo teórico diário
        # Ex: 60 ton/dia * 0.15 = 9 ton desperdiçadas
        toneladas_perdidas = ship.get('consumo_teorico', 50) * 0.15
        
        # Adiciona variação aleatória pequena (para o número parecer "vivo" na tela)
        variacao = random.uniform(0.95, 1.05)
        
        fuel_waste_money = toneladas_perdidas * FUEL_PRICE_USD * variacao
    
    # 5. Prepara dados ambientais para o Front
    # Converte intensidade 0-1 para unidades reais
    wind_speed = round(10 + (weather_intensity * 30), 1) # Nós
    wave_height = round(0.5 + (weather_intensity * 4), 1) # Metros

    response = {
        "status": ai_result['status'],
        "vibration_level": ai_result['raw_vibration'],
        "fuel_waste": round(fuel_waste_money, 2),
        "chart_image": ai_result['plot_image'], # A imagem Base64
        "ship_name": ship.get('nome', "Desconhecido"),
        "environment": {
            "wind": wind_speed,
            "waves": wave_height
        }
    }
    return jsonify(response)

@app.route('/api/toggle-mode/<mode>')
def toggle_mode(mode):
    global CURRENT_MODE
    if mode in ['normal', 'critical']:
        CURRENT_MODE = mode
        return jsonify({"status": "success", "mode": mode})
    return jsonify({"status": "error"})

# Rota para trocar de navio (para testar diferentes cálculos)
@app.route('/api/next-ship')
def next_ship():
    global CURRENT_SHIP_INDEX
    CURRENT_SHIP_INDEX = (CURRENT_SHIP_INDEX + 1) % len(FLEET_DATA)
    return jsonify({
        "status": "success", 
        "ship": FLEET_DATA[CURRENT_SHIP_INDEX]['nome']
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)