import type { TOC } from '@ember/component/template-only';

import { SubSection, Icon, Link } from '@crowdstrike/ember-oss-docs';

const GitHubInfo: TOC<{
  Args: {
    title: string;
    description: string;
    stars: number | string;
    forks: number | string;
    url: string;
  }
}> = <template>
  <SubSection>
    <:header>{{@title}}</:header>
    <:content>{{@description}}</:content>
    <:footer>
      <div class="grid gap-4">
        <div class="flex gap-5">
          <span class="flex gap-3 items-center">
            <Icon @path="controls/favorite-24" />
            <span>{{@stars}}</span>
          </span>
          <span class="flex gap-3 items-center">
            <img src="/_icon_branch-24.png" alt="" role="none"/>
            <span>{{@forks}}</span>
          </span>
        </div>

        <div>
          <Link @href={{@url}}>
            <span class="flex gap-3 items-center">
              <span>View project</span>
              <Icon @path="micro/caret-right-16" />
            </span>
          </Link>
        </div>
      </div>
    </:footer>
  </SubSection>
</template>

export default GitHubInfo;
