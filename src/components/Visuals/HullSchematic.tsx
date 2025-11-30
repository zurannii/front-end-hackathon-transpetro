export function HullSchematic() {
  return (
    <div style={{ position: 'relative', backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '3rem' }}>
      <svg viewBox="0 0 1000 400" style={{ width: '100%', height: 'auto' }}>
        {/* Hull outline - Suezmax tanker shape */}
        <path
          d="M 100 200 Q 100 120, 180 80 L 820 80 Q 900 120, 900 200 Q 900 280, 820 320 L 180 320 Q 100 280, 100 200 Z"
          fill="none"
          stroke="var(--color-petro-blue)"
          strokeWidth="3"
          opacity="0.4"
        />
        
        {/* Deck lines - longitudinal */}
        <line x1="180" y1="120" x2="820" y2="120" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        <line x1="180" y1="200" x2="820" y2="200" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" strokeDasharray="5,5" />
        <line x1="180" y1="280" x2="820" y2="280" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        
        {/* Deck lines - transverse */}
        <line x1="300" y1="100" x2="300" y2="300" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        <line x1="500" y1="90" x2="500" y2="310" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        <line x1="700" y1="100" x2="700" y2="300" stroke="var(--color-petro-blue)" strokeWidth="1" opacity="0.2" />
        
        {/* Bow section - RED (Critical fouling) */}
        <ellipse cx="180" cy="200" rx="90" ry="80" fill="var(--color-signal-red)" opacity="0.7" />
        <ellipse cx="180" cy="200" rx="60" ry="55" fill="var(--color-signal-red)" opacity="0.9" />
        
        {/* Bow bulb indicator */}
        <circle cx="120" cy="200" r="25" fill="var(--color-signal-red)" opacity="0.8" />
        
        {/* Stern section - RED (Critical fouling) */}
        <ellipse cx="850" cy="200" rx="70" ry="70" fill="var(--color-signal-red)" opacity="0.6" />
        <ellipse cx="850" cy="200" rx="45" ry="45" fill="var(--color-signal-red)" opacity="0.8" />
        
        {/* Mid-ship section - Yellow (Moderate) */}
        <ellipse cx="450" cy="200" rx="140" ry="65" fill="var(--color-petro-yellow)" opacity="0.5" />
        
        {/* Labels */}
        <text x="180" y="370" textAnchor="middle" fill="var(--color-signal-red)" fontSize="16" fontWeight="700">PROA - CRÍTICO</text>
        <text x="500" y="370" textAnchor="middle" fill="var(--color-petro-yellow)" fontSize="16" fontWeight="700">MEIO-NAVIO</text>
        <text x="850" y="370" textAnchor="middle" fill="var(--color-signal-red)" fontSize="16" fontWeight="700">POPA - CRÍTICO</text>
      </svg>

      {/* Legenda simples */}
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