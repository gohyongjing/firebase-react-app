import { useCallback } from "react";
import {
  getFirestore,
  DocumentData,
  doc,
  UpdateData,
  WithFieldValue,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  DocumentSnapshot
} from "firebase/firestore";
import firebaseApp from "../../app/firebaseApp";

const firestore = getFirestore(firebaseApp);

interface DocumentHook {
  getDoc: (path: string) => Promise<DocumentSnapshot<DocumentData>>,
  setDoc: (path: string, newData: WithFieldValue<DocumentData>) => Promise<void>,
  updateDoc: (path: string, dataUpdates: UpdateData<DocumentData>) => Promise<void>,
  deleteDoc: (path: string) => Promise<void>,
}

/**
 * Wrapper around firebase document.
 *
 * @returns DocumentHook.
 */
export default function useDocument(): DocumentHook {

  const getDocWrapped = useCallback((path: string) => {
    return getDoc(doc(firestore, path));
  }, []);

  const setDocWrapped = useCallback((path: string, newData: WithFieldValue<DocumentData>) => {
    return setDoc(doc(firestore, path), newData);
  }, []);

  const updateDocWrapped = useCallback((path: string, newData: UpdateData<DocumentData>) => {
    return updateDoc(doc(firestore, path), newData);
  }, []);

  const deleteDocWrapped = useCallback((path: string) => {
    return deleteDoc(doc(firestore, path));
  }, []);

  return {
    getDoc: getDocWrapped,
    setDoc: setDocWrapped,
    updateDoc: updateDocWrapped,
    deleteDoc: deleteDocWrapped,
  }
}
