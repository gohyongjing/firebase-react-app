import { useEffect, useState } from "react";

/**
 * Use Promises in React.
 * Comes with loading and error states, as well as checks to ensure that
 * the last call to update() is not affected by earlier calls due to race conditions.
 *
 * @param initialValue Initial resolved value.
 * @returns Updated value, updater function, isLoading and error.
 */
export default function usePromise<Value>(initialValue: Value) {
  type Updater = (value: Value) => Promise<Value>;
  
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const initialUpdater: Updater = (v => Promise.resolve(v));
  const [updater, setUpdater] = useState<Updater>(initialUpdater);

  function updateValue(updater: Updater) {
    // this ensures that updater function changes everytime updateValue() is called, triggering the useEffect()
    setUpdater((v: Value) => updater(v));
  }

  /*
    This useEffect is used to resolve race conditions.
    If updateValue() is called multiple times, only the last called would update the value.
  */
  useEffect(() => {
    let ignoreResult = false;
    setError('');
    setIsLoading(true);
    updater(value)
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
  }, [updater])

  return [value, updateValue, isLoading, error];
}