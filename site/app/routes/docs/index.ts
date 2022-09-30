import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';

export default class DocsIndex extends Route {
  @service declare router: RouterService;

  beforeModel() {
    this.router.transitionTo('docs.contributing');
  }
}
