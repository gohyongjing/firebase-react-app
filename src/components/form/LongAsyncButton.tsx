import { Ref, forwardRef } from "react";
import { AsyncButton, AsyncButtonProps } from ".";
import { mergeClassNameIntoProps } from "utility/mergeClassNameIntoProps";

const defaultClassName = "w-full sm:w-1/2 m-2";

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
