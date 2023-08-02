import { Timestamp } from "lib/firebase/firestore"
import { WithId } from "utility/model"

export type Friendship = {
  requesterId: string
  recipientId: string
  dateRequested: Timestamp
  dateAccepted: Timestamp | null
}

export type ClientFriendship = {
  friendship: WithId<Friendship>
  status: 'FRIENDS' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'UNKNOWN'
} | {
  friendship: undefined
  status: 'NOT_FRIENDS' | 'UNKNOWN'
}
