/* eslint-disable */
import { setComponentTemplate } from '@ember/component';
import { hbs } from 'ember-cli-htmlbars';
import templateOnly from '@ember/component/template-only';

export default setComponentTemplate(hbs`<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" ...attributes><path fill-rule="evenodd" clip-rule="evenodd" d="M8 .5a.5.5 0 01.47.33L10.35 6H15a.5.5 0 01.3.9l-3.731 2.798 1.227 4.675a.5.5 0 01-.769.538l-4.033-2.806-4.217 2.811a.5.5 0 01-.756-.56l1.4-4.665L.7 6.9A.5.5 0 011 6h4.65L7.53.83A.5.5 0 018 .5zm0 1.963L6.47 6.671A.5.5 0 016 7H2.5l2.8 2.1a.5.5 0 01.179.544l-1.101 3.67 3.345-2.23a.5.5 0 01.563.005l3.199 2.226-.969-3.688A.5.5 0 0110.7 9.1L13.5 7H10a.5.5 0 01-.47-.33L8 2.464z"/></svg>
`,
templateOnly()
)