import { Friendship, FriendshipStatus } from "../types";

/**
 * Checks the friendship status with another user.
 * @param otherUserId UserId of other user.
 * @param friendship Friendship between the 2 users.
 * @returns FriendshipStatus
 */
export function getFriendshipStatus(
  otherUserId: string,
  friendship: Friendship | undefined
): FriendshipStatus {
  if (!friendship) {
    return 'NOT_FRIENDS'
  } else if (friendship.dateAccepted) {
    return 'FRIENDS';
  } else if (friendship.recipientId === otherUserId) {
    return 'REQUEST_SENT';
  } else if(friendship.requesterId === otherUserId) {
    return 'REQUEST_RECEIVED';
  }
  return 'UNKNOWN';
}
