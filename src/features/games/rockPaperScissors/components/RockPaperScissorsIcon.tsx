import { AccessibleIcon, CrumpledPaperIcon, FileIcon, ScissorsIcon } from "lib/radixUi";

export function RockPaperScissorsIcon() {
  return(
    <AccessibleIcon.Root
      label='Rock Paper Scissors'
    >
      <div className="flex flex-col">
        <div className="flex">
          <ScissorsIcon/>
          <FileIcon />
        </div>
          <CrumpledPaperIcon />
      </div>
    </AccessibleIcon.Root>
  );
}
