/* eslint-disable */
import { setComponentTemplate } from '@ember/component';
import { hbs } from 'ember-cli-htmlbars';
import templateOnly from '@ember/component/template-only';

export default setComponentTemplate(hbs`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" ...attributes><path d="M12.009 3.289L14.407 10h6.73l-5.251 4.16 1.878 6.622-5.754-3.79-5.754 3.79 1.878-6.622L2.882 10h6.73l2.397-6.711zm0-1.986a.492.492 0 00-.471.332L8.907 9H1.446a.5.5 0 00-.31.892l5.854 4.637-2.063 7.273a.501.501 0 00.756.554l6.327-4.167 6.327 4.167a.498.498 0 00.756-.554l-2.063-7.273 5.854-4.637A.5.5 0 0022.573 9h-7.462L12.48 1.635a.492.492 0 00-.471-.332z"/></svg>
`,
templateOnly()
)