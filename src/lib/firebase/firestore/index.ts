import { getFirestore } from 'firebase/firestore';
import firebaseApp from '../app';

export type {
  DocumentData,
  SetOptions,
  Unsubscribe,
  UpdateData,
  WithFieldValue,
} from 'firebase/firestore';

export {
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QuerySnapshot,
  Timestamp,
  addDoc,
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  setDoc,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore';

export const appFirestore = getFirestore(firebaseApp);