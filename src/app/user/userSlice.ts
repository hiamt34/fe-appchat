import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Response } from "../../interface/common";
import { ISearch } from "../../services/userService";
import { IUser } from "../auth/authSlice";
import { RootState } from "../store";
export interface UserSate {
    users: IUser[];
    loadding: boolean;
    user: IUser | undefined
    isUser: boolean
    userOnline: IUserOnline[]
};
export interface IUserOnline {
    userId: string,
    [key: string]: any;
}
const initialState: UserSate = {
    loadding: false,
    users: [],
    user: undefined,
    isUser: true,
    userOnline: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAll(state) {                                    
            state.loadding = true;
        },
        get(state) {                        
            state.loadding = true;
        },
        getAllSuccess(state, action: PayloadAction<Response<IUser[]>>) {
            state.loadding = false;
            state.users = action.payload.payload
        },
        getSuccess(state, action: PayloadAction<Response<IUser>>){
            state.loadding = false;
            state.user = action.payload.payload
            state.isUser = true
        },
        gatAllfail(state){
            state.loadding = false
        },
        getFail(state){
            state.loadding = false
            state.isUser = false
        },
        search(state, action: PayloadAction<ISearch>) {
            // state.loadding = true;
        },
        searchLoading(state) {
            state.loadding = true;
        },
        logout(state) {
            state.user = undefined
            state.isUser = false
            state.users = []
        },
        setUserOnline(state, action: PayloadAction<IUserOnline[]> ){
            state.userOnline = action.payload
        }
    }
});

//export action
export const userAction = userSlice.actions;

//export selectors
export const selectLoadding = (state: RootState) => state.user.loadding
export const selectUsers = (state: RootState) => state.user.users
export const selectUser = (state: RootState) => state.user.user
export const selectUserOnline = (state: RootState) => state.user.userOnline
export const selectIsUser = (state: RootState) => state.user.isUser
//export reducer
const userReducer = userSlice.reducer;
export default userReducer;