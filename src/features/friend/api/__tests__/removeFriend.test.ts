import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { createTestFriendRequest } from 'features/friend/utility/test/createTestFriendRequest';
import { acceptFriendRequest, removeFriend } from '..';
import { USER_ALICE, USER_BOB, USER_CHARLIE } from 'utility/test/testConstants';
import { createTestFriend } from 'features/friend/utility/test/createTestFriend';

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

test('can remove own friends', async () => {
  // await createTestFriend(testEnv, USER_BOB, USER_ALICE);
  // await createTestFriend(testEnv, USER_ALICE, USER_CHARLIE);

  // await assertSucceeds(removeFriend(USER_ALICE.id, USER_BOB.id));
  // await assertSucceeds(removeFriend(USER_ALICE.id, USER_CHARLIE.id));
});

test('cannot remove others friends', async () => {
  // await createTestFriend(testEnv, USER_BOB, USER_CHARLIE);

  // await assertFails(removeFriend(USER_BOB.id, USER_CHARLIE.id));
});
