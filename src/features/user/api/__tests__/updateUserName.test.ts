import { beforeEach, beforeAll, afterAll, test, expect } from 'vitest';
import { assertFails, assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getUserById, updateUserName } from '..';
import { USER_ID_ALICE, USER_ID_BOB, logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { insertTestUser } from 'utility/test/insertTestUser';

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

test('can only update own username', async () => {
  const newAliceUserName = 'new userName Alice';
  const newBobUserName = 'new userName Bob';
  await insertTestUser(testEnv);

  await assertSucceeds(updateUserName(USER_ID_ALICE, newAliceUserName));
  await assertFails(updateUserName(USER_ID_BOB, newBobUserName));

  const finalAlice = await getUserById(USER_ID_ALICE);
  expect(finalAlice).toBeTruthy();
  expect(finalAlice?.userName).toBe(newAliceUserName);
});
