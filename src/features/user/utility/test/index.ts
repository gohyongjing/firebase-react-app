import { User } from "features/user"
import { Timestamp } from "firebase/firestore"
import { WithId } from "utility/model"

export const USER_ALICE: WithId<User> = {
  id: 'alice',
  userName: 'Wonderland Explorer',
  dateCreated: Timestamp.fromDate(new Date(2000, 1, 30))
}

export const USER_BOB: WithId<User> = {
  id: 'bob',
  userName: 'Bob the Builder',
  dateCreated: Timestamp.fromDate(new Date(2003, 2, 30))
}

export const USER_CHARLIE: WithId<User> = {
  id: 'charlie',
  userName: 'Choco Factory',
  dateCreated: Timestamp.fromDate(new Date(1998, 3, 24))
}
