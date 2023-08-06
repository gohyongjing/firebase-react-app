import type {
  SetOptions
} from 'lib/firebase/firestore';

import {
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QuerySnapshot,
  Unsubscribe,
  UpdateData,
  WithFieldValue,
  collection,
  Firestore,
  doc,
  query,
  onSnapshot,
  deleteDoc,
  appFirestore,
} from "lib/firebase/firestore";
import { isQueryCompositeFilterConstraint } from "utility/typePredicates/isQueryCompositeFilterConstraint";

export type WithId<T> = T & { id: string }

interface ModelOperations<T> {
  addModel: (
    path: string,
    newData: WithFieldValue<T>
  ) => Promise<DocumentReference<DocumentData> | undefined>,
  setModel: (
    path: string,
    newData: WithFieldValue<T>, options?: SetOptions
  ) => Promise<void>,
  getModel: (
    path: string
  ) => Promise<WithId<T> | undefined>,
  getModels:
    ((path: string, queryCompositeFilterConstraint: QueryCompositeFilterConstraint) => Promise<WithId<T>[]>)
    & ((path: string, ...queryConstraints: QueryConstraint[]) => Promise<WithId<T>[]>)
  getModelWhere:
    ((path: string, queryCompositeFilterConstraint: QueryCompositeFilterConstraint) => Promise<WithId<T> | undefined>)
    & ((path: string, ...queryConstraints: QueryConstraint[]) => Promise<WithId<T> | undefined>)
  updateModel: (
    path: string,
    dataUpdates: UpdateData<T>
  ) => Promise<void>,
  deleteModel: (
    path: string
  ) => Promise<void>,
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

export function getModelOperations<T extends DocumentData>(
  defaultModel: T,
  firestore: Firestore = appFirestore
): ModelOperations<T> {

  function _padSnapshotData(snapshot: DocumentSnapshot<DocumentData>) {
    return {
      ...defaultModel,
      ...snapshot.data(),
      id: snapshot.id
    }
  }

  /**
   * Creates a new model at the specified path.
   *
   * @param path Path to the model.
   * @param newModel New model to be added.
   */
  function addModel(path: string, newModel: WithFieldValue<T>) {
    doc(firestore, path);
    return addDoc(collection(firestore, path), newModel);
  }

  /**
   * Sets the model at the specified path.
   * Overwrites the model with the specified id if model exists,
   * and creates a new model with specified id otherwise.
   *
   * @param path Path to the model.
   * @param newModel Now model.
   */
  function setModel(
    path: string,
    newModel: WithFieldValue<DocumentData>,
    options?: SetOptions
  ) {
    const docRef = doc(firestore, path);
    if (options) {
      return setDoc(docRef, newModel, options);
    }
    return setDoc(docRef, newModel);
  }

  /**
   * Retrieves models with padded data if exists, undefined otherwise.
   * Pads model with default values and its id.
   *
   * @param path Path to the model.
   * @returns Padded model.
   */
  function getModel(path: string) {
    return getDoc(doc(firestore,path)).then(snapshot => {
      if (!snapshot.exists()) {
        return undefined;
      }
      return _padSnapshotData(snapshot);
    });
  }

  /**
   * Retrieves all models with padded data at the specified path that satisfies all given conditions.
   * Pads model with default values and its id.
   * 
   * @param path Path to the collection to retrieve models.
   * @param queryCompositeFilterConstraint Constraints that retrieved documents must satisfy.
   * @returns Padded models satisfying the contraints. 
   */
  function getModels(
    path: string,
    queryCompositeFilterConstraint: QueryCompositeFilterConstraint
  ): Promise<WithId<T>[]>
  /**
   * Retrieves all models with padded data at the specified path that satisfies all given conditions.
   * Pads model with default values and its id.
   * 
   * @param path Path to the collection to retrieve models.
   * @param queryConstraints Constraints that retrieved documents must satisfy.
   * @returns Padded models satisfying the contraints. 
   */
  function getModels(
    path: string,
    ...queryConstraints: QueryConstraint[]
  ): Promise<WithId<T>[]>
  async function getModels(
    path: string,
    constraint?: QueryCompositeFilterConstraint | QueryConstraint,
    ...queryConstraints: QueryConstraint[]
  ) {
    const collectionRef = collection(firestore, path);
    if (!constraint) {
      return getDocs(query(collectionRef))
        .then(snapshot => snapshot.docs.map(_padSnapshotData));
    }
    const docsQuery = isQueryCompositeFilterConstraint(constraint)
      ? query(collectionRef, constraint)
      : query(collectionRef, constraint, ...queryConstraints);

    return getDocs(docsQuery)
      .then(snapshot => snapshot.docs.map(_padSnapshotData));
  }

  /**
   * Retrieves the first model with padded data at the specified path that satisfies all given conditions.
   * Pads model with default values and its id.
   * 
   * @param path Path to the collection to retrieve models.
   * @param queryCompositeFilterConstraint Constraints that retrieved documents must satisfy.
   * @returns Padded models satisfying the contraints. 
   */
  function getModelWhere(
    path: string,
    queryCompositeFilterConstraint: QueryCompositeFilterConstraint
  ): Promise<WithId<T> | undefined>
  /**
   * Retrieves the first model with padded data at the specified path that satisfies all given conditions.
   * Pads model with default values and its id.
   * 
   * @param path Path to the collection to retrieve models.
   * @param queryConstraints Constraints that retrieved documents must satisfy.
   * @returns Padded models satisfying the contraints. 
   */
  function getModelWhere(
    path: string,
    ...queryConstraints: QueryConstraint[]
  ): Promise<WithId<T> | undefined>
  async function getModelWhere(
    path: string,
    constraint?: QueryConstraint | QueryCompositeFilterConstraint,
    ...queryConstraints: QueryConstraint[]
  ) {
    const models = !constraint
      ? await getModels(path)
      : (
        isQueryCompositeFilterConstraint(constraint)
        ? await getModels(path, constraint)
        : await getModels(path, constraint, ...queryConstraints)
      );
    if (models.length === 0) {
      return undefined;
    }
    return models[0];
  }

  /**
   * Updates the model at the specified path.
   * Unspecified fields in modelUpdates will remain unchanged.
   *
   * @param path Path to the model.
   * @param modelUpdates Updates to the model.
   */
  function updateModel(path: string, modelUpdates: UpdateData<T>) {
    return updateDoc(doc(firestore, path), modelUpdates);
  }

  /**
   * Deletes the model at the specified path.
   *
   * @param path Path to the model.
   */
  function deleteModel(path: string) {
    return deleteDoc(doc(firestore, path));
  }

  /**
   * Subscribes to the model at the specified path.
   *
   * @param path  Path to the model.
   * @param onNext Callback function to run when model changes.
   * @returns Function to unsubscribe from the model.
   */
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
    return onSnapshot(doc(firestore,path), onNextWrapped);
  }

  /**
   * Subscribes to models in a collection at the specified path.
   *
   * @param path  Path to the collection.
   * @param onNext Callback function to run when any of the subscribed models change.
   * @returns Function to unsubscribe from the models.
   */
  function subscribeModels(
    path: string,
    onNext: (data: WithId<T>[]) => void,
    ...queryConstraints: QueryConstraint[]
  ) {
    const collectionRef = collection(firestore, path);
    const docsQuery = query(collectionRef, ...queryConstraints);
    function onNextWrapped(snapshot: QuerySnapshot<DocumentData>) {
      onNext(snapshot.docs.map(_padSnapshotData))
    }
    return onSnapshot(docsQuery, onNextWrapped);
  }

  return {
    addModel,
    setModel,
    getModel,
    getModels,
    getModelWhere,
    updateModel,
    deleteModel,
    subscribeModel,
    subscribeModels
  }
}
