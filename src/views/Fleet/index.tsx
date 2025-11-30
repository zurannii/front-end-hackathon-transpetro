import { useState } from 'react';
import { fleetData } from '../../data/mockData';
import { Anchor } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import './styles.css';

interface FleetViewProps {
    onVesselClick?: (vesselId: number) => void;
}

export function FleetView({ onVesselClick }: FleetViewProps) {
    const [classFilter, setClassFilter] = useState('Todos');

    // (Lógica de filtro igual à original, apenas simplificada aqui)
    const filteredData = fleetData.filter(v => classFilter === 'Todos' || v.class === classFilter);

    return (
        <div className="fleet-container">
            {/* Cards de Resumo */}
            <div className="summary-grid">
                <div className="summary-card">
                    <p className="text-subtitle">Total de Navios</p>
                    <p className="text-title" style={{ fontSize: '2rem' }}>{fleetData.length}</p>
                </div>
                {/* Outros cards... */}
            </div>

            {/* Filtros */}
            <div className="filters-card">
                <div className="filter-group">
                    <p className="text-subtitle mb-2">Classe</p>
                    {['Todos', 'Suezmax', 'Aframax'].map(opt => (
                        <button
                            key={opt}
                            className={`filter-btn ${classFilter === opt ? 'active' : ''}`}
                            onClick={() => setClassFilter(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid de Navios */}
            <div className="vessel-grid">
                {filteredData.map(vessel => (
                    <div key={vessel.id} className="card" onClick={() => onVesselClick?.(vessel.id)} style={{ cursor: 'pointer' }}>
                        {/* Header do Card */}
                        <div className="flex-between" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <div className="flex-center" style={{ gap: '1rem' }}>
                                <div style={{ padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                                    <Anchor className="text-title" />
                                </div>
                                <div>
                                    <h3 className="text-title">{vessel.name}</h3>
                                    <p className="text-subtitle">{vessel.class}</p>
                                </div>
                            </div>
                            {/* Status Badge */}
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '1rem',
                                fontSize: '0.85rem',
                                backgroundColor: vessel.status === 'critical' ? 'var(--bg-critical)' : 'var(--bg-good)',
                                color: vessel.status === 'critical' ? 'var(--color-signal-red)' : 'var(--color-petro-green)'
                            }}>
                                {vessel.statusText}
                            </span>
                        </div>

                        <div style={{ height: 80, marginTop: '1rem' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={vessel.chartData}>
                                    <XAxis dataKey="month" hide />

                                    <Bar
                                        dataKey="value"
                                        fill="#94a3b8"
                                        radius={[4, 4, 0, 0]}
                                        barSize={120} 
                                    />

                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}