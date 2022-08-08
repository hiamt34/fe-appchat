/* eslint-disable react-hooks/rules-of-hooks */
import { call, fork, put, take, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  LoginPayload,
  LoginSuccess,
  OauthPayload,
  RegisterPayload,
} from "../../interface/auth";
import { Response } from "../../interface/common";
import authService from "../../services/authService";
import {
  destroyToken,
  getLocalRefreshToken,
  getLocalToken,
  setToken,
} from "../../services/client";
import { alertAction } from "../alert/alertSlice";
import { authAction, IUser } from "./authSlice";
import jwt_decode from "jwt-decode"
import { roomAction } from "../room/roomSlice";
import { userAction } from "../user/userSlice";

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const data: Response<LoginSuccess> = yield call(
      authService.login,
      action.payload
    );

    setToken(data.payload.accessToken, data.payload.refreshToken);
    // const userDecode = jwt_decode(data.payload.accessToken) as IUser
    yield put(authAction.loginSuccess())
    yield put(
      alertAction.changeMessage({
        message: "Login success",
        type: "success",
      })
    );
  } catch (error: any) {
    yield put(authAction.loginFalse());
    yield put(
      alertAction.changeMessage({
        message: error.data.message,
        type: "error",
      })
    );
  }
}

function* HandleLogout() {  
  try {
    const token = {
      accessToken: getLocalToken() as string,
      refreshToken: getLocalRefreshToken() as string,
    };
    destroyToken();

    yield fork(authService.logout, token);
    yield put(roomAction.logout());
    yield put(userAction.logout());

    yield put(
      alertAction.changeMessage({
        message: "Logout success",
        type: "success",
      })
    );
  } catch (error: any) {
    destroyToken();

    yield put(roomAction.logout());
    yield put(userAction.logout());
    yield put(
      alertAction.changeMessage({
        message: error.data.message,
        type: "error",
      })
    );
  }
}
function* HandleRegister(action: PayloadAction<RegisterPayload>) {
  try {
    const data: Response<LoginSuccess> = yield call(
      authService.register,
      action.payload
    );

    setToken(data.payload.accessToken, data.payload.refreshToken);
    yield put(authAction.loginSuccess());
    yield put(
      alertAction.changeMessage({
        message: "Login success",
        type: "success",
      })
    );

  } catch (error: any) {
    yield put(authAction.loginFalse());
    yield put(
      alertAction.changeMessage({
        message: error.data.message,
        type: "error",
      })
    );
  }
}

function* HandleOauth(action: PayloadAction<OauthPayload>) {
    try {

        const data:Response<LoginSuccess> = yield call(authService.oauth, action.payload)
        
        setToken(data.payload.accessToken, data.payload.refreshToken)
        // const userDecode = jwt_decode(data.payload.accessToken) as IUser
        yield put(authAction.loginSuccess())
        yield put(alertAction.changeMessage({
            message: 'Login success',
            type: 'success'
        }))

        
    } catch (error: any) {
        yield put(authAction.loginFalse())        
        yield put(alertAction.changeMessage({
            message: error.data.message,
            type: 'error'
        }))
    };
}
export function* authSaga() {
  //   yield fork(watchLoginFlow);
  yield takeEvery(authAction.register.type, HandleRegister);
  yield takeEvery(authAction.login.type, handleLogin);
  yield takeEvery(authAction.logout.type, HandleLogout);
  yield takeEvery(authAction.oauth.type, HandleOauth);
}
