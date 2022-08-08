import { IUser } from "../app/auth/authSlice";
import { Response } from "../interface/common";
import client from "./client";
export interface ISearch {
  name?: string
  ids?: string[]
}
const userService = {
  getAll(): Promise<Response<IUser[]>> {
    const uri = "user/get-all";
    return client.get(uri);
  },
  get(): Promise<Response<IUser>> {
    const uri = "user/get";
    return client.get(uri);
  },
  search(search: ISearch): Promise<Response<IUser[]>> {
    const uri = "user/search";
    return client.post(uri, search);
  }
};

export default userService;
