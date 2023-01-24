import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import type RouterService from '@ember/routing/router-service';

module('Application | visiting', function (hooks) {
  setupApplicationTest(hooks);

  test('all pages can be accessed without error', async function (assert) {
    /**
     * to initialize the router, we need to visit the home page first
     * (or call router.setupRouter())
     */
    await visit('/');
    assert.strictEqual(currentURL(), '/');

    let router = this.owner.lookup('service:router') as RouterService;
    /**
     * Should we RFC this to promote to Public API?
     *
     * Note that no one should do this, as this API could be removed at any time.
     * I/we accept that risk and will take care of the tech debt when that day comes.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let privateRouter = router as any;
    let allRouteNames = Object.keys(
      privateRouter._router.targetState.router.recognizer.names
    );
    let directRoutes = allRouteNames.filter(
      (name) =>
        /**
         * Framework sub-states have underscores.
         * This would be a false positive if somone used underscores in their URL path segments
         */
        !name.includes('_') &&
        /**
         * loading and error are suffixes for framework sub-states, which may or may not be
         * preceeded with and underscore
         */
        !name.endsWith('loading') &&
        !name.endsWith('error')
    );

    assert.expect(1 + directRoutes.length);

    for (let target of directRoutes) {
      let url = router.urlFor(target);

      await visit(url);
      assert.true(
        true,
        `an error was not thrown while visiting ${target} via ${url}`
      );
    }
  });
});
