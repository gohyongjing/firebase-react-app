import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import PasswordInput from "./inputs/PasswordInput";
import EmailInput from "./inputs/EmailInput";
import TextInput from "./inputs/TextInput";

function getSpecificInputComponent(type: HTMLInputTypeAttribute | undefined) {
  switch(type) {
    case 'email':
      return EmailInput;
    case 'password':
      return PasswordInput;
    default:
      return TextInput;
  }
}

type Props = InputHTMLAttributes<HTMLInputElement>

export default function Input(props: Props) {
  const SpecificInput = getSpecificInputComponent(props.type);

  return (
    <SpecificInput
      {...{
        ...props,
        type: undefined
      }}
    />
  );
}
