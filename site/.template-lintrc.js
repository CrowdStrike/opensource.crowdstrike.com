'use strict';

module.exports = {
  extends: 'recommended',
  overrides: [
    {
      files: ['**/*.gts', '**/*.gjs'],
      rules: {
        'no-implicit-this': 'off',
        'builtin-component-arguments': 'off',
      },
    },
  ],
};
