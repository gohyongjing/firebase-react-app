import { where } from "lib/firebase/firestore";
import { getSettingWhere } from "../utility/settings";

export function getSettingsByHostId(hostId: string) {
  return getSettingWhere(where('hostId', '==', hostId));
}
