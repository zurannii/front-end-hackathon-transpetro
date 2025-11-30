import numpy as np
from sklearn.ensemble import IsolationForest
import matplotlib
matplotlib.use('Agg') 
import matplotlib.pyplot as plt
import io
import base64

class EcoHullAI:
    def __init__(self):
        self.model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
        self.is_trained = False
        self.X_train = []
        self.train_model()

    def generate_signal_features(self, condition='normal', weather_intensity=0.0):
        t = np.linspace(0, 1, 2048) 
        
        # Sinal base do motor (60Hz)
        signal = 0.5 * np.sin(2 * np.pi * 60 * t)
        
        # Adiciona ruído de CLIMA (para a IA aprender a ignorar)
        signal += (0.2 * weather_intensity) * np.sin(2 * np.pi * 5 * t)
        signal += np.random.normal(0, 0.1 + (0.2 * weather_intensity), len(t))

        if condition == 'critical':
            # Assinatura da CRACA (Harmônicas + Impactos)
            signal += 0.3 * np.sin(2 * np.pi * 120 * t) 
            clicks = np.random.choice([0, 2.0], size=len(t), p=[0.99, 0.01])
            signal += clicks

        # Extrai Energia (RMS) e Aspereza (Curtose)
        rms = np.sqrt(np.mean(signal**2))
        kurtosis = np.mean((signal - np.mean(signal))**4) / (np.std(signal)**4)
        return [rms, kurtosis]

    def train_model(self):
        print("--- Treinando IA com Variáveis Climáticas ---")
        self.X_train = []
        # Treina com vários climas para ser robusto
        for _ in range(300):
            w = np.random.uniform(0, 0.8) 
            self.X_train.append(self.generate_signal_features('normal', w))
        
        self.X_train = np.array(self.X_train)
        self.model.fit(self.X_train)
        self.is_trained = True

    def get_sensor_data(self, mode='normal'):
        current_weather = np.random.uniform(0, 0.5)
        features = self.generate_signal_features(condition=mode, weather_intensity=current_weather)
        
        return features, current_weather

    def analyze_and_plot(self, sensor_features):
        # Analisa
        data_array = np.array([sensor_features])
        prediction = self.model.predict(data_array)[0]
        status = "clean" if prediction == 1 else "dirty"
        
        # Plota o Gráfico
        plt.figure(figsize=(6, 4), facecolor='#F1F5F9')
        plt.scatter(self.X_train[:, 0], self.X_train[:, 1], c='#94A3B8', s=20, alpha=0.5, label='Histórico')
        
        color = '#008542' if status == 'clean' else '#DC2626'
        plt.scatter(sensor_features[0], sensor_features[1], c=color, s=200, edgecolors='black', label='Atual', zorder=10)
        
        plt.title("Análise de Cluster (Isolation Forest)", fontsize=10)
        plt.xlabel("Energia (RMS)", fontsize=8)
        plt.ylabel("Turbulência (Curtose)", fontsize=8)
        plt.grid(True, alpha=0.3, linestyle='--')
        plt.tight_layout()
        
        # Salva imagem em Base64
        img = io.BytesIO()
        plt.savefig(img, format='png')
        img.seek(0)
        plt.close()
        plot_url = base64.b64encode(img.getvalue()).decode()
        
        return {
            "status": status,
            "raw_vibration": round(sensor_features[0], 2),
            "plot_image": f"data:image/png;base64,{plot_url}"
        }