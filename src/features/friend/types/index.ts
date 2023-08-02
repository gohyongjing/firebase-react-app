import { Timestamp } from "lib/firebase/firestore"

export type Friendship = {
  requesterId: string
  recipientId: string
  dateRequested: Timestamp
  dateAccepted: Timestamp | null
}

export type FriendshipStatus = 'NOT_FRIENDS' | 'FRIENDS' | 'REQUEST_SENT' | 'REQUEST_RECEIVED' | 'UNKNOWN'
