import { beforeEach, beforeAll, afterAll, test, expect } from 'vitest';
import { assertFails, assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getUserById, updateUserName } from '..';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { createTestUser } from 'features/user/utility/test/createTestUser';
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

test('can only update own username', async () => {
  const newAliceUserName = 'new userName Alice';
  const newBobUserName = 'new userName Bob';
  await createTestUser(testEnv, USER_ALICE.id);
  await createTestUser(testEnv, USER_BOB.id);

  await assertSucceeds(updateUserName(USER_ALICE.id, newAliceUserName));
  await assertFails(updateUserName(USER_BOB.id, newBobUserName));

  const finalAlice = await getUserById(USER_ALICE.id);
  expect(finalAlice).toBeTruthy();
  expect(finalAlice?.userName).toBe(newAliceUserName);
});
