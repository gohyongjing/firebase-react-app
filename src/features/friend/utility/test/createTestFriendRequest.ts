import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { sendFriendRequest } from "../../api";

export function createTestFriendRequest(
  testEnv: RulesTestEnvironment,
  requesterId: string,
  recipientId: string
) {
  // return withSecurityRulesDisabled(
  //   testEnv,
  //   () => sendFriendRequest(requesterId, recipientId)
  // );
}
