import Component from '@glimmer/component';

import featuredProjects from './projects.json';

export default class FeaturedProjects extends Component {
  data = featuredProjects;
}
