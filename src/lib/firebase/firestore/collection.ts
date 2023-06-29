import {
  addDoc as _addDoc,
  collection,
  DocumentData,
  getDocs as _getDocs,
  getFirestore,
  query,
  QueryConstraint,
  WithFieldValue,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import firebaseApp from "../app";

const firestore = getFirestore(firebaseApp);

// Wrapper around firebase collection.

export function addDoc(path: string, data: WithFieldValue<DocumentData>) {
  return _addDoc(collection(firestore, path), data);
};

/**
 * Adds a new document at a certain path.
 * Creates a new document with an auto-generated id.
 *
 * @param path Path to the collection to store the new document.
 */
export function getDocs(
  path: string,
  ...queryConstraints: QueryConstraint[]
) {
  const collectionRef = collection(firestore, path);
  const docsQuery = query(collectionRef, ...queryConstraints);
  return _getDocs(docsQuery);
};

export function subscribeDocs(
  path: string,
  onNext: (snapshot: QuerySnapshot<DocumentData>) => void,
  ...queryConstraints: QueryConstraint[]
) {
  const collectionRef = collection(firestore, path);
  const docsQuery = query(collectionRef, ...queryConstraints);
  const unsubscribe = onSnapshot(
    docsQuery,
    onNext,
  )
  return unsubscribe;
};