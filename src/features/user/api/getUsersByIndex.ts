import { limit, orderBy } from "lib/firebase/firestore";
import { getUsers } from "../utility";

export function getUsersByIndex(startIndex: number, numUsers: number) {
  return getUsers(orderBy('userName'), limit(numUsers));
}
