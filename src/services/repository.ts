import { AuthHelper } from '.';
import { StorageHelper, StorageKey } from './storage';

export const Repository = {
  dispatchEventStorage: () => {
    return window.dispatchEvent(new Event('storage'));
  },
  isLogin: (): boolean => {
    return !!AuthHelper.getAuthToken();
  },
  logout: () => {
    StorageHelper.remove(StorageKey.authInfo);
    Repository.dispatchEventStorage();
  },
};
