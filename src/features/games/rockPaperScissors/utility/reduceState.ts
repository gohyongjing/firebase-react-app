import { Action, Player, State } from "../types";

export const MOVE_NONE = -1;
export const MOVE_ROCK = 0;
export const MOVE_PAPER = 1;
export const MOVE_SCISSORS = 2;
export const MOVES = [
  MOVE_ROCK,
  MOVE_PAPER,
  MOVE_SCISSORS
];

const ERR_NO_PLAYERS = 'No players found in game'
const ERR_ALREADY_MOVED = 'Player has already made a move'

function validateState(state: State) {
  if (state.players.length === 0) {
    console.warn(ERR_NO_PLAYERS);
  }
}

function checkLostToPlayer(player1: Player, player2: Player) {
  if (player1.id === player2.id || player1.move === MOVE_NONE || player2.move === MOVE_NONE) {
    return false;
  }
  return (player1.move + 1) % MOVES.length === player2.move;
}

function incrementWinnerWins(players: Player[]) {
  return players.map(player => {
    for (const otherPlayer of players) {
      if (checkLostToPlayer(player, otherPlayer)) {
        return player;
      }
    }
    return {
      ...player,
      wins: player.wins + 1
    }
  });
}

function makeMove(
  players: Player[],
  playerId: string,
  move: number
) {
  const newPlayers = players.map(player => {
    const newPlayer = {
      ...player
    };
    if (player.id !== playerId) {
      return newPlayer;
    }
    if (player.move !== MOVE_NONE) {
      console.warn(`${ERR_ALREADY_MOVED}: ${player.id}`);
      return newPlayer;
    }
    newPlayer.move = move;
    return newPlayer;
  })
  return incrementWinnerWins(newPlayers);
}

export function reduceState(
  state: State,
  action: Action
) {
  switch (action.type) {
    case 'INITIALISE': {
      validateState(action.state)
      return action.state
    }
    case "MOVE": {
      return {
        ...state,
        players: makeMove(state.players, action.playerId, action.move)
      }
    }
  }
}
