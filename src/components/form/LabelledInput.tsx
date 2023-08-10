import { InputHTMLAttributes } from "react";
import { Input } from "./Input";
import { Label } from "./Label";

type Props = InputHTMLAttributes<HTMLInputElement>
  & { 
    id: string,
    label: string
  } 

export function LabelledInput({
  label,
  ...props
}: Props) {
  return (
    <Label
      htmlFor={props.id}
      label={label}
    >
      <Input
        { ...props }
      />
    </Label>
  );
}
