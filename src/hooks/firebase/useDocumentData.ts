import { useCallback } from "react";
import useDocument from "./useDocument";
import { DocumentData, DocumentSnapshot, UpdateData, WithFieldValue } from "firebase/firestore";

interface DocumentDataHook<T> {
  getDocumentData: (path: string) => Promise<T | undefined>,
  setDocumentData: (path: string, newData: WithFieldValue<T>) => Promise<void>,
  updateDocumentData: (path: string, dataUpdates: UpdateData<T>) => Promise<void>,
  deleteDocumentData: (path: string) => Promise<void>,
}

/**
 * Wrapper around useDocument from firestore to pad missing data.
 *
 * @param defaultModel 
 * @returns 
 */
export default function useDocumentData<T extends DocumentData>(
  defaultModel: T,
): DocumentDataHook<T> {
  const {
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
  } = useDocument();

  /**
   * Pads the data with missing values if data is not empty or undefined.
   */
  const _padMissingFields = useCallback((snapshot: DocumentSnapshot) => {
    if (!snapshot.exists()) {
      return undefined;
    }
    return {
      ...defaultModel,
      ...snapshot.data()
    };
  }, [defaultModel]);

  const getDocumentData = useCallback((path: string) => {
    return getDoc(path).then(_padMissingFields);
  }, [getDoc, _padMissingFields])

  return {
    getDocumentData,
    setDocumentData: setDoc,
    updateDocumentData: updateDoc,
    deleteDocumentData: deleteDoc,
  }
}
