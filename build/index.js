// @ts-check

import { writeFeaturedProjects } from './featured.js';
import { writeAllProjects } from './all.js';

async function main() {
  await writeAllProjects();
  await writeFeaturedProjects();
}

main();


