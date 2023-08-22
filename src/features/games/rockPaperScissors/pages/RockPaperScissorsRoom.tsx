import { Center, Page } from "components/layout";
import { ButtonLink } from "components/utility";
import { useParams } from "lib/reactRouterDom";
import { useEffect, useState } from "react";
import { PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY_CREATE } from "routes";
import { Room } from "..";
import { RockPaperScissorsRoomDetails } from "../components/RockPaperScissorsRoomDetails";
import { WithId } from "utility/model";
import { getRoomById } from "..";

export function RockPaperScissorsRoom() {
  const { roomId } = useParams();
  const [room, setRoom] = useState<WithId<Room> | undefined>(undefined);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    getRoomById(roomId).then(room => {
      if (room) {
        setRoom(room);
      }
    })
  }, [roomId]);

  console.log('room rerender')

  return (
    <Page>
      <Center className="self-center wide-2 border-4 border-background-800 rounded-lg p-2 items-start">
        {
          !room
            ? <></>
            : <>
              <RockPaperScissorsRoomDetails
                room={room}
              />
              <ButtonLink
                className="self-center"
                to={PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY_CREATE}
              >
                Start
              </ButtonLink>           
            </>
        }
      </Center>
    </Page>
  );
}
