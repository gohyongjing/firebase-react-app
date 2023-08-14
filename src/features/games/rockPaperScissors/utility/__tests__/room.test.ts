import { beforeEach, test, beforeAll, describe } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { ModelOperationsWithPath } from 'utility/model';
import { prepareTestEnvironment } from 'utility/test';
import { where } from 'firebase/firestore';
import { USER_ALICE } from 'features/user';
import { Room } from '../..';
import { ROOM_ALICE, ROOM_BOB, ROOM_CHARLIE } from '../test';
import { FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_ROOMS, defaultRoomModel } from '../room';

let testEnv: RulesTestEnvironment;

let unauthenticatedOps: ModelOperationsWithPath<Room>;
let aliceOps: ModelOperationsWithPath<Room>;

let createTestRoom: (room: Room) => Promise<string>;

beforeAll(async () => {
  const testEnvironment = await prepareTestEnvironment(
    [undefined, USER_ALICE.id],
    FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_ROOMS,
    defaultRoomModel,
    'settings'
  );
  testEnv = testEnvironment.testEnv;
  [unauthenticatedOps, aliceOps] = testEnvironment.modelOperations;
  createTestRoom = async (room: Room) => {
    let docId = '';
    await testEnvironment.withSecurityRulesDisabled(async (ops) => {
      const docRef = await ops.addModel(room);
      docId = docRef?.id ?? '';
    });
    return docId;
  }
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('unauthenticated users', () => {
  test('cannot create, get, update or delete rooms', async () => {
    const roomId = await createTestRoom(ROOM_ALICE);

    await assertFails(unauthenticatedOps.getModels(where('hostId', '==', USER_ALICE.id)));
    await assertFails(unauthenticatedOps.addModel(ROOM_BOB));
    await assertFails(unauthenticatedOps.updateModel(roomId, { hostId: 'hacked' }));
    await assertFails(unauthenticatedOps.deleteModel(roomId));
  });
});

describe('authenticated users', () => {
  /*test('can only create settings with own id as hostId', async () => {
    await assertSucceeds(aliceOps.addModel(SETTINGS_ALICE));
    await assertFails(aliceOps.addModel(SETTINGS_BOB));
  });*/

  test('can get non-private rooms', async () => {
    await createTestRoom(ROOM_ALICE);
    await createTestRoom(ROOM_CHARLIE);
    await assertFails(aliceOps.getModels());
    await assertSucceeds(aliceOps.getModels(where('visibility', '!=', 'private')));
  });

  /*test('can only update own settings', async () => {
    const settingIdA = await createTestSetting(SETTINGS_ALICE);
    const settingIdB = await createTestSetting(SETTINGS_BOB);

    await assertSucceeds(aliceOps.updateModel(settingIdA, { roomName: 'updated alice room name' }));
    await assertFails(aliceOps.updateModel(settingIdB, { roomName: 'failed room name update' }));
  });*/
})
