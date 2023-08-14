import { USER_ALICE, USER_BOB, USER_CHARLIE } from "features/user";
import { Room, Settings } from "../..";

export const SETTINGS_ALICE: Settings = {
  roomName: 'rps room',
  visibility: 'public',
  hostId: USER_ALICE.id,
  roundsToWin: 2
}

export const SETTINGS_BOB: Settings = {
  roomName: 'bob\'s room',
  visibility: 'public',
  hostId: USER_BOB.id,
  roundsToWin: 5
}

export const SETTINGS_CHARLIE: Settings = {
  roomName: 'charlie invite only',
  visibility: 'private',
  hostId: USER_CHARLIE.id,
  roundsToWin: 3
}

export const ROOM_ALICE: Room = {
  ...SETTINGS_ALICE,
  status: 'WAITING'
}

export const ROOM_BOB: Room = {
  ...SETTINGS_BOB,
  status: 'IN_PROGRESS'
}

export const ROOM_CHARLIE: Room = {
  ...SETTINGS_CHARLIE,
  status: 'WAITING'
}
