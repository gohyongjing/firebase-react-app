import { WithId, getModelOperationsWithPath } from "utility/model";
import { Settings } from "..";
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

export const FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_SETTINGS = 'rockPaperScissorsSettings';

export const defaultSettingsModel: Settings = {
  roomName: 'Rock Paper Scissors',
  visibility: 'public',
  roundsToWin: 3,
  hostId: ''
}

const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_GAMES_ROCK_PAPER_SCISSORS_SETTINGS,
  defaultSettingsModel
);

export const addSetting: (
  newSetting: WithFieldValue<Settings>
) => Promise<DocumentReference<DocumentData> | undefined>
  = ops.addModel;

export const setSetting: (
  settingId: string,
  newSetting: WithFieldValue<Settings>,
  setOptions?: SetOptions
) => Promise<void>
  = ops.setModel;

export const getSetting: (settingId: string) => Promise<WithId<Settings> | undefined>
  = ops.getModel;

export const getSettings: 
  ((queryCompositeFilterConstraint: QueryCompositeFilterConstraint) => Promise<WithId<Settings>[]>)
  & ((...queryConstraints: QueryConstraint[]) => Promise<WithId<Settings>[]>)
  = ops.getModels;

export const getSettingWhere:
  ((queryCompositeFilterConstraint: QueryCompositeFilterConstraint) => Promise<WithId<Settings> | undefined>)
  & ((...queryConstraints: QueryConstraint[]) => Promise<WithId<Settings> | undefined>)
  = ops.getModelWhere;

export const updateSetting: (
  settingId: string,
  settingUpdates: UpdateData<Settings>
) => Promise<void>
  = ops.updateModel;

export const deleteSetting: (settingId: string) => Promise<void>
  = ops.deleteModel;

export const subscribeSetting: (
  settingId: string,
  onNext: (setting: WithId<Settings> | undefined) => void
) => Unsubscribe
  = ops.subscribeModel;

export const subscribeSettings: (
  onNext: (settings: WithId<Settings>[]) => void,
  ...queryConstraints: QueryConstraint[]
) => Unsubscribe
  = ops.subscribeModels
