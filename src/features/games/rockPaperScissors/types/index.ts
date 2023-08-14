export type RoomSettings = {
  roomName: string
  visibility: 'public' | 'friends' | 'private'
  hostId: string
}

export type GameSettings = {
  roundsToWin: number
}

export type Settings = RoomSettings & GameSettings

export type SettingsMeta<T> = {
  [k in keyof T]: {
    label: string
    description?: string
    category: 'room' | 'game'
  } & (
    {
      inputType: 'text' | 'number'
    } | {
      inputType: 'select'
      options: (T[k])[]
    }
  )
}

export type Room = Settings & {
  status: 'WAITING' | 'IN_PROGRESS' | 'ENDED'
}

export type Player = {
  id: string
  wins: number
  move: number
}

export type State = {
  players: Player[]
  settings: GameSettings
}

export type Action = {
  type: 'INITIALISE'
  state: State
} | {
  type: 'MOVE'
  playerId: string
  move: number
}
