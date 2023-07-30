import { useSyncCachedExternalStore } from "hooks"
import { useSelectHandler } from "./useSelectHandler";
import { useCallback } from "react";

type Props<T> = {
  fetchOptions: () => Promise<T[]>
  isEqual: (option1: T, option2: T) => boolean
}

export function useAsyncSelectHandler<T>({
  fetchOptions,
  isEqual
}: Props<T>) {
  const {
    data,
    fetchExternalStore,
  } = useSyncCachedExternalStore(fetchOptions);
  const initialOptions = data ?? [];
  const {
    selected,
    options,
    dispatch
  } = useSelectHandler(initialOptions, isEqual);

  const refetchOptions = useCallback(async () => {
    const newOptions = await fetchExternalStore() ?? [];
    dispatch({
      type: 'SET_OPTIONS',
      payload: newOptions
    });
  }, [fetchExternalStore, dispatch]);

  const selectOption = useCallback((predicate: (option: T) => boolean) => {
    dispatch(
      {
        type: 'SELECT',
        payload: predicate
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
        payload: newOption
      }
    );
  }, [dispatch]);

  const updateOption = useCallback(async (
    updateOption: () => Promise<T>
  ) => {
    const updatedOption = await updateOption();
    dispatch({
      type: 'UPDATE',
      payload: updatedOption
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
