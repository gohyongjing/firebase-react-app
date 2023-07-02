import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: Props) {
  if (props.className !== undefined) {
    props.className = ''
  }
  
  return (
    <button
      { ...props }
      className="bg-primary-1 text-primary-2
        rounded-lg py-1 px-2
        "
    />
  );
}
