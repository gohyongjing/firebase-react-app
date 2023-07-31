import { Timestamp } from "lib/firebase/firestore"

export interface User {
  userName: string
  dateCreated: Timestamp
}
