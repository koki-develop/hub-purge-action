const core = require("@actions/core");
const github = require("@actions/github");

const repo = "koki-develop";
const owner = "koki-develop";

const main = async () => {
  const githubToken = core.getInput("token");
  const octo = github.getOctokit(githubToken);
  const { data } = await octo.rest.repos.get({
    repo,
    owner,
  });
  const branch = data.default_branch;

  console.log(`branch: ${branch}`);
};

main().catch((error) => {
  core.setFailed(error.message);
});
