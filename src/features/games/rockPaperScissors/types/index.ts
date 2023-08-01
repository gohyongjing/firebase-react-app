
export type Settings = {
  roundsToWin: number
}

export type Player = {
  id: string
  wins: number
  move: number
}

export type State = {
  players: Player[]
  settings: Settings
}

export type Action = {
  type: 'INITIALISE'
  state: State
} | {
  type: 'MOVE'
  playerId: string
  move: number
}
