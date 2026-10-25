import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Config files are not part of the TS project, so the type-aware parser
    // cannot handle them. Linting them adds no value.
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', 'eslint.config.mjs', 'jest.config.ts'],
  },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // The API legitimately logs to the console for local/dev observability.
      'no-console': 'off',
    },
  },
);
