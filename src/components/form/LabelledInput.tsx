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
    <Label.Root htmlFor={props.id}>
      { labelText }
      <Input
        { ...props }
      />
    </Label.Root>
  );
}
