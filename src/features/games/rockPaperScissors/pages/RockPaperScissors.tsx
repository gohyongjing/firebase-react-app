import { ButtonLink } from "components/utility";
import { PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY } from "routes";

export function RockPaperScissors() {
  return (
    <div>
      <ButtonLink
        to={PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY}
      >
        Lobby
      </ButtonLink>
    </div>
  );
}
