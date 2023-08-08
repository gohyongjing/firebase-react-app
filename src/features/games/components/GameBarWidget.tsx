import { Heading } from "components/utility";
import { RockPaperScissorsButtonLink } from "..";

export function GameBarWidget() {
  return(
    <div className="flex flex-col gap-1 p-4 rounded-xl bg-background-300 dark:bg-background-800">
      <Heading>
        Games
      </Heading>
      <div className="flex ">
        <RockPaperScissorsButtonLink />
      </div>
    </div>
  );
}
