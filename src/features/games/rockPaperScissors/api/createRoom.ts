import { Settings } from "..";
import { addRoom } from "../utility/room";

export function createRoom(settings: Settings) {
  return addRoom({
    ...settings,
    status: 'WAITING'
  })
}
