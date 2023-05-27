import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import useStateRef from "./useStateRef";

type Resolver = <Value>(
  getValue: () => Promise<Value>,
  onDebounce?: () => (Value | undefined)
) => Promise<Value | undefined>;

interface PromiseHook {
  resolve: Resolver,
  isLoading: boolean,
  setIsLoading: (newState: boolean) => void,
  isLoadingRef: MutableRefObject<boolean>,
  error: unknown,
  setError: Dispatch<SetStateAction<unknown>>
};

/**
 * Promise hook.
 * Wraps around a promise to make sure that only one async operation
 * runs at a time and catches errors.
 * 
 * @returns PromiseHook.
 */
export default function usePromise(): PromiseHook {
  const [isLoading, setIsLoading, isLoadingRef] = useStateRef(false);
  const [error, setError] = useState<unknown>(null);

  /**
   * Retrieves a value using an async function.
   * Does not run the function if another async function is already running.
   *
   * @param getValue Async function to retrieve a value.
   * @returns The value returned by the async function if successful, undefined otherwise.
   */
  async function resolve<Value>(
    getValue: () => Promise<Value>,
    onDebounce: (() => Value | undefined) = (() => undefined)
  ) {
    if (isLoadingRef.current) {
      return onDebounce();
    }
    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);
    return getValue()
      .catch((e: unknown) => {
        setError(e);
        return undefined;
      })
      .finally(() => {
        isLoadingRef.current = false;
        setIsLoading(false);
      });
  }

  return { resolve, isLoading, setIsLoading, isLoadingRef, error, setError };
}