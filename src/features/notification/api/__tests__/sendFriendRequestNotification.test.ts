import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { USER_ID_BOB, logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { sendFriendRequestNotification } from '../sendFriendRequestNotification';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await prepareTestEnvironment(); 
});

afterAll(async () => {
  logTestResults();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

test('can send friend request notification to others', async () => {
  await assertSucceeds(sendFriendRequestNotification(USER_ID_BOB));
});
