import { RulesTestEnvironment } from "@firebase/rules-unit-testing";

export function prepareTestContext(testEnv: RulesTestEnvironment, userId?: string) {
  return userId
    ? testEnv.authenticatedContext(userId)
    : testEnv.unauthenticatedContext();
}
