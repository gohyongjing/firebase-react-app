import { useCallback, useReducer } from "react";

type OptionsState<T> = {
  selected: number
  options: T[]
}

type OptionsReducerAction<T> = {
  type: 'SET_OPTIONS'
  payload: T[]
} | {
  type: 'SELECT'
  payload: (option: T) => boolean
} | {
  type: 'ADD' | 'UPDATE'
  payload: T
} | {
  type: 'DELETE'
}

/**
 * Handles the selection of options from a list.
 *
 * @param initialOptions Initial list of options.
 * @param isEqual Function to compare if 2 options are equal.
 * @returns SelectHandlerHook.
 */
export function useSelectHandler<T>(
  initialOptions: T[],
  isEqual: (option1: T, option2: T) => boolean
) {

  /**
   * Reducers the state of the options based on an action.
   */
  const optionsReducer = useCallback((
    state: OptionsState<T>,
    action: OptionsReducerAction<T>
  ) => {
    const prevOption: T | undefined = state.options[state.selected];
    switch (action.type) {
      case 'SET_OPTIONS': {
        const newOptions = action.payload;
        const newIndex = newOptions.findIndex(o => isEqual(o, prevOption));
        return {
          selected: newIndex,
          options: newOptions
        }
      }
      case 'SELECT': {
        const newIndex = state.options.findIndex(o => action.payload(o));
        return {
          selected: newIndex,
          options: state.options
        };
      }
      case 'ADD': {
        const newOptions = [
          ...state.options,
          action.payload
        ]
        return {
          selected: state.selected,
          options: newOptions
        }
      }
      case 'UPDATE': {
        const newOptions = [...state.options];
        newOptions[state.selected] = action.payload;
        return {
          selected: state.selected,
          options: newOptions
        }
      }
      case 'DELETE': {
        const newOptions = [
          ...state.options.slice(0, state.selected),
          ...state.options.slice(state.selected + 1)
        ]
        return {
          selected: -1,
          options: newOptions
        };
      }
    }
  }, [isEqual]);

  const [{ selected, options }, dispatch] = useReducer(
    optionsReducer,
    {
      selected: -1,
      options: initialOptions
    }
  );

  return { selected, options, dispatch};
}
