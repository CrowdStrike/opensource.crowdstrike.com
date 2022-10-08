import "@glint/environment-ember-loose";
import "@glint/environment-ember-template-imports";

// Types from libraries
import "ember-page-title/glint";
import "@crowdstrike/ember-oss-docs/glint";

import type { GitHubInfo } from 'oss/components/git-hub-info';
import type { HelperLike, ModifierLike } from '@glint/template';

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
    }>
  }
}
