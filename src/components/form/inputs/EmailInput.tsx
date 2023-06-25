import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function EmailInput(props: Props) {
  const finalProps = {
    ...props,
    type: 'email',
    placeholder: props.placeholder
      ? props.placeholder
      : 'email',
    autoComplete: props.autoComplete
      ? props.autoComplete
      : 'username'
  };

  return (
    <input
      {...finalProps}
    />
  );
}
