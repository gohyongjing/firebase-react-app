import { useCallback, useRef, useSyncExternalStore } from "react";

export type Unsubscribe = () => void;
export type OnStoreChange<Snapshot> = (newSnapshot: Snapshot) => void;
export type Subscribe<Snapshot> = (onStoreChange: OnStoreChange<Snapshot>) => Unsubscribe;

/**
 * Wrapper for useSyncExternalStore on the client that does not need to use getServerSnapshot().
 * Takes in a callback function with new Snapshot instead of using a getSnapshot() function.
 *
 * @param subscribe Function to subscribe to the external store.
 * @returns Latest snapshot of the external store.
 */
export default function useClientSyncExternalStore<Snapshot>(
  subscribe: Subscribe<Snapshot>
) {
  const _dataRef = useRef<Snapshot | null>(null);

  /**
   * Wraps the subscribe function so that it takes in an onStoreChange() function with no arguments
   * instead of an onStoreChange that takes in newSnapshot, to fit the signature of useSyncExternalStore.
   *
   * @param onStoreChange Function to call when external store is updated. Takes no arguments.
   */
  const _wrappedSubscribe = useCallback((onStoreChange: () => void) => {
    const unsubscribe = subscribe((newSnapshot) => {
      _dataRef.current = newSnapshot;
      onStoreChange();
    })
    return unsubscribe;
  }, [subscribe])

  const _getSnapShot = useCallback(() => {
    return _dataRef.current;
  }, [])

  return useSyncExternalStore(_wrappedSubscribe, _getSnapShot);
}
