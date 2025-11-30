interface HullSchematicProps {
  status: 'critical' | 'warning' | 'good';
}

export function HullSchematic({ status }: HullSchematicProps) {
  // Define a cor principal baseada no status
  const mainColor = 
    status === 'critical' ? 'var(--color-signal-red)' : 
    status === 'warning' ? 'var(--color-petro-yellow)' : 
    'var(--color-petro-green)';

  const statusLabel = 
    status === 'critical' ? 'CRÍTICO' : 
    status === 'warning' ? 'ATENÇÃO' : 
    'NORMAL';

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-light-grey)', borderRadius: '8px', padding: '2rem' }}>
      <svg viewBox="0 0 800 300" style={{ width: '100%', height: 'auto', display: 'block' }}>
        
        {/* Contorno do Navio */}
        <path
          d="M 100 150 Q 100 100, 150 80 L 650 80 Q 700 100, 700 150 Q 700 200, 650 220 L 150 220 Q 100 200, 100 150 Z"
          fill="none"
          stroke="var(--color-petro-blue)"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Linhas de Grade */}
        <line x1="100" y1="150" x2="700" y2="150" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.1" strokeDasharray="5,5" />
        <line x1="250" y1="80" x2="250" y2="220" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.1" strokeDasharray="5,5" />
        <line x1="400" y1="80" x2="400" y2="220" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.1" strokeDasharray="5,5" />
        <line x1="550" y1="80" x2="550" y2="220" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.1" strokeDasharray="5,5" />

        {/* --- ZONAS DE CALOR DINÂMICAS --- */}

        {/* PROA - Segue o status principal */}
        <ellipse
          cx="160" cy="150" rx="60" ry="50"
          fill={mainColor} opacity="0.6"
        />
        <ellipse
          cx="160" cy="150" rx="40" ry="35"
          fill={mainColor} opacity="0.8"
        />

        {/* MEIO - Sempre um pouco melhor ou igual */}
        <ellipse
          cx="400" cy="150" rx="120" ry="60"
          fill={status === 'good' ? 'var(--color-petro-green)' : 'var(--color-petro-yellow)'} 
          opacity="0.5"
        />

        {/* POPA - Segue o status principal */}
        <ellipse
          cx="640" cy="150" rx="50" ry="45"
          fill={mainColor} opacity="0.5"
        />
        <ellipse
          cx="640" cy="150" rx="30" ry="28"
          fill={mainColor} opacity="0.7"
        />

        {/* Rótulos */}
        <text x="160" y="270" textAnchor="middle" fill={mainColor} fontSize="14" fontWeight="600">PROA - {statusLabel}</text>
        <text x="400" y="270" textAnchor="middle" fill="var(--color-text-primary)" fontSize="14" fontWeight="600">MEIO-NAVIO</text>
        <text x="640" y="270" textAnchor="middle" fill={mainColor} fontSize="14" fontWeight="600">POPA - {statusLabel}</text>
      </svg>

      {/* Legenda */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-petro-green)' }}></div>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Bom (&lt;5%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-petro-yellow)' }}></div>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Médio (5-15%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: 'var(--color-signal-red)' }}></div>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Crítico (&gt;15%)</span>
        </div>
      </div>
    </div>
  );
}