'use strict';

const path = require('path');

const appRoot = __dirname;
const appEntry = path.join(appRoot, 'app');
const relevantFilesGlob = '**/*.{html,js,ts,hbs,gjs,gts,css}';

const packageJson = require(path.join(appRoot, 'package.json'));

module.exports = {
  content: [
    path.join(appEntry, relevantFilesGlob),
    ...Object.keys(packageJson.dependencies).map((depName) => {
      const packagePath = path.dirname(require.resolve(depName));

      return `${packagePath}/${relevantFilesGlob}`;
    }),
  ],
  theme: {
    extend: {},
  },
  presets: [require('@crowdstrike/tailwind-toucan-base')],
  safelist: ['theme-dark', 'theme-light'],
};
