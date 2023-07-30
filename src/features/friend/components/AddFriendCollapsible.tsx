import { Button } from "components/form";
// import { User } from "features/user";
// import { useSelectHandler } from "hooks/form/useSelectHandler";
import { Collapsible, MinusIcon, PlusIcon } from "lib/radixUi";
import { useState } from "react";
// import { WithId } from "utility/model";

export function AddFriendCollapsible() {
  const [isOpen, setIsOpen] = useState(false);
  // const [users, setUsers] = useSelectHandler(
  //   (user1: WithId<User>, user2: WithId<User>) => user1.id === user2.id
  // );

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
        
        content
      </Collapsible.Content>
    </Collapsible.Root>
  );
}