import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";

type Resolver = <Value>(getValue: () => Promise<Value>) => Promise<Value | null>;

type PromiseHook = [
  Resolver,
  MutableRefObject<boolean>,
  unknown,
  Dispatch<SetStateAction<unknown>>
];

export default function usePromise() : PromiseHook {
  const isLoadingRef = useRef(false);
  const [error, setError] = useState<unknown>(null);

  /**
   * Retrieves a value using an async function.
   * Does not run the function if another async function is already running.
   *
   * @param getValue Async function to retrieve a value.
   * @returns The value returned by the async function if successful, null otherwise.
   */
  async function resolve<Value>(getValue: () => Promise<Value>) {
    if (!(isLoadingRef.current)) {
      isLoadingRef.current = true;
      setError(null);
      return getValue()
        .catch((e: unknown) => {
          setError(e);
          return null;
        })
        .finally(() => {
          isLoadingRef.current = false;
        });
    }
    return null;
  }

  return [resolve, isLoadingRef, error, setError];
}