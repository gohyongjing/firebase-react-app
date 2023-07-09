import {
  DocumentData,
  DocumentReference,
  QueryConstraint,
  SetOptions,
  Unsubscribe,
  UpdateData,
  WithFieldValue
} from "lib/firebase/firestore";
import { WithId, getModelOperations } from "./getModelOperations";

interface ModelOperationsWithPath<T> {
  addModel: (newData: WithFieldValue<T>) => Promise<DocumentReference<DocumentData> | undefined>,
  setModel: (docId: string, newData: WithFieldValue<T>, setOptions?: SetOptions) => Promise<void>,
  getModel: (docId: string) => Promise<WithId<T> | undefined>,
  getModels: (...queryConstraints: QueryConstraint[]) => Promise<WithId<T>[]>
  getModelWhere: (...queryConstraints: QueryConstraint[]) => Promise<WithId<T> | undefined>
  updateModel: (docId: string, dataUpdates: UpdateData<T>) => Promise<void>,
  deleteModel: (docId: string) => Promise<void>,
  subscribeModel: (
    docId: string,
    onNext: (data: WithId<T> | undefined) => void
  ) => Unsubscribe
  subscribeModels: (
    onNext: (data: WithId<T>[]) => void,
    ...queryConstraints: QueryConstraint[]
  ) => Unsubscribe
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

  function setModel(
    docId: string,
    newData: WithFieldValue<T>,
    setOptions?: SetOptions
  ) {
    return ops.setModel(`${path}/${docId}`, newData, setOptions)
  };

  function addModel(newData: WithFieldValue<T>) {
    return ops.addModel(path, newData);
  };

  function getModel(docId: string) {
    return ops.getModel(`${path}/${docId}`);
  };

  function updateModel(docId: string, dataUpdates: UpdateData<T>) {
    return ops.updateModel(`${path}/${docId}`, dataUpdates);
  };

  function deleteModel(docId: string) {
    return ops.deleteModel(`${path}/${docId}`);
  };

  function getModels(...queryConstraints: QueryConstraint[]) {
    return ops.getModels(path, ...queryConstraints);
  };

  function getModelWhere(...queryConstraints: QueryConstraint[]) {
    return ops.getModelWhere(path, ...queryConstraints);
  }

  function subscribeModel(
    docId: string,
    onNext: (data: WithId<T> | undefined) => void
  ) {
    return ops.subscribeModel(`${path}/${docId}`, onNext);
  };

  function subscribeModels(
    onNext: (data: WithId<T>[]) => void,
    ...queryConstraints: QueryConstraint[]
  ) {
    return ops.subscribeModels(path, onNext, ...queryConstraints);
  }

  return {
    addModel,
    getModel,
    getModels,
    getModelWhere,
    setModel,
    updateModel,
    deleteModel,
    subscribeModel,
    subscribeModels
  }
}
