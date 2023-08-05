import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertFails, assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { sendFriendRequest } from '..';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { USER_ALICE, USER_BOB } from 'utility/test/testConstants';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await prepareTestEnvironment(USER_ALICE.id);
});

afterAll(async () => {
  logTestResults();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

test('can only send friend requests with own id as requester', async () => {
  await assertFails(sendFriendRequest(USER_BOB.id, USER_ALICE.id));
  await assertSucceeds(sendFriendRequest(USER_ALICE.id, USER_BOB.id));
});
