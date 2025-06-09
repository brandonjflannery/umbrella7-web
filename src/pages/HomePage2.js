import React, { useEffect, useRef } from 'react';
import { WaveAnimation } from '../components/WaveAnimation';
import { getImagePath } from '../utils/getImagePath';
import './HomePage2.css';

const HomePage2 = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      if (animationRef.current) {
        animationRef.current.resize(canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    animationRef.current = new WaveAnimation(canvas);

    const animate = () => {
      if (animationRef.current) {
        animationRef.current.animate();
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="homepage-2">
      <canvas ref={canvasRef} className="wave-canvas" />
      <div className="homepage-2-content">
        <div className="logo-container">
          <img 
            src={getImagePath('umbrella-logo-plain.png')}
            alt="Umbrella 7"
            className="homepage-logo"
          />
        </div>
        <h1 className="company-tagline">
          Umbrella 7 is an applied machine-learning research firm developing next generation digital infrastructure for modern enterprises
        </h1>
      </div>
    </div>
  );
};

export default HomePage2;