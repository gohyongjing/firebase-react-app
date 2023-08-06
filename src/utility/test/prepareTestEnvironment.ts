import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { readFileSync } from "node:fs";
import { setLogLevel } from "firebase/firestore";
import { FIREBASE_JSON, PROJECT_ID } from "./testConstants";
import { getFirestoreCoverageMeta } from "./getFirestoreCoverageMeta";

export async function prepareTestEnvironment() {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel('error');
  const { host, port } = getFirestoreCoverageMeta(PROJECT_ID, FIREBASE_JSON);
  console.log('host and port ',host, port)
  return initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      host,
      port,
      rules: readFileSync('firestore.rules', 'utf8')
    },
  });
}
