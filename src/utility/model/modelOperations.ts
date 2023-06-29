import {
  addDoc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  subscribeDoc,
  subscribeDocs,
  updateDoc
} from "lib/firebase/firestore";
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QueryConstraint,
  QuerySnapshot,
  SetOptions,
  Unsubscribe,
  UpdateData,
  WithFieldValue
} from "firebase/firestore";

export type WithId<T> = T & { id: string }

interface ModelOperations<T> {
  addModel: (path: string, newData: WithFieldValue<T>) => Promise<DocumentReference<DocumentData> | undefined>,
  setModel: (path: string, newData: WithFieldValue<T>, options?: SetOptions) => Promise<void>,
  getModel: (path: string) => Promise<WithId<T> | undefined>,
  getModels: (path: string, ...queryConstraints: QueryConstraint[]) => Promise<WithId<T>[]>
  getModelWhere: (path: string, ...queryConstraints: QueryConstraint[]) => Promise<WithId<T> | undefined>
  updateModel: (path: string, dataUpdates: UpdateData<T>) => Promise<void>,
  deleteModel: (path: string) => Promise<void>,
  subscribeModel: (
    path: string,
    onNext: (data: WithId<T> | undefined) => void
  ) => Unsubscribe
  subscribeModels: (
    path: string,
    onNext: (data: WithId<T>[]) => void,
    ...queryConstraints: QueryConstraint[]
  ) => Unsubscribe
}

export function getModelOperations<T extends DocumentData>(defaultModel: T): ModelOperations<T> {

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

  function subscribeModel(
    path: string,
    onNext: (data: WithId<T> | undefined) => void
  ) {
    function onNextWrapped(snapshot: DocumentSnapshot<DocumentData>) {
      if (!snapshot.exists()) {
        onNext(undefined);
        return;
      }
      onNext(_padSnapshotData(snapshot));
    }
    return subscribeDoc(path, onNextWrapped);
  }

  function subscribeModels(
    path: string,
    onNext: (data: WithId<T>[]) => void,
    ...queryConstraints: QueryConstraint[]
  ) {
    function onNextWrapped(snapshot: QuerySnapshot<DocumentData>) {
      onNext(snapshot.docs.map(_padSnapshotData))
    }
    return subscribeDocs(path, onNextWrapped, ...queryConstraints);
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
