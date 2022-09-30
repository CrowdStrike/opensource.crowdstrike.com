import type { TOC } from '@ember/component/template-only';

import GitHubInfo from '../git-hub-info';
import type { Project } from './types';

export const Results: TOC<{
  Args: {
    projects: Project[];
  }
}> = <template>
  <div class="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {{#each @projects as |project|}}

      <div class="shadow-base p-3">
        <GitHubInfo
          @title={{project.name}}
          @description={{project.description}}
          @stars={{project.stargazers_count}}
          @forks={{project.forks_count}}
          @url={{project.html_url}}
        />
      </div>

    {{else}}

      <div class="p-10">
        No results found.
      </div>

    {{/each}}
  </div>
</template>
