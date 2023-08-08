import { AccessibleIcon, CrumpledPaperIcon, FileIcon, ScissorsIcon } from "lib/radixUi";

export function RockPaperScissorsIcon() {
  return(
    <AccessibleIcon.Root
      label='Rock Paper Scissors'
    >
      <div className="w-full h-full flex flex-col justify-around items-stretch gap-1">
        <div className="flex w-full h-1/2 gap-1 justify-around">
          <ScissorsIcon className="h-full w-full"/>
          <FileIcon className="h-full w-full"/>
        </div>
        <div className="w-full h-1/2">
          <CrumpledPaperIcon className="w-full h-full"/>
        </div>
      </div>
    </AccessibleIcon.Root>
  );
}
