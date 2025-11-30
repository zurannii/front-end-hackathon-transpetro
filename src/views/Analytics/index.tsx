import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';
import { analyticsChartData } from '../../data/mockData';
import './styles.css';

export function AnalyticsView() {
  return (
    <div className="analytics-container">
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="text-title">Análise Preditiva de Custos</h2>
        <p className="text-subtitle">Otimize o momento ideal para limpeza do casco</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <DollarSign className="text-success" size={20} />
            <h3 className="text-title">Economia Projetada</h3>
          </div>
          <div className="metric-value text-success">$150,000</div>
          <p className="text-subtitle">Otimizando a data de limpeza</p>
        </div>

        <div className="metric-card">
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <Calendar className="text-warning" size={20} />
            <h3 className="text-title">Data Ideal</h3>
          </div>
          <div className="metric-value text-title" style={{ fontSize: '2rem' }}>15 Jan 2026</div>
          <p className="text-subtitle">Daqui a 47 dias</p>
        </div>

        <div className="metric-card">
          <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
            <TrendingDown className="text-success" size={20} />
            <h3 className="text-title">ROI Esperado</h3>
          </div>
          <div className="metric-value text-success">187%</div>
          <p className="text-subtitle">Retorno sobre investimento</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="chart-section">
        <h3 className="text-title" style={{ marginBottom: '1.5rem' }}>Análise de Custos Acumulados</h3>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={analyticsChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="day" 
              label={{ value: 'Dias desde última limpeza', position: 'insideBottom', offset: -5 }}
              stroke="#64748b"
            />
            <YAxis 
              label={{ value: 'Custo Acumulado ($)', angle: -90, position: 'insideLeft' }}
              stroke="#64748b"
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E2E8F0' }}
            />
            <Legend verticalAlign="top" height={36} />
            {/* Note: Recharts precisa de hex colors, não lê bem var() direto no stroke */}
            <Line 
              type="monotone" 
              dataKey="fuelCost" 
              stroke="#DC2626" 
              strokeWidth={3}
              name="Desperdício de Combustível"
              dot={{ fill: '#DC2626', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="cleaningCost" 
              stroke="#008542" 
              strokeWidth={3}
              name="Custo de Limpeza"
              dot={{ fill: '#008542', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="alert-box">
          <AlertTriangle className="text-warning" size={20} />
          <div>
            <p className="text-title" style={{ fontSize: '1rem' }}>Ponto de Interseção Detectado</p>
            <p className="text-subtitle">
              O custo acumulado de combustível ultrapassará o custo de limpeza em ~47 dias. 
              Recomendamos agendar entre 15-20 de Janeiro.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Calendar */}
      <div className="chart-section">
        <h3 className="text-title" style={{ marginBottom: '1.5rem' }}>Calendário de Manutenção</h3>
        
        <div className="timeline-grid">
          {['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai'].map((month, index) => {
             // Lógica simples para demonstrar o visual
             const isOptimal = index === 1; // Janeiro
             const isPast = index === 0; // Dezembro
             
             let className = 'timeline-item';
             if (isOptimal) className += ' optimal';
             else if (isPast) className += ' past';

             return (
               <div key={index} className={className}>
                 <div style={{ textAlign: 'center' }}>
                   <p className="text-subtitle" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>{month}</p>
                   {isOptimal && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FFC20E', margin: '0 auto' }}></div>}
                 </div>
               </div>
             )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="action-bar">
        <button className="btn-secondary">Exportar Análise</button>
        <button className="btn-primary">Agendar Limpeza</button>
      </div>
    </div>
  );
}