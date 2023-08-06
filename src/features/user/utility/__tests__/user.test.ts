import { beforeEach, afterAll, test, beforeAll, describe } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { FIRESTORE_PATH_USERS, defaultUserModel } from '..';
import { ModelOperationsWithPath, getModelOperationsWithPath } from 'utility/model';
import { USER_ALICE, USER_BOB, prepareTestContext, prepareTestEnvironment, saveCoverageReport } from 'utility/test';
import { limit, orderBy, where } from 'firebase/firestore';
import { User } from 'features/user';
import { prepareTestFirestore } from 'utility/test/prepareTestFirestore';
import { createTestUser } from '../test/createTestUser';

let testEnv: RulesTestEnvironment;

let aliceOps: ModelOperationsWithPath<User>;
let unauthenticatedOps: ModelOperationsWithPath<User>;

beforeAll(async () => {
  testEnv = await prepareTestEnvironment();
  const aliceTestContext = prepareTestContext(testEnv, USER_ALICE.id);
  const aliceFirestore = prepareTestFirestore(aliceTestContext)
  aliceOps = getModelOperationsWithPath(
    FIRESTORE_PATH_USERS,
    defaultUserModel,
    aliceFirestore
  );

  const unauthenticatedTestContext = prepareTestContext(testEnv);
  const unauthenticatedFirestore = prepareTestFirestore(unauthenticatedTestContext)
  unauthenticatedOps = getModelOperationsWithPath(
    FIRESTORE_PATH_USERS,
    defaultUserModel,
    unauthenticatedFirestore
  );
});

afterAll(async () => {
  await saveCoverageReport();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('unauthenticated users', () => {
  test('cannot create, get, update or delete users', async () => {
    await createTestUser(testEnv, USER_ALICE);
    await createTestUser(testEnv, USER_BOB);

    await assertFails(unauthenticatedOps.getModel(USER_BOB.id));
    await assertFails(unauthenticatedOps.setModel(USER_ALICE.id, USER_ALICE));
    await assertFails(unauthenticatedOps.updateModel(USER_ALICE.id, {userName: 'hacked!'}));
    await assertFails(unauthenticatedOps.deleteModel(USER_BOB.id));
  });
});

describe('authenticated users', () => {
  test('can get other users', async () => {
    await assertSucceeds(aliceOps.getModel(USER_BOB.id));
  });

  test('can get users by condition', async () => {
    await assertSucceeds(aliceOps.getModels(
      where('userName', '>=', 'bob'),
      orderBy('userName'),
      limit(8)
    ))
  });

  test('can only set own user document', async () => {
    await assertSucceeds(aliceOps.setModel(
      USER_ALICE.id,
      USER_ALICE
    ))
    await assertFails(aliceOps.setModel(
      USER_BOB.id,
      USER_BOB
    ))
  });

  test('can only update own userName', async () => {
    await createTestUser(testEnv, USER_ALICE);
    await createTestUser(testEnv, USER_BOB);

    await assertSucceeds(aliceOps.updateModel(
      USER_ALICE.id,
      {
        userName: 'Alice2'
      }
    ))
    await assertFails(aliceOps.updateModel(
      USER_BOB.id,
      {
        userName: 'Bob2'
      }
    ))
  });
})
