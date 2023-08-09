import { Settings, SettingsMeta } from "..";

export function getSettingsMeta(): SettingsMeta<Settings> {
  return ({
    roomName: {
      label: 'Room Name',
      category: 'room',
      inputType: 'text',
    },
    visibility: {
      label: 'Room Visibility',
      description: 'Visibility of the room to other players.\nPublic: everyone can be join\nFriends: Only friends or invited players ccan join\nPrivate: Only invited players can join',
      category: 'room',
      inputType: 'select',
    },
    roundsToWin: {
      label: 'Rounds to Win',
      description: 'Number of round victories needed to win the game',
      category: 'game',
      inputType: 'number',
    }
  });
}
