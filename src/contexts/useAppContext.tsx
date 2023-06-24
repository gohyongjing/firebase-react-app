import { User } from "firebase/auth";
import { Dispatch, ReactNode, createContext, useCallback, useContext, useReducer } from "react";
import { Notification, subscribeUserNotifications } from "../models/notification";
import useClientSyncExternalStore, { OnStoreChange } from "../hooks/utility/useClientSyncExternalStore";
import { subscribeAuth } from "../utility/firebase/auth";
import { WithId } from "../utility/model";

const ERR_NO_CONTEXT_PROVIDER = 'An error has occured. Please inform an administrator of the following:\n'
  + 'AppContext used outside AppContextProvider';

interface AppState {
  user: User | null | undefined
  notifications: WithId<Notification>[]
  error: unknown
}

interface APP_ACTION_SIGN_IN {
  type: 'SIGN_IN'
  payload: AppState
}

type AppAction = APP_ACTION_SIGN_IN

type AppContextStructure = AppState & {
  dispatch: Dispatch<AppAction>
}

const DEFAULT_APP_STATE: AppState = {
  user: null,
  notifications: [],
  error: ERR_NO_CONTEXT_PROVIDER
}

const DEFAULT_APP_CONTEXT: AppContextStructure = {
  ...DEFAULT_APP_STATE,
  dispatch: () => {},
}

const AppContext = createContext<AppContextStructure>(DEFAULT_APP_CONTEXT);

function AppContextReducer(state: AppState, action: AppAction) {
  return {
    ...state,
    ...action.payload
  }
}

export function useAppContext() {
  return useContext(AppContext);
}

interface Props {
  children?: ReactNode
}

export default function AppContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(
    AppContextReducer,
    DEFAULT_APP_STATE
  );

  const firebaseUser = useClientSyncExternalStore(subscribeAuth);

  const wrappedSubscribeUserNotifications = useCallback((
    onStoreChange: OnStoreChange<WithId<Notification>[]>
  ) => {
    if (!firebaseUser) {
      const unsubscribe = () => {};
      return unsubscribe;
    }
    return subscribeUserNotifications(firebaseUser.uid, onStoreChange);
  }, [firebaseUser])

  const notifications = useClientSyncExternalStore(wrappedSubscribeUserNotifications) ?? [];

  const appContext: AppContextStructure = {
    ...state,
    user: firebaseUser,
    notifications: notifications,
    error: '',
    dispatch
  }

  return (
    <AppContext.Provider
      value={appContext}
      children={children}
    />
  );
}
