import { DocumentData, DocumentReference, UpdateData, WithFieldValue } from "firebase/firestore";
import { QueryCondition, addDoc, getDocsData } from "./firebase/collection";
import { getDocData, deleteDoc, setDoc, updateDoc } from "./firebase/document";

interface ModelOperations<T> {
  addModel: (path: string, newData: WithFieldValue<T>) => Promise<DocumentReference<DocumentData> | undefined>,
  setModel: (path: string, newData: WithFieldValue<T>) => Promise<void>,
  getModel: (path: string) => Promise<T | undefined>,
  getModels: (path: string, condition?: QueryCondition) => Promise<T[] | undefined>
  updateModel: (path: string, dataUpdates: UpdateData<T>) => Promise<void>,
  deleteModel: (path: string) => Promise<void>,
}

export default function getModelOperations<T extends DocumentData>(defaultModel: T): ModelOperations<T> {

  function getModel(path: string) {
    return getDocData(path, defaultModel);
  };

  function getModels(path: string, condition?: QueryCondition) {
    return getDocsData(path, defaultModel, condition);
  };

  return {
  addModel: addDoc,
  setModel: setDoc,
  getModel,
  getModels,
  updateModel: updateDoc,
  deleteModel: deleteDoc,
  }
}

interface ModelOperationsWithPath<T> {
  addModel: (newData: WithFieldValue<T>) => Promise<DocumentReference<DocumentData> | undefined>,
  setModel: (docId: string, newData: WithFieldValue<T>) => Promise<void>,
  getModel: (docId: string) => Promise<T | undefined>,
  getModels: (condition?: QueryCondition) => Promise<T[] | undefined>
  updateModel: (docId: string, dataUpdates: UpdateData<T>) => Promise<void>,
  deleteModel: (docId: string) => Promise<void>,
}

/**
 * Wraps model hooks to provide the same file path to all CRUD operations.
 *
 * @param path File path prepended for all operations.
 * @param defaultModes defaultModel to pad missing data with.
 * @returns Wrapped CRUD operations.
 */
export function getModelOperationsWithPath<T extends DocumentData>(
  path: string,
  defaultModel: T
): ModelOperationsWithPath<T> {
  const ops = getModelOperations(defaultModel);

  function getModel(docId: string) {
    return ops.getModel(`${path}/${docId}`);
  };

  function setModel(docId: string, newData: WithFieldValue<T>) {
    return ops.setModel(`${path}/${docId}`, newData)
  };

  function updateModel(docId: string, dataUpdates: UpdateData<T>) {
    return ops.updateModel(`${path}/${docId}`, dataUpdates);
  };

  function deleteModel(docId: string) {
    return ops.deleteModel(`${path}/${docId}`);
  };

  function addModel(newData: WithFieldValue<T>) {
    return ops.addModel(path, newData);
  };

  function getModels(condition?: QueryCondition) {
    return ops.getModels(path, condition);
  };

  return {
    addModel,
    getModel,
    getModels,
    setModel,
    updateModel,
    deleteModel,
  }
}