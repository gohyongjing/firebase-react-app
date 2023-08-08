import { AccessibleIcon, CrumpledPaperIcon, FileIcon, ScissorsIcon } from "lib/radixUi";

export function RockPaperScissorsIcon() {
  return(
    <AccessibleIcon.Root
      label='Rock Paper Scissors'
    >
      <div className="w-full h-full flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <ScissorsIcon/>
          <FileIcon />
        </div>
          <CrumpledPaperIcon />
      </div>
    </AccessibleIcon.Root>
  );
}
