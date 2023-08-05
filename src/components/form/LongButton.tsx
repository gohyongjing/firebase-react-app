import {  ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from ".";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

const defaultClassName = "w-full sm:w-1/2 m-2";

export const LongButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((
  {
    ...props
  },
  forwardedRef
) => {
  return (
    <Button
      { ...mergeClassNameIntoProps(props, defaultClassName) }
      ref={forwardedRef}
    >
    </Button>
  );
});
