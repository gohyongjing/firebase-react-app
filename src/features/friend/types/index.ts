import { Timestamp } from "lib/firebase/firestore"

export type Friendship = {
  requesterId: string
  recipientId: string
  dateRequested: Timestamp
  dateAccepted: Timestamp | null
}
