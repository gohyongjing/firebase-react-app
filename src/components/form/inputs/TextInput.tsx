import { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export default function TextInput(props: Props) {
  const finalProps = {
    ...props,
    type: 'text',
  };

  return (
    <input
      {...finalProps}
    />
  );
}
