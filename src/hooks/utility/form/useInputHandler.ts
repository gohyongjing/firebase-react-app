import { ChangeEvent, useCallback, useState } from "react";

type InputChangeHandler = (e: ChangeEvent<HTMLInputElement>, oldValue: string) => string

export default function useInputHandler(
  initialValue: string,
  onChange: InputChangeHandler = (e => e.target.value)
) {
  const [value, setValue] = useState(initialValue);

  const inputOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(oldValue => onChange(e, oldValue));
  }, [onChange]);

  return {
    value,
    setValue,
    onChange: inputOnChange
  }
}
