import { RulesTestContext, RulesTestEnvironment, initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { readFileSync } from "node:fs";
import { DocumentData, Firestore, setLogLevel } from "firebase/firestore";
import { FIREBASE_JSON } from ".";
import { getFirestoreCoverageMeta } from "./getFirestoreCoverageMeta";
import { ModelOperationsWithPath, getModelOperationsWithPath } from "utility/model";
import { getTestContext } from ".";
import { getTestFirestore } from "./getTestFirestore";

type TestEnvironment<T> = {
  testEnv: RulesTestEnvironment
  testContexts: RulesTestContext[]
  testFirestores: Firestore[]
  modelOperations: ModelOperationsWithPath<T>[]
  withSecurityRulesDisabled: (
    operate: (modelOperations: ModelOperationsWithPath<T>) => Promise<unknown>
  ) => Promise<void>
}

export async function prepareTestEnvironment<T extends DocumentData>(
  userIds: (string | undefined)[],
  firestorePath: string,
  defaultModel: T,
  projectId: string
): Promise<TestEnvironment<T>> {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel('error');
  const { host, port } = await getFirestoreCoverageMeta(projectId, FIREBASE_JSON);
  const testEnv = await initializeTestEnvironment({
    projectId,
    firestore: {
      host,
      port,
      rules: readFileSync('firestore.rules', 'utf8')
    },
  });
  const testContexts = userIds.map(userId => getTestContext(testEnv, userId));
  const testFirestores = testContexts.map(testContext => getTestFirestore(testContext));
  const modelOperations = testFirestores.map(testFirestore => getModelOperationsWithPath(
    firestorePath,
    defaultModel,
    testFirestore
  ));

  async function withSecurityRulesDisabled(
    operate: (modelOperations: ModelOperationsWithPath<T>) => Promise<unknown>
  ) {
    return testEnv.withSecurityRulesDisabled(async (context) => {
      const adminFirestore = getTestFirestore(context);
      const adminOps = getModelOperationsWithPath(
        firestorePath,
        defaultModel,
        adminFirestore
      );
      await operate(adminOps);
    });
}

  return {
    testEnv,
    testContexts,
    testFirestores,
    modelOperations,
    withSecurityRulesDisabled
  }
}
