import { Label } from "./Label";
import { Select, SelectProps } from "./Select";

type Props = SelectProps
  & { 
    id: string,
    label: string
  } 

export function Labelledselect({
  label,
  ...props
}: Props) {
  return (
    <Label
      htmlFor={props.id}
      label={label}
    >
      <Select
        { ...props }
      />
    </Label>
  );
}
