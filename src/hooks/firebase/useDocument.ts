import { useCallback, useMemo } from "react";
import {
  getFirestore,
  DocumentData,
  doc,
  UpdateData,
  WithFieldValue,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc } from "firebase/firestore";
import useSyncCachedExternalStore from "../utility/useSyncCachedExternalStore";
import firebaseApp from "../../app/firebaseApp";

const firestore = getFirestore(firebaseApp);

interface DocumentHook {
  data: DocumentData | undefined,
  getDoc: () => Promise<DocumentData | undefined>,
  setDoc: (newData: WithFieldValue<DocumentData>) => Promise<void>,
  updateDoc: (newData: UpdateData<DocumentData>) => Promise<void>,
  deleteDoc: () => Promise<void>,
  isLoading: boolean,
  error: unknown
}
/**
 * Wrapper around firebase document.
 * Uses SyncCachedExternal store for intial fetch and instantly updates local document data.
 *
 * @param path Path to firebase document.
 * @returns DocumentHook.
 */
export default function useDocument(
  path: string,
  shouldFetch: boolean = true
): DocumentHook {
  const firebaseDocRef = useMemo(() => doc(firestore, path), [path]);

  const _fetcher = useCallback(() => {
    if (!shouldFetch) {
      return Promise.resolve(undefined);
    }
    return getDoc(firebaseDocRef).then(
      documentSnapshot => documentSnapshot.data()
    );
  }, [firebaseDocRef, shouldFetch]);

  const {
    data,
    fetchExternalStore,
    updateExternalStore,
    isLoading,
    error
  } = useSyncCachedExternalStore<DocumentData | undefined>(_fetcher);
  
  const getDocWrapped = useCallback(() => {
    return fetchExternalStore();
  }, [fetchExternalStore]);

  const setDocWrapped = useCallback((newData: WithFieldValue<DocumentData>) => {
    return updateExternalStore(newData, () => {
      return setDoc(firebaseDocRef, newData);
    });
  }, [firebaseDocRef, updateExternalStore]);

  const updateDocWrapped = useCallback((newData: UpdateData<DocumentData>) => {
    return updateExternalStore({ ...data, ...newData }, () => {
      return updateDoc(firebaseDocRef, newData);
    });
  }, [data, firebaseDocRef, updateExternalStore]);

  const deleteDocWrapped = useCallback(() => {
    return updateExternalStore(undefined, () => {
      return deleteDoc(firebaseDocRef);
    });
  }, [firebaseDocRef, updateExternalStore]);

  return {
    data,
    getDoc: getDocWrapped,
    setDoc: setDocWrapped,
    updateDoc: updateDocWrapped,
    deleteDoc: deleteDocWrapped,
    isLoading,
    error
  }
}
