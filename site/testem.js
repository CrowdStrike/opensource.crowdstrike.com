'use strict';

const CI_BROWSER = process.env.CI_BROWSER || 'Chrome';
const DEV_BROWSER = process.env.DEV_BROWSER || 'Firefox';

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,

  launch_in_ci: [CI_BROWSER],
  launch_in_dev: [DEV_BROWSER],
  browser_start_timeout: 120,

  browser_args: {
    Firefox: {
      mode: 'ci',
      args: ['-headless'],
    },
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,

        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1280,720', // 720p
      ].filter(Boolean),
    },
  },
};
