import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

import { TrackedSet } from 'tracked-built-ins';

import { Button } from '@crowdstrike/ember-oss-docs';

import type { Project } from './types';

const DEFAULT_LANGUAGES = [
  'Python',
  'JavaScript',
  'Go',
];

const all = (data = []) => new Set([...DEFAULT_LANGUAGES, ...data]);

export class SelectLanguages extends Component<{
  Args: {
    languages: Set<string>;
    allProjects: Project[];
    onSelect: (newSet: Set<string>) => void;
  }
}> {
  @tracked showAll = false;
  @tracked selected = new TrackedSet<string>();

  select = (set: TrackedSet<string>) => this.selected = set;
  toggle = (language: string) => {
    if (this.selected.has(language)) {
      // Delete doesn't work on tracked-built-ins....
      this.selected.delete(language);
      this.selected = this.selected;

      return;
    }

    this.selected.add(language);
    this.args.onSelect(this.selected);
  }

  toggleAll = () => {
    this.selected.size === 0
    ? this.select(new TrackedSet(this.args.languages))
    : this.select(new TrackedSet());

    this.args.onSelect(this.selected);
  }

  get isAllSelected() {
    return this.selected.size === this.args.languages.size;
  }

  isSelected = (language: string) => this.selected.has(language);
  seeAll = () => this.showAll = true;

  totalFor = (language: string) => this.args.allProjects.filter(project => {
    return project.language === language;
  }).length;

  <template>
    <fieldset class="grid gap-2 justify-items-start">
      <legend class="type-xl mb-2">Choose a language</legend>

      <Button @variant="link" @onClick={{this.toggleAll}}>
      {{#if this.isAllSelected}}
        Unselect all
      {{else}}
        Select all
      {{/if}}
      </Button>

      <div class="grid gap-2">
        {{#if this.showAll}}
          {{#each (all @languages) as |language|}}
            <label>
              <input
                type="checkbox"
                checked={{this.isSelected language}}
                value={{language}}
                {{on 'click' (fn this.toggle language)}}
              />
              {{language}} ({{this.totalFor language}})
            </label>
          {{/each}}
        {{else}}
          {{#each DEFAULT_LANGUAGES as |language|}}
            <label>
              <input
                type="checkbox"
                checked={{this.isSelected language}}
                value={{language}}
                {{on 'click' (fn this.toggle language)}}
              />
              {{language}} ({{this.totalFor language}})
            </label>
          {{/each}}
        {{/if}}
      </div>

      <Button @variant="link" @onClick={{this.seeAll}}>
        See all languages ({{@languages.size}})
      </Button>
    </fieldset>
  </template>;
}
