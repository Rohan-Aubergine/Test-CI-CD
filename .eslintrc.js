module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    // '@typescript-eslint/explicit-module-boundary-types': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    'no-empty-function': ['error'],
    'no-unused-expressions': ['error'],
    curly: 'error',
    'no-var': 'error',
    'arrow-parens': ['error', 'always'],
    semi: ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-restricted-syntax': ['error', 'SequenceExpression'],
    'space-in-parens': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 1,
    'no-console': 1, // Means warning, if console if throw warning
    'no-unexpected-multiline': 'error',
    'no-unused-vars': 'off'
  }
};
