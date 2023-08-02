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
  QueryCompositeFilterConstraint,
} from "firebase/firestore";
import firebaseApp from "../app";
import { isQueryCompositeFilterConstraint } from "utility/typePredicates/isQueryCompositeFilterConstraint";

const firestore = getFirestore(firebaseApp);

// Wrapper around firebase collection.

export function addDoc(path: string, data: WithFieldValue<DocumentData>) {
  return _addDoc(collection(firestore, path), data);
}

/**
 * Adds a new document at a certain path.
 * Creates a new document with an auto-generated id.
 *
 * @param path Path to the collection to store the new document.
 */
export function getDocs(path: string, queryCompositeFilterConstraint: QueryCompositeFilterConstraint): Promise<QuerySnapshot>
export function getDocs(path: string, ...queryConstraints: QueryConstraint[]): Promise<QuerySnapshot>
export function getDocs(
  path: string,
  constraint?: QueryCompositeFilterConstraint | QueryConstraint,
  ...queryConstraints: QueryConstraint[]
) {
  const collectionRef = collection(firestore, path);
  if (!constraint) {
    return _getDocs(query(collectionRef));
  }
  const docsQuery = isQueryCompositeFilterConstraint(constraint)
    ? query(collectionRef, constraint)
    : query(collectionRef, constraint, ...queryConstraints)
  return _getDocs(docsQuery);
}

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
}
