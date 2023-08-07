import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { acceptFriendRequest, sendFriendRequest } from "../../api";
import { User } from "features/user";
import { WithId } from "utility/model";

export function createTestFriend(
  testEnv: RulesTestEnvironment,
  requester: WithId<User>,
  recipient: WithId<User>
) {
  // return withSecurityRulesDisabled(
  //   testEnv,
  //   async () => {
  //     await sendFriendRequest(requester.id, recipient.id);
  //     await acceptFriendRequest(requester, recipient);
  //   }
  // );
}
