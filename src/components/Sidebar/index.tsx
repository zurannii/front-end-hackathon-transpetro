import { LayoutDashboard, BarChart3, Ship, Settings, FileText, AlertTriangle } from 'lucide-react';
import './styles.css';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'fleet', icon: Ship, label: 'Frota' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alertas' },
    { id: 'reports', icon: FileText, label: 'Relatórios' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <aside className="sidebar">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`sidebar-btn ${isActive ? 'active' : ''}`}
            title={item.label}
          >
            <Icon size={24} />
            <span className="sidebar-label">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}