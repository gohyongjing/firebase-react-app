import { ButtonHTMLAttributes } from "react";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const defaultClassName = 'bg-primary-1 border-primary-1 text-slate-50 dark:bg-primary-1 dark:text-primary-3 dark:border-primary-3 border-2 rounded-lg px-2 py-1';
export function Button(props: Props) {
  
  return (
    <button
      { ...mergeClassNameIntoProps(props, defaultClassName) }
    >
      <b>
        {props.children}
      </b>
    </button>
  );
}
