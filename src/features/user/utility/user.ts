import {
  DocumentData,
  DocumentReference,
  QueryConstraint,
  SetOptions,
  Timestamp,
  Unsubscribe,
  UpdateData,
  WithFieldValue
} from "lib/firebase/firestore";
import { WithId, getModelOperationsWithPath } from "utility/model";
import { User } from "../types";

const FIRESTORE_PATH_USERS = 'users';

export const defaultUserModel: User = {
  userName: '',
  dateCreated: Timestamp.now()
}

const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_USERS,
  defaultUserModel
);

export const addUser: (
  newData: WithFieldValue<User>
) => Promise<DocumentReference<DocumentData> | undefined>
  = ops.addModel;

export const setUser: (
  userId: string,
  newUser: WithFieldValue<User>,
  setOptions?: SetOptions
) => Promise<void>
  = ops.setModel;

export const getUser: (userId: string) => Promise<WithId<User> | undefined>
  = ops.getModel;

export const getUsers: (...queryConstraints: QueryConstraint[]) => Promise<WithId<User>[]>
  = ops.getModels;

export const getUserWhere: (
  ...queryConstraints: QueryConstraint[]
) => Promise<WithId<User> | undefined>
  = ops.getModelWhere;

export const updateUser: (userId: string, userUpdates: UpdateData<User>) => Promise<void>
  = ops.updateModel;

export const deleteUser: (userId: string) => Promise<void>
  = ops.deleteModel;

export const subscribeUser: (
  userId: string,
  onNext: (user: WithId<User> | undefined) => void
) => Unsubscribe
  = ops.subscribeModel;

export const subscribeUsers: (
  onNext: (users: WithId<User>[]) => void,
  ...queryConstraints: QueryConstraint[]
) => Unsubscribe
  = ops.subscribeModels
