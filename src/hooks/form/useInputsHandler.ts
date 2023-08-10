import { useCallback, useState } from "react";

/**
 * Stores and manages the state of multiple fields.
 *
 * @param initialValues Initial values of the input fields.
 */
export function useInputsHandler<T extends object>(
  initialValues: T,
) {
  const [values, setValues] = useState(initialValues);

  const setValue = useCallback(<K extends keyof T>(
    key: K,
    value: T[K]
  ) => {
    setValues(oldValues => {
      return {
        ...oldValues,
        [key]: value
      };
    })
  }, [])

  return {
    values,
    setValue,
    setValues
  }
}
