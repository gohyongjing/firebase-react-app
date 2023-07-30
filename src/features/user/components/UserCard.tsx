import { Button } from "components/form";
import { User } from "../types";
import {  MouseEventHandler } from "react";

type Props = {
  user: User
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function UserCard({
  user,
  onClick,
}: Props) {
  return (
    <Button
      onClick={onClick}
    >
      { user.userName }
    </Button>
  );
}