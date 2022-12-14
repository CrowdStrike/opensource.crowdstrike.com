import "@glint/environment-ember-loose";
import "@glint/environment-ember-template-imports";

// Types from libraries
// import "ember-page-title/glint";
import "@crowdstrike/ember-oss-docs/glint";

import type Featured from 'oss/components/featured';
import type { GitHubInfo } from 'oss/components/git-hub-info';
import type Search from 'oss/components/projects/search';
import type ThemeSwitcher from 'oss/components/theme-switcher';
import type IsHomePage from 'oss/helpers/is-home-page';
import type Service from 'oss/helpers/service';

import type { HelperLike, ModifierLike, ComponentLike } from '@glint/template';

declare module '@ember/modifier' {
  export const on: ModifierLike<{
    Args: {
      Positional: [eventName: string, eventHandler: (event: Event) => void];
    }
  }>
}


declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    GitHubInfo: typeof GitHubInfo;

    // ember-page-title does not provide its own types
    'page-title': HelperLike<{
      Args: {
        Positional: [string];
      };
      Return: string;
    }>;

    /**
      * This App's own things
      */
    Featured: typeof Featured;
    Footer: ComponentLike<{ Blocks: [] }>;
    ThemeSwitcher: typeof ThemeSwitcher;
    'Projects::Search': typeof Search;

    'is-home-page': typeof IsHomePage;
    service: typeof Service;
  }
}
