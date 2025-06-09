import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      path: '/'
    },
    {
      id: 'login',
      label: 'Login',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      path: '/login'
    }
  ];

  const handleMenuClick = (path) => {
    // Handle navigation here
    console.log(`Navigating to: ${path}`);
    // If using React Router, you would use:
    // navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button 
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Umbrella 7</h2>
          <button 
            className="sidebar-close"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-menu-item">
              <button
                className="sidebar-menu-link"
                onClick={() => handleMenuClick(item.path)}
              >
                <span className="sidebar-menu-icon">
                  {item.icon}
                </span>
                <span className="sidebar-menu-label">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <p className="sidebar-footer-text">© 2025 Umbrella 7</p>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;