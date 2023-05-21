import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from "firebase/auth";
import  useFirebase from "../hooks/useFirebase"
import { PATH_DASHBOARD, PATH_LOG_IN } from "../app/AppRoutes";
import usePromise from "../hooks/usePromise";

/**
 * Format Firebase Auth error into user friendly messages.
 * The Auth error codes are based on Firebase JS version 8 API reference as it cannot be found in the verison 9 reference.
 * https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth
 *
 * @param error Authentication error due to signInWithEmailAndPassword
 *    or createUserWithEmailAndPassword.
 */
function formatAuthError(code: string) {
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

interface AuthContext {
  user: User | null;
  userCredential: UserCredential | null;
  authLoading: boolean;
  authError: string;
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
}

const ERR_NO_FIREBASE_AUTH = 'An error has occured. Please inform an administrator of the following:\n'
  + 'AuthContext used outside AuthContextProvider';
const emptyAuthContext: AuthContext = {
  user: null,
  userCredential: null,
  authLoading: false,
  authError: ERR_NO_FIREBASE_AUTH,
  signUp: () => {},
  logIn: () => {},
  logOut: () => {}
}

const AuthContextComponent = createContext(emptyAuthContext);

function useAuthContext() {
  return useContext(AuthContextComponent);
}

interface RouteElementProps {
  children?: JSX.Element | null;
}

function RequireAuth({ children=null }: RouteElementProps) {
  const { user } = useAuthContext();

  return user ? children : <Navigate replace to={PATH_LOG_IN}/>;
}

function RequireNoAuth({ children=null }: RouteElementProps) {
  const { user } = useAuthContext();

  return user ? <Navigate replace to={PATH_DASHBOARD}/> : children;
}

interface ContextProviderProps {
  children?: React.ReactNode;
}

function AuthContextProvider({ children=null }: ContextProviderProps) {
  const { auth } = useFirebase();
  const [userCredential, updateUserCrediential, authLoading, authError]
    = usePromise<UserCredential | null>(null);
  const [user, setUser] = useState<User | null>(null);

  function signUp(email: string, password: string) {
    updateUserCrediential(
      () => createUserWithEmailAndPassword(auth, email, password)
    );
  }

  function logIn(email: string, password: string) {
    updateUserCrediential(
      () => signInWithEmailAndPassword(auth, email, password)
    );
  }

  function logOut() {
    updateUserCrediential(
      () => signOut(auth).then(() => null)
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth]);

  const value = {
    user,
    userCredential,
    authLoading,
    authError: formatAuthError(authError.code),
    signUp,
    logIn,
    logOut,
  };

  return (
    <AuthContextComponent.Provider value={value}>
      {children}
    </AuthContextComponent.Provider>
  );

}

export { useAuthContext, RequireAuth, RequireNoAuth, AuthContextProvider }
