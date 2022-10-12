import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';

interface Signature {
  Return: boolean;
}

export default class IsHomePage extends Helper<Signature> {
  @service declare router: RouterService;

  compute(): boolean {
    return this.router.currentRouteName === 'index';
  }
}
