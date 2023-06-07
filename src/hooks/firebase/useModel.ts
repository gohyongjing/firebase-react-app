import { useCallback, useMemo } from "react";
import useDocument from "./useDocument";
import { DocumentData } from "firebase/firestore";

interface ModelHook<T> {
  model: T | undefined,
  getModel: () => Promise<T | undefined>,
  setModel: (newData: T) => Promise<void>,
  updateModel: (newData: Partial<T>) => Promise<void>,
  deleteModel: () => Promise<void>,
  isLoading: boolean,
  error: unknown
}

export default function useModel<T extends DocumentData>(
  defaultModel: T,
  path: string,
  shouldFetch: boolean = true
): ModelHook<T> {
  const {
    data,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    isLoading,
    error
  } = useDocument(path, shouldFetch);

  /**
   * Pads the data with missing values if data is not empty or undefined.
   */
  const _padMissingFields = useCallback((data: DocumentData | undefined) => {
    if (!data) {
      return data;
    }
    return {...defaultModel, ...data}
  }, [defaultModel]);

  const model = useMemo(() => {
    return _padMissingFields(data)
  }, [data, _padMissingFields])

  const getModel = useCallback(() => {
    return getDoc().then(_padMissingFields);
  }, [getDoc, _padMissingFields])

  return {
    model,
    getModel,
    setModel: setDoc,
    updateModel: updateDoc,
    deleteModel: deleteDoc,
    isLoading,
    error
  }
}
