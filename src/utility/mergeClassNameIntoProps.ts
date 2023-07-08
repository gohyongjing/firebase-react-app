import { twMerge } from "lib/tailwindMerge";

export function mergeClassNameIntoProps<T extends { className?: string }>(
  props: T,
  defaultClassName: string
) {
  return {
    ...props,
    className: twMerge(defaultClassName, props.className)
  }
}
