import { Button } from "components/form";
import { User, getUsersByIndex } from "features/user";
import { SelectUser } from "features/user/components";
import { useAsyncSelect } from "hooks/useAsyncSelect";
import { Collapsible, MinusIcon, PlusIcon } from "lib/radixUi";
import { useCallback, useState } from "react";
import { WithId } from "utility/model";

function getUsers() {
  return getUsersByIndex(0, 10);
}

export function AddFriendCollapsible() {
  const [isOpen, setIsOpen] = useState(false);
  const { options: users,  selectOption } = useAsyncSelect(
    getUsers
  );

  const selectUser = useCallback((user: WithId<User>) => {
    selectOption(u => u.id === user.id);
  }, [selectOption])

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
        <SelectUser
          users={users}
          selectUser={selectUser}
        />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
