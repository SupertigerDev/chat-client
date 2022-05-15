
export enum StorageKeys {
  USER_TOKEN = 'userToken',
  INBOX_DRAWER_SELECTED_INDEX = 'inboxDrawerSelectedIndex'
}

export function getStorageString<T>(key: StorageKeys, defaultValue: T) {
  return localStorage.getItem(key) || defaultValue;
}

export function setStorageString(key: StorageKeys, value: string) {
  localStorage.setItem(key, value);
}

export function getStorageNumber<T>(key: StorageKeys, defaultValue: T) {
    const value = localStorage.getItem(key);
    if (value === null) {
        return defaultValue;
    }
    return parseInt(value, 10);
}

export function setStorageNumber(key: StorageKeys, value: number) {
    localStorage.setItem(key, value.toString());
}