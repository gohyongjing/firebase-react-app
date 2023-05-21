import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from "firebase/auth";
import  useFirebase from "../hooks/useFirebase"
import { PATH_DASHBOARD, PATH_LOG_IN } from "../app/App";

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
  authError: string;
  signUp: (email: string, password: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const ERR_NO_FIREBASE_AUTH = 'An error has occured. Please inform an administrator of the following:\n'
  + 'AuthContext used outside AuthContextProvider';
const emptyAuthContext: AuthContext = {
  user: null,
  userCredential: null,
  authError: ERR_NO_FIREBASE_AUTH,
  signUp: () => Promise.reject(ERR_NO_FIREBASE_AUTH),
  logIn: () => Promise.reject(ERR_NO_FIREBASE_AUTH),
  logOut: () => Promise.reject(ERR_NO_FIREBASE_AUTH)
}

const AuthContextComponent = createContext<AuthContext>(emptyAuthContext);

function useAuthContext() {
  return useContext(AuthContextComponent);
}

interface Props {
  children: JSX.Element;
}

function RequireAuth({ children }: Props) {
  const { user } = useAuthContext();

  return user ? children : <Navigate replace to={PATH_LOG_IN}/>;
}

function RequireNoAuth({ children }: Props) {
  const { user } = useAuthContext();

  return user ? <Navigate replace to={PATH_DASHBOARD}/> : children;
}

function AuthContextProvider({ children }: Props) {
  const { auth } = useFirebase();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userCredential, setUserCredential] = useState<UserCredential | null>(null);
  const [authError, setAuthError] = useState('');

  function handleAuthError(e: {code: string}) {
    setAuthError(formatAuthError(e.code))
  }

  function cleanUp() {
    setUserCredential(null);
    setAuthError('');
  }

  function signUp(email: string, password: string) {
    cleanUp();
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserCredential(userCredential);
        navigate(PATH_DASHBOARD);
      })
      .catch(handleAuthError);
  }

  function logIn(email: string, password: string) {
    cleanUp();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserCredential(userCredential);
        navigate(PATH_DASHBOARD);
      })
      .catch(handleAuthError);
  }

  function logOut() {
    cleanUp();
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const value = {
    user,
    userCredential,
    authError,
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
