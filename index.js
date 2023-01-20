const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios").default;
const cheerio = require("cheerio");
const path = require("path");

const main = async () => {
  /*
   * inputs
   */

  // repository
  const [owner, repo] = (() => {
    const input = core.getInput("repository");
    if (!input) {
      return [github.context.repo.owner, github.context.repo.repo];
    }
    return input.split("/");
  })();

  // paths
  const paths = (core.getInput("paths") || "README.md").trim().split("\n");

  // token
  const octokit = github.getOctokit(core.getInput("token"));

  // branch
  const branch = await (async () => {
    const branch = core.getInput("branch");
    if (branch) {
      return branch;
    }

    // get default branch
    const { data: repoData } = await octokit.rest.repos.get({ owner, repo });
    return repoData.default_branch;
  })();

  /*
   * action
   */

  for (const p of paths) {
    // get html document
    const docUrl = new URL(`https://github.com`);
    docUrl.pathname = path.join(
      docUrl.pathname,
      owner,
      repo,
      "blob",
      branch,
      p
    );
    const { data: html } = await axios.get(docUrl.href);
    const $ = cheerio.load(html);

    // get camo urls
    const urls = $("img[src^='https://camo.githubusercontent.com/']").map(
      (_, img) => $(img).attr("src")
    );

    // clear caches
    for (const url of urls) {
      core.info(`Purging: ${url}`);
      await axios.request({ url, method: "PURGE" });
      core.info("Purged.");
    }
  }
};

main().catch((error) => {
  core.setFailed(error.message);
});
