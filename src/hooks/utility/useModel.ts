import { DocumentData, UpdateData, WithFieldValue } from "firebase/firestore";
import useDocumentData from "../firebase/useDocumentData";
import usePromise from "./usePromise";
import { useCallback } from "react";

interface ModelHook<T> {
  getModel: (path: string) => Promise<T | undefined>,
  setModel: (path: string, newData: WithFieldValue<T>) => Promise<void>,
  updateModel: (path: string, dataUpdates: UpdateData<T>) => Promise<void>,
  deleteModel: (path: string) => Promise<void>,
  isLoading: boolean
  error: unknown
}

/**
 * Wraps around useDocumentData to provide additional support for model and schemas.
 * Forces document data to be of a certain shape.
 * Provides a loading state and catches errors for CRUD operations.
 * 
 * @param defaultModel 
 * @returns 
 */
export default function useModel<T extends DocumentData>(defaultModel: T): ModelHook<T> {
  const {
    getDocumentData,
    setDocumentData,
    updateDocumentData,
    deleteDocumentData,
  } = useDocumentData(defaultModel);
  const { resolve, isLoading, error } = usePromise();

  const getModel = useCallback((path: string) => {
    return resolve(() => getDocumentData(path));
  }, [resolve, getDocumentData]);

  const setModel = useCallback((path: string, newData: WithFieldValue<T>) => {
    return resolve(() => setDocumentData(path, newData));
  }, [resolve, setDocumentData]);

  const updateModel = useCallback((path: string, dataUpdates: UpdateData<T>) => {
    return resolve(() => updateDocumentData(path, dataUpdates));
  }, [resolve, updateDocumentData]);

  const deleteModel = useCallback((path: string) => {
    return resolve(() => deleteDocumentData(path));
  }, [resolve, deleteDocumentData]);

  return {
    getModel,
    setModel,
    updateModel,
    deleteModel,
    isLoading,
    error
  }
}