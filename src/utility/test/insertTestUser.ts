import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { processUserSignUp } from "features/user";
import { USER_ID_ALICE } from "./testEnvironmentUtility";

export function insertTestUser(testEnv: RulesTestEnvironment) {
  return testEnv.withSecurityRulesDisabled(() => {
    return processUserSignUp(USER_ID_ALICE);
  });
}
