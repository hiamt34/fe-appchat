import { string } from "yup/lib/locale";
import { IUser } from "../app/auth/authSlice";
import { Response } from "../interface/common";
import client from "./client";
export interface ISearch {
  name: string
}
export interface IRoom {
    members?: [] | IUser[],
    _id?: string,
    name?: string,
    inforChat?: IUser
}
export interface IGetRoom {
    userId: string
}
export interface IOutRoom {
  userId: string,
  roomId: string,
}
const roomService = {
  getRoom(): Promise<Response<IRoom[]>> {
    const uri = "room/get-room";
    return client.get(uri);
  },
  insert(data: IRoom) {
    const uri = "room/insert";
    return client.post(uri, data);
  },
  search(search: ISearch): Promise<Response<IRoom[]>> {
    const uri = "room/search";
    return client.post(uri, search);
  },
  outRoom(data: IOutRoom) {
    const uri = "room/out-room";
    return client.post(uri, data);
  }
};

export default roomService;
