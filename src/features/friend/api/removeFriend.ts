import { deleteFriendship } from "../utility";
import { getClientFriendship } from "./getClientFriendship";

export async function removeFriend(requesterId: string, recipientId: string) {
  const clientFriendship = await getClientFriendship(requesterId, recipientId);
  if (clientFriendship.status !== 'FRIENDS') {
    console.error(`Bad request: User ${requesterId} cannot remove user ${recipientId} from thier friend list`);
    return;
  }
  return deleteFriendship(clientFriendship.friendship.id);
}
