import Component from '@glimmer/component';
import { DEBUG } from '@glimmer/env';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Link extends Component {
  @service navigation;

  get href() {
    if (DEBUG) {
      let hasValidHref = this.args.href?.length > 0;

      if (!hasValidHref) {
        console.error(
          'WARNING: <A /> does not have a valid `href` attribute. Search the dom for #dev--missing-href'
        );

        return '#dev--missing-href';
      }
    }

    let { href } = this.args;

    return href;
  }

  @action
  navigate(event) {
    if (this.href.startsWith('#')) {
      // Link is an internal anchor in the current page, so allow default navigation
      this.args.onClick?.(event);

      return;
    }

    this.navigation.handleAnchorClick(event);
  }
}
