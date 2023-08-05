import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { getUsersByName } from '..';
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

test('can get users by name', async () => {
  await assertSucceeds(getUsersByName('a', 5));
});
