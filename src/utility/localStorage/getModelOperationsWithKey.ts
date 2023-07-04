import { getModelOperations } from "./getModelOperations"

interface ModelOperationsWithKey<T> {
  setModel: (newData: T) => void,
  getModel: () => T,
}

export function getModelOperationsWithKey<T extends string>(
  key: string,
  defaultData: T,
  checkIsT: (t: unknown) => t is T
): ModelOperationsWithKey<T> {
  const ops = getModelOperations(defaultData, checkIsT);
  
  function getModel() {
    return ops.getModel(key);
  }

  function setModel(newData: T) {
    return ops.setModel(key, newData)
  }
  
  return {
    getModel,
    setModel
  }
}
