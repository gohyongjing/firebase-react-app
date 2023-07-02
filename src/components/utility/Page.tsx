import { MainNav } from "components/nav";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export function Page({ children }: Props) {
  return (
    <>
      <MainNav />
      { children }
    </>
  );
}
