import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/Dashboard';
import { AnalyticsView } from './views/Analytics'; // (Crie similar às outras)
import { FleetView } from './views/Fleet';
import { ShipDetailsView } from './views/ShipDetails'; // (Crie similar às outras)

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedVesselId, setSelectedVesselId] = useState<number | null>(null);

  const renderContent = () => {
    if (activeTab === 'fleet' && selectedVesselId !== null) {
      return <ShipDetailsView vesselId={selectedVesselId} onBack={() => setSelectedVesselId(null)} />;
    }

    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'analytics': return <AnalyticsView />; // Implementar arquivo
      case 'fleet': return <FleetView onVesselClick={setSelectedVesselId} />;
      default: return <div className="flex-center" style={{ height: '100%' }}>Em breve</div>;
    }
  };

  const getTitle = () => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      fleet: 'Frota',
      alerts: 'Alertas'
    };
    return titles[activeTab] || 'Eco-Hull';
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title={getTitle()} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main style={{ flex: 1, overflow: 'auto', backgroundColor: 'var(--color-ice-blue)' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}