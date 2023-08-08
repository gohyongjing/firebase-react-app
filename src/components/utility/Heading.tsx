import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

export function Heading({ children }: Props) {
  return (
    <h1 className="text-xl">
      <b>
        { children }
      </b>
    </h1>
  );
}
