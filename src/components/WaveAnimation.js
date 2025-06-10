export class WaveAnimation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dots = [];
    this.time = 0;
    
    // Grid settings - adjust for mobile
    const isMobile = window.innerWidth < 768;
    this.dotSize = isMobile ? 3 : 4;
    this.spacing = isMobile ? 10 : 12;
    
    // Ocean simulation
    this.waves = [];
    this.currents = [];
    this.swells = [];
    
    // Visual settings
    this.baseColor = { r: 51, g: 65, b: 85 }; // Slate blue
    this.shallowColor = { r: 80, g: 120, b: 160 }; // Medium blue
    this.waveColor = { r: 120, g: 160, b: 200 }; // Light blue
    this.foamColor = { r: 200, g: 220, b: 240 }; // Almost white
    
    this.initializeGrid();
    this.initializeOcean();
  }
  
  initializeGrid() {
    // Use the canvas display dimensions, not the scaled dimensions
    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);
    
    const cols = Math.floor(width / this.spacing);
    const rows = Math.floor(height / this.spacing);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * this.spacing + this.spacing / 2;
        const y = j * this.spacing + this.spacing / 2;
        
        this.dots.push({
          x: x,
          y: y,
          gridX: i,
          gridY: j,
          size: this.dotSize,
          targetSize: this.dotSize,
          opacity: 1,
          targetOpacity: 1,
          color: `rgb(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b})`,
          targetColor: { r: this.baseColor.r, g: this.baseColor.g, b: this.baseColor.b },
          currentColor: { r: this.baseColor.r, g: this.baseColor.g, b: this.baseColor.b },
          energy: 0,
          smoothEnergy: 0 // Smoothed energy value
        });
      }
    }
  }
  
  initializeOcean() {
    // Create background swells
    for (let i = 0; i < 3; i++) {
      this.swells.push({
        angle: Math.random() * Math.PI * 2,
        wavelength: 400 + Math.random() * 200,
        amplitude: 0.3 + Math.random() * 0.2,
        speed: 0.001 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    // Initialize with a few waves
    for (let i = 0; i < 2; i++) {
      this.createWave();
    }
  }
  
  createWave() {
    // Use display dimensions
    const displayWidth = this.canvas.width / (window.devicePixelRatio || 1);
    const displayHeight = this.canvas.height / (window.devicePixelRatio || 1);
    
    // Random wave that travels across the screen
    this.waves.push({
      x: -200 + Math.random() * (displayWidth + 400),
      y: displayHeight,
      direction: -Math.PI/2 + (Math.random() - 0.5) * Math.PI/3, // Mostly upward
      speed: 0.5 + Math.random() * 1,
      strength: 0.5 + Math.random() * 0.5,
      wavelength: 150 + Math.random() * 150,
      width: 200 + Math.random() * 200,
      age: 0,
      maxAge: 300 + Math.random() * 200,
      fadeInDuration: 60 // Fade in over 60 frames
    });
  }
  
  createCurrent() {
    // Use display dimensions
    const displayWidth = this.canvas.width / (window.devicePixelRatio || 1);
    const displayHeight = this.canvas.height / (window.devicePixelRatio || 1);
    
    // Random current that affects a region
    this.currents.push({
      x: Math.random() * displayWidth,
      y: displayHeight * (0.75 + Math.random() * 0.25),
      radius: 100 + Math.random() * 150,
      strength: 0.3 + Math.random() * 0.4,
      rotation: (Math.random() - 0.5) * 0.02,
      lifespan: 200 + Math.random() * 300,
      age: 0,
      fadeInDuration: 80 // Fade in over 80 frames
    });
  }
  
  update() {
    this.time += 1;
    
    // Randomly generate new waves - less frequent on mobile
    const isMobile = window.innerWidth < 768;
    const waveChance = isMobile ? 0.01 : 0.02;
    const currentChance = isMobile ? 0.005 : 0.01;
    const maxCurrents = isMobile ? 2 : 3;
    
    if (Math.random() < waveChance) {
      this.createWave();
    }
    
    // Randomly generate currents
    if (Math.random() < currentChance && this.currents.length < maxCurrents) {
      this.createCurrent();
    }
    
    // Update waves
    this.waves = this.waves.filter(wave => {
      wave.x += Math.cos(wave.direction) * wave.speed;
      wave.y += Math.sin(wave.direction) * wave.speed;
      wave.age++;
      
      // Remove old waves
      return wave.age < wave.maxAge && wave.y > -200;
    });
    
    // Update currents
    this.currents = this.currents.filter(current => {
      current.age++;
      current.rotation *= 0.98; // Slow down rotation
      return current.age < current.lifespan;
    });
    
    // Update each dot
    this.dots.forEach(dot => {
      // Use display dimensions for calculations
      const displayHeight = this.canvas.height / (window.devicePixelRatio || 1);
      const distanceFromBottom = displayHeight - dot.y;
      const isMobile = window.innerWidth < 768;
      const minWaveHeight = 150; // Minimum wave zone height
      const wavePercentage = isMobile ? 0.4 : 0.25;
      const waveZone = Math.max(minWaveHeight, displayHeight * wavePercentage);
      
      // Only animate dots in the wave zone
      if (distanceFromBottom > waveZone) {
        // Static dots above wave zone
        dot.targetOpacity = 0.3;
        dot.targetColor = { r: this.baseColor.r, g: this.baseColor.g, b: this.baseColor.b };
        dot.targetSize = this.dotSize;
        dot.energy = 0;
        dot.smoothEnergy = dot.smoothEnergy * 0.95; // Smooth fade out
        return;
      }
      
      // Calculate wave zone influence
      const zoneInfluence = distanceFromBottom / waveZone;
      
      // Reset energy
      dot.energy = 0;
      
      // Apply background swells
      this.swells.forEach(swell => {
        const swellX = dot.x * Math.cos(swell.angle) + dot.y * Math.sin(swell.angle);
        const swellPhase = (swellX / swell.wavelength + this.time * swell.speed) * Math.PI * 2 + swell.phase;
        dot.energy += Math.sin(swellPhase) * swell.amplitude * zoneInfluence * 0.3;
      });
      
      // Apply wave effects
      this.waves.forEach(wave => {
        const dx = dot.x - wave.x;
        const dy = dot.y - wave.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < wave.width) {
          // Calculate wave intensity based on distance and wave shape
          const wavePosition = distance / wave.width;
          const lateralPosition = (dx * Math.cos(wave.direction + Math.PI/2) + dy * Math.sin(wave.direction + Math.PI/2)) / wave.wavelength;
          
          // Create wave crest pattern
          const waveShape = Math.cos(wavePosition * Math.PI) * Math.cos(lateralPosition * Math.PI * 2);
          
          // Fade in at beginning, fade out at end
          let fadeMultiplier = 1;
          if (wave.age < wave.fadeInDuration) {
            fadeMultiplier = wave.age / wave.fadeInDuration;
          }
          const ageAttenuation = fadeMultiplier * (1 - (wave.age / wave.maxAge) * 0.5);
          
          dot.energy += waveShape * wave.strength * ageAttenuation * zoneInfluence;
        }
      });
      
      // Apply current effects
      this.currents.forEach(current => {
        const dx = dot.x - current.x;
        const dy = dot.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < current.radius) {
          const currentInfluence = 1 - (distance / current.radius);
          const angle = Math.atan2(dy, dx) + this.time * current.rotation;
          const spiralEffect = Math.sin(angle + distance * 0.05) * 0.5 + 0.5;
          
          // Fade in at beginning
          let fadeMultiplier = 1;
          if (current.age < current.fadeInDuration) {
            fadeMultiplier = current.age / current.fadeInDuration;
          }
          
          dot.energy += spiralEffect * current.strength * currentInfluence * zoneInfluence * fadeMultiplier;
        }
      });
      
      // Add some noise for water texture
      const noise = Math.sin(dot.x * 0.1 + this.time * 0.01) * 
                   Math.cos(dot.y * 0.1 + this.time * 0.007) * 0.1;
      dot.energy += noise * zoneInfluence;
      
      // Clamp energy
      dot.energy = Math.max(0, Math.min(1, (dot.energy + 1) / 2));
      
      // Smooth energy transitions
      const energySmoothing = 0.15; // Higher = smoother but slower response
      dot.smoothEnergy = dot.smoothEnergy + (dot.energy - dot.smoothEnergy) * energySmoothing;
      
      // Calculate target color based on smoothed energy
      let r, g, b;
      if (dot.smoothEnergy < 0.33) {
        // Base to shallow transition
        const t = dot.smoothEnergy / 0.33;
        r = this.baseColor.r + (this.shallowColor.r - this.baseColor.r) * t;
        g = this.baseColor.g + (this.shallowColor.g - this.baseColor.g) * t;
        b = this.baseColor.b + (this.shallowColor.b - this.baseColor.b) * t;
      } else if (dot.smoothEnergy < 0.66) {
        // Shallow to wave transition
        const t = (dot.smoothEnergy - 0.33) / 0.33;
        r = this.shallowColor.r + (this.waveColor.r - this.shallowColor.r) * t;
        g = this.shallowColor.g + (this.waveColor.g - this.shallowColor.g) * t;
        b = this.shallowColor.b + (this.waveColor.b - this.shallowColor.b) * t;
      } else {
        // Wave to foam transition
        const t = (dot.smoothEnergy - 0.66) / 0.34;
        r = this.waveColor.r + (this.foamColor.r - this.waveColor.r) * t;
        g = this.waveColor.g + (this.foamColor.g - this.waveColor.g) * t;
        b = this.waveColor.b + (this.foamColor.b - this.waveColor.b) * t;
      }
      
      dot.targetColor = { r: r, g: g, b: b };
      
      // Target size based on smoothed energy - smaller variation on mobile
      const sizeVariation = isMobile ? 2.5 : 4;
      dot.targetSize = this.dotSize + dot.smoothEnergy * sizeVariation * zoneInfluence;
      
      // Target opacity based on zone position and smoothed energy
      dot.targetOpacity = 0.4 + zoneInfluence * 0.3 + dot.smoothEnergy * 0.3;
    });
    
    // Apply smooth transitions to all dots
    const sizeSmoothing = 0.2;
    const colorSmoothing = 0.2;
    const opacitySmoothing = 0.2;
    
    this.dots.forEach(dot => {
      // Smooth size transitions
      dot.size = dot.size + (dot.targetSize - dot.size) * sizeSmoothing;
      
      // Smooth color transitions
      dot.currentColor.r = dot.currentColor.r + (dot.targetColor.r - dot.currentColor.r) * colorSmoothing;
      dot.currentColor.g = dot.currentColor.g + (dot.targetColor.g - dot.currentColor.g) * colorSmoothing;
      dot.currentColor.b = dot.currentColor.b + (dot.targetColor.b - dot.currentColor.b) * colorSmoothing;
      
      // Smooth opacity transitions
      dot.opacity = dot.opacity + (dot.targetOpacity - dot.opacity) * opacitySmoothing;
      
      // Update color string
      dot.color = `rgb(${Math.floor(dot.currentColor.r)}, ${Math.floor(dot.currentColor.g)}, ${Math.floor(dot.currentColor.b)})`;
    });
  }
  
  render() {
    // Clear canvas - use display dimensions
    const displayWidth = this.canvas.width / (window.devicePixelRatio || 1);
    const displayHeight = this.canvas.height / (window.devicePixelRatio || 1);
    
    this.ctx.fillStyle = '#0a0a0a';
    this.ctx.fillRect(0, 0, displayWidth, displayHeight);
    
    // Save context state
    this.ctx.save();
    
    // Render dots
    this.dots.forEach(dot => {
      this.ctx.globalAlpha = dot.opacity;
      this.ctx.fillStyle = dot.color;
      this.ctx.beginPath();
      // Ensure perfect circles by using exact radius
      this.ctx.arc(Math.round(dot.x), Math.round(dot.y), Math.round(dot.size), 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    // Restore context state
    this.ctx.restore();
    this.ctx.globalAlpha = 1;
  }
  
  animate() {
    this.update();
    this.render();
  }
  
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.dots = [];
    this.waves = [];
    this.currents = [];
    this.swells = [];
    this.initializeGrid();
    this.initializeOcean();
  }
}