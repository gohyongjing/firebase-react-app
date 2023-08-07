import { resolve } from 'node:path';

export * from './getFirestoreCoverageMeta';
export * from './prepareTestEnvironment';
export * from './getTestContext';
export * from './saveCoverageReport';

export const PROJECT_ID = 'fakeproject2';
export const FIREBASE_JSON = resolve(__dirname, '../../../firebase.json');

export const ASYNC_DELAY_DURATION = 100;
export const ERR_ASYNC_REJECT_MESSAGE = 'Error message for testing purposes';