import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';

// https://ember-resources.pages.dev/functions/util_remote_data.RemoteData
import { RemoteData } from 'ember-resources/util/remote-data';
import { use } from 'ember-resources';

import Filters from './filters';
import { Results } from './results';

import type { Project } from './types';

interface SearchData {
  term?: string;
  languages?: Set<string>;
}

const defaultError = 'An unknown error occurred';
const errorToString = (error: Error | unknown) => `${error || defaultError}`;

export default class Search extends Component {
  @tracked projects = [];
  @tracked filterTerm: string = '';
  @tracked filterLanguages = new Set<string>();

  @use projectData = RemoteData<Project[]>(() => '/projects.json');

  query = async ({ languages, term }: SearchData) => {
    if (term) {
      this.filterTerm = term;
    }

    if (languages) {
      this.filterLanguages = languages;
    }
  }

  @cached
  get results() {
    let projects = this.projectData.value ?? [];
    let lowerTerm = this.filterTerm.toLowerCase();

    if (this.filterTerm) {
      projects = projects.filter((project) => {
        let lowerName = project.name.toLowerCase();
        let lowerDesc = project.description?.toLowerCase() || '';

        return (lowerName.includes(lowerTerm) || lowerDesc.includes(lowerTerm));
      });
    }

    if (this.filterLanguages.size > 0) {
      projects = projects.filter(project => {
        if (project.language) {
          return this.filterLanguages.has(project.language);
        }
      })
    }

    /**
      * If we haven't filtered, don't render everything
      */
    // if (projects.length === this.projectData.value?.length) {
    //   projects = projects.slice(0, 30);
    // }

    return projects.sort((a, b) => (b.stargazers_count - a.stargazers_count))
    // .slice(0, 30);
  }

  @cached
  get languages() {
    let projects = this.projectData.value ?? [];
    let result = new Set(projects.map((project) => project.language).filter(Boolean));

    return result;
  }

  <template>
    <div class="grid gap-5 sm:grid-flow-col">
      {{#if this.projectData.isLoading}}

        Loading . . .

      {{else if this.projectData.isError}}

        {{errorToString this.projectData.error}}

      {{else}}
        <Filters
          @languages={{this.languages}}
          @allProjects={{this.projectData.value}}
          @onSubmit={{this.query}}
        />

        <Results @projects={{this.results}} />
      {{/if}}
    </div>
  </template>
}

