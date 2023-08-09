import { Link } from "react-router-dom";
import { RockPaperScissorsIcon } from ".";
import { ButtonLink } from "components/utility";
import { PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY } from "routes";

export function RockPaperScissorsButtonLink() {
  return (
    <div className="flex flex-col items-center">
      <ButtonLink
        className="h-24 sm:h-36 w-24 sm:w-36"
        to={PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY}
      >
        <RockPaperScissorsIcon />     
      </ButtonLink>
      <Link
        to={PATH_GAMES_ROCK_PAPER_SCISSORS_LOBBY}
        className="text-clickable"
      >
        <b className="text-background-50">
          Rock Paper Scissors
        </b>
      </Link>
    </div>
  );
}
