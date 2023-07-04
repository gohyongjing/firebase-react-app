import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as _signOut,
  NextOrObserver,
  ErrorFn,
  CompleteFn,
} from "firebase/auth";
import firebaseApp from "../app";

const auth = getAuth(firebaseApp);

export function subscribeAuth(
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn,
  completed?: CompleteFn
) {
  const unsubscribe = onAuthStateChanged(
    auth,
    nextOrObserver,
    error,
    completed
  );

  return unsubscribe;
};

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export function signOut() {
  return _signOut(auth);
};

export type { UserCredential } from 'firebase/auth';
