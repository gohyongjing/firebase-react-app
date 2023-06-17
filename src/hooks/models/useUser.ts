import { useCallback } from "react";
import { UpdateData, WithFieldValue } from "firebase/firestore";
import useModel from "../utility/useModel";

interface User {
  userName: string
}

const defaultUserModel: User = {
  userName: ''
}

export default function useUser() {
  const {
    getModel,
    setModel,
    updateModel,
    deleteModel,
    isLoading,
    error
  } = useModel(defaultUserModel);

  const getUser = useCallback((userId: string) => {
    return getModel(`users/${userId}`);
  }, [getModel]);

  const setUser = useCallback((userId: string, newUser: WithFieldValue<User>) => {
    return setModel(`users/${userId}`, newUser)
  }, [setModel]);

  const updateUser = useCallback((userId: string, userUpdates: UpdateData<User>) => {
    return updateModel(`users/${userId}`, userUpdates);
  }, [updateModel]);

  const deleteUser = useCallback((userId: string) => {
    return deleteModel(`users/${userId}`);
  }, [deleteModel]);

  return {
    getUser,
    setUser,
    updateUser,
    deleteUser,
    userIsLoading: isLoading,
    userError: error
  }
}