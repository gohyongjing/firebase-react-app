import { beforeEach, beforeAll, afterAll, test, expect } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getUserById, processUserSignIn } from '..';
import { logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';
import { USER_ALICE } from 'utility/test/testConstants';

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

test('initialises user if not found', async () => {
  await assertSucceeds(processUserSignIn(USER_ALICE.id));
  const user = await getUserById(USER_ALICE.id);
  expect(user).toBeTruthy();
});
