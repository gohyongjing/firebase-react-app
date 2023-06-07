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

export default function useDocument(
  path: string,
): DocumentHook {
  const firebaseDocRef = useMemo(() => doc(firestore, path), [path]);

  const _fetcher = useCallback(() => {
    return getDoc(firebaseDocRef).then(
      documentSnapshot => documentSnapshot.data()
    );
  }, []);

  const {
    data,
    fetchExternalStore,
    updateExternalStore,
    isLoading,
    error
  } = useSyncCachedExternalStore<DocumentData | undefined>(_fetcher);
  
  const getDocWrapped = useCallback(() => {
    return fetchExternalStore();
  }, []);

  const setDocWrapped = useCallback((newData: WithFieldValue<DocumentData>) => {
    return updateExternalStore(newData, () => {
      return setDoc(firebaseDocRef, newData);
    });
  }, []);

  const updateDocWrapped = useCallback((newData: UpdateData<DocumentData>) => {
    return updateExternalStore({ ...data, ...newData }, () => {
      return updateDoc(firebaseDocRef, newData);
    });
  }, []);

  const deleteDocWrapped = useCallback(() => {
    return updateExternalStore(undefined, () => {
      return deleteDoc(firebaseDocRef);
    });
  }, []);

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
