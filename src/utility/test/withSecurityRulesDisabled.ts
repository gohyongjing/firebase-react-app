import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";
import { firestore, replaceColFirestore, replaceDocFirestore } from "lib/firebase/firestore";

export function withSecurityRulesDisabled(
  testEnv: RulesTestEnvironment,
  func: () => Promise<unknown>
) {
  return testEnv.withSecurityRulesDisabled(async (context) => {
    const oldFirestore = firestore;
    const newFirestore: Firestore = {
    ...context.firestore(),
    type: 'firestore',
    toJSON: () => { throw Error('toJSON() not implemented') }
  };
    replaceDocFirestore(newFirestore);
    replaceColFirestore(newFirestore);
    await func();
    replaceDocFirestore(oldFirestore);
    replaceColFirestore(oldFirestore);
  });
}
