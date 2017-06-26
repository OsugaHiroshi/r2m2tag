import test from 'ava';
import helper from '../helper';

test.beforeEach(t => {
  t.context.payload = require('./pr_closed.fixture.json');
});

test('isTargetPR: r2mならtrue', (t) => {
  const {context: {payload}} = t;
  payload.pull_request.title = 'r2m';
  const result = helper.isTargetPR(payload);
  t.true(result);
});

test('isTargetPR: 特定のタイトルでなければfalse ', (t) => {
  const {context: {payload}} = t;
  payload.pull_request.title = 'hogehoge';
  const result = helper.isTargetPR(payload);
  t.false(result);
});

test('isMerged', (t) => {
  const {context: {payload}} = t;
  const result = helper.isMerged(payload);
  t.true(result);
});

test('isMerged: mergeされてなければfalse', (t) => {
  const {context: {payload}} = t;
  payload.pull_request.merged_at = null;
  const result = helper.isMerged(payload);
  t.false(result);
});

test('createTagName: 日付からtagNameを生成する', (t) => {
  const {context: {payload}} = t;
  payload.pull_request.merged_at = '2017-06-26T11:42:23Z';
  const result = helper._createTagName(payload);

  //t.is(result, 'v2017_06_26__11_42_23'); 日本のタイムゾーンで表示されるので +9h されたものが正解
  t.is(result, 'v2017_06_26__20_42_23');
});

test('createName: 日付からnameを生成する', (t) => {
  const {context: {payload}} = t;
  payload.pull_request.merged_at = '2017-06-26T11:42:23Z';
  const result = helper._createName(payload);

  //t.is(result, 'v2017_06_26__11_42_23'); 日本のタイムゾーンで表示されるので +9h されたものが正解
  t.is(result, '2017/06/26 20:42:23');
});


test('extractPayloadForCreateReleaseFromEventPayload', (t) => {
  const {context: {payload}} = t;
  const result = helper.extractPayloadForCreateReleaseFromEventPayload(payload);

  t.deepEqual(result, {
    owner: 'osg-test',
    repo: 'test',
    tag_name: 'v2017_06_26__20_42_23',
    name: '2017/06/26 20:42:23',
    body: 'releasssssssssssssssssssssssssssss!!!!!!!!!!!!!',
  });
});
