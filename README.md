# opensource.crowdstrike.com

This repo contains the code for opensource.crowdstrike.com.

The site is generated from:
 - config for featured projects
 - markdown for custom pages
via [Ember.JS](https://emberjs.com/), our frontend framework of choice and using the design system used for the Falcon family of products.


## Contributing

For content changes, edit the content in the `docs` folder.

0. fork the repo https://github.com/CrowdStrike/opensource.crowdstrike.com/fork
1. `git clone <the repo's git URL>`
2. `cd opensource.crowdstrike.com`
3. `pnpm install`
4. create a new branch
5. make your changes
7. commit and push
8. open a PR for review
9. 🎉

### Running locally

once `cd`d into the repo, and after having run `pnpm install`, the app, which lives in the `site` directory, can be ran via `pnpm start`

### Updating the featured projects

Same as the contributin steps, except your changes involve `config.yaml`.

This generates the json files that the "app" will read for both featured projects and *all* projects.
