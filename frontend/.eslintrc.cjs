module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended', 
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser', 
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react-refresh',
    '@typescript-eslint', 
  ],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off', 
    'no-undef': 'off', 
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['off'], 
    '@typescript-eslint/no-undef': 'off', 
    'react/no-unescaped-entities': 'off', 
  },
}
