import { USER_ALICE, USER_BOB } from "features/user";
import { Settings } from "../..";

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