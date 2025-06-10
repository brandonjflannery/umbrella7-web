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
      // Get the parent container dimensions
      const container = canvas.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Handle device pixel ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      
      // Set actual canvas size in memory
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Scale canvas back down using CSS
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      // Scale the drawing context to match device pixel ratio
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      
      if (animationRef.current) {
        animationRef.current.resize(width, height);
      }
    };

    // Initial setup with a small delay to ensure DOM is ready
    setTimeout(() => {
      resizeCanvas();
      animationRef.current = new WaveAnimation(canvas);
      
      // Force initial render
      if (animationRef.current) {
        animationRef.current.animate();
      }
    }, 100);

    // Reduce frame rate on mobile for better performance
    const isMobile = window.innerWidth < 768;
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime) => {
      if (currentTime - lastTime > frameInterval) {
        if (animationRef.current) {
          animationRef.current.animate();
        }
        lastTime = currentTime;
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
            src={getImagePath('umbrella7-plain.png')}
            alt="Umbrella 7"
            className="homepage-logo"
          />
        </div>
        <h1 className="company-tagline">
          Applied Machine-Learning Research
        </h1>
      </div>
    </div>
  );
};

export default HomePage2;