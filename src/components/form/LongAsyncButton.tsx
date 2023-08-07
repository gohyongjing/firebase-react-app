import { Ref, forwardRef } from "react";
import { AsyncButton, AsyncButtonProps } from ".";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

const defaultClassName = "m-2 w-full sm:w-1/2 md:w-1/4";

export const LongAsyncButton = forwardRef((
  {
    ...props
  }: AsyncButtonProps,
  forwardedRef: Ref<HTMLButtonElement>
) => {
  return (
    <AsyncButton
      { ...mergeClassNameIntoProps(props, defaultClassName) }
      ref={forwardedRef}
    >
    </AsyncButton>
  );
});
