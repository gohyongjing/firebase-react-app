import { WithId, getModelOperationsWithPath } from "utility/model";
import { Room } from "..";
import {
  DocumentData,
  DocumentReference,
  QueryCompositeFilterConstraint,
  QueryConstraint,
  SetOptions,
  UpdateData,
  WithFieldValue
} from "lib/firebase/firestore";
import { Unsubscribe } from "hooks";
import { defaultSettingsModel } from "./settings";

export const FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_ROOMS = 'rockPaperScissorsRooms';

export const defaultRoomModel: Room = {
  ...defaultSettingsModel,
  status: 'ENDED'
}

const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_ROOMS,
  defaultRoomModel
);

export const addSetting: (
  newRoom: WithFieldValue<Room>
) => Promise<DocumentReference<DocumentData> | undefined>
  = ops.addModel;

export const setRoom: (
  settingId: string,
  newRoom: WithFieldValue<Room>,
  setOptions?: SetOptions
) => Promise<void>
  = ops.setModel;

export const getRoom: (settingId: string) => Promise<WithId<Room> | undefined>
  = ops.getModel;

export const getRooms: 
  ((queryCompositeFilterConstraint: QueryCompositeFilterConstraint) => Promise<WithId<Room>[]>)
  & ((...queryConstraints: QueryConstraint[]) => Promise<WithId<Room>[]>)
  = ops.getModels;

export const getSettingWhere:
  ((queryCompositeFilterConstraint: QueryCompositeFilterConstraint) => Promise<WithId<Room> | undefined>)
  & ((...queryConstraints: QueryConstraint[]) => Promise<WithId<Room> | undefined>)
  = ops.getModelWhere;

export const updateRoom: (
  roomId: string,
  roomUpdates: UpdateData<Room>
) => Promise<void>
  = ops.updateModel;

export const deleteRoom: (roomId: string) => Promise<void>
  = ops.deleteModel;

export const subscribeRoom: (
  roomId: string,
  onNext: (room: WithId<Room> | undefined) => void
) => Unsubscribe
  = ops.subscribeModel;

export const subscribeRooms: (
  onNext: (rooms: WithId<Room>[]) => void,
  ...queryConstraints: QueryConstraint[]
) => Unsubscribe
  = ops.subscribeModels
