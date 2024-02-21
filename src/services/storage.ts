export enum StorageKey {
  isLogin = 'isLogin',
  authInfo = 'authInfo',
}

export class StorageHelper {
  static save(key: StorageKey, value: unknown) {
    return localStorage.setItem(key.toString(), JSON.stringify(value));
  }

  static load<T>(key: StorageKey, defaultValue?: T): T {
    const cacheData = localStorage.getItem(key.toString());
    if (!cacheData) {
      return defaultValue as T;
    }
    return JSON.parse(cacheData) as T;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
