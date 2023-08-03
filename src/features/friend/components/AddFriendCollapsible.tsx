import { Button } from "components/form";
import { Collapsible, MinusIcon, PlusIcon } from "lib/radixUi";
import { useState } from "react";
import { AddFriendUsersList } from ".";

export function AddFriendCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible.Root>
      <div className="flex justify-between">
        <b>
          Friends
        </b>
        <Collapsible.Trigger asChild>
          <Button onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center gap-1">
              {
                isOpen
                  ? <MinusIcon />
                  : <PlusIcon />
              }
              Add Friend
            </div>
          </Button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content>
        <AddFriendUsersList />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
