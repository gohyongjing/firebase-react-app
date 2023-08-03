import { CircleIcon } from "@radix-ui/react-icons";
import { AccessibleIcon } from "lib/radixUi";

export function NewNotificationIndicator() {
  return (
    <div className="relative left-2 bottom-2 w-0 h-0">
      <AccessibleIcon.Root label='New Notifications'>
        <CircleIcon className="absolute h-3 w-3 rounded-full bg-danger-500 text-danger-500" />
      </AccessibleIcon.Root>
    </div>
  );
}