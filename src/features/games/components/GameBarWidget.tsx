import { Heading } from "components/utility";
import { RockPaperScissorsButtonLink } from "..";

export function GameBarWidget() {
  return(
    <div>
      <Heading>
        Games
      </Heading>
      <div className="flex h-24">
        <RockPaperScissorsButtonLink />
      </div>
    </div>
  );
}
