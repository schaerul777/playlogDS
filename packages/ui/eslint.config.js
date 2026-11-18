import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
      // Playlog: icons come from the Icon component only. Blocks Remix if the shadcn CLI adds it back.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: '@remixicon/react', message: 'Use Icon from packages/ui/src/icons.' },
            { name: 'remixicon', message: 'Use Icon from packages/ui/src/icons.' },
          ],
          patterns: [
            { group: ['@remixicon/react/*', 'remixicon/*'], message: 'Use Icon from packages/ui/src/icons.' },
          ],
        },
      ],
    },
  },
])
