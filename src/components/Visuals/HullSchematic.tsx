interface HullSchematicProps {
  status?: string;
}

export function HullSchematic({ status }: HullSchematicProps) {
  
  // Lógica para definir a cor baseada no status recebido
  // Se for 'critical' ou 'dirty', usa Vermelho. Se não, usa Verde.
  const isCritical = status === 'critical' || status === 'dirty';
  
  const bowColor = isCritical ? "var(--color-signal-red)" : "var(--color-petro-green)";
  const sternColor = isCritical ? "var(--color-signal-red)" : "var(--color-petro-green)";
  const midColor = isCritical ? "var(--color-petro-yellow)" : "var(--color-petro-green)";
  const opacity = isCritical ? "0.7" : "0.3"; // Menos opaco se estiver limpo

  return (
    <div style={{ position: 'relative', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '3rem' }}>
      <svg viewBox="0 0 1000 400" style={{ width: '100%', height: 'auto' }}>
        {/* Hull outline */}
        <path
          d="M 100 200 Q 100 120, 180 80 L 820 80 Q 900 120, 900 200 Q 900 280, 820 320 L 180 320 Q 100 280, 100 200 Z"
          fill="none"
          stroke="var(--color-petro-blue)"
          strokeWidth="3"
          opacity="0.4"
        />
        
        {/* Deck lines */}
        <line x1="180" y1="120" x2="820" y2="120" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        <line x1="180" y1="200" x2="820" y2="200" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />
        <line x1="180" y1="280" x2="820" y2="280" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        
        <line x1="300" y1="100" x2="300" y2="300" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        <line x1="500" y1="90" x2="500" y2="310" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        <line x1="700" y1="100" x2="700" y2="300" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        
        {/* === ZONAS DINÂMICAS (Usando a prop 'status') === */}
        
        {/* PROA (Bow) */}
        <ellipse cx="180" cy="200" rx="90" ry="80" fill={bowColor} opacity={opacity} />
        <circle cx="120" cy="200" r="25" fill={bowColor} opacity={opacity} />
        
        {/* MEIO (Mid-ship) */}
        <ellipse cx="450" cy="200" rx="140" ry="65" fill={midColor} opacity={opacity} />
        
        {/* POPA (Stern) */}
        <ellipse cx="850" cy="200" rx="70" ry="70" fill={sternColor} opacity={opacity} />
        <ellipse cx="850" cy="200" rx="45" ry="45" fill={sternColor} opacity={opacity} />
        
        {/* Labels que mudam de texto dependendo do status */}
        <text x="180" y="370" textAnchor="middle" fill={bowColor} fontSize="16" fontWeight="700">
            {isCritical ? "PROA - CRÍTICO" : "PROA - OK"}
        </text>
        <text x="500" y="370" textAnchor="middle" fill={midColor} fontSize="16" fontWeight="700">
            {isCritical ? "MEIO-NAVIO" : "MEIO - OK"}
        </text>
        <text x="850" y="370" textAnchor="middle" fill={sternColor} fontSize="16" fontWeight="700">
            {isCritical ? "POPA - CRÍTICO" : "POPA - OK"}
        </text>
      </svg>

      {/* Legenda */}
      <div className="flex-center" style={{ gap: '2rem', marginTop: '1.5rem' }}>
        <div className="flex-center" style={{ gap: '0.5rem' }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'var(--color-petro-green)' }}></div>
            <span className="text-subtitle">Bom</span>
        </div>
        <div className="flex-center" style={{ gap: '0.5rem' }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'var(--color-petro-yellow)' }}></div>
            <span className="text-subtitle">Atenção</span>
        </div>
        <div className="flex-center" style={{ gap: '0.5rem' }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'var(--color-signal-red)' }}></div>
            <span className="text-subtitle">Crítico</span>
        </div>
      </div>
    </div>
  );
}