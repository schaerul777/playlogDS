import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs([
  globalIgnores(['dist']),
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: { globals: globals.browser },
    rules: {
      // Playlog: shadcn-vue components keep their single-word names (Button, Input, Dialog).
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, varsIgnorePattern: '^_' }],
      // Playlog: icons come from the Icon component only. Blocks Lucide (shadcn-vue default) and Remix.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'lucide-vue-next', message: 'Use Icon from packages/ui-vue/src/icons.' },
            { name: '@lucide/vue', message: 'Use Icon from packages/ui-vue/src/icons.' },
            { name: '@radix-icons/vue', message: 'Use Icon from packages/ui-vue/src/icons.' },
            { name: '@remixicon/react', message: 'Use Icon from packages/ui-vue/src/icons.' },
            { name: 'remixicon', message: 'Use Icon from packages/ui-vue/src/icons.' },
          ],
          patterns: [
            { group: ['lucide-vue-next/*', '@lucide/*', '@iconify/*', '@iconify-json/*', '@remixicon/*', 'remixicon/*'], message: 'Use Icon from packages/ui-vue/src/icons.' },
          ],
        },
      ],
    },
  },
])
