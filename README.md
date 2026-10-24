# React + TypeScript + Vite

## Wishlist setup

The `/wishlist` page uses Supabase and Netlify Functions. Run
[`supabase/wishlist.sql`](./supabase/wishlist.sql) in Supabase SQL Editor, then
configure these Netlify environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `WISHLIST_PIN`
- `SESSION_PEPPER` (a long random secret used to hash browser sessions)

Keep the service-role key and owner PIN out of client-side variables. The
public page reads visible items through the function. Owner mutations require
the PIN. Visitors create or sign into a pseudo-profile with a name and PIN.
The database stores salted PIN hashes and never stores visitor PINs directly.
Signed-in visitors can remove their own interests. Owner edit does not expose
claim identities or provide claim-removal controls, preserving surprises.
The owner PIN is requested once per browser session and stored only as a
server-side session hash.

Deploy through Netlify so `/.netlify/functions/wishlist` is available. Running
`npm run dev` starts Vite only; it does not run Netlify Functions. Use
`npm run dev:netlify` for local end-to-end testing. This starts Vite through
Netlify's local proxy, so `/.netlify/functions/wishlist` works locally too.
The Netlify CLI may ask to install itself when first used.

If the earlier cancellation-token schema has already been deployed, the
updated SQL clears old interests because they cannot be linked to profiles.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

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
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

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
]);
```
