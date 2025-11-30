import { TrendingUp, DollarSign, Droplet, AlertCircle } from 'lucide-react';
import { HullHeatmap } from '../../components/Visuals/HullHeatmap';
import './styles.css';

export function DashboardView() {
  return (
    <div className="dashboard-container">
      {/* Vessel Info Header */}
      <div className="dashboard-header">
        <div>
          <h2 className="text-title">Navio: Rafael Santos</h2>
          <p className="text-subtitle">Última inspeção: 15 Nov 2025 • IMO: 9234567</p>
        </div>
        <div className="action-buttons">
          <button className="btn-primary">Gerar Relatório</button>
          <button className="btn-outline">Histórico</button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid-cols-3">
        {/* Status Card */}
        <div className="card">
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <AlertCircle size={20} className="text-warning" />
            <h3 className="text-title">Status do Casco</h3>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
             {/* Indicadores visuais... */}
             <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#DC2626', opacity: 0.3 }}></div>
             <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFC20E', boxShadow: '0 0 0 4px rgba(255,194,14,0.2)' }}></div>
             <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#008542', opacity: 0.3 }}></div>
          </div>
          <p className="text-title" style={{ marginBottom: '0.5rem' }}>Biofilme Detectado</p>
          <p className="text-subtitle">Nível médio de incrustação.</p>
        </div>

        {/* Drag Penalty */}
        <div className="card">
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <TrendingUp size={20} className="text-danger" />
            <h3 className="text-title">Penalidade de Arrasto</h3>
          </div>
          <div className="metric-value text-danger">+8%</div>
          <p className="text-subtitle">Aumento no consumo</p>
        </div>

        {/* Fuel Waste */}
        <div className="card">
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <DollarSign size={20} className="text-warning" />
            <h3 className="text-title">Desperdício</h3>
          </div>
          <div className="metric-value text-title">$2,700</div>
          <p className="text-subtitle">Custo adicional mensal</p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="card">
        <h3 className="text-title" style={{ marginBottom: '1.5rem' }}>Mapa de Calor do Casco</h3>
        <HullHeatmap />
      </div>

      {/* Metrics */}
      <div className="metric-grid">
         <div className="metric-box">
            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Droplet size={16} /> <span className="text-subtitle">Última Limpeza</span>
            </div>
            <p className="text-title font-bold">180 dias atrás</p>
         </div>
         {/* Repita para as outras 3 métricas... */}
      </div>
    </div>
  );
}