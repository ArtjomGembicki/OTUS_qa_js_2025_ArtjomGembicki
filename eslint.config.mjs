import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  // Общие настройки для JS и TS
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    }
  },

  // Рекомендованные правила JS
  pluginJs.configs.recommended,

  // Рекомендованные правила TS
  tseslint.configs.recommended,

  // Интеграция с Prettier
  eslintPluginPrettierRecommended
]