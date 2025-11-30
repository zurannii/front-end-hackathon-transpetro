export interface VesselData {
  id: number;
  name: string;
  imo: string;
  class: string;
  type: 'Petroleiro' | 'Gaseiro';
  status: 'critical' | 'warning' | 'good';
  statusText: string;
  fouling: number;
  dragPenalty: number;
  fuelWaste: number;
  lastCleaning: number;
  dwt: number;
  length: number;
  beam: number;
  draft: number;
  chartData: Array<{ month: string; value: number }>;
}

export const analyticsChartData = [
  { day: 0, fuelCost: 50000, cleaningCost: 80000 },
  { day: 30, fuelCost: 62000, cleaningCost: 80000 },
  { day: 60, fuelCost: 78000, cleaningCost: 80000 },
  { day: 90, fuelCost: 98000, cleaningCost: 80000 },
  { day: 120, fuelCost: 122000, cleaningCost: 80000 },
  { day: 150, fuelCost: 152000, cleaningCost: 80000 },
  { day: 180, fuelCost: 188000, cleaningCost: 80000 },
  { day: 210, fuelCost: 230000, cleaningCost: 80000 },
  { day: 240, fuelCost: 280000, cleaningCost: 80000 },
];

export const fleetData: VesselData[] = [
  {
    id: 1, name: 'RAFAEL SANTOS', imo: '9234567', class: 'Suezmax', type: 'Petroleiro',
    status: 'critical', statusText: 'Limpeza Requerida', fouling: 18, dragPenalty: 12,
    fuelWaste: 12500, lastCleaning: 210, dwt: 156628, length: 274.2, beam: 48, draft: 17,
    chartData: [{ month: 'Set', value: 5 }, { month: 'Out', value: 8 }, { month: 'Nov', value: 12 }, { month: 'Dez', value: 18 }],
  },
  {
    id: 2, name: 'RICARDO BARBOSA', imo: '9345678', class: 'Gaseiro 7k', type: 'Gaseiro',
    status: 'good', statusText: 'Ótimo', fouling: 3, dragPenalty: 2,
    fuelWaste: 400, lastCleaning: 45, dwt: 7200, length: 118.5, beam: 19.2, draft: 7.8,
    chartData: [{ month: 'Set', value: 1 }, { month: 'Out', value: 2 }, { month: 'Nov', value: 2 }, { month: 'Dez', value: 3 }],
  },
  // Adicione os outros navios aqui conforme seu código original...
  // (Resumi para economizar espaço na resposta, mas você deve copiar todos)
];