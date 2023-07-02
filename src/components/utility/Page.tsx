import { MainNav } from "components/nav";
import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export function Page({ children }: Props) {
  return (
    <div
      className="bg-slate-900 text-slate-200 min-h-screen"
    >
      <MainNav />
      <div
        className="p-2"
      >
        { children }
      </div>
    </div>
  );
}
