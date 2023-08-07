import { Friendship } from "features/friend";
import { USER_ALICE, USER_BOB, USER_CHARLIE } from "features/user/utility/test";
import { Timestamp } from "firebase/firestore";
import { addToDate } from "utility/addToDate";

export const FRIENDSHIP_REQUEST_ALICE_TO_BOB: Friendship = {
  requesterId: USER_ALICE.id,
  recipientId: USER_BOB.id,
  dateRequested: Timestamp.fromDate(
    addToDate(USER_BOB.dateCreated.toDate(), 1)
  ),
  dateAccepted: null
}

export const FRIENDSHIP_REQUEST_BOB_TO_ALICE: Friendship = {
  requesterId: USER_BOB.id,
  recipientId: USER_ALICE.id,
  dateRequested: Timestamp.fromDate(
    addToDate(USER_BOB.dateCreated.toDate(), 2)
  ),
  dateAccepted: null
}

export const FRIENDSHIP_REQUEST_BOB_TO_CHARLIE: Friendship = {
  requesterId: USER_BOB.id,
  recipientId: USER_CHARLIE.id,
  dateRequested: Timestamp.fromDate(
    addToDate(USER_CHARLIE.dateCreated.toDate(), 3)
  ),
  dateAccepted: null
}

export const FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE: Friendship = {
  requesterId: USER_CHARLIE.id,
  recipientId: USER_ALICE.id,
  dateRequested: Timestamp.fromDate(
    addToDate(USER_CHARLIE.dateCreated.toDate(), 3)
  ),
  dateAccepted: null
}

export const FRIENDSHIP_ALICE_WITH_BOB: Friendship = {
  ...FRIENDSHIP_REQUEST_ALICE_TO_BOB,
  dateAccepted: Timestamp.fromDate(
    addToDate(FRIENDSHIP_REQUEST_ALICE_TO_BOB.dateRequested.toDate(), 1)
  )
}

export const FRIENDSHIP_CHARLIE_WITH_ALICE: Friendship = {
  ...FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE,
  dateAccepted: Timestamp.fromDate(
    addToDate(FRIENDSHIP_REQUEST_CHARLIE_TO_ALICE.dateRequested.toDate(), 1)
  )
}
