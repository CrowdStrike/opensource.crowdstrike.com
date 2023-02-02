import EmberRouter from '@embroider/router';

import { addDocfyRoutes } from '@docfy/ember';
import { withHashSupport } from 'ember-url-hash-polyfill';
import config from 'oss/config/environment';

@withHashSupport
export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;

  constructor(...args: object[]) {
    super(...args);

    this.on('routeDidChange', () => window.scrollTo(0, 0));
  }
}

Router.map(function () {
  /**
   * Project search
   * filter by language, keywords, name, etc
   */
  this.route('projects');

  /**
   * Automatedly generated from markdown
   * - documentation
   * - policies
   */
  addDocfyRoutes(this);
});
