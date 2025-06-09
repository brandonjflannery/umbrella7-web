import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const HomeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const LoginIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home', Icon: HomeIcon },
    { path: '/login', label: 'Login', Icon: LoginIcon }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="logo-link">
          <img 
            src="/umbrella-logo-plain.png" 
            alt="Umbrella 7" 
            className="sidebar-logo"
          />
        </Link>
        {!collapsed && (
          <span className="app-title">Umbrella 7</span>
        )}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.Icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <IconComponent className="nav-icon" />
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <div className="footer-content">
          <img 
            src="/umbrella-logo-plain.png" 
            alt="Umbrella Logo" 
            className="footer-logo"
          />
          {!collapsed && (
            <div className="footer-text">
              <div className="footer-copyright">© 2025 Umbrella 7, LLC</div>
              <div className="footer-version">v1.0.0</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;