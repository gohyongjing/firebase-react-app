import { startAt } from "lib/firebase/firestore";
import { getUsers } from "../utility";
import { limit } from "firebase/firestore";

export function getUsersByIndex(startIndex: number, numUsers: number) {
  return getUsers(startAt(startIndex), limit(numUsers));
}
