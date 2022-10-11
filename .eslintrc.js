module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion:8
      // parser: 'babel-eslint',
      // sourceType: 'module'
  },
  env: {
      browser: true,
      node: true,
      es6: true
  },
  rules: {
      'no-console': 'off',
      'no-unused-vars': 0,
      indent: [0, 4],
      quotes: ['error', 'single'],
      'prettier/prettier': [0, { tabWidth: 4 }],
      'no-unused-vars': 0
  }
};
