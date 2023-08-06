import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { createTestFriendRequest } from 'features/friend/utility/test/createTestFriendRequest';
import { cancelFriendRequest } from '..';
import { USER_ALICE, USER_BOB, USER_CHARLIE } from 'utility/test/testConstants';

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

test('can cancel sent friend requests', async () => {
  // await createTestFriendRequest(testEnv, USER_ALICE.id, USER_BOB.id);

  // await assertSucceeds(cancelFriendRequest(USER_ALICE.id, USER_BOB.id));
});

test('cannot cancel others friend requests', async () => {
  // await createTestFriendRequest(testEnv, USER_BOB.id, USER_CHARLIE.id);

  // await assertFails(cancelFriendRequest(USER_BOB.id, USER_CHARLIE.id));
});

test('can cancel received friend requests', async () => {
  // await createTestFriendRequest(testEnv, USER_BOB.id, USER_ALICE.id);

  // await assertSucceeds(cancelFriendRequest(USER_BOB.id, USER_ALICE.id));
});
