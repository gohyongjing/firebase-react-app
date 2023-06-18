import { getModelOperationsWithPath } from "../utility/model";

const FIRESTORE_PATH_NOTIFICATIONS = 'notifications';

const NOTIFICATION_MSG_WELCOME = 'Welcome to firebase-react-app!'

type NotificationType = 'Announcement';

interface Notification {
  type: NotificationType
  recipientId: string
  message: string
}

export const defaultNotificationModel: Notification = {
  type: 'Announcement',
  recipientId: '',
  message: '',
}

const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_NOTIFICATIONS,
  defaultNotificationModel
);

const addNotification = ops.addModel;
//const setNotification = ops.setModel;
//const getNotification = ops.getModel;
//const getNotifications = ops.getModels;
//const updateNotification = ops.updateModel;
//const deleteNotification = ops.deleteModel;

export function sendWelcomeNotification(userId: string) {
  return addNotification({
    type: 'Announcement',
    recipientId: userId,
    message: NOTIFICATION_MSG_WELCOME
  })
}
