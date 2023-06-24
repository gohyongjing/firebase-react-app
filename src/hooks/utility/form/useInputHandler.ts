import { ChangeEvent, useCallback, useState } from "react";

type InputChangeHandler = (e: ChangeEvent<HTMLInputElement>, oldValue: string) => string

/**
 * Stores and manages the state of an input field.
 *
 * @param initialValue Initial value of the input field.
 * @param onChange Handler for the event  where the input field changes.
 * @returns InputHandlerHook.
 */
export default function useInputHandler(
  initialValue: string,
  onChange: InputChangeHandler = (e => e.target.value)
) {
  const [value, setValue] = useState(initialValue);

  const inputOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(oldValue => onChange(e, oldValue));
  }, [onChange]);

  const resetValue = useCallback(
    () => setValue(''), [])

  return {
    value,
    setValue,
    resetValue,
    onChange: inputOnChange
  }
}
