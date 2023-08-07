import { ClientFriendship } from "../types";
import { getFriendshipOfUsers } from "../utility/getFriendshipOfUsers";

/**
 * Checks the friendship status with another user.
 *
 * @param clientUserId UserId of the client.
 * @param otherUserId UserId of other user.
 * @returns ClientFriendship
 */
export async function getClientFriendship(
  clientUserId: string,
  otherUserId: string
): Promise<ClientFriendship> {
  const friendship = await getFriendshipOfUsers(clientUserId, otherUserId);
  const isSentByClientToOtherUser = friendship?.requesterId === clientUserId && friendship.recipientId === otherUserId;
  const isSentByOtherUserToClient = friendship?.requesterId === otherUserId && friendship.recipientId === clientUserId;
  if (!friendship) {
    return {
      friendship,
      status: 'NOT_FRIENDS'
    };
  } else if (
    (isSentByClientToOtherUser || isSentByOtherUserToClient) && friendship.dateAccepted
  ) {
    return {
      friendship,
      status: 'FRIENDS'
    };
  } else if (isSentByClientToOtherUser) {
    return {
      friendship,
      status: 'REQUEST_SENT'
    };
  } else if(isSentByOtherUserToClient) {
    return {
      friendship,
      status: 'REQUEST_RECEIVED'
    };
  }
  return {
    friendship,
    status: 'UNKNOWN'
  };
}
