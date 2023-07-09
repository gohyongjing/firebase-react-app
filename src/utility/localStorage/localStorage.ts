import { hasKey, isObject } from "../typePredicates/isFunction";

const LOCAL_STORAGE_KEY = 'firebase-react-app';

function _parseLocalStorage(): Object {
  const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!rawData) {
    return {};
  }
  const data = JSON.parse(rawData);
  if (!isObject(data)) {
    return {};
  }
  return data;
}

function _saveLocalStorage(data: {}) {
  return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export function getLocalStorage(key: string) {
  const data = _parseLocalStorage();
  if (!hasKey(data, key)) {
    return '';
  }
  const value = data[key];
  if (typeof value !== 'string') {
    return '';
  }
  return value;
}

export function setLocalSotrage(key: string, value: string) {
  const data = _parseLocalStorage();
  if (!data) {
    _saveLocalStorage({ key: value })
  } else {
    const newData = {
      ...data,
      [key]: value
    }
    _saveLocalStorage(newData);
  }
}
