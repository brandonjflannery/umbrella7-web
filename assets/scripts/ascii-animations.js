// ASCII Art Animation Themes
const themes = {
    terminal: {
        name: 'terminal',
        color: '#00ff00',
        bgColor: '#000000',
        animations: {
            hero: [
                `
    ╔════════════════════════════════╗
    ║  UMBRELLA 7 SYSTEMS ONLINE     ║
    ║  > Initializing ML Core...     ║
    ║  > Loading Neural Networks...  ║
    ║  > Status: OPERATIONAL         ║
    ╚════════════════════════════════╝
                `,
                `
    ╔════════════════════════════════╗
    ║  UMBRELLA 7 SYSTEMS ONLINE     ║
    ║  > Initializing ML Core...     ║
    ║  > Loading Neural Networks...  ║
    ║  > Status: OPERATIONAL ▋       ║
    ╚════════════════════════════════╝
                `
            ],
            icons: {
                research: `
    ┌─────┐
    │ ◊◊◊ │
    │ ─┼─ │
    │ ◊◊◊ │
    └─────┘`,
                infrastructure: `
    ┌─┬─┬─┐
    ├─┼─┼─┤
    ├─┼─┼─┤
    └─┴─┴─┘`,
                innovation: `
    ┌─────┐
    │ ★★★ │
    │ ╲│╱ │
    │  ●  │
    └─────┘`
            }
        }
    },
    neural: {
        name: 'neural',
        color: '#667eea',
        bgColor: '#0a0a0a',
        animations: {
            hero: [
                `
        ○───○───○       ○───○
        │ ╲ │ ╱ │       │ ╱ │
        ○───●───○───●───○───○
        │ ╱ │ ╲ │       │ ╲ │
        ○───○───○       ○───○
                `,
                `
        ●───○───●       ○───●
        │ ╲ │ ╱ │       │ ╱ │
        ○───●───○───●───●───○
        │ ╱ │ ╲ │       │ ╲ │
        ●───○───●       ●───○
                `,
                `
        ○───●───○       ●───○
        │ ╲ │ ╱ │       │ ╱ │
        ●───○───●───○───○───●
        │ ╱ │ ╲ │       │ ╲ │
        ○───●───○       ○───●
                `
            ],
            icons: {
                research: `
    ◯───◯
    │ × │
    ◯───◯`,
                infrastructure: `
    ◯─◯─◯
    │╲│╱│
    ◯─◯─◯`,
                innovation: `
    ╱◯╲
    ◯─◯
    ╲◯╱`
            }
        }
    },
    matrix: {
        name: 'matrix',
        color: '#00ff00',
        bgColor: '#000000',
        animations: {
            hero: [
                `
    10110  01001  11010  00101  10011
    01│01  10│10  01│01  11│00  01│10
    11▼10  00▼11  10▼01  01▼10  10▼01
    00101  11010  01001  10110  01100
    10011  01100  11001  00110  11010
                `,
                `
    01001  11010  00101  10011  01100
    10│10  01│01  11│00  01│10  10│01
    00▼11  10▼01  01▼10  10▼01  01▼10
    11010  01001  10110  01100  10011
    01100  11001  00110  11010  00101
                `,
                `
    11010  00101  10011  01100  10110
    01│01  11│00  01│10  10│01  00│11
    10▼01  01▼10  10▼01  01▼10  11▼00
    01001  10110  01100  10011  01001
    11001  00110  11010  00101  10110
                `
            ],
            icons: {
                research: `
    [101]
    [010]
    [101]`,
                infrastructure: `
    1─0─1
    0─1─0
    1─0─1`,
                innovation: `
    ╱1╲
    010
    ╲1╱`
            }
        }
    }
};

// Animation state
let currentTheme = 'terminal';
let animationFrame = 0;
let animationInterval = null;

// Initialize animations
function initAnimations() {
    const theme = themes[currentTheme];
    updateThemeColors(theme);
    startHeroAnimation();
    renderIcons();
}

// Update theme colors
function updateThemeColors(theme) {
    document.body.setAttribute('data-theme', theme.name);
}

// Start hero animation
function startHeroAnimation() {
    if (animationInterval) clearInterval(animationInterval);
    
    const container = document.getElementById('ascii-container');
    const theme = themes[currentTheme];
    
    animationInterval = setInterval(() => {
        const frames = theme.animations.hero;
        container.textContent = frames[animationFrame % frames.length];
        animationFrame++;
    }, 500);
}

// Render static icons
function renderIcons() {
    const theme = themes[currentTheme];
    document.querySelectorAll('.ascii-icon').forEach(icon => {
        const type = icon.dataset.icon;
        icon.textContent = theme.icons[type] || '';
    });
}

// Switch theme
function switchTheme(themeName) {
    currentTheme = themeName;
    animationFrame = 0;
    initAnimations();
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === themeName) {
            btn.classList.add('active');
        }
    });
}

// Interactive ASCII canvas
class InteractiveASCII {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('pre');
        this.canvas.className = 'ascii-canvas';
        this.container.appendChild(this.canvas);
        
        this.width = 60;
        this.height = 20;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        // Create particles
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                char: '●'
            });
        }
        
        // Mouse tracking
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouseX = ((e.clientX - rect.left) / rect.width) * this.width;
            this.mouseY = ((e.clientY - rect.top) / rect.height) * this.height;
        });
        
        // Start animation
        this.animate();
    }
    
    animate() {
        const grid = Array(this.height).fill().map(() => Array(this.width).fill(' '));
        
        // Update and draw particles
        this.particles.forEach(p => {
            // Mouse influence
            const dx = this.mouseX - p.x;
            const dy = this.mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 10) {
                p.vx += dx * 0.01;
                p.vy += dy * 0.01;
            }
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off walls
            if (p.x < 0 || p.x >= this.width) p.vx *= -1;
            if (p.y < 0 || p.y >= this.height) p.vy *= -1;
            
            // Constrain
            p.x = Math.max(0, Math.min(this.width - 1, p.x));
            p.y = Math.max(0, Math.min(this.height - 1, p.y));
            
            // Draw
            const x = Math.floor(p.x);
            const y = Math.floor(p.y);
            if (grid[y] && grid[y][x] !== undefined) {
                grid[y][x] = p.char;
            }
            
            // Draw connections
            this.particles.forEach(p2 => {
                if (p !== p2) {
                    const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                    if (dist < 8) {
                        this.drawLine(grid, p.x, p.y, p2.x, p2.y);
                    }
                }
            });
        });
        
        // Render
        this.canvas.textContent = grid.map(row => row.join('')).join('\n');
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawLine(grid, x1, y1, x2, y2) {
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;
        let err = dx - dy;
        
        let x = Math.floor(x1);
        let y = Math.floor(y1);
        
        while (x !== Math.floor(x2) || y !== Math.floor(y2)) {
            if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
                grid[y][x] = '·';
            }
            
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }
        }
    }
}

// Export functions
window.initAnimations = initAnimations;
window.switchTheme = switchTheme;
window.InteractiveASCII = InteractiveASCII;