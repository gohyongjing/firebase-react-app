import { beforeEach, beforeAll, afterAll, test, expect } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getUserById, processUserSignUp } from '..';
import { USER_ID_ALICE, logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';

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

test('initialises user', async () => {
  await assertSucceeds(processUserSignUp(USER_ID_ALICE));
  const user = await getUserById(USER_ID_ALICE);
  expect(user).toBeTruthy();
});
