import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { sendFriendRequestNotification } from '../sendFriendRequestNotification';
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

test('can send friend request notification to others', async () => {
  // await assertSucceeds(sendFriendRequestNotification(USER_BOB.id));
});
