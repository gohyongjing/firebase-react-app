import { beforeEach, test, beforeAll, describe } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { FIRESTORE_PATH_FRIENDSHIPS, defaultFriendshipModel } from '..';
import { ModelOperationsWithPath } from 'utility/model';
import { prepareTestEnvironment } from 'utility/test';
import {  Timestamp, or, where } from 'firebase/firestore';
import { FRIENDSHIP_ALICE_WITH_BOB, FRIENDSHIP_CHARLIE_WITH_ALICE, FRIENDSHIP_REQUEST_ALICE_TO_BOB, FRIENDSHIP_REQUEST_BOB_TO_CHARLIE, FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE } from '../test';
import { USER_ALICE, USER_BOB } from 'features/user';
import { Friendship } from 'features/friend';
import { addToDate } from 'utility/addToDate';

let testEnv: RulesTestEnvironment;

let unauthenticatedOps: ModelOperationsWithPath<Friendship>;
let aliceOps: ModelOperationsWithPath<Friendship>;

let createTestFriendship: (friendship: Friendship) => Promise<string>;

beforeAll(async () => {
  const testEnvironment = await prepareTestEnvironment(
    [undefined, USER_ALICE.id],
    FIRESTORE_PATH_FRIENDSHIPS,
    defaultFriendshipModel,
    'friend'
  );
  testEnv = testEnvironment.testEnv;
  [unauthenticatedOps, aliceOps] = testEnvironment.modelOperations;
  createTestFriendship = async (friendship: Friendship) => {
    let docId = '';
    await testEnvironment.withSecurityRulesDisabled(async (ops) => {
      const docRef = await ops.addModel(friendship);
      docId = docRef?.id ?? '';
    });
    return docId;
  }
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('unauthenticated users', () => {
  test('cannot create, get, update or delete friendships', async () => {
    const friendshipId = await createTestFriendship(FRIENDSHIP_REQUEST_ALICE_TO_BOB);

    await assertFails(unauthenticatedOps.getModels(where('recipientId', '==', USER_BOB.id)));
    await assertFails(unauthenticatedOps.addModel(FRIENDSHIP_REQUEST_ALICE_TO_BOB));
    await assertFails(unauthenticatedOps.updateModel(friendshipId, { recipientId: 'hacked' }));
    await assertFails(unauthenticatedOps.deleteModel(friendshipId));
  });
});

describe('authenticated users', () => {
  test('can send friend requests with own id as requester', async () => {
    await assertSucceeds(aliceOps.addModel(FRIENDSHIP_REQUEST_ALICE_TO_BOB));
    await assertFails(aliceOps.addModel(FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE));
  });

  test('can get friends and friend requests', async () => {
    await createTestFriendship(FRIENDSHIP_REQUEST_ALICE_TO_BOB);
    await createTestFriendship(FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE);
    await assertSucceeds(aliceOps.getModels(or(
      where('requesterId', '==', USER_ALICE.id),
      where('recipientId', '==', USER_ALICE.id)
    )));
  });

  test('can accept received friend requests', async () => {
    const friendshipId = await createTestFriendship(FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE);
    await assertSucceeds(aliceOps.updateModel(friendshipId, {
      dateAccepted: Timestamp.fromDate(
        addToDate(FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE.dateRequested.toDate(), 1)
      )
    }));
  });

  test('cannot accept others friend requests', async () => {
    const friendshipId = await createTestFriendship(FRIENDSHIP_REQUEST_BOB_TO_CHARLIE);

    await assertFails(aliceOps.updateModel(friendshipId, {
      dateAccepted: Timestamp.fromDate(
        addToDate(FRIENDSHIP_REQUEST_BOB_TO_CHARLIE.dateRequested.toDate(), 1)
      )
    }));
  });

  test('can cancel sent or received friend requests', async () => {
    const friendshipIdB = await createTestFriendship(FRIENDSHIP_REQUEST_ALICE_TO_BOB);
    const friendshipIdC = await createTestFriendship(FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE);

    await assertSucceeds(aliceOps.deleteModel(friendshipIdB));
    await assertSucceeds(aliceOps.deleteModel(friendshipIdC));
  })

  test('can delete own friends', async () => {
    const friendshipIdB = await createTestFriendship(FRIENDSHIP_ALICE_WITH_BOB);
    const friendshipIdC = await createTestFriendship(FRIENDSHIP_CHARLIE_WITH_ALICE);

    await assertSucceeds(aliceOps.deleteModel(friendshipIdB));
    await assertSucceeds(aliceOps.deleteModel(friendshipIdC));
  });
})
