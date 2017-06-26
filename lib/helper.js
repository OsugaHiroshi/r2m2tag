const moment = require('moment');

function isMerged (pull_request_event_payload) {
  const {action, pull_request: {merged_at}} = pull_request_event_payload;

  return action == 'closed' && merged_at != null;
}

function isTargetPR (pull_request_event_payload) {
  const {pull_request: {title}} = pull_request_event_payload;

  return title === 'r2m';
}

function extractPayloadForCreateReleaseFromEventPayload (pull_request_event_payload) {
  const {repository} = pull_request_event_payload;
  const payload = {
    repo: repository.name,
    owner: repository.owner.login,
    tag_name: createTagName(pull_request_event_payload),
  };

  return payload;

}

function createTagName (pull_request_event_payload) {
  const {pull_request: {merged_at}} = pull_request_event_payload;
  return moment(merged_at).format('vYYYY_MM_DD__HH_mm_ss');
}

function createName (pull_request_event_payload) {
  const {pull_request: {merged_at}} = pull_request_event_payload;
  return moment(merged_at).format('YYYY/MM/DD HH:mm:ss');
}

module.exports = {
  isMerged,
  isTargetPR,
  extractPayloadForCreateReleaseFromEventPayload,
  _createTagName: createTagName,
  _createName: createName,
};
