import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function NumberInput(props: Props) {
  const finalProps = {
    ...props,
    type: 'number',
  };

  return (
    <input
      {...finalProps}
    />
  );
}
