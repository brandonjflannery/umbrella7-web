import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import HomePage2 from './pages/HomePage2';
import LoginPage from './pages/LoginPage';
import './styles/App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="app">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
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