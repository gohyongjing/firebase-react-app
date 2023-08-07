import { limit as _limit, orderBy, where } from "lib/firebase/firestore";
import { getUsers } from "../utility";

export function getUsersByName(name: string, limit: number) {
  return getUsers(
    where('userName', '>=', name),
    orderBy('userName'),
    _limit(limit)
  );
}
