import {
  getFirestore,
  DocumentData,
  WithFieldValue,
  addDoc as _addDoc,
  collection,
  query,
  where,
  FieldPath,
  WhereFilterOp,
  getDocs as _getDocs,
} from "firebase/firestore";
import firebaseApp from "../../app/firebaseApp";
import { padMissingFields } from "./document";

const firestore = getFirestore(firebaseApp);

export interface QueryCondition {
  fieldPath: string | FieldPath
  opStr: WhereFilterOp
  value: unknown
}

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
export function getDocs(path: string, condition?: QueryCondition) {
  const collectionRef = collection(firestore, path);
  if (!condition) {
    return _getDocs(collectionRef);
  }
  const docsQuery = query(collectionRef, where(
    condition.fieldPath,
    condition.opStr,
    condition.value
  ));
  return _getDocs(docsQuery);
};

/**
 * Retrieves all documents at a certain path that satisfies a condition.
 * Retrieves all documents at the path if condition is not specified.
 * 
 * @param path Path to the collection to retrieve documents.
 * @param condition Query condition that retrieved documents must satisfy.
 */
export function getDocsData<T>(path: string, defaultModel: T, condition?: QueryCondition) {
  return getDocs(path, condition)
    .then(snapshot => snapshot.docs.map(snapshot => {
      return padMissingFields<T>(snapshot, defaultModel);
    }));
};
