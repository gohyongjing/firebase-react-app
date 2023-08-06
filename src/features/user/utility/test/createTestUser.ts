import { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { User } from "features/user";
import { WithId, getModelOperationsWithPath } from "utility/model";
import { FIRESTORE_PATH_USERS, defaultUserModel } from "..";
import { withSecurityRulesDisabled } from "utility/test/withSecurityRulesDisabled";

export async function createTestUser(testEnv: RulesTestEnvironment, user: WithId<User>) {
  await withSecurityRulesDisabled(testEnv, async (adminFirestore) => {
    const adminOps = getModelOperationsWithPath(
      FIRESTORE_PATH_USERS,
      defaultUserModel,
      adminFirestore
    );
    await adminOps.setModel(user.id, user);
  })
}
