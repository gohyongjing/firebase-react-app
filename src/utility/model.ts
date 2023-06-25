import {
  deleteDoc,
  getDoc,
  setDoc,
  subscribeDoc,
  updateDoc
} from "lib/firebase/document";
import {
  addDoc,
  getDocs,
  subscribeDocs,
} from "lib/firebase/collection";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QueryConstraint,
  QuerySnapshot,
  SetOptions,
  UpdateData,
  WithFieldValue
} from "firebase/firestore";
import { OnStoreChange, Unsubscribe } from "hooks/useClientSyncExternalStore";

export type WithId<T> = T & { id: string }

interface ModelOperations<T> {
  addModel: (path: string, newData: WithFieldValue<T>) => Promise<DocumentReference<DocumentData> | undefined>,
  setModel: (path: string, newData: WithFieldValue<T>, options?: SetOptions) => Promise<void>,
  getModel: (path: string) => Promise<WithId<T> | undefined>,
  getModels: (path: string, ...queryConstraints: QueryConstraint[]) => Promise<WithId<T>[]>
  getModelWhere: (path: string, ...queryConstraints: QueryConstraint[]) => Promise<WithId<T> | undefined>
  updateModel: (path: string, dataUpdates: UpdateData<T>) => Promise<void>,
  deleteModel: (path: string) => Promise<void>,
  subscribeModel: (path: string, onStoreChange: OnStoreChange<WithId<T> | undefined>) => Unsubscribe
  subscribeModels: (
    path: string,
    onStoreChange: OnStoreChange<WithId<T>[]>,
    ...queryConstraints: QueryConstraint[]
  ) => Unsubscribe
}

export default function getModelOperations<T extends DocumentData>(defaultModel: T): ModelOperations<T> {

  function _padSnapshotData(snapshot: DocumentSnapshot<DocumentData>) {
    return {
      ...defaultModel,
      ...snapshot.data(),
      id: snapshot.id
    }
  }

  /**
   * Retrieves padded document data if document exists, undefined otherwise.
   * Pads document data with default values and document id.
   *
   * @param path Path to firestore document.
   * @returns Padded data.
   */
  function getModel(path: string) {
    return getDoc(path).then(snapshot => {
      if (!snapshot.exists()) {
        return undefined;
      }
      return _padSnapshotData(snapshot);
    });
  };

  /**
   * Retrieves all documents with padded data at a certain path that satisfies a condition.
   * Retrieves all documents at the path if condition is not specified.
   * Pads document data with default values and document id.
   * 
   * @param path Path to the collection to retrieve documents.
   * @param queryConstraints Constraints that retrieved documents must satisfy.
   * @returns Documents satisfying the contraints. 
   */
  function getModels(path: string, ...queryConstraints: QueryConstraint[]) {
    return getDocs(path, ...queryConstraints)
      .then(snapshot => snapshot.docs.map(_padSnapshotData));
  };

  async function getModelWhere(path: string, ...queryConstraints: QueryConstraint[]) {
    const models = await getModels(path, ...queryConstraints);
    if (models.length === 0) {
      return undefined;
    }
    return models[0];
  }

  function subscribeModel(path: string, onStoreChange: OnStoreChange<WithId<T> | undefined>) {
    function onStoreChangeWrapped(snapshot: DocumentSnapshot<DocumentData>) {
      if (!snapshot.exists()) {
        onStoreChange(undefined);
        return;
      }
      onStoreChange(_padSnapshotData(snapshot));
    }
    return subscribeDoc(path, onStoreChangeWrapped);
  }

  function subscribeModels(
    path: string,
    onStoreChange: OnStoreChange<WithId<T>[]>,
    ...queryConstraints: QueryConstraint[]
  ) {
    function onStoreChangeWrapped(snapshot: QuerySnapshot<DocumentData>) {
      onStoreChange(snapshot.docs.map(_padSnapshotData))
    }
    return subscribeDocs(path, onStoreChangeWrapped, ...queryConstraints);
  }

  return {
    addModel: addDoc,
    setModel: setDoc,
    getModel,
    getModels,
    getModelWhere,
    updateModel: updateDoc,
    deleteModel: deleteDoc,
    subscribeModel,
    subscribeModels
  }
}

interface ModelOperationsWithPath<T> {
  addModel: (newData: WithFieldValue<T>) => Promise<DocumentReference<DocumentData> | undefined>,
  setModel: (docId: string, newData: WithFieldValue<T>, setOptions?: SetOptions) => Promise<void>,
  getModel: (docId: string) => Promise<WithId<T> | undefined>,
  getModels: (...queryConstraints: QueryConstraint[]) => Promise<WithId<T>[]>
  getModelWhere: (...queryConstraints: QueryConstraint[]) => Promise<WithId<T> | undefined>
  updateModel: (docId: string, dataUpdates: UpdateData<T>) => Promise<void>,
  deleteModel: (docId: string) => Promise<void>,
  subscribeModel: (docId: string, onStoreChange: OnStoreChange<WithId<T> | undefined>) => Unsubscribe,
  subscribeModels: (
    onStoreChange: OnStoreChange<WithId<T>[]>,
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

  function subscribeModel(docId: string, onStoreChange: OnStoreChange<WithId<T> | undefined>) {
    return ops.subscribeModel(`${path}/${docId}`, onStoreChange);
  };

  function subscribeModels(
    onStoreChange: OnStoreChange<WithId<T>[]>,
    ...queryConstraints: QueryConstraint[]
  ) {
    return ops.subscribeModels(path, onStoreChange, ...queryConstraints);
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
