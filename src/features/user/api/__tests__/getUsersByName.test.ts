import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getUsersByName } from '..';
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

test('can get users by name', async () => {
  await assertSucceeds(getUsersByName('a', 5));
});
