import { useCallback } from "react";
import { getUserById } from "..";
import { useSyncCachedExternalStore } from "hooks";

export function useUser(userId?: string) {
  const fetcher = useCallback(async () => {
    if (!userId) {
      return undefined;
    }
    return getUserById(userId);
  }, [userId])

  return useSyncCachedExternalStore(fetcher).data;
}
