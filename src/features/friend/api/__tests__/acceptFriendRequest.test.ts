import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { createTestFriendRequest } from 'features/friend/utility/test/createTestFriendRequest';
import { acceptFriendRequest } from '..';
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

test('can accept received friend requests', async () => {
  // await createTestFriendRequest(testEnv, USER_BOB.id, USER_ALICE.id);

  // await assertSucceeds(acceptFriendRequest(USER_BOB, USER_ALICE));
});

test('cannot accept others friend requests', async () => {
  // await createTestFriendRequest(testEnv, USER_BOB.id, USER_CHARLIE.id);

  // await assertFails(acceptFriendRequest(USER_BOB, USER_CHARLIE));
});
