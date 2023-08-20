import { beforeEach, test, beforeAll, describe } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { ModelOperationsWithPath } from 'utility/model';
import { prepareTestEnvironment } from 'utility/test';
import { where } from 'firebase/firestore';
import { USER_ALICE } from 'features/user';
import { Settings } from '../..';
import { FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_SETTINGS, defaultSettingsModel } from '../settings';
import { SETTINGS_ALICE, SETTINGS_BOB } from '../test';

let testEnv: RulesTestEnvironment;

let unauthenticatedOps: ModelOperationsWithPath<Settings>;
let aliceOps: ModelOperationsWithPath<Settings>;

let createTestSetting: (setting: Settings) => Promise<string>;

beforeAll(async () => {
  const testEnvironment = await prepareTestEnvironment(
    [undefined, USER_ALICE.id],
    FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_SETTINGS,
    defaultSettingsModel,
    import.meta.env.VITE_PROJECT_ID
  );
  testEnv = testEnvironment.testEnv;
  [unauthenticatedOps, aliceOps] = testEnvironment.modelOperations;
  createTestSetting = async (setting: Settings) => {
    let docId = '';
    await testEnvironment.withSecurityRulesDisabled(async (ops) => {
      const docRef = await ops.addModel(setting);
      docId = docRef?.id ?? '';
    });
    return docId;
  }
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('unauthenticated users', () => {
  test('cannot create, get, update or delete settings', async () => {
    const settingId = await createTestSetting(SETTINGS_ALICE);

    await assertFails(unauthenticatedOps.getModels(where('hostId', '==', USER_ALICE.id)));
    await assertFails(unauthenticatedOps.addModel(SETTINGS_BOB));
    await assertFails(unauthenticatedOps.updateModel(settingId, { hostId: 'hacked' }));
    await assertFails(unauthenticatedOps.deleteModel(settingId));
  });
});

describe('authenticated users', () => {
  test('can only create settings with own id as hostId', async () => {
    await assertSucceeds(aliceOps.addModel(SETTINGS_ALICE));
    await assertFails(aliceOps.addModel(SETTINGS_BOB));
  });

  test('can get settings', async () => {
    await createTestSetting(SETTINGS_ALICE);
    await createTestSetting(SETTINGS_BOB);
    await assertSucceeds(aliceOps.getModels());
  });

  test('can only update own settings', async () => {
    const settingIdA = await createTestSetting(SETTINGS_ALICE);
    const settingIdB = await createTestSetting(SETTINGS_BOB);

    await assertSucceeds(aliceOps.updateModel(settingIdA, { roomName: 'updated alice room name' }));
    await assertFails(aliceOps.updateModel(settingIdB, { roomName: 'failed room name update' }));
  });
})
