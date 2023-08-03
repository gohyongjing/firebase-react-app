import { MainNav } from "components/nav";
import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

export function Page({ children }: Props) {
  return (
    <div
      className="bg-background-50 text-primary-1 dark:bg-background-900 dark:text-background-200 min-h-screen flex flex-col"
    >
      <MainNav />
      <div
        className="p-2 flex flex-col"
      >
        { children }
      </div>
    </div>
  );
}
