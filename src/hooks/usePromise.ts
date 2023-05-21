import { useEffect, useState } from "react";

type Setter<Value> = () => Promise<Value>;
type Updater<Value> = (setter: Setter<Value>) => void;

/**
 * Use Promises in React.
 * Comes with loading and error states, as well as checks to ensure that
 * the last call to update() is not affected by earlier calls due to race conditions.
 *
 * @param initialValue Initial resolved value.
 * @returns Promise Hook.
 */
export default function usePromise<Value>(
  initialValue: Value
): [Value, Updater<Value>, boolean, { code: string }] {
  
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ code: string }>({ code: '' });
  const initialSetter: Setter<Value> = (() => Promise.resolve(initialValue));
  const [setter, setSetter] = useState<Setter<Value>>(() => initialSetter);

  function updateValue(setter: Setter<Value>) {
    // this ensures that setter function changes everytime updateValue() is called, triggering the useEffect()
    setSetter(() => (() => setter()));
  }

  /*
    This useEffect is used to resolve race conditions.
    If updateValue() is called multiple times, the final value would be
    the one returned by the last method called.
  */
  useEffect(() => {
    let ignoreResult = false;
    setError({ code: '' });
    setIsLoading(true);
    setter()
      .then(newValue => {
        if (!ignoreResult) {
          setValue(newValue);
        }
      })
      .catch(e => {
        if (!ignoreResult) {
          setError(e);
        }
      })
      .finally(() => {
        if (!ignoreResult) {
          setIsLoading(false);
        }
      });
    
    return () => { ignoreResult = true };
  }, [setter])

  return [value, updateValue, isLoading, error];
}