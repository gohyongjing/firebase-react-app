import { beforeEach, beforeAll, afterAll, test } from 'vitest';
import { assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { sendWelcomeNotification } from '..';
import { USER_ID_ALICE, logTestResults, prepareTestEnvironment } from 'utility/test/testEnvironmentUtility';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await prepareTestEnvironment(); 
});

afterAll(async () => {
  logTestResults();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

test('can send welcome notification to ownself', async () => {
  await assertSucceeds(sendWelcomeNotification(USER_ID_ALICE));
  //await assertFails(sendWelcomeNotification('NOT_ALICE'))
});
