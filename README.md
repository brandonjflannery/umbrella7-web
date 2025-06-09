# Umbrella 7 Web Application

A React-based web application for Umbrella 7, LLC - an applied machine-learning research firm.

## Features

- Professional sidebar navigation matching sov-vision design
- Terminal-style typing animation on homepage
- Login page with modern form design
- Responsive layout
- Purple gradient theme throughout

## Running Locally

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm start
```
The app will open at http://localhost:3000

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar.js      # Main navigation sidebar
│   └── Sidebar.css     # Sidebar styles
├── pages/
│   ├── HomePage.js     # Landing page with typing effect
│   ├── HomePage.css    
│   ├── LoginPage.js    # Login form page
│   └── LoginPage.css
├── styles/
│   ├── App.css        # Main app layout styles
│   └── index.css      # Global styles
├── App.js             # Main app component with routing
└── index.js           # App entry point
```

## Deployment

The app is configured for deployment to GitHub Pages. To deploy:

```bash
npm run deploy
```

This will build the app and deploy it to the `gh-pages` branch.

## Technologies Used

- React 18
- React Router v6
- CSS3 with custom styling
- Terminal typing animation effect