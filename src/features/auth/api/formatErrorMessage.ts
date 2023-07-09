import { hasKey } from "utility/typePredicates";

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
export function formatErrorMessage(error: unknown) {
  const code = getErrorCode(error);
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
