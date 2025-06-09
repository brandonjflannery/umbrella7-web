import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Umbrella 7 is an applied machine-learning research firm developing next generation digital infrastructure for modern enterprises';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Typing speed

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="homepage">
      <div className="homepage-content">
        <div className="logo-container">
          <img 
            src="/umbrella-logo-plain.png" 
            alt="Umbrella 7" 
            className="homepage-logo"
          />
        </div>
        
        <div className="terminal-text">
          <span className="terminal-prompt">$</span>
          <span className="terminal-content">{displayedText}</span>
          <span className="terminal-cursor">{currentIndex < fullText.length ? '▋' : ''}</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;