import { DocumentData, DocumentReference, UpdateData, WithFieldValue } from "lib/firebase/firestore";
import { Settings } from "..";
import { addSetting, updateSetting } from "../utility/settings";

export async function saveSetting(newSetting: WithFieldValue<Settings>): Promise<DocumentReference<DocumentData> | undefined>
export async function saveSetting(settingId: string, settingUpdates: UpdateData<Settings>): Promise<void>
export async function saveSetting(newSettingOrsettingId: WithFieldValue<Settings> | string, settingUpdates?: UpdateData<Settings>) {
  if (typeof newSettingOrsettingId === 'string' && settingUpdates) {
    return updateSetting(newSettingOrsettingId, settingUpdates);
  }
  if (typeof newSettingOrsettingId !== 'string') {
    return addSetting(newSettingOrsettingId);
  }
}
