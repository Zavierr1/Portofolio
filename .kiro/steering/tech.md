# Technology Stack

## Core Framework
- **React 19.1.0** with TypeScript
- **Vite** as build tool and dev server
- **TypeScript 5.8.3** with strict mode enabled

## Styling & UI
- **Tailwind CSS 4.1.10** for utility-first styling
- **Framer Motion 12.18.1** for animations and transitions
- **Lucide React** for icons

## 3D Graphics & Interactions
- **Three.js 0.177.0** for 3D rendering
- **React Three Fiber 9.1.2** for React integration with Three.js
- **React Three Drei 10.3.0** for additional Three.js helpers
- **Maath 0.10.8** for mathematical utilities

## Additional Libraries
- **React Router DOM 7.6.2** for routing
- **EmailJS 4.4.1** for contact form functionality
- **React Type Animation 3.2.0** for typing effects
- **React Intersection Observer 9.16.0** for scroll-based animations
- **Tone.js 15.1.22** for audio functionality

## Development Tools
- **ESLint 9.25.0** with TypeScript and React plugins
- **GitHub Pages (gh-pages)** for deployment

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production (TypeScript compile + Vite build)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

### Deployment
```bash
npm run deploy       # Build and deploy to GitHub Pages
npm run predeploy    # Runs automatically before deploy (builds project)
```

## Build Configuration
- Base path set to `/Portofolio/` for GitHub Pages
- Chunk size warning limit increased to 1000kB
- TypeScript strict mode with unused parameter/local detection