import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from "react";
import { isFunction } from "../../utility/typePredicates";

export type StateRefHook<S> = [
  S,
  Dispatch<SetStateAction<S>>,
  MutableRefObject<S>
]

/**
 * A value that has properties of a state and a ref.
 * When updating the state, the ref is updated instantly and state changes are queued for the next render.
 *
 * @param initialState Initial state.
 * @returns StateRefHook.
 */
export default function useStateRef<S>(
  initialState: S | (() => S)
): StateRefHook<S> {
  let temp: S;
  if (isFunction(initialState)) {
    temp = initialState();
  } else {
    temp = initialState;
  }
  const stateRef = useRef<S>(temp);
  const [state, _setState] = useState<S>(initialState);

  /**
   * Updates the ref and state.
   * 
   * @param setStateAction The new state or a function to update the state.
   */
  const setState = useCallback((setStateAction: SetStateAction<S>) => {
    if (isFunction(setStateAction)) {
      stateRef.current = setStateAction(stateRef.current);
    } else {
      stateRef.current = setStateAction;
    }
    _setState(setStateAction);
  }, []);

  return [state, setState, stateRef];
}
