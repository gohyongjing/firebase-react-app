/**
 * Code adapted from https://github.com/firebase/quickstart-testing/tree/master
 */

import { saveCoverageReport } from './saveCoverageReport';
import { prepareTestEnvironment as _prepareTestEnvironment } from './prepareTestEnvironment';


export async function prepareTestEnvironment(userId?: string) {
  console.log(userId + '')
  return _prepareTestEnvironment();
}

export async function logTestResults() {
  // Write the coverage report to a file
  return saveCoverageReport();
}
