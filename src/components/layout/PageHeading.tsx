import { BackToDashboardButton } from "components/utility/BackToDashboardButton";
import { Separator } from "lib/radixUi";

type Props = {
  heading: string
}

export function PageHeading({
  heading
}: Props) {
  return (
    <>
      <div className="m-2 flex gap-2">
        <BackToDashboardButton />
        <h1 className="text-xl">
          <b>
            { heading }
          </b>
        </h1>
      </div>
      <Separator.Root
        className="h-px m-2 bg-background-200 dark:bg-background-700"
      />
    </>
  );
}
