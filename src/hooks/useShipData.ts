import { useState, useEffect, useCallback } from 'react';
interface DashboardData {
  status: 'clean' | 'dirty';
  vibration_level: number;
  fuel_waste: number;
  chart_image: string;
  ship_name: string;
  anomaly_score?: number; 
}

export function useShipData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPythonData = useCallback(async () => {
    try {
     
      const response = await fetch('http://localhost:5000/api/dashboard-data');
      
      if (!response.ok) throw new Error('Falha na conexão com API');
      
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Erro ao conectar com a IA:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const setSimulationMode = async (mode: 'normal' | 'critical') => {
    try {
      await fetch(`http://localhost:5000/api/toggle-mode/${mode}`);
      fetchPythonData(); 
    } catch (error) {
      console.error("Erro ao mudar modo:", error);
    }
  };

  useEffect(() => {
    fetchPythonData();

    const interval = setInterval(() => {
      fetchPythonData();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchPythonData]); 
  return { data, loading, setSimulationMode };
}