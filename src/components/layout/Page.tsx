import { MainNav } from "components/nav";
import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

export function Page({ children }: Props) {
  return (
    <div
      className="bg-slate-50 text-primary-1 dark:bg-slate-900 dark:text-slate-200 min-h-screen flex flex-col"
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
