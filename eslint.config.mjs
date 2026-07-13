import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules']),

  // Next.js base: react, react-hooks, @next/next rules, TypeScript parser
  ...nextVitals,
  ...nextTs,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',

      'no-undef': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',

      'no-unreachable': 'error',
      'no-shadow': 'error',
      eqeqeq: 'error',

      // Server components (app/) run on Node.js — warn only
      // Client components in components/ get error (see override below)
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',

      'no-constant-condition': 'error',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',

      'no-return-await': 'error',
      'require-await': 'error',

      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
      'array-callback-return': 'error',

      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'max-len': ['error', { code: 100 }],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      curly: ['error', 'multi-line'],
      'prefer-template': 'error',
      'newline-before-return': 'error',
      'no-magic-numbers': ['error', { ignore: [0, 1, -1] }],

      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      'import/no-unused-modules': ['error', {
        unusedExports: true,
        // Next.js uses app/ entry files by convention, not by import
        ignoreExports: ['**/app/**/*.{ts,tsx}', 'next.config.ts'],
      }],
      'import/newline-after-import': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'ignore',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',

      'react/jsx-key': 'error',
      'react/self-closing-comp': 'error',
      'react/no-array-index-key': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-useless-fragment': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
        },
      ],
      'react/no-unstable-nested-components': 'error',
    },
  },

  // Client components — console is an error
  // Convention: components/ directory is client-side by default
  {
    files: ['**/components/**/*.{ts,tsx}'],
    rules: {
      'no-console': 'error',
    },
  },
]);
