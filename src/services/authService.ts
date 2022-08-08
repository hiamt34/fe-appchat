import { IUser } from "../app/auth/authSlice";
import {
  LoginPayload,
  OauthPayload,
  RegisterPayload,
  ResRefreshToken,
} from "../interface/auth";
import { Response } from "../interface/common";
import client from "./client";
const authService = {
  login(data: LoginPayload) {
    const uri = "auth/signin";
    return client.post(uri, data);
  },

  logout(data: ResRefreshToken) {
    const uri = "auth/logout";
    return client.post(uri, data);
  },

  register(data: RegisterPayload): Promise<Response<IUser>> {
    const uri = "auth/register";
    return client.post(uri, data);
  },

  oauth(data: OauthPayload): Promise<Response<IUser>> {
    const uri = "auth/oauth";
    return client.post(uri, data);
  },
};

export default authService;
