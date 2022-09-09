// Until types for this are published, we can't safely guarantee it exists or is missing
import Component from '@glimmer/component';
// eslint-disable-next-line
// @ts-ignore
import { setComponentTemplate } from '@ember/component';
import { assert } from '@ember/debug';
import { hbs } from 'ember-cli-htmlbars';

interface Args {
  path: string;
}

// eslint-disable-next-line
// @ts-ignore
import { MAP } from './map';

export default class IconComponent extends Component<Args> {
  get Icon() {
    let { path } = this.args;
    // eslint-disable-next-line
    // @ts-ignore
    let icon = MAP[path];

    assert(`WARNING: <Icon /> wanted to render @path="${path}", but it did not exist.`, icon);

    return icon;
  }
}

setComponentTemplate(
  hbs`
    {{#if this.Icon}}
      <this.Icon
        aria-hidden="true"
        data-icon-path={{@path}}
        class="flex-none {{@class}}"
        data-test-selector="icon"
        ...attributes
      />
    {{/if}}
`,
  IconComponent
);
