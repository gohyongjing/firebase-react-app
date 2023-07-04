import { getLocalStorage, setLocalSotrage } from "./localStorage";

interface ModelOperations<T> {
  setModel: (key: string, newData: T) => void,
  getModel: (key: string) => T,
}

export function getModelOperations<T extends string>(
  defaultData: T,
  checkIsT: (t: unknown) => t is T
): ModelOperations<T> {

  /**
   * Retrieves local storage data if exists, default value otherwise.
   *
   * @param key Key of local storage data.
   * @returns Padded data.
   */
  function getModel(key: string) {
    const data = getLocalStorage(key);
    if (!checkIsT(data)) {
      return defaultData;
    }
    return data;
  };

  return {
    setModel: setLocalSotrage,
    getModel,
  }
}
