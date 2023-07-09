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
import { Notification } from "../types";

const FIRESTORE_PATH_NOTIFICATIONS = 'notifications';

export const defaultNotificationModel: Notification = {
  type: 'Announcement',
  recipientId: '',
  title: 'Notification',
  message: 'You have a new notification!',
  timestamp: Timestamp.fromDate(new Date())
}

const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_NOTIFICATIONS,
  defaultNotificationModel
);

export const addNotification: (
  newNotification: WithFieldValue<Notification>
) => Promise<DocumentReference<DocumentData> | undefined>
  = ops.addModel;

export const setNotification: (
  notificationId: string,
  newNotification: WithFieldValue<Notification>,
  setOptions?: SetOptions
) => Promise<void>
  = ops.setModel;

export const getNotification: (notificationId: string) => Promise<WithId<Notification> | undefined>
  = ops.getModel;

export const getNotifications: (...queryConstraints: QueryConstraint[]) => Promise<WithId<Notification>[]>
  = ops.getModels;

export const getNotificationWhere: (
  ...queryConstraints: QueryConstraint[]
) => Promise<WithId<Notification> | undefined>
  = ops.getModelWhere;

export const updateNotification: (notificationId: string, userUpdates: UpdateData<Notification>) => Promise<void>
  = ops.updateModel;

export const deleteNotification: (notificationId: string) => Promise<void>
  = ops.deleteModel;

export const subscribeNotification: (
  notificationId: string,
  onNext: (notification: WithId<Notification> | undefined) => void
) => Unsubscribe
  = ops.subscribeModel;

export const subscribeNotifications: (
  onNext: (notifications: WithId<Notification>[]) => void,
  ...queryConstraints: QueryConstraint[]
) => Unsubscribe
  = ops.subscribeModels
