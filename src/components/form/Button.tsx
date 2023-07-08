import { ButtonHTMLAttributes } from "react";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const defaultClassName = 'bg-primary-2 border-primary-2 text-white dark:bg-primary-1 dark:text-primary-3 dark:border-primary-3 border-2 rounded-lg p-2';
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
