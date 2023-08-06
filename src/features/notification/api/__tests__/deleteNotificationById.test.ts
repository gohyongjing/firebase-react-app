import { beforeEach, beforeAll, afterAll, test, expect } from 'vitest';
import { assertFails, assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { deleteNotificationById, sendAcceptedFriendRequestNotification, sendWelcomeNotification } from '..';
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

test('can only delete own notifications', async () => {
  // let aliceDocId = '';
  // let bobDocId = '';
  // await assertSucceeds((async () => {
  //   const docRef = await sendWelcomeNotification(USER_ALICE.id);
  //   expect(docRef).toBeTruthy();
  //   if (docRef) {
  //     aliceDocId = docRef.id;
  //   }
  // }) ());
  // await assertSucceeds((async () => {
  //   const docRef = await sendAcceptedFriendRequestNotification(USER_BOB.id, USER_ALICE.userName);
  //   expect(docRef).toBeTruthy();
  //   if (docRef) {
  //    bobDocId = docRef.id;
  //   }
  // }) ());

  // await assertSucceeds(deleteNotificationById(aliceDocId));
  // await assertFails(deleteNotificationById(bobDocId));
});
