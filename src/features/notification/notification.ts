import { Timestamp, where } from "firebase/firestore";
import { OnStoreChange } from "hooks/useClientSyncExternalStore";
import { WithId, getModelOperationsWithPath } from "utility/model";

const FIRESTORE_PATH_NOTIFICATIONS = 'notifications';

const NOTIFICATION_MSG_WELCOME = 'Welcome to firebase-react-app!'

type NotificationType = 'Announcement';

export interface Notification {
  type: NotificationType
  recipientId: string
  message: string
  timestamp: Timestamp
}

export const defaultNotificationModel: Notification = {
  type: 'Announcement',
  recipientId: '',
  message: '',
  timestamp: Timestamp.fromDate(new Date())
}


console.log('notif', getModelOperationsWithPath)

const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_NOTIFICATIONS,
  defaultNotificationModel
);

console.log('notif ops', ops)


const addNotification = ops.addModel;
//const setNotification = ops.setModel;
//const getNotification = ops.getModel;
//const getNotifications = ops.getModels;
//const updateNotification = ops.updateModel;
//const deleteNotification = ops.deleteModel;
//const subscribeNotification = ops.subscribeModel;
const subscribeNotifications = ops.subscribeModels;

export function sendWelcomeNotification(userId: string) {
  return addNotification({
    type: 'Announcement',
    recipientId: userId,
    message: NOTIFICATION_MSG_WELCOME,
    timestamp: Timestamp.fromDate(new Date())
  })
}

export function subscribeUserNotifications(
  userId: string,
  onStoreChange: OnStoreChange<WithId<Notification>[]>
) {
  return subscribeNotifications(onStoreChange, where('recipientId', '==', userId));
}
