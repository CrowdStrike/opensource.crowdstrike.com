// @ts-check

// Requires Node 18 for `fetch`
import url from 'node:url';
import fs from 'node:fs/promises'
import path from 'node:path';

import YAML from 'yaml';
import { Octokit } from '@octokit/core';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const CONFIG = path.join(__dirname, '../config.yaml');

async function main() {
  let config = await loadConfig();
  let projects = await loadProjects(config);

  await writeAppJson(projects);
}

main();

async function loadConfig() {
  let file = await fs.readFile(CONFIG);

  return YAML.parse(file.toString());
}

async function loadProjects(config) {
  let featured = config.featured_projects;
  let octokit = new Octokit();

  let results = [];

  for (let featuredProject of featured) {
    let { github, description } = featuredProject;
    // https://docs.github.com/en/rest/repos/repos#get-a-repository
    let response = await octokit.request(`GET /repos/${github}`);
    // The description from the response data is very minimal.
      // We could improve this over time, but it's usually a short(est) blurb about the project.
    let { html_url, name, full_name, language, forks_count, stargazers_count } = response.data;

    results.push({
      url: html_url,
      name,
      language,
      description,
      fullName: full_name,
      stars: stargazers_count,
      forks:  forks_count,
    });
  }

  return results;
}

async function writeAppJson(projects) {
  const appPath = path.join(__dirname, '../site/app/components/featured/projects.json');

  await fs.writeFile(appPath, JSON.stringify(projects, null, 2));
}
