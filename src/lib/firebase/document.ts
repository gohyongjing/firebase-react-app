import {
  getFirestore,
  DocumentData,
  doc,
  UpdateData,
  WithFieldValue,
  setDoc as _setDoc,
  getDoc as _getDoc,
  updateDoc as _updateDoc,
  deleteDoc as _deleteDoc,
  onSnapshot,
  SetOptions,
  DocumentSnapshot,
} from "firebase/firestore";
import firebaseApp from "./firebaseApp";
import { OnStoreChange } from "hooks";

const firestore = getFirestore(firebaseApp);

/**
 * Sets the document data at a certain path with new data.
 * Overwrites the document with the specified id if document exists,
 * and creates a new document with specified id otherwise.
 *
 * @param path Path to the document.
 */
export function setDoc(
  path: string,
  newData: WithFieldValue<DocumentData>,
  options?: SetOptions 
) {
  if (options) {
    return _setDoc(doc(firestore, path), newData, options);
  }
  return _setDoc(doc(firestore, path), newData);
};

/**
 * Retrives the document data at a certain path.
 *
 * @param path Path to the document.
 */
export function getDoc(path: string) {
  return _getDoc(doc(firestore, path));
};

/**
 * Updates the document data at a certain path.
 * Unspecified fields in data update will remain unchanged.
 *
 * @param path Path to the document.
 * @param dataUpdates Updates to the data.
 */
export function updateDoc(path: string, newData: UpdateData<DocumentData>) {
  return _updateDoc(doc(firestore, path), newData);
};

/**
 * Deletes the document data at a certain path.
 *
 * @param path Path to the document.
 */
export function deleteDoc(path: string) {
  return _deleteDoc(doc(firestore, path));
};

export function subscribeDoc(
  path: string,
  onStoreChange: OnStoreChange<DocumentSnapshot<DocumentData>>
) {
  const unsubscribe = onSnapshot(
    doc(firestore, path),
    snapshot => onStoreChange(snapshot)
  )

  return unsubscribe;
};
