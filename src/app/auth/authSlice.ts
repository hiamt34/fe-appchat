import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, OauthPayload, RegisterPayload } from "../../interface/auth";
import { RootState } from "../store";
export interface IUser {
    _id?: string;
    email: string; 
    name: string;
    role: string;
    status: string;
    authType: string;
    photo: string
}
export interface AuthSate {
    isLoggedIn: boolean;
    logging?: boolean;
    user?: IUser;
    message?: string
};

const initialState: AuthSate = {
    isLoggedIn: Boolean(localStorage.getItem('accessToken')),
    logging: false,
    message: undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {                        
            state.logging = true;
        },
        loginSuccess(state) {
            state.isLoggedIn = true;
            state.logging = false;
        },
        loginFalse(state) {            
            state.logging = false;
            state.isLoggedIn = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = undefined
        },
        register(state, action: PayloadAction<RegisterPayload>) {                        
            state.logging = true;
        },
        oauth(state, action: PayloadAction<OauthPayload>) {                        
            state.logging = true;
        },
    }
});

//export action
export const authAction = authSlice.actions;

//export selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectLogging = (state: RootState) => state.auth.logging

//export reducer
const authReducer = authSlice.reducer;
export default authReducer;
