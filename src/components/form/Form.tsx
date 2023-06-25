import { FormHTMLAttributes } from "react";

type Props = FormHTMLAttributes<HTMLFormElement>

export function Form(props: Props) {
  return (
    <form
      {...props}
    />
  );
}