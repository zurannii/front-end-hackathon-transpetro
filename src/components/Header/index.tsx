import { Search, Bell, User } from 'lucide-react';
import './styles.css';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="brand-section">
          <div className="logo-box">T</div>
          <div>
            <div className="text-title">Transpetro</div>
            <div className="text-subtitle" style={{ fontSize: '0.75rem' }}>Eco-Hull System</div>
          </div>
        </div>
        <h1 className="text-title" style={{ fontSize: '1.5rem' }}>{title}</h1>
      </div>
      
      <div className="header-right">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Pesquisar embarcações..."
            className="search-input"
          />
        </div>
        <button className="icon-btn">
          <Bell size={20} className="text-subtitle" />
          <span className="notification-badge"></span>
        </button>
        <button className="icon-btn">
          <div className="user-avatar">
            <User size={20} />
          </div>
        </button>
      </div>
    </header>
  );
}