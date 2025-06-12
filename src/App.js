import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import HomePage2 from './pages/HomePage2';
import LoginPage from './pages/LoginPage';
import { useSwipeGesture } from './hooks/useSwipeGesture';
import './styles/App.css';

function App() {
  // Default to collapsed sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add swipe gestures for mobile
  const isMobile = window.innerWidth < 768;
  
  useSwipeGesture(
    () => { if (isMobile && !sidebarCollapsed) setSidebarCollapsed(true); }, // Swipe left to close
    () => { if (isMobile && sidebarCollapsed) setSidebarCollapsed(false); }  // Swipe right to open
  );

  return (
    <Router>
      <div className="app">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
          isMobile={isMobile}
        />
        <main className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage2 />} />
            <Route path="/home-2" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;