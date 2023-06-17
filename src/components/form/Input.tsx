import { InputHTMLAttributes } from "react";
import PasswordInput from "./inputs/PasswordInput";
import EmailInput from "./inputs/EmailInput";

export type InputType = 'email' | 'password';

function getSpecificInputComponent(type: InputType) {
  switch(type) {
    case 'email':
      return EmailInput;
    case 'password':
      return PasswordInput;
  }
}

type Props = InputHTMLAttributes<HTMLInputElement>
  & {
    type: InputType,
  }

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
