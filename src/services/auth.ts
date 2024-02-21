import { AuthInfo, TokenInfo } from '@/models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { StorageHelper, StorageKey } from './storage';

function verifyToken(token: string): boolean {
  if (!token) {
    throw Error('Token invalid');
  }

  const decodeAccessToken: TokenInfo = jwtDecode(token);
  const now = new Date().getTime();
  const exp = decodeAccessToken.exp;
  if (now - exp <= 0) {
    throw Error('Token invalid');
  }

  return true;
}

function validateToken(input: {
  accessToken: string;
  refreshToken: string;
}): boolean {
  return verifyToken(input?.accessToken) && verifyToken(input?.refreshToken);
}

export const AuthHelper = {
  saveAuthenticate: (input: { accessToken: string; refreshToken: string }) => {
    validateToken(input);
    StorageHelper.save(StorageKey.authInfo, input);
  },
  validateToken: (input: {
    accessToken: string;
    refreshToken: string;
  }): boolean => {
    return validateToken(input);
  },
  getAuthToken: () => {
    const authInfo = StorageHelper.load<AuthInfo>(StorageKey.authInfo);
    if (!authInfo) {
      return '';
    }
    AuthHelper.validateToken(authInfo);
    return `Bearer ${authInfo.accessToken}`;
  },
};
