import { ButtonHTMLAttributes, MouseEvent, useCallback } from "react"
import { Button } from "./Button"
import { usePromise } from "hooks"

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  onClick: (e: MouseEvent<HTMLButtonElement>) => Promise<unknown>
}

export function AsyncButton({
  onClick,
  disabled,
  ...props
}: Props) {
  const {resolve, isLoading } = usePromise();

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    resolve(() => onClick(e));
  }, [onClick, resolve])

  console.log('async button rerender')

  return (
    <Button
      { ...props }
      onClick={handleClick}
      disabled={ disabled || isLoading }
    />
  )
}
