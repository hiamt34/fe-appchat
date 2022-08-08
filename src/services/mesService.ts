import { IMes } from "../app/room/roomSlice";
import { Response } from "../interface/common";
import client from "./client";

export interface IGetMes {
    roomId: string
}
const mesService = {
  getMess(data: IGetMes): Promise<Response<IMes[]>> {
    const uri = "mes/get-mess";
    
    return client.post(uri,data);
  },
  insert(data: IMes) {
    const uri = "mes/insert";
    return client.post(uri, data);
  }
};

export default mesService;
