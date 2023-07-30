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
import { Friendship } from "../types";

const FIRESTORE_PATH_FRIENDSHIPS = 'friendships';

export const defaultFriendshipModel: Friendship = {
  requesterId: '',
  recipientId: '',
  dateRequested: Timestamp.now(),
  dateAccepted: null
}

const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_FRIENDSHIPS,
  defaultFriendshipModel
);

export const addFriendship: (
  newFriendship: WithFieldValue<Friendship>
) => Promise<DocumentReference<DocumentData> | undefined>
  = ops.addModel;

export const setFriendship: (
  friendshipId: string,
  newFriendship: WithFieldValue<Friendship>,
  setOptions?: SetOptions
) => Promise<void>
  = ops.setModel;

export const getFriendship: (friendshipId: string) => Promise<WithId<Friendship> | undefined>
  = ops.getModel;

export const getFriendships: (...queryConstraints: QueryConstraint[]) => Promise<WithId<Friendship>[]>
  = ops.getModels;

export const getFriendshipWhere: (
  ...queryConstraints: QueryConstraint[]
) => Promise<WithId<Friendship> | undefined>
  = ops.getModelWhere;

export const updateFriendship: (
  friendshipId: string,
  friendshipUpdates: UpdateData<Friendship>
) => Promise<void>
  = ops.updateModel;

export const deleteFriendship: (friendshipId: string) => Promise<void>
  = ops.deleteModel;

export const subscribeFriendship: (
  friendshipId: string,
  onNext: (friendship: WithId<Friendship> | undefined) => void
) => Unsubscribe
  = ops.subscribeModel;

export const subscribeFriendships: (
  onNext: (friendships: WithId<Friendship>[]) => void,
  ...queryConstraints: QueryConstraint[]
) => Unsubscribe
  = ops.subscribeModels
