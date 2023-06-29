import { WithId } from "utility/model";
import { subscribeNotifications } from "../utility/notification";
import { where } from "firebase/firestore";
import { Notification } from "../types";

export function subscribeUserNotifications(
  userId: string,
  onNext: (notifications: WithId<Notification>[]) => void,
) {
  return subscribeNotifications(onNext, where('recipientId', '==', userId));
}
