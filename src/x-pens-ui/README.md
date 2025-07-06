# Progress & Next Steps (Expense Tracker UI)

## Recent Changes (July 2025)
- Fixed SVG rendering issues in the Navbar hamburger menu (diagnosed and resolved CSS/SVG conflicts).
- Updated Navbar to use robust SVG icons for hamburger (three bars) and close (X) menu states.
- Debugged and confirmed SVGs render globally and locally in all components.
- Removed experimental `future` prop from React Router `<Router>` to resolve TypeScript error.
- Improved mobile/desktop menu toggle and ensured accessibility and responsiveness.
- Refactored and cleaned up code for maintainability.


## Where to Continue Next Time
- Remove the SVG debug component from `App.tsx` (no longer needed).
- Widen the main app view for desktop (increase max width of main container/pages).
- Improve spacing, font sizes, and layout in Expense Table and Expense Form using Tailwind.
- Add loading spinners, empty states, and better error messages to key components.
- Continue refining UI/UX and consider using shadcn/ui components for a more polished look.
- Review and clean up any remaining debug/test code or unused styles.
- Consider adding more tests and accessibility improvements.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
