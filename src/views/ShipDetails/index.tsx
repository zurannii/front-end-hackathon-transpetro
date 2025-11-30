import { ArrowLeft, Anchor, TrendingUp, DollarSign, AlertTriangle, Calendar, Droplet } from 'lucide-react';
import { HullSchematic } from '../../components/Visuals/HullSchematic';
import './styles.css';

interface ShipDetailsViewProps {
  vesselId: number;
  onBack: () => void;
}

export function ShipDetailsView({ vesselId, onBack }: ShipDetailsViewProps) {
  // Apenas para silenciar o aviso do vesselId não usado por enquanto
  console.log('Visualizando navio ID:', vesselId);

  // Dados simulados (Mock)
  const vesselData = {
    name: 'RAFAEL SANTOS',
    imo: '9234567',
    class: 'Suezmax',
    type: 'Petroleiro',
    status: 'critical',
    statusText: 'Crítico',
    dwt: 156628,
    length: 274.2,
    beam: 48,
    draft: 17,
    fouling: 18,
    dragPenalty: 12,
    fuelWaste: 12500,
    lastCleaning: 210,
    hullArea: Math.round(274.2 * (48 + 2 * 17)),
  };

  return (
    <div className="details-container">
      {/* Botão Voltar */}
      <button onClick={onBack} className="back-btn">
        <ArrowLeft size={20} />
        <span>Voltar para Frota</span>
      </button>

      {/* Header */}
      <div className="details-header">
        <div className="vessel-identity">
          <div className="icon-box">
            <Anchor size={32} className="text-title" />
          </div>
          <div>
            <h1 className="text-title" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{vesselData.name}</h1>
            <p className="text-subtitle">
              {vesselData.class} • {vesselData.type} • IMO: {vesselData.imo}
            </p>
          </div>
        </div>
        <span 
          className="status-badge-lg"
          style={{ 
            backgroundColor: 'var(--bg-critical)', 
            color: 'var(--color-signal-red)',
            borderColor: 'var(--color-signal-red)'
          }}
        >
          Status: {vesselData.statusText}
        </span>
      </div>

      {/* Main Grid: Especificações + Visual */}
      <div className="grid-main">
        {/* Painel Esquerdo: Dados */}
        <div className="info-card">
          <h3 className="text-title" style={{ marginBottom: '1.5rem' }}>Especificações Técnicas</h3>
          
          <div className="spec-row">
            <p className="text-subtitle">Porte Bruto</p>
            <p className="text-title" style={{ fontSize: '1.25rem' }}>{vesselData.dwt.toLocaleString()} DWT</p>
          </div>
          <div className="spec-row">
            <p className="text-subtitle">Comprimento</p>
            <p className="text-title" style={{ fontSize: '1.25rem' }}>{vesselData.length} m</p>
          </div>
          <div className="spec-row">
            <p className="text-subtitle">Boca</p>
            <p className="text-title" style={{ fontSize: '1.25rem' }}>{vesselData.beam} m</p>
          </div>
          <div className="spec-row">
            <p className="text-subtitle">Calado</p>
            <p className="text-title" style={{ fontSize: '1.25rem' }}>{vesselData.draft} m</p>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
             <p className="text-subtitle">Área Submersa</p>
             <p className="text-success" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>~{vesselData.hullArea.toLocaleString()} m²</p>
          </div>
        </div>

        {/* Painel Central: Visual SVG */}
       {/* Painel Central: Visual SVG */}
        <div className="info-card">
           <h3 className="text-title" style={{ marginBottom: '1.5rem' }}>Esquema Técnico do Casco</h3>
           {/* CORREÇÃO: Passando a prop 'status' que vem do vesselData */}
           <HullSchematic status={vesselData.status} />
        </div>
      </div>

      {/* KPI Row */}
      <div className="kpi-grid">
        <div className="kpi-card">
           <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <AlertTriangle className="text-danger" size={20} />
              <h3 className="text-title">Incrustação</h3>
           </div>
           <div className="text-danger" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{vesselData.fouling}%</div>
           <p className="text-subtitle">Média do casco</p>
        </div>
        
        <div className="kpi-card">
           <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <TrendingUp className="text-danger" size={20} />
              <h3 className="text-title">Arrasto</h3>
           </div>
           <div className="text-danger" style={{ fontSize: '2rem', fontWeight: 'bold' }}>+{vesselData.dragPenalty}%</div>
           <p className="text-subtitle">Aumento consumo</p>
        </div>

        <div className="kpi-card">
           <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <DollarSign className="text-danger" size={20} />
              <h3 className="text-title">Desperdício</h3>
           </div>
           <div className="text-danger" style={{ fontSize: '2rem', fontWeight: 'bold' }}>${vesselData.fuelWaste.toLocaleString()}</div>
           <p className="text-subtitle">Mensal</p>
        </div>

        <div className="kpi-card">
           <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Calendar className="text-subtitle" size={20} />
              <h3 className="text-title">Última Limpeza</h3>
           </div>
           <div className="text-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{vesselData.lastCleaning}</div>
           <p className="text-subtitle">dias atrás</p>
        </div>
      </div>

      {/* Recomendação */}
      <div className="recommendation-box">
         <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ 
               width: 48, height: 48, backgroundColor: 'var(--color-petro-yellow)', 
               borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
            }}>
               <Droplet className="text-white" />
            </div>
            <div style={{ flex: 1 }}>
               <h3 className="text-title" style={{ marginBottom: '0.5rem' }}>Ação Recomendada: Limpeza do Casco</h3>
               <p className="text-title">
                  Devido ao alto nível de incrustação nas seções de proa (bulbo) e popa, recomendamos limpeza prioritária.
               </p>

               <div className="rec-grid">
                  <div className="rec-item">
                     <p className="text-subtitle">Área a Limpar</p>
                     <p className="text-title font-bold">~{Math.round(vesselData.hullArea * 0.4).toLocaleString()} m²</p>
                  </div>
                  <div className="rec-item">
                     <p className="text-subtitle">Custo Estimado</p>
                     <p className="text-title font-bold">$80,000</p>
                  </div>
                  <div className="rec-item" style={{ borderColor: 'var(--color-petro-green)' }}>
                     <p className="text-subtitle">Economia (6 meses)</p>
                     <p className="text-success font-bold">$150,000</p>
                  </div>
               </div>

               <div className="action-buttons">
                  <button className="btn-primary">Agendar Limpeza</button>
                  <button className="btn-secondary">Ver Análise</button>
               </div>
            </div>
         </div>
      </div>
      
      {/* Histórico e Condições */}
      <div className="history-grid">
         <div className="info-card">
            <h3 className="text-title" style={{ marginBottom: '1rem' }}>Histórico</h3>
            <div className="history-item">
               <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-petro-green)' }}></div>
               <div>
                  <p className="text-title">Limpeza completa</p>
                  <p className="text-subtitle">15 Maio 2025</p>
               </div>
            </div>
            <div className="history-item">
               <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-petro-yellow)' }}></div>
               <div>
                  <p className="text-title">Monitoramento ativado</p>
                  <p className="text-subtitle">15 Nov 2025</p>
               </div>
            </div>
         </div>

         <div className="info-card">
            <h3 className="text-title" style={{ marginBottom: '1rem' }}>Condições</h3>
            <div className="spec-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span className="text-subtitle">Temperatura Água</span>
               <span className="text-title">24°C</span>
            </div>
            <div className="spec-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span className="text-subtitle">Velocidade Média</span>
               <span className="text-title">13.2 nós</span>
            </div>
         </div>
      </div>
    </div>
  );
}