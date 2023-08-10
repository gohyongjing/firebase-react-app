import { beforeEach, test, beforeAll, describe } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { FIRESTORE_PATH_NOTIFICATIONS, defaultNotificationModel } from '..';
import { ModelOperationsWithPath } from 'utility/model';
import { prepareTestEnvironment } from 'utility/test';
import { limit, where } from 'firebase/firestore';
import { Notification } from 'features/notification';
import { NOTIFICATION_FRIEND_REQUEST_ALICE_TO_BOB, NOTIFICATION_WELCOME_ALICE, NOTIFICATION_WELCOME_BOB } from '../test';
import { USER_ALICE, USER_BOB } from 'features/user';

let testEnv: RulesTestEnvironment;

let unauthenticatedOps: ModelOperationsWithPath<Notification>;
let aliceOps: ModelOperationsWithPath<Notification>;
let bobOps: ModelOperationsWithPath<Notification>;

let createTestNotification: (notification: Notification) => Promise<string>;

beforeAll(async () => {
  const testEnvironment = await prepareTestEnvironment(
    [undefined, USER_ALICE.id, USER_BOB.id],
    FIRESTORE_PATH_NOTIFICATIONS,
    defaultNotificationModel,
    'notification'
  );
  testEnv = testEnvironment.testEnv;
  [unauthenticatedOps, aliceOps, bobOps] = testEnvironment.modelOperations;
  createTestNotification = async (notification: Notification) => {
    let docId = '';
    await testEnvironment.withSecurityRulesDisabled(async (ops) => {
      const docRef = await ops.addModel(notification);
      docId = docRef?.id ?? '';
    });
    return docId;
  }
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('unauthenticated users', () => {
  test('cannot create, get, update or delete notifications', async () => {
    const notificationId = await createTestNotification(NOTIFICATION_WELCOME_ALICE);
    await assertFails(unauthenticatedOps.getModels(where('recipientId', '==', USER_BOB.id)));
    await assertFails(unauthenticatedOps.addModel(NOTIFICATION_WELCOME_BOB));
    await assertFails(unauthenticatedOps.updateModel(notificationId, { recipientId: 'hacked' }));
    await assertFails(unauthenticatedOps.deleteModel(notificationId));
  });
});

describe('authenticated users', () => {
  test('can send notifications', async () => {
    await assertSucceeds(aliceOps.addModel(NOTIFICATION_WELCOME_ALICE));
    await assertSucceeds(aliceOps.addModel(NOTIFICATION_FRIEND_REQUEST_ALICE_TO_BOB));
  });

  test('can get notifications', async () => {
    await assertSucceeds(aliceOps.getModels(
      where('recipientId', '==', USER_ALICE.id),
      limit(8)
    ))
  })

  test('can only delete own notifications', async () => {
    const notificationId = await createTestNotification(NOTIFICATION_WELCOME_ALICE);

    await assertFails(bobOps.deleteModel(notificationId));
    await assertSucceeds(aliceOps.deleteModel(notificationId));
  })
})
