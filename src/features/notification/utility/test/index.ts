import { NOTIFICATION_MSG_WELCOME, NOTIFICATION_TITLE_WELCOME, NOTIFICATION_TYPE_ANNOUNCEMENT, NOTIFICATION_TYPE_FRIEND_REQUEST, Notification } from "features/notification";
import { NOTIFICATION_MSG_FRIEND_REQUEST, NOTIFICATION_TITLE_FRIEND_REQUEST } from "features/notification/api/sendFriendRequestNotification";
import { USER_ALICE, USER_BOB } from "features/user/utility/test";
import { Timestamp } from "firebase/firestore";

export const NOTIFICATION_WELCOME_ALICE: Notification = {
  type: NOTIFICATION_TYPE_ANNOUNCEMENT,
  recipientId: USER_ALICE.id,
  title: NOTIFICATION_TITLE_WELCOME,
  message: NOTIFICATION_MSG_WELCOME,
  timestamp: Timestamp.fromDate(new Date(USER_ALICE.dateCreated.toDate().getDate() + 1))
}

export const NOTIFICATION_WELCOME_BOB: Notification = {
  type: NOTIFICATION_TYPE_ANNOUNCEMENT,
  recipientId: USER_BOB.id,
  title: NOTIFICATION_TITLE_WELCOME,
  message: NOTIFICATION_MSG_WELCOME,
  timestamp: Timestamp.fromDate(new Date(USER_BOB.dateCreated.toDate().getDate() + 1))
}

export const NOTIFICATION_FRIEND_REQUEST_ALICE_TO_BOB: Notification = {
  type: NOTIFICATION_TYPE_FRIEND_REQUEST,
  recipientId: USER_BOB.id,
  title: NOTIFICATION_TITLE_FRIEND_REQUEST,
  message: NOTIFICATION_MSG_FRIEND_REQUEST,
  timestamp: Timestamp.fromDate(new Date(USER_BOB.dateCreated.toDate().getDate() + 5))
}
