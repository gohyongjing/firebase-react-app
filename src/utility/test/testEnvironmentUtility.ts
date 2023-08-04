import {  initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { readFileSync, createWriteStream } from "node:fs";
import { get } from "node:http";
import { resolve } from 'node:path';
import { Firestore, setLogLevel } from 'firebase/firestore';
import { replaceColFirestore, replaceDocFirestore } from 'lib/firebase/firestore';

const PROJECT_ID = 'fakeproject2';
const FIREBASE_JSON = resolve(__dirname, '../../../firebase.json');

export const USER_ID_ALICE = 'alice';
export const USER_ID_BOB = 'bob';

export function parseHostAndPort(hostAndPort: string | undefined): { host: string; port: number; } | undefined {
  if(hostAndPort == undefined) { return undefined; }
  const pieces = hostAndPort.split(':');
  return {
    host: pieces[0],
    port: parseInt(pieces[1], 10),
  };
}

function getFirestoreCoverageMeta(projectId: string, firebaseJsonPath: string) {
  /* eslint-disable @typescript-eslint/no-var-requires */
  const { emulators } = require(firebaseJsonPath);
  const hostAndPort = parseHostAndPort(process.env.FIRESTORE_EMULATOR_HOST);
  const { host, port } = hostAndPort != undefined ? hostAndPort : emulators.firestore!;
  const coverageUrl = `http://${host}:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;
  return {
    host,
    port,
    coverageUrl,
  }
}

export async function prepareTestEnvironment(userId: string = USER_ID_ALICE) {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel('error');
  const { host, port } = getFirestoreCoverageMeta(PROJECT_ID, FIREBASE_JSON);
  const testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      host,
      port,
      rules: readFileSync('firestore.rules', 'utf8')
    },
  });

  // convert Firestore v8 API to v9 API
  const testFirestore: Firestore = {
    ...testEnv.authenticatedContext(userId).firestore(),
    type: 'firestore',
    toJSON: () => { throw Error('toJSON() not implemented') }
  };

  replaceDocFirestore(testFirestore);
  replaceColFirestore(testFirestore);
  return testEnv;
}

export async function logTestResults() {
  // Write the coverage report to a file
  const { coverageUrl } = getFirestoreCoverageMeta(PROJECT_ID, FIREBASE_JSON);
  const coverageFile = './firestore-coverage.html';
  const fstream = createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    get(coverageUrl, (res) => {
      res.pipe(fstream, { end: true });
      res.on("end", resolve);
      res.on("error", reject);
    });
  });
  console.log(`View firestore rule coverage information at ${coverageFile}\n`);
}
