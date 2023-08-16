import { Room } from "..";
import { updateRoom } from "../utility/room";

export function updateRoomStatus(roomId: string, newStatus: Room['status']) {
  return updateRoom(roomId, { status: newStatus });
}
