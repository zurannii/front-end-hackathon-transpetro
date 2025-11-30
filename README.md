# ⚓ HullSense AI: Sistema Inteligente de Monitoramento de Bioincrustação Naval

![Eco-Hull Banner](https://img.shields.io/badge/Status-MVP%20Hackathon-success?style=for-the-badge) ![Python](https://img.shields.io/badge/Backend-Python%20%7C%20Flask-blue?style=for-the-badge) ![React](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-61DAFB?style=for-the-badge) ![IoT](https://img.shields.io/badge/Hardware-Arduino%20IoT-red?style=for-the-badge)

## 📖 Sobre o Projeto

O **HullSense** é uma solução de **Internet das Coisas (IoT)** e **Inteligência Artificial (IA)** desenvolvida para resolver um dos maiores gargalos da eficiência naval: a bioincrustação (*biofouling*).

Diferente das inspeções visuais tradicionais (que são reativas, caras e perigosas para mergulhadores), o HullSense transforma o próprio casco do navio em um sensor inteligente, permitindo o monitoramento **preditivo** e **em tempo real** da saúde hidrodinâmica da embarcação.

---

## 🚨 O Problema

A bioincrustação (acúmulo de cracas, mexilhões e algas) cria uma rugosidade no casco que aumenta drasticamente o arrasto (*drag*).

* **Impacto Econômico:** Aumenta o consumo de combustível em **5% a 40%**. Para um navio classe Suezmax, isso pode representar um desperdício de **~$5.000 USD por dia**.
* **Impacto Ambiental:** Aumento direto nas emissões de Gases de Efeito Estufa (GEE), violando metas de descarbonização da IMO (Net-Zero 2050).
* **Risco de Segurança (HSSE):** A dependência de mergulhadores para inspeção expõe vidas humanas a riscos letais em ambientes portuários hostis.

---

## 💡 A Solução HullSense AI

Nossa plataforma atua através de um sistema de **Data Fusion (Fusão de Dados)** que combina três fontes de verdade para um diagnóstico preciso:

1.  **Monitoramento Físico (IoT):** Sensores piezoelétricos instalados na face interna do casco (*dry-side*) captam a assinatura vibracional.
2.  **Modelagem Física:** Utilizamos a fórmula hidrodinâmica calibrada (`k * DWT^0.7`) para calcular o consumo teórico ideal de cada navio.
3.  **Contexto Operacional:** Cruzamento com dados reais da Transpetro (*Noon Reports* e Eventos) e dados ambientais (Vento/Ondas) para isolar o que é "sujeira" do que é "condição de mar".

### Principais Funcionalidades
* **Detecção de Anomalia:** IA (*Isolation Forest*) treinada com padrões físicos de vibração para detectar turbulência causada por cracas.
* **Cálculo Financeiro em Tempo Real:** O dashboard mostra exatamente quanto dinheiro está sendo desperdiçado hoje devido ao arrasto extra.
* **Gêmeo Digital do Casco:** Visualização gráfica (Mapa de Calor) indicando a localização exata da incrustação (Proa, Meio, Popa).
* **Compensação Climática:** O sistema desconta o efeito de ondas e ventos para evitar falsos positivos.

---

## 🛠️ Arquitetura Técnica

O projeto é dividido em três camadas principais:

### 1. Camada de Borda (Hardware/IoT)
* **Dispositivo:** Protótipo baseado em Arduino.
* **Sensores:** Piezoelétricos (vibração) e Ultrassom (espessura - roadmap).
* **Função:** Processamento local (*Edge Computing*) para filtragem de ruído e envio de dados via Serial/MQTT.

### 2. Camada de Inteligência (Backend)
* **Tecnologia:** Python com Flask.
* **IA:** `scikit-learn` implementando algoritmo **Isolation Forest**.
* **Data Science:**
    * Geração de sinais sintéticos baseados no **NASA Bearing Dataset** (física de vibração mecânica).
    * Ingestão e processamento de arquivos CSV reais da frota (`navios.csv`, `eventos.csv`).

### 3. Camada de Decisão (Frontend)
* **Tecnologia:** React (Vite) + TypeScript.
* **Estilo:** CSS puro e Tailwind (Identidade visual Petrobras/Transpetro).
* **Visualização:** Gráficos dinâmicos com `Chart.js` e renderização de imagens geradas pelo Python (`matplotlib`).

---

## 📂 Estrutura do Repositório

```text
eco-hull-project/
│
├── backend/                 # O Cérebro (Python API & IA)
│   ├── app.py               # Servidor Flask e Lógica de Negócio
│   ├── ai_engine.py         # Motor de IA (Geração de Sinais e Isolation Forest)
│   ├── navios.csv           # Dados técnicos da frota (DWT, Dimensões)
│   └── eventos.csv          # Histórico operacional real
│
├── src/                     # A Interface (React Frontend)
│   ├── components/          # Componentes visuais (Header, Sidebar)
│   ├── views/               # Telas (Dashboard, Frota)
│   ├── hooks/               # Lógica de conexão com API
│   └── ...
│
├── public/                  # Assets estáticos
└── README.md                # Documentação
