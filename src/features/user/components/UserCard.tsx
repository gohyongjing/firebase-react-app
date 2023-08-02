import { WithId } from "utility/model";
import { User } from "../types";

type Props = {
  user: WithId<User>
}

export function UserCard({
  user,
}: Props) {
  return (
    <div
      className="p-1 flex flex-col"
    >
      <b className="w-48 truncate sm:w-auto">
        { user.userName }
      </b>
      <div className="w-48 truncate sm:w-auto">
        { user.id }
      </div>
    </div>
  );
}