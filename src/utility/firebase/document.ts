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
  DocumentSnapshot,
} from "firebase/firestore";
import firebaseApp from "../../app/firebaseApp";

const firestore = getFirestore(firebaseApp);

/**
 * Sets the document data at a certain path with new data.
 * Overwrites the document with the specified id if document exists,
 * and creates a new document with specified id otherwise.
 *
 * @param path Path to the document.
 */
export function setDoc(path: string, newData: WithFieldValue<DocumentData>) {
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

/**
 * Pads the data with missing values if data is not empty or undefined.
 *
 * @param snapshot Document snapshot that contains data.
 * @param defaultModel Model containing default values for missing data.
 * @returns Padded data.
 */
export function padMissingFields<T>(snapshot: DocumentSnapshot, defaultModel: T) {
  return {
    ...defaultModel,
    ...snapshot.data()
  };
};

/**
 * Retrieves padded document data if document exists, undefined otherwise.
 *
 * @param path Path to firestore document.
 * @param defaultModel Model containing default values for missing data.
 * @returns Padded data.
 */
export function getDocData<T>(path: string, defaultModel: T) {
  return getDoc(path)
    .then(snapshot => {
      if (!snapshot.exists()) {
        return undefined;
      }
      return padMissingFields<T>(snapshot, defaultModel)
    });
};
