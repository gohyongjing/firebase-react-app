import { useSelect } from "./useSelect";
import { useCallback, useEffect } from "react";

export function useAsyncSelect<T>(
  fetchOptions: () => Promise<T[]>,
) {
  const {
    selected,
    options,
    dispatch
  } = useSelect<T>([]);

  useEffect(() => {
    fetchOptions().then(newOptions => {
      dispatch({
        type:'SET_OPTIONS',
        newOptions 
      })
    })
    console.log('rerender')
  }, [fetchOptions, dispatch])

  const refetchOptions = useCallback(async (
    isEqual?: (option1: T, option2: T) => boolean
  ) => {
    const newOptions = await fetchOptions();
    dispatch({
      type: 'SET_OPTIONS',
      newOptions,
      isEqual
    });
  }, [fetchOptions, dispatch]);

  const selectOption = useCallback((predicate: (option: T) => boolean) => {
    dispatch(
      {
        type: 'SELECT',
        predicate
      }
    );
  }, [dispatch])

  const addOption = useCallback(async (
    addOption: () => Promise<T>
  ) => {
    const newOption = await addOption();
    dispatch(
      {
        type: 'ADD',
        newOption
      }
    );
  }, [dispatch]);

  const updateOption = useCallback(async (
    updateOption: () => Promise<T>
  ) => {
    const newOption = await updateOption();
    dispatch({
      type: 'UPDATE',
      newOption
    })
  }, [dispatch])

  const deleteOption = useCallback(async (
    deleteOption: () => Promise<void>
  ) => {
    await deleteOption();
    dispatch({
      type: 'DELETE'
    })
  }, [dispatch])

  return {
    selected,
    options,
    refetchOptions,
    selectOption,
    addOption,
    updateOption,
    deleteOption
  }
}
