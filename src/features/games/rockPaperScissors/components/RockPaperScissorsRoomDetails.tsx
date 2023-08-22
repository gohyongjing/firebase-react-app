import { Heading } from "components/utility";
import { Room } from "..";
import { getSettingsMeta } from "../utility/getSettingsMeta";
import { WithId } from "utility/model";

const settingsMeta = getSettingsMeta();

type Props = {
  room: WithId<Room>
}

export function RockPaperScissorsRoomDetails({ room }: Props) {

  return (
    <div>
      {
        Object.keys(settingsMeta).map(key => {
          const settingsName = key as keyof typeof settingsMeta;
          const meta = settingsMeta[settingsName];
          switch (settingsName) {
            case 'roomName':
              return (
                <div
                  key={settingsName}
                  className="py-2"
                >
                  <Heading>
                    { room[settingsName] }
                  </Heading>
                </div>
              );
            default: {
              return (
                <div
                  key={settingsName}
                >
                  { `${meta.label}: ${room[settingsName]}` }
                </div>
              );
            }
          }
        })
      }
    </div>
  );
}
