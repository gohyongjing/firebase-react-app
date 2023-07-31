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
      className="py-2 flex flex-col"
    >
      <b>
        { user.userName }
      </b>
      { user.id }
    </div>
  );
}