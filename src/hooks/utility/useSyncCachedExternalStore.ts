import { useCallback, useRef } from "react";
import useClientSyncExternalStore, { OnStoreChange } from "./useClientSyncExternalStore";

interface SyncCachedExternalStoreHook<T> {
  readonly data: T | undefined,
  fetchExternalStore: () => Promise<T | undefined>,
  updateExternalStore: (newData: T, updater: () => Promise<void>) => Promise<void>,
}

/**
 * Caches a updatable value and synchronises it with an external store.
 *
 * @param fetcher Function to fetch data from external store.
 * @returns SyncCachedExternalStoreHook.
 */
export default function useSyncCachedExternalStore<T> (
  fetcher: () => Promise<T>
): SyncCachedExternalStoreHook<T> {
  const dataRef = useRef<T>();
  const onStoreChangeRef = useRef<OnStoreChange<T | undefined>>(() => {});

  const _fetch = useCallback(() => {
    return fetcher().then((data) => {
      dataRef.current = data;
      onStoreChangeRef.current(data);
      return data;
    });
  }, [fetcher]);

  /**
   * Fetches data from the external store.
   * Catches errors thrown by the fetcher.
   */
  const fetchExternalStore = useCallback(() => {
    return _fetch();
  }, [_fetch]);

  /**
   * Updates the cached value and the external store.
   * Reverts the cached value if the update to external store throws an error.
   * 
   * @param newData New Data to be cached.
   * @param updateExternalStore Function to update the external store with newData.
   */
  const updateExternalStore = useCallback((newData: T, updater: () => Promise<void>) => {
    const oldData = dataRef.current;
    onStoreChangeRef.current(newData);
    return updater().catch(e => {
      dataRef.current = oldData;
      onStoreChangeRef.current(oldData);
      throw(e);
    });
  }, []);

  const _subscribe = useCallback((onStoreChange: OnStoreChange<T | undefined>) => {
    onStoreChangeRef.current = onStoreChange;
    _fetch();

    const unsubscribe = () => {
      onStoreChangeRef.current = () => {};
    };
    return unsubscribe;
  }, [_fetch])

  const data = useClientSyncExternalStore(_subscribe);

  return { data, fetchExternalStore, updateExternalStore }
}
