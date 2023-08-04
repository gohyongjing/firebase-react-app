import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getUserById } from '..';
import { USER_ID_ALICE, USER_ID_BOB, logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';

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

test('can get user by id', async () => {
  await assertSucceeds(getUserById(USER_ID_BOB));
});
