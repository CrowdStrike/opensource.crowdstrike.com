import Route from '@ember/routing/route';
import { service } from '@ember/service';

import { type ThemeManager, THEMES } from '@crowdstrike/ember-toucan-styles';

export default class Application extends Route {
  @service declare themeManager: ThemeManager;

  beforeModel() {
    this.themeManager.setup(THEMES.LIGHT);
    /**
     * When working on multiple projcets running on the same localhost:port,
     * we can accidentally persist a theme preference between projects.
     * This project is light-mode only, so we force the theme to be light-mode
     */
    this.themeManager.forceSelectTheme(THEMES.LIGHT);
  }
}
