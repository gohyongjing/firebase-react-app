import { createContext, useContext, useCallback, MutableRefObject } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  getAuth
} from "firebase/auth";
import firebaseApp from "../app/firebaseApp"
import usePromise from "../hooks/utility/usePromise";
import useClientSyncExternalStore, { OnStoreChange } from "../hooks/utility/useClientSyncExternalStore";
import { hasKey } from "../utility/typePredicates";

function getErrorCode(error: unknown) {
  if (hasKey(error, 'code')) {
    return (typeof error.code === 'string') ? error.code : '';
  }
  return '';
}

/**
 * Format Firebase Auth error into user friendly messages.
 * The Auth error codes are based on Firebase JS version 8 API reference as it cannot be found in the verison 9 reference.
 * https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
 *
 * @param error Authentication error due to signInWithEmailAndPassword
 *    or createUserWithEmailAndPassword.
 */
function formatAuthErrorMessage(code: string) {
  switch(code) {
    case '':
      return '';
    case 'auth/invalid-email':
      return 'Email address given is not valid. Please enter a valid email.';
    case 'auth/user-disabled':
      return 'User account using the given email has been disabled. Please contact an administrator.';
    case 'auth/user-not-found':
      return 'There is no user account using the given email. Please create a new account instead.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please check your email address and password.';
    case 'auth/email-already-in-use':
      return 'There already exists a user account with the given email. Please log in instead.';
    case 'auth/operation-not-allowed':
      return 'Account creation using email and password is not enabled. Please contact an administrator.'
    case 'auth/weak-password':
      return 'Password is not strong enough. Please use a stronger password.'
    default:
      return 'Unknown error occured. Please try again later and contact an administrator if the problem persists.'
  }
}

const auth = getAuth(firebaseApp);

interface AuthContext {
  user: User | null;
  isAuthLoadingRef: MutableRefObject<boolean>;
  authErrorMessage: string;
  signUp: (email: string, password: string) => Promise<UserCredential | undefined>;
  signIn: (email: string, password: string) => Promise<UserCredential | undefined>;
  signOut: () => Promise<void | null>;
}

const ERR_NO_FIREBASE_AUTH = 'An error has occured. Please inform an administrator of the following:\n'
  + 'AuthContext used outside AuthContextProvider';
const emptyAuthContext: AuthContext = {
  user: null,
  isAuthLoadingRef: { current: false },
  authErrorMessage: ERR_NO_FIREBASE_AUTH,
  signUp: () => Promise.reject(ERR_NO_FIREBASE_AUTH),
  signIn: () => Promise.reject(ERR_NO_FIREBASE_AUTH),
  signOut: () => Promise.reject(ERR_NO_FIREBASE_AUTH)
}

const AuthContextComponent = createContext(emptyAuthContext);

export function useAuthContext() {
  return useContext(AuthContextComponent);
}

interface Props {
  children?: React.ReactNode;
}

/**
 * Provides authentication context of the current user.
 * All authentication actions such as signing in, signing out are debounced even when
 * called multiple times.
 *
 * @param children Children nodes to receive authentication context.
 */
export function AuthContextProvider({ children=null }: Props) {
  const {
    resolve: resolveUserCredentials,
    isLoadingRef: isAuthLoadingRef,
    error: authError
  } = usePromise();

  const signUp = useCallback((email: string, password: string) => {
    return resolveUserCredentials(
      () => createUserWithEmailAndPassword(auth, email, password)
    );
  }, [resolveUserCredentials]);

  const signIn = useCallback((email: string, password: string) => {
    return resolveUserCredentials(
      () => signInWithEmailAndPassword(auth, email, password)
    );
  }, [resolveUserCredentials]);

  const signOutWrapped = useCallback(() => {
    return resolveUserCredentials(
      () => signOut(auth)
    );
  }, [resolveUserCredentials]);

  const subscribe = useCallback((onStoreChange: OnStoreChange<User | null>) => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      onStoreChange(newUser);
    });

    return unsubscribe;
  }, []);

  const value: AuthContext = {
    user: useClientSyncExternalStore(subscribe),
    isAuthLoadingRef,
    authErrorMessage: formatAuthErrorMessage(getErrorCode(authError)),
    signUp,
    signIn,
    signOut: signOutWrapped,
  };

  return (
    <AuthContextComponent.Provider value={value}>
      {children}
    </AuthContextComponent.Provider>
  );
}
