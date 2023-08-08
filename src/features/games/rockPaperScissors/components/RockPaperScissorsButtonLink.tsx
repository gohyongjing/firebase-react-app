import { Button } from "components/form";
import { RockPaperScissorsIcon } from ".";

export function RockPaperScissorsButtonLink() {
  return (
    <Button className="w-1/4 sm:w-48 h-full">
      <RockPaperScissorsIcon />
    </Button>
  );
}
