import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Response } from "../../interface/common";
import { IGetMes } from "../../services/mesService";
import { IOutRoom, IRoom } from "../../services/roomService";
import { IUser } from "../auth/authSlice";
import { RootState } from "../store";
export interface IMes {
  _id?: string;
  roomId: string;
  senderId: string | IUser | any;
  conten: string;
  createdAt: string;
  reply?: string;
  [key: string]: any;
}
export interface RoomSate {
  rooms: IRoom[];
  loadding: boolean;
  mess: IMes[];
  roomIdGetMess: string | undefined;
  members: IUser[];
  room: IRoom | undefined;
  notifyMsg: INotyfysMsg[]
}
export interface IMemberReq {
  ids: string[];
}
export interface IDeleteMes {
  _id: string;
}
export interface INotyfysMsg {
  userId: string,
  roomId: string
}
const initialState: RoomSate = {
  rooms: [],
  loadding: false,
  mess: [],
  roomIdGetMess: undefined,
  members: [],
  room: undefined,
  notifyMsg: []
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRoom(state) {
      state.loadding = true;
    },
    inserRoom(state, action: PayloadAction<IRoom>) {
      state.loadding = true;
    },
    insertRoomSuccess(state, action: PayloadAction<Response<IRoom>>) {
      state.loadding = false;
      state.roomIdGetMess = action.payload.payload._id;
      state.room = action.payload.payload;
    },
    inserRoomFalse(state) {
      state.roomIdGetMess = undefined;
      state.room = undefined;
      state.loadding = false;
    },
    getRoomSuccess(state, action: PayloadAction<Response<IRoom[]>>) {
      state.loadding = false;
      state.rooms = action.payload.payload;
    },
    getFail(state) {
      state.loadding = false;
    },
    getMess(state, action: PayloadAction<IGetMes>) {
      state.loadding = true;
      state.roomIdGetMess = action.payload.roomId;
      state.mess = [];
    },
    getMessSuccess(state, action: PayloadAction<Response<IMes[]>>) {
      state.loadding = false;
      state.mess = action.payload.payload;
    },
    getMessFail(state) {
      state.loadding = false;
      state.roomIdGetMess = undefined;
    },
    getMembers(state, action: PayloadAction<IMemberReq>) {
      state.loadding = true;
    },
    getMembersSuccess(state, action: PayloadAction<Response<IUser[]>>) {
      state.loadding = false;
      state.members = action.payload.payload;
    },
    getMembersFail(state) {
      state.loadding = false;
      state.roomIdGetMess = undefined;
      state.members = [];
      state.room = undefined;
    },
    logout(state) {
      state.roomIdGetMess = undefined;
      state.members = [];
      state.room = undefined;
      state.rooms = []
    },
    insertMes(state, action: PayloadAction<IMes>) {      
      state.mess.push(action.payload);
    },
    deleteMes(state, action: PayloadAction<IDeleteMes>) {
      state.mess = state.mess.filter((mes) => mes._id !== action.payload._id);
    },
    saveRoom(state, action: PayloadAction<IRoom>) {
      state.room = action.payload;
    },
    outRoom(state, action: PayloadAction<IOutRoom>) {
      state.room = undefined;
      state.roomIdGetMess = undefined;
      state.rooms = state.rooms.filter((r) => r._id !== action.payload.roomId);
    },
    insertNotitysMsg(state, action: PayloadAction<INotyfysMsg[]>) {
      state.notifyMsg = action.payload
    }
  },
});

//export action
export const roomAction = roomSlice.actions;

//export selectors
export const selectLoadding = (state: RootState) => state.room.loadding;
export const selectRooms = (state: RootState) => state.room.rooms;
export const selectRoom = (state: RootState) => state.room.room;
export const selectRoomId = (state: RootState) => state.room.roomIdGetMess;
export const selectMembers = (state: RootState) => state.room.members;
export const selectMess = (state: RootState) => state.room.mess;
export const selectNotifysMsg = (state: RootState) => state.room.notifyMsg;
//export reducer
const roomReducer = roomSlice.reducer;
export default roomReducer;
