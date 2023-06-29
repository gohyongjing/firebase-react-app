import { sendWelcomeNotification } from "features/notification";
import { UserCredential } from "firebase/auth";
import { getModelOperationsWithPath } from "utility/model";

const FIRESTORE_PATH_USERS = 'users';

interface User {
  userName: string
}

const defaultUserModel: User = {
  userName: ''
}

const ops = getModelOperationsWithPath(
  FIRESTORE_PATH_USERS,
  defaultUserModel
);

//const addUser = ops.addModel;
const setUser = ops.setModel;
export const getUser: ((userId: string) => Promise<User | undefined>) = ops.getModel;
//const getUsers = ops.getModels;
const updateUser = ops.updateModel;
//const deleteUser = ops.deleteModel;

export function processUserSignUp(userCredential: UserCredential) {
  const userId = userCredential.user.uid;
  const createUserDocument = setUser(userId, defaultUserModel);
  const createWelcomeNotification = sendWelcomeNotification(userId);
  return Promise.all([
    createUserDocument,
    createWelcomeNotification
  ])
};

export async function processUserSignIn(userCredential: UserCredential) {
  const userId = userCredential.user.uid;
  const checkUserDocument = getUser(userId)
    .then(user => {
      if (user === undefined) {
        setUser(userId, defaultUserModel);
      }
    });
  await Promise.all([
    checkUserDocument
  ]);
};

export function updateUserName(userId: string, userName: string) {
  return updateUser(userId, {
    userName: userName
  });
}
