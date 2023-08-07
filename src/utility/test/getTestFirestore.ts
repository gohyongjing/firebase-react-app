
import { RulesTestContext } from "@firebase/rules-unit-testing";
import { Firestore } from "firebase/firestore";

/**
 * Prepares the firestore from the given test context.
 * Converts the v8 Firestore API into v9 API.
 *
 * @param testContext Context for rules testing
 * @returns V9 API Firestore.
 */
export function getTestFirestore(testContext: RulesTestContext): Firestore {
  return {
    ...testContext.firestore(),
    type: 'firestore',
    toJSON: () => {
      throw Error('toJSON() not implemented')
    }
  };
}
