import { BackToDashboardButton, Heading } from "components/utility";
import { Separator } from "lib/radixUi";

type Props = {
  children: string
}

export function PageHeading({
  children
}: Props) {
  return (
    <>
      <div className="m-2 flex gap-2">
        <BackToDashboardButton />
        <Heading>
          { children }
        </Heading>
      </div>
      <Separator.Root
        className="h-px m-2 bg-background-200 dark:bg-background-700"
      />
    </>
  );
}
