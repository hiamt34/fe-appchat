import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { io } from "socket.io-client";
import { Response } from "../../interface/common";
import mesService, { IGetMes } from "../../services/mesService";
import roomService, { IOutRoom, IRoom } from "../../services/roomService";
import userService from "../../services/userService";
import { alertAction } from "../alert/alertSlice";
import { IUser } from "../auth/authSlice";
import { IMemberReq, IMes, roomAction } from "./roomSlice";


function* HandleGetgetRoom() {
    try {
        const data: Response<IRoom[]> = yield call(roomService.getRoom);
        yield put(roomAction.getRoomSuccess(data));
        
    } catch (error: any) {
        yield put(
            alertAction.changeMessage({
              message: error.data?.message || error.statusText,
              type: "error",
            })
        );
    }
}
function* HandleGetMess(action: PayloadAction<IGetMes>) {
    try {
        const data: Response<IMes[]> = yield call(mesService.getMess, action.payload);
        yield put(roomAction.getMessSuccess(data));
        
    } catch (error: any) {
        yield put(roomAction.getMessFail());
        yield put(
            alertAction.changeMessage({
              message: error.data?.message || error.statusText,
              type: "error",
            })
        );
    }
}
function* HandleGetMembers(action: PayloadAction<IMemberReq>) {
    try {
        const data: Response<IUser[]> = yield call(userService.search, action.payload);
        
        yield put(roomAction.getMembersSuccess(data));
        
    } catch (error: any) {
        yield put(roomAction.getMembersFail());
        yield put(
            alertAction.changeMessage({
              message: error.data?.message || error.statusText,
              type: "error",
            })
        );
    }
}
function* HandleInsertRoom(action: PayloadAction<IRoom>) {
    try {
        const data: Response<IRoom> = yield call(roomService.insert, action.payload);        
        yield put(roomAction.insertRoomSuccess(data));
        // yield put(roomAction.getMembersSuccess(data.payload.members))
        yield put(roomAction.getRoom());
        yield put(
            alertAction.changeMessage({
              message: "create room success",
              type: "success",
            })
        );
    } catch (error: any) {
        yield put(roomAction.inserRoomFalse());
        yield put(
            alertAction.changeMessage({
              message: error.data?.message || error.statusText,
              type: "error",
            })
        );
    }
}
function* HandleOutRoom(action: PayloadAction<IOutRoom>) {
    try {
        yield call(roomService.outRoom, action.payload);
        yield put(
            alertAction.changeMessage({
              message: "out room success",
              type: "success",
            })
        );
    } catch (error: any) {
        yield put(
            alertAction.changeMessage({
              message: error.data?.message || error.statusText,
              type: "error",
            })
        );
    }
}
function* HandleIsertMes(action: PayloadAction<IMes>) {
    try {
        yield call(mesService.insert, action.payload); /// co the gửi bằng rabitMQ thi bo cái này đi
    } catch (error: any) {
        yield put(
            alertAction.changeMessage({
              message: error.data?.message || error.statusText,
              type: "error",
            })
        );
    }
}

export function* roomSaga() {
    //   yield fork(watchLoginFlow);
    yield takeEvery(roomAction.getRoom.type, HandleGetgetRoom);
    yield takeEvery(roomAction.getMess.type, HandleGetMess);
    yield takeEvery(roomAction.getMembers.type, HandleGetMembers);
    yield takeEvery(roomAction.inserRoom.type, HandleInsertRoom);
    yield takeEvery(roomAction.outRoom.type, HandleOutRoom);
    yield takeEvery(roomAction.insertMes.type, HandleIsertMes);

  }