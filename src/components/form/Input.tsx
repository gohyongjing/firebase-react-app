import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { EmailInput, PasswordInput, TextInput } from "./inputs";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

const defaultClassName = "rounded-lg p-1 font-semibold border-2 text-primary-1 bg-background-200 border-primary-1 dark:border-primary-3 dark:bg-background-950 dark:text-background-100";

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

export function Input({ type, ...props }: Props) {
  const SpecificInput = getSpecificInputComponent(type);

  return (
    <SpecificInput
      { ...mergeClassNameIntoProps(props, defaultClassName) }
    />
  );
}
