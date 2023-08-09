import { GameSettings, State } from "..";
import { MOVE_NONE } from "./reduceState";

export function getInitialState(
  playerIds: string[],
  settings: GameSettings
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
