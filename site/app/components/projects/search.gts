import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';

// https://ember-resources.pages.dev/functions/util_remote_data.RemoteData
import { RemoteData } from 'ember-resources/util/remote-data';
import { use } from 'ember-resources';

import Filters from './filters';
import Results from './results';

export default class Search extends Component {
  @tracked projects = [];
  @tracked filter;

  @use projectData = RemoteData(() => '/projects.json');

  query = async (formData) => {
    if (this.projects.length === 0) {
      this.projects = await import('/projects.json');
    }

    this.filter = formData;
  }

  @cached
  get results() {
    let projects = this.projectData.value ?? [];
    if (!this.filter) return projects;


    return projects;
  }

  @cached
  get languages() {
    let projects = this.projectData.value ?? [];
    let result = new Set(projects.map((project) => project.language).filter(Boolean));

    return result;
  }

  /**
    * Ignoring error and loading states for now
    */
  <template>
    <div class="grid gap-5 sm:grid-flow-col">
      <Filters
        @languages={{this.languages}}
        @onSubmit={{this.query}}
      />
      <Results @projects={{this.results}} />
    </div>
  </template>
}
