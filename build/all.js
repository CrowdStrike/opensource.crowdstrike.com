import url from 'node:url';
import fs from 'node:fs/promises'
import path from 'node:path';

import { Octokit } from '@octokit/core';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/**
  * We can't, at runtime, query the github API due to CORS.
  * So during the app's build, we load all our projects, and then
  * do "local filtering" when visiting the `/features` page.
  */
export async function writeAllProjects() {
  let projects = await loadProjects();

  await writeAppJson(projects);
}

/**
  * https://docs.github.com/en/rest/repos/repos
  * 100 per_page is the max size
  */
async function loadProjects() {
  let octokit = new Octokit();

  let result = [];
  let lastData;
  let page = 0;
  let shouldAddNextPage = () => (page === 0 || lastData.length === 100 || page < 10);

  while (shouldAddNextPage()) {
    let response = await octokit.request(`GET /orgs/CrowdStrike/repos?type=public&per_page=100&page=${page}`);

    lastData = response.data;
    result.push(...lastData);
    page++;

    if (lastData.length === 0) break;
  }

  return result;
}

async function writeAppJson(projects) {
  const appPath = path.join(__dirname, '../site/public/projects.json');

  await fs.writeFile(appPath, JSON.stringify(projects, null, 2));
}
