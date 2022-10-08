import Component from '@glimmer/component';
import { on } from '@ember/modifier';

import { Button, Input } from '@crowdstrike/ember-oss-docs';
import { SelectLanguages } from './select-languages';

import type { Project } from './types';

export default class Filters extends Component<{
  Args: {
    languages: Set<string>;
    allProjects: Project[];
    onSubmit: (data: {
      term?: string;
      languages?: Set<string>;
    }) => void;
  }
}> {
  handleSubmit = (e: Event) => {
    e.preventDefault();

    let formData = new FormData(event.currentTarget);
    let data = Object.fromEntries(formData.entries());

    this.args.onSubmit({
      term: `${data.term}`,
    })
  }

  submitLanguages = (selected: Set<string>) => {
    this.args.onSubmit({
      languages: selected,
    });
  }

  /**
    * This wrapper div exists so that when we do "grid", we don't span
    * the whole height of the search results
    *
    * The Form's sticky "top" numbers are calculated based off:
    *  - "height of top-bar" + "1 rem", but in px
    */
  <template>
    <div>
      <form {{on 'submit' this.handleSubmit}} class="grid gap-4 sticky top-[76px] lg:top-[96px]">
        <div class="flex gap-4 items-end">
          <label class="grid min-w-[15rem]">
            <span class="text-body-and-labels type-xs">
              Search projects
            </span>
            <Input
              type="text"
              name="term"
              class="type-md shadow-inner-md"
              autocomplete="off"
              placeholder="Search by name or description"
            />
          </label>
          <Button type="submit">🔍 <span class="sr-only">Search</span></Button>
        </div>

        <SelectLanguages
          @onSelect={{this.submitLanguages}}
          @allProjects={{@allProjects}}
          @languages={{@languages}}
        />
      </form>
    </div>
  </template>
}

