import { ButtonHTMLAttributes, Ref, forwardRef, useCallback } from "react"
import { Button } from "./Button"
import { usePromise } from "hooks"

export type AsyncButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => Promise<unknown>
}

export const AsyncButton = forwardRef((
  props: AsyncButtonProps,
  forwardedRef: Ref<HTMLButtonElement>
) => {
  const onClick = props.onClick;
  const { resolve, isLoading } = usePromise();

  const handleClick = useCallback(() => {
    return resolve(onClick);
  }, [onClick, resolve])

  return (
    <Button
      { ...props }
      onClick={handleClick}
      disabled={ props.disabled || isLoading }
      ref={forwardedRef}
    />
  )
});
