import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

export default class Filters extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
  }

  submitLanguages = () => {}

  <template>
    <form {{on 'submit' this.handleSubmit}}>
      <label>
        Search projects
        <input type="text" />
      </label>

      <SelectLanguages
        @onSelect={{this.submitLanguages}}
        @languages={{@languages}}
      />


    </form>
  </template>
}

const DEFAULT_LANGUAGES = [
  'Python',
  'JavaScript',
  'Go',
  'C++',
];

const all = (data = []) => new Set([...DEFAULT_LANGUAGES, ...data]);

class SelectLanguages extends Component {
  @tracked showAll = false;
  @tracked selected = new Set();

  select = (set) => this.selected = set;
  toggleAll = () => this.selected.size === 0
    ? this.select(this.args.languages || new Set())
    : this.select(new Set());

  isSelected = (language) => this.selected.has(language);
  seeAll = () => this.showAll = true;

  <template>
    Choose a language
    <button {{on 'click' this.toggleAll}}>Select All</button>

    <div class="grid gap-2">
      {{#if this.showAll}}
        {{#each (all @languages) as |language|}}
          <label>
            <input type="checkbox" checked={{this.isSelected language}} />
            {{language}}
          </label>
        {{/each}}
      {{else}}
        {{#each DEFAULT_LANGUAGES as |language|}}
          <label>
            <input type="checkbox" checked={{this.isSelected language}} />
            {{language}}
          </label>
        {{/each}}
      {{/if}}
    </div>

    <button {{on 'click' this.seeAll}}>See all languages ({{@languages.size}})</button>
  </template>;
}
