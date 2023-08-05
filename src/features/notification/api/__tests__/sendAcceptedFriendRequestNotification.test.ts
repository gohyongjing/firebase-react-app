import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { sendAcceptedFriendRequestNotification } from '../sendAcceptedFriendRequestNotification';
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

test('can send accepted friend request notification to others', async () => {
  await assertSucceeds(sendAcceptedFriendRequestNotification(USER_BOB.id, USER_ALICE.userName));
})
