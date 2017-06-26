/* eslint-disable no-console */
const {
  isMerged,
  isTargetPR,
  extractPayloadForCreateReleaseFromEventPayload
} = require('./lib/helper');

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

github.on('pull_request', function (x, y, data) { // eslint-disable-line no-unused-vars
  if (!isTargetPR(data)) {
    return;
  }

  if (!isMerged(data)) {
    return;
  }

  const payload = extractPayloadForCreateReleaseFromEventPayload(data);
  githubClient.repos.createRelease(payload);
});
