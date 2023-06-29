import { updateUser } from "../utility";

export function updateUserName(userId: string, userName: string) {
  return updateUser(userId, {
    userName: userName
  });
}
