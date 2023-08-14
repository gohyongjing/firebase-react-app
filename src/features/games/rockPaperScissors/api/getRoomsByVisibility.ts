import { where } from "lib/firebase/firestore";
import { getRooms } from "../utility/room";
import { Settings } from "..";

export function getRoomsByVisibility(visibility: Settings['visibility']) {
  return getRooms(where('visibility', '==', visibility));
}
