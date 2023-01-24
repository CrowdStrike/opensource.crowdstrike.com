'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

const config = configs.ember();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    // your modifications here
    // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work

    /**
     * https://github.com/ember-cli/eslint-plugin-ember/issues/1750
     */
    {
      files: ['**/*.gjs', '**/*.gts'],
      rules: {
        // too hard to fix manually
        'simple-import-sort/imports': 'off',

        // The typed-ember team has not defined all types.
        // they are instead focusing on shipping types natively from ember-source
        '@typescript-eslint/ban-ts-comment': 'off',

        // Glint incorrectly assumes hash is a global, but it still needs imported.
        // "hash is defined but never used"
        // https://github.com/typed-ember/glint/issues/374
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
