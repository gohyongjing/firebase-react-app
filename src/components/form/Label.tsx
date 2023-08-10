import { Label as _Label } from "lib/radixUi";
import { ReactNode } from "react";

type Props = { 
  htmlFor: string,
  label: string,
  children: ReactNode
} 

export function Label({
  htmlFor,
  label,
  children
}: Props) {
  return (
    <_Label.Root 
      htmlFor={htmlFor}
      className="flex flex-col gap-1 wide text-primary-1 dark:text-background-50"
    >
      <b>
        { label }
      </b>
      { children }
    </_Label.Root>
  );
}
