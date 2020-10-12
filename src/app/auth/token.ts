import { User } from './user';

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface JWTDecoded {
  email: string;
  exp?: number;
  iat: number;
  id: string;
  name?: string;
  role?: string;
}
