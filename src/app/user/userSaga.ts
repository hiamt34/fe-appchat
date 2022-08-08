import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { Response } from "../../interface/common";
import userService, { ISearch } from "../../services/userService";
import { alertAction } from "../alert/alertSlice";
import { IUser } from "../auth/authSlice";
import { userAction } from "./userSlice";
function* HandleGetAllUsers() {
  try {
    const data: Response<IUser[]> = yield call(userService.getAll);

    yield put(userAction.getAllSuccess(data));
  } catch (error: any) {
    yield put(userAction.gatAllfail());
    yield put(
      alertAction.changeMessage({
        message: error.data?.message,
        type: "error",
      })
    );
  }
}
function* HandleGetUser() {
  try {
    const data: Response<IUser> = yield call(userService.get);
    yield put(userAction.getSuccess(data));
  } catch (error: any) {
    yield put(userAction.getFail());
    yield put(
      alertAction.changeMessage({
        message: error.data?.message,
        type: "error",
      })
    );
  }
}

function* HandleSearch(action: PayloadAction<ISearch>) {
  try {
    const data: Response<IUser[]> = yield call(userService.search, action.payload);

    yield put(userAction.getAllSuccess(data));
  } catch (error: any) {
    yield put(
      alertAction.changeMessage({
        message: error.data?.message || error.statusText,
        type: "error",
      })
    );
  }
}
export function* userSaga() {
  //   yield fork(watchLoginFlow);
  yield takeEvery(userAction.getAll.type, HandleGetAllUsers);
  yield takeEvery(userAction.get.type, HandleGetUser);
  yield takeEvery(userAction.search.type, HandleSearch);
}
