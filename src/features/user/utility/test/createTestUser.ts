import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { processUserSignUp } from "features/user";
import { withSecurityRulesDisabled } from "utility/test/withSecurityRulesDisabled";

export function createTestUser(testEnv: RulesTestEnvironment, userId: string) {
  return withSecurityRulesDisabled(
    testEnv,
    () =>  processUserSignUp(userId)
  );
}
