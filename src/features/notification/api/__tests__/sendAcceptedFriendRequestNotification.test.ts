import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { USER_ID_ALICE, USER_ID_BOB, logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { sendAcceptedFriendRequestNotification } from '../sendAcceptedFriendRequestNotification';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await prepareTestEnvironment(USER_ID_ALICE); 
});

afterAll(async () => {
  logTestResults();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

test('can send accepted friend request notification to others', async () => {
  await assertSucceeds(sendAcceptedFriendRequestNotification(USER_ID_BOB, 'Xx_alice_xX'));
});
