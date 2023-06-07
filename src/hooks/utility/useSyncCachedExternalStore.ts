import { useCallback, useRef } from "react";
import usePromise from "./usePromise";
import useClientSyncExternalStore, { OnStoreChange } from "./useClientSyncExternalStore";

interface SyncCachedExternalStoreHook<T> {
  readonly data: T | null,
  fetchExternalStore: () => Promise<void>,
  updateExternalStore: (newData: T, updater: () => Promise<void>) => Promise<void>,
  isLoading: boolean,
  error: unknown
}

/**
 * Caches a value and synchronises it with an external store.
 *
 * @param fetcher Function to fetch the initial data.
 * @returns SyncCachedExternalStoreHook.
 */
export default function useSyncCachedExternalStore<T> (
  fetcher: () => Promise<T | null>
): SyncCachedExternalStoreHook<T> {
  const {
    resolve: _resolve,
    isLoading,
    error,
  } = usePromise(); 
  const dataRef = useRef<T | null>(null);
  const onStoreChangeRef = useRef<OnStoreChange<T | null>>(() => {});

  const _fetch = useCallback(() => {
    return fetcher().then((data) => {
      dataRef.current = data;
      onStoreChangeRef.current(data);
    });
  }, [fetcher]);

  /**
   * Fetches data from the external store.
   * Can only run if no fetches or updates are ongoing.
   * Catches errors thrown by the fetcher.
   */
  const fetchExternalStore = useCallback(() => {
    return _resolve(_fetch);
  }, [_resolve, _fetch]);

  /**
   * Updates the cached value and the external store.
   * Can only run if no fetches or updates are ongoing. Reverts the
   * cached value if the update to external store throw an error.
   * 
   * @param newData New Data to be cached.
   * @param updateExternalStore Function to update the external store with newData.
   */
  const updateExternalStore = useCallback((newData: T, updater: () => Promise<void>) => {
    return _resolve(() => {
      const oldData = dataRef.current;
      onStoreChangeRef.current(newData);
      return updater().catch(e => {
        dataRef.current = oldData;
        onStoreChangeRef.current(oldData);
        throw(e);
      });
    })
  }, [_resolve]);

  const _subscribe = useCallback((onStoreChange: OnStoreChange<T | null>) => {
    onStoreChangeRef.current = onStoreChange;
    _fetch();

    const unsubscribe = () => {};
    return unsubscribe;
  }, [])

  const data = useClientSyncExternalStore(_subscribe);

  return { data, fetchExternalStore, updateExternalStore, isLoading, error }
}
