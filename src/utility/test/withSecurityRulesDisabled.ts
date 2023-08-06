import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";
import { prepareTestFirestore } from "./prepareTestFirestore";

export function withSecurityRulesDisabled(
  testEnv: RulesTestEnvironment,
  func: (firestore: Firestore) => Promise<unknown>
) {
  return testEnv.withSecurityRulesDisabled(async (context) => {
    const firestore = prepareTestFirestore(context);
    await func(firestore);
  });
}
