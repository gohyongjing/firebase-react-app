import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: Props) {
  
  return (
    <button
      { ...props }
      className={"bg-primary-1 text-primary-2 border-primary-2 border-2 rounded-lg py-1 px-2 " + props.className}
    >
      <b>
        {props.children}
      </b>
    </button>
  );
}
