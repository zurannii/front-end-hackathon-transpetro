import { TrendingUp, DollarSign, Droplet, AlertCircle, Activity } from 'lucide-react';
import { useShipData } from '../../hooks/useShipData';
import './styles.css';

export function DashboardView() {
  
  // 1. Usando o Hook para pegar dados do Python
  const { data, loading, setSimulationMode } = useShipData();

  // Loading state simples
  if (loading) {
    return (
      <div className="dashboard-container flex-center" style={{ height: '100%' }}>
        <p className="text-title">Conectando ao Eco-Hull Brain...</p>
      </div>
    );
  }

  // Se não houver dados (API desligada), usa um fallback seguro
  const safeData = data || {
    ship_name: 'Desconectado',
    status: 'clean',
    fuel_waste: 0,
    vibration_level: 0,
    chart_image: ''
  };

  const isCritical = safeData.status === 'dirty';

  return (
    <div className="dashboard-container">
      
      {/* HEADER DINÂMICO */}
      <div className="dashboard-header">
        <div>
          <h2 className="text-title">Navio: {safeData.ship_name}</h2>
          <p className="text-subtitle">Monitoramento em Tempo Real • API Conectada</p>
        </div>
        
        {/* BOTÕES DE DEMO (Para o Juiz Ver) */}
        <div className="action-buttons">
          <button 
            className="btn-outline" 
            onClick={() => setSimulationMode('normal')}
            style={{ borderColor: '#008542', color: '#008542' }}
          >
            Simular Normal
          </button>
          <button 
            className="btn-primary" 
            onClick={() => setSimulationMode('critical')}
            style={{ backgroundColor: '#DC2626', borderColor: '#DC2626' }}
          >
            Simular Craca
          </button>
        </div>
      </div>

      {/* GRID DE CARDS */}
      <div className="grid-cols-3">
        
        {/* STATUS CARD (Muda de cor com a IA) */}
        <div className="card" style={{ borderLeft: `4px solid ${isCritical ? '#DC2626' : '#008542'}` }}>
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <AlertCircle size={20} className={isCritical ? "text-danger" : "text-success"} />
            <h3 className="text-title">Status do Casco</h3>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
             <span style={{ 
               fontSize: '1.5rem', 
               fontWeight: 'bold',
               color: isCritical ? '#DC2626' : '#008542'
             }}>
               {isCritical ? 'CRÍTICO' : 'OTIMIZADO'}
             </span>
          </div>
          
          <p className="text-subtitle">
            {isCritical 
              ? 'Anomalia de vibração detectada. Risco de bioincrustação severa.' 
              : 'Padrão de vibração normal. Fluxo laminar confirmado.'}
          </p>
        </div>

        {/* VIBRAÇÃO (Dado Real da IA) */}
        <div className="card">
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <Activity size={20} className="text-warning" />
            <h3 className="text-title">Nível de Vibração</h3>
          </div>
          <div className="metric-value text-title">
            {safeData.vibration_level.toFixed(2)} <span style={{fontSize: '1rem', color: '#94a3b8'}}>RMS</span>
          </div>
          <p className="text-subtitle">Monitoramento Piezoelétrico</p>
        </div>

        {/* PREJUÍZO (Dinheiro) */}
        <div className="card">
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <DollarSign size={20} className={isCritical ? "text-danger" : "text-success"} />
            <h3 className="text-title">Desperdício Diário</h3>
          </div>
          <div className={`metric-value ${isCritical ? 'text-danger' : 'text-success'}`}>
            ${safeData.fuel_waste}
          </div>
          <p className="text-subtitle">Custo extra de combustível hoje</p>
        </div>
      </div>

      {/* ÁREA DO GRÁFICO (Vem do Python) */}
      <div className="dashboard-split" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Gráfico da IA */}
        <div className="card">
          <h3 className="text-title" style={{ marginBottom: '1rem' }}>Análise de Anomalia (Isolation Forest)</h3>
          <div className="chart-wrapper" style={{ display: 'flex', justifyContent: 'center', background: '#F8FAFC', borderRadius: '8px', padding: '10px' }}>
            {safeData.chart_image ? (
              <img 
                src={safeData.chart_image} 
                alt="Gráfico de Análise da IA" 
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
              />
            ) : (
              <div className="flex-center" style={{ height: '300px', color: '#94a3b8' }}>
                Aguardando dados do sensor...
              </div>
            )}
          </div>
        </div>

        {/* Métricas Secundárias */}
        <div className="metric-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
           <div className="metric-box" style={{ flex: 1 }}>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Droplet size={16} /> <span className="text-subtitle">Última Limpeza</span>
              </div>
              <p className="text-title font-bold">15 Nov 2024</p>
           </div>
           
           <div className="metric-box" style={{ flex: 1 }}>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <TrendingUp size={16} /> <span className="text-subtitle">Eficiência</span>
              </div>
              <p className={`text-title font-bold ${isCritical ? 'text-danger' : 'text-success'}`}>
                {isCritical ? '88%' : '98%'}
              </p>
           </div>
        </div>

      </div>
    </div>
  );
}