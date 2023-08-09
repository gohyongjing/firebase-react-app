import { Settings } from "..";

export const FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_SETTINGS = 'rockPaperScissorsSettings';

export const defaultSettingsModel: Settings = {
  roomName: 'Rock Paper Scissors',
  visibility: 'public',
  roundsToWin: 3
}
/*
const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_SETTINGS,
  defaultSettingsModel
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

export const getFriendships: 
  ((queryCompositeFilterConstraint: QueryCompositeFilterConstraint) => Promise<WithId<Friendship>[]>)
  & ((...queryConstraints: QueryConstraint[]) => Promise<WithId<Friendship>[]>)
  = ops.getModels;

export const getFriendshipWhere:
  ((queryCompositeFilterConstraint: QueryCompositeFilterConstraint) => Promise<WithId<Friendship> | undefined>)
  & ((...queryConstraints: QueryConstraint[]) => Promise<WithId<Friendship> | undefined>)
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
*/
