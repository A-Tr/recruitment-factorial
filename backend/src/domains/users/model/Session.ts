import { Request } from 'express';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
  tokenExpiresIn: number;
}

export interface UserSession {
  email: string;
}

export interface AuthorizedRequest extends Request {
  user: UserSession;
}
