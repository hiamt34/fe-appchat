// import { IUser } from ".";

import { IUser } from "../app/auth/authSlice";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    confirmPassword: string;
    name: string
}
export interface OauthPayload {
    email: string;
    authType: string;
    name: string;
    photo: string;
}
export interface LoginSuccess {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    statusCode: number;
}

export interface ResRefreshToken {
    accessToken: string;
    refreshToken: string;
}

export interface ReqError {
    code: number;
    message: string;
    status: false;
}