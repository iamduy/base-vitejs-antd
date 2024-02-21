export interface TokenInfo {
  exp: number;
  iat: string;
  number: number;
  jti: string;
  name: string;
  sub: number;
  username: string;
  uuid: string;
}

export interface AuthInfo {
  accessToken: string;
  refreshToken: string;
}
