import { CircleIcon } from "@radix-ui/react-icons";
import { AccessibleIcon } from "lib/radixUi";

export function NewNotificationIndicator() {
  return (
    <div className="relative right-1 top-1">
      <AccessibleIcon.Root label='New Notifications'>
        <CircleIcon className="absolute h-2 w-2 rounded-full bg-danger-500 text-danger-500" />
      </AccessibleIcon.Root>
    </div>
  );
}