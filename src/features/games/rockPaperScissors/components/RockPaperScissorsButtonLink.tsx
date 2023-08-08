import { Link } from "react-router-dom";
import { RockPaperScissorsIcon } from ".";
import { ButtonLink } from "features/auth/components/utility/ButtonLink";

export function RockPaperScissorsButtonLink() {
  return (
    <div className="flex flex-col items-center">
      <ButtonLink
        className="h-24 sm:h-36 w-24 sm:w-36"
        href=""
      >
        <RockPaperScissorsIcon />     
      </ButtonLink>
      <Link
        to=""
        className="hover:underline"
      >
        <b>
          Rock Paper Scissors
        </b>
      </Link>
    </div>
  );
}
