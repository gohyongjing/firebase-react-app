import { useReducer } from "react";

const NO_SELECTED_OPTION = -1;

type OptionsState<T> = {
  selected: number
  options: T[]
}

/**
 * Actions to take for the OptionsReducer.
 * 
 * SET_OPTIONS
 * Replaces the list of options with a new list.
 * Optionally takes in isEqual function to maintain the previously selected item.
 * Defaults to javascript's strict equality check.
 * 
 * SELECT
 * Selects an option based on the given predicate.
 * 
 * ADD
 * Adds the given option to the end of the list of options.
 * 
 * UPDATE
 * Replaces the currently selected option with the given option.
 * 
 * DELETE
 * Deletes the currently selected option.
 */
type OptionsReducerAction<T> = {
  type: 'SET_OPTIONS'
  newOptions: T[]
  isEqual?: (option1: T, option2: T) => boolean
} | {
  type: 'SELECT'
  predicate: (option: T) => boolean
} | {
  type: 'ADD' | 'UPDATE'
  newOption: T
} | {
  type: 'DELETE'
}

/**
 * Reduces the state of the options based on an action.
 * When dispatching with the SET_OPTIONS action, 
 *
 * @param state Previous state of options.
 * @param action Action to take.
 * @returns New state after taking action.
 */
function optionsReducer<T>(
  state: OptionsState<T>,
  action: OptionsReducerAction<T>
) {
  const prevOption: T | undefined = state.options[state.selected];
  switch (action.type) {
    case 'SET_OPTIONS': {
      const newOptions = action.newOptions;
      const newIndex = newOptions.findIndex(o => (
        action.isEqual
          ? action.isEqual(o, prevOption)
          : o === prevOption
      ))
      return {
        selected: newIndex,
        options: newOptions
      }
    }
    case 'SELECT': {
      const newIndex = state.options.findIndex(o => action.predicate(o));
      return {
        selected: newIndex,
        options: state.options
      };
    }
    case 'ADD': {
      const newOptions = [
        ...state.options,
        action.newOption
      ]
      return {
        selected: state.selected,
        options: newOptions
      }
    }
    case 'UPDATE': {
      const newOptions = [...state.options];
      newOptions[state.selected] = action.newOption;
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
        selected: NO_SELECTED_OPTION,
        options: newOptions
      };
    }
  }
}

/**
 * Manages the selection of options from a list.
 *
 * @param initialOptions Initial list of options.
 * @returns SelectHook.
 */
export function useSelect<T>(
  initialOptions: T[],
) {

  const [{ selected, options }, dispatch] = useReducer(
    optionsReducer<T>,
    {
      selected: NO_SELECTED_OPTION,
      options: initialOptions
    }
  );

  return { selected, options, dispatch };
}
