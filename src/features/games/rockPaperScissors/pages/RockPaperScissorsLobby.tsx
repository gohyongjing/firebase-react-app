import { Page } from "components/layout";
import { ButtonLink } from "components/utility";
import { PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY_CREATE } from "routes";

export function RockPaperScissorsLobby() {
  return (
    <Page>
      <ButtonLink
        to={PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY_CREATE}
      >
        Create Room
      </ButtonLink>
    </Page>
  );
}
