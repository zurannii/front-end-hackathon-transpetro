import { useState, useEffect, useCallback } from 'react';

// Interface dos dados (mantive a mesma)
interface DashboardData {
  status: 'clean' | 'dirty';
  vibration_level: number;
  fuel_waste: number;
  chart_image: string;
  ship_name: string;
  anomaly_score?: number; // Adicionei como opcional caso venha da API
}

export function useShipData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Usamos useCallback para que a função não seja recriada a cada render
  const fetchPythonData = useCallback(async () => {
    try {
      // Não chame setLoading(true) aqui se estiver fazendo polling (intervalo),
      // pois isso causaria "piscadas" na tela a cada 2 segundos.
      
      const response = await fetch('http://localhost:5000/api/dashboard-data');
      
      if (!response.ok) throw new Error('Falha na conexão com API');
      
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Erro ao conectar com a IA:", error);
    } finally {
      // Garante que o loading pare mesmo se der erro
      setLoading(false);
    }
  }, []);

  // 2. Função para o botão de Demo (disparada manualmente)
  const setSimulationMode = async (mode: 'normal' | 'critical') => {
    try {
      await fetch(`http://localhost:5000/api/toggle-mode/${mode}`);
      // Chama a atualização imediatamente após trocar o modo
      fetchPythonData(); 
    } catch (error) {
      console.error("Erro ao mudar modo:", error);
    }
  };

  // 3. useEffect único para inicialização e intervalo
  useEffect(() => {
    // Chamada inicial
    fetchPythonData();

    // Configura o intervalo de 2 segundos
    const interval = setInterval(() => {
      fetchPythonData();
    }, 2000);

    // Limpeza do intervalo ao desmontar
    return () => clearInterval(interval);
  }, [fetchPythonData]); // Dependência correta: recria o efeito apenas se fetchPythonData mudar

  return { data, loading, setSimulationMode };
}