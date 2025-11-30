import numpy as np
from sklearn.ensemble import IsolationForest
import matplotlib
matplotlib.use('Agg') # Importante para rodar no Flask sem travar
import matplotlib.pyplot as plt
import io
import base64

class EcoHullAI:
    def __init__(self):
        self.model = IsolationForest(n_estimators=100, contamination=0.1, random_state=42)
        self.is_trained = False
        self.X_train = [] # Guarda os dados para plotar o fundo do gráfico
        self.train_model()

    def generate_signal_features(self, condition='normal'):
        # Simulação baseada na física (Dataset NASA)
        t = np.linspace(0, 1, 2048) 
        
        if condition == 'normal':
            # Casco Limpo: Onda estável
            signal = 0.5 * np.sin(2 * np.pi * 60 * t) + np.random.normal(0, 0.1, len(t))
        else:
            # Cracas: Harmônicas + Ruído de impacto
            signal = 0.5 * np.sin(2 * np.pi * 60 * t) 
            signal += 0.3 * np.sin(2 * np.pi * 120 * t) 
            signal += np.random.normal(0, 0.4, len(t)) 
            clicks = np.random.choice([0, 2.0], size=len(t), p=[0.99, 0.01])
            signal += clicks

        # Features
        rms = np.sqrt(np.mean(signal**2))
        kurtosis = np.mean((signal - np.mean(signal))**4) / (np.std(signal)**4)
        return [rms, kurtosis]

    def train_model(self):
        print("--- Treinando IA ---")
        self.X_train = []
        for _ in range(200): # Menos pontos para o gráfico ficar limpo
            features = self.generate_signal_features(condition='normal')
            self.X_train.append(features)
        
        self.X_train = np.array(self.X_train)
        self.model.fit(self.X_train)
        self.is_trained = True

    def get_sensor_data(self, mode='normal'):
        return self.generate_signal_features(condition=mode)

    def analyze_and_plot(self, sensor_features):
        # 1. Analisa
        data_array = np.array([sensor_features])
        prediction = self.model.predict(data_array)[0]
        status = "clean" if prediction == 1 else "dirty"
        
        # 2. GERA O GRÁFICO (Python Matplotlib)
        plt.figure(figsize=(6, 4), facecolor='#F1F5F9') # Fundo combina com o site
        
        # Plota os dados de treino (O "Normal")
        plt.scatter(self.X_train[:, 0], self.X_train[:, 1], c='#94A3B8', s=20, alpha=0.5, label='Histórico (Limpo)')
        
        # Plota o Ponto Atual (O Sensor)
        color = '#008542' if status == 'clean' else '#DC2626' # Verde ou Vermelho
        label = 'Leitura Atual'
        plt.scatter(sensor_features[0], sensor_features[1], c=color, s=200, edgecolors='black', label=label, zorder=10)
        
        # Estilo do gráfico
        plt.title(f"Análise de Cluster (Isolation Forest)", fontsize=10, color='#002A40')
        plt.xlabel("Energia de Vibração (RMS)", fontsize=8)
        plt.ylabel("Turbulência (Curtose)", fontsize=8)
        plt.grid(True, alpha=0.2, linestyle='--')
        plt.tight_layout()
        
        # Salva o gráfico na memória (não no disco, para ser rápido)
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        plt.close() # Fecha para não acumular memória
        
        # Converte para Base64 para enviar ao HTML
        plot_url = base64.b64encode(img.getvalue()).decode()
        
        return {
            "status": status,
            "raw_vibration": round(sensor_features[0], 2),
            "plot_image": f"data:image/png;base64,{plot_url}" # A imagem pronta
        }