import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function PasswordInput(props: Props) {
  const finalProps = {
    ...props,
    type: 'password',
    placeholder: props.placeholder
      ? props.placeholder
      : 'password',
    autoComplete: props.autoComplete
      ? props.autoComplete
      : 'current-password'
  };

  return (
    <input
      {...finalProps}
    />
  );
}
