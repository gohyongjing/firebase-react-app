import { User } from "features/user";
import { Timestamp } from "firebase/firestore";
import { WithId } from "utility/model";
import { resolve } from 'node:path';

// Test constants
export const PROJECT_ID = 'fakeproject2';
export const FIREBASE_JSON = resolve(__dirname, '../../../firebase.json');

export const ASYNC_DELAY_DURATION = 100;
export const ERR_ASYNC_REJECT_MESSAGE = 'Error message for testing purposes';

// Users
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
