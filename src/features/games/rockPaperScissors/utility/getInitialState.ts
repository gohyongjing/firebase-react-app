import { Settings, State } from "../types";
import { MOVE_NONE } from "./reduceState";

export function getInitialState(
  playerIds: string[],
  settings: Settings
): State {
  return {
    players: playerIds.map(id => {
      return {
        id,
        wins: 0,
        move: MOVE_NONE
      }
    }),
    settings: settings
  }
}
