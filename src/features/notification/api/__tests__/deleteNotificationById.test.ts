import { beforeEach, beforeAll, afterAll, test, expect } from 'vitest';
import { assertFails, assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { USER_ID_ALICE, USER_ID_BOB, logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { deleteNotificationById, sendWelcomeNotification } from '..';
import { sendAcceptedFriendRequestNotification } from '../sendAcceptedFriendRequestNotification';

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

test('can only delete own notifications', async () => {
  let aliceDocId = '';
  let bobDocId = '';
  await assertSucceeds((async () => {
    const docRef = await sendWelcomeNotification(USER_ID_ALICE);
    expect(docRef).toBeTruthy();
    if (docRef) {
      aliceDocId = docRef.id;
    }
  }) ());
  await assertSucceeds((async () => {
    const docRef = await sendAcceptedFriendRequestNotification(USER_ID_BOB, 'Xx_alice_xX');
    expect(docRef).toBeTruthy();
    if (docRef) {
     bobDocId = docRef.id;
    }
  }) ());

  await assertSucceeds(deleteNotificationById(aliceDocId));
  await assertFails(deleteNotificationById(bobDocId));
});
