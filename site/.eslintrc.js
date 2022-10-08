'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

const config = configs.ember();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    // your modifications here
    // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
    {
      files: ['./tailwind.config.js'],
      rules: {
        // doesn't understand "exports"
        'node/no-missing-require': 'off',
      },
    },
  ],
};
