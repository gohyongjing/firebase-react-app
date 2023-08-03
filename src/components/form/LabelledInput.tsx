import { Label } from "lib/radixUi";
import { InputHTMLAttributes } from "react";
import { Input } from "./Input";

type Props = InputHTMLAttributes<HTMLInputElement>
  & { 
    id: string,
    labelText: string
  } 

export function LabelledInput({
  labelText,
  ...props
}: Props) {
  return (
    <Label.Root 
      htmlFor={props.id}
      className="flex flex-col gap-1 text-primary-1 dark:text-background-50"
    >
      <b>
       { labelText }
      </b>
      <Input
        { ...props }
      />
    </Label.Root>
  );
}
