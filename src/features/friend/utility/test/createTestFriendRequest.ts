import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { sendFriendRequest } from "../../api";
import { withSecurityRulesDisabled } from "utility/test/withSecurityRulesDisabled";

export function createTestFriendRequest(
  testEnv: RulesTestEnvironment,
  requesterId: string,
  recipientId: string
) {
  return withSecurityRulesDisabled(
    testEnv,
    () => sendFriendRequest(requesterId, recipientId)
  );
}
