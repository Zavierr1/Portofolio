# Project Structure

## Root Directory
```
├── src/                    # Source code
├── public/                 # Static assets
├── dist/                   # Build output (generated)
├── .kiro/                  # Kiro configuration
├── node_modules/           # Dependencies
└── [config files]          # Various configuration files
```

## Source Structure (`src/`)
```
src/
├── components/             # React components (one per section)
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── assets/                 # Images, fonts, etc.
├── App.tsx                 # Main app component
├── main.tsx                # React entry point
├── index.css               # Global styles
├── declaration.d.ts        # Type declarations
└── vite-env.d.ts          # Vite environment types
```

## Component Organization
- **Single Page Application**: All components render in `App.tsx` as sections
- **Component per Section**: Each major portfolio section has its own component
- **Flat Component Structure**: All components in single `/components` directory
- **TypeScript**: All components use `.tsx` extension

## Configuration Files
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript project references
- `tsconfig.app.json` - Main TypeScript configuration
- `tsconfig.node.json` - Node.js TypeScript configuration
- `eslint.config.js` - ESLint rules and plugins
- `package.json` - Dependencies and scripts

## Styling Approach
- **Global Styles**: `src/index.css` for base styles
- **Utility Classes**: Tailwind CSS classes applied directly in components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Asset Management
- **Public Assets**: Static files in `/public` directory
- **Component Assets**: Images/assets imported directly in components via `/src/assets`

## Naming Conventions
- **Components**: PascalCase (e.g., `Hero.tsx`, `About.tsx`)
- **Files**: camelCase for utilities, PascalCase for components
- **CSS Classes**: Tailwind utility classes following their conventions