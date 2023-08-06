import { beforeEach, afterAll, test, beforeAll, describe } from 'vitest';
import { RulesTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { FIRESTORE_PATH_USERS, defaultUserModel } from '..';
import { ModelOperationsWithPath, WithId } from 'utility/model';
import { prepareTestEnvironment, saveCoverageReport } from 'utility/test';
import { limit, orderBy, where } from 'firebase/firestore';
import { User } from 'features/user';
import { USER_ALICE, USER_BOB } from '../test';

let testEnv: RulesTestEnvironment;

let unauthenticatedOps: ModelOperationsWithPath<User>;
let aliceOps: ModelOperationsWithPath<User>;

let createTestUser: (user: WithId<User>) => Promise<void>;

beforeAll(async () => {
  const testEnvironment = await prepareTestEnvironment(
    [undefined, USER_ALICE.id],
    FIRESTORE_PATH_USERS,
    defaultUserModel
  );
  testEnv = testEnvironment.testEnv;
  [unauthenticatedOps, aliceOps] = testEnvironment.modelOperations;
  createTestUser = (user: WithId<User>) => {
    return testEnvironment.withSecurityRulesDisabled((ops) => ops.setModel(user.id, user))
  }
});

afterAll(async () => {
  await saveCoverageReport();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('unauthenticated users', () => {
  test('cannot create, get, update or delete users', async () => {
    await createTestUser(USER_ALICE);
    await createTestUser(USER_BOB);

    await assertFails(unauthenticatedOps.getModel(USER_BOB.id));
    await assertFails(unauthenticatedOps.setModel(USER_ALICE.id, USER_ALICE));
    await assertFails(unauthenticatedOps.updateModel(USER_ALICE.id, { userName: 'hacked!' }));
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
    await createTestUser(USER_ALICE);
    await createTestUser(USER_BOB);

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
