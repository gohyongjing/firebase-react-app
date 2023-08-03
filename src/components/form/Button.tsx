import {  ButtonHTMLAttributes, forwardRef } from "react";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

const defaultClassName = 'border-primary-1 text-primary-1 dark:bg-primary-1 dark:text-primary-3 dark:border-primary-3 border-2 rounded-lg px-2 py-1';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((
  {
    children,
    ...props
  },
  forwardedRef
) => {
  return (
    <button
      { ...mergeClassNameIntoProps(props, defaultClassName) }
      ref={forwardedRef}
    >
      <b>
        {children}
      </b>
    </button>
  );
});
