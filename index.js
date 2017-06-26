/* eslint-disable no-console */
const githubhook = require('githubhook');
const github = githubhook({
  port:process.env.PORT || 5000,
  path: process.env.ENTRY_POINT
});

const GitHubAPI = require('github');
const githubClient = new GitHubAPI({ });

githubClient.authenticate({
  type: 'token',
  token: process.env.GITHUB_PERSONAL_TOKEN
});

github.listen();

github.on('issues', function (event, repo, ref, data) { // eslint-disable-line no-unused-vars
});
