# Gameloft E-commerce Demo

Modern e-commerce product showcase built with React 19, TypeScript, and Tailwind CSS v4. Features a responsive carousel, shopping cart with discount logic, and smooth GSAP animations.

## 🚀 Live Demo

**Deployed Site:** [Add Vercel URL here after deployment]  
**GitHub Repository:** [https://github.com/b11dg/gameloft-test](https://github.com/b11dg/gameloft-test)

## ✨ Features

- **Product Carousel** - Responsive 3/2/1 column layout with Embla Carousel
- **Shopping Cart** - Full cart functionality with localStorage persistence (Zustand)
- **Discount System** - Automatic 10% off when item quantity > 5
- **GSAP Animations** - Smooth modal and cart item transitions
- **Accessibility** - ARIA roles, keyboard navigation (ESC to close), focus management
- **Testing** - Vitest + React Testing Library

## 🛠️ Tech Stack

- React 19 + TypeScript 5.9
- Vite 7 (build tool)
- Tailwind CSS v4
- Zustand (state + persist)
- GSAP (animations)
- Embla Carousel
- Vitest + React Testing Library

## 📦 Getting Started

```bash
npm install
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
npm run test     # Run tests
```

## 🚢 Deployment

Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

Or push to GitHub and import at [vercel.com/new](https://vercel.com/new) (auto-detects Vite config).

---

## 📝 Vite Setup Notes

This project uses Vite with HMR and TypeScript.

### Vite Plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
