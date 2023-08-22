import { Settings } from "..";
import { addRoom } from "../utility/room";

export function createRoom(settings: Settings) {
  console.log(settings)
  return addRoom({
    ...settings,
    status: 'WAITING'
  })
}
