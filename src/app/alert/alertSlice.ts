import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AlertSate {
    open: boolean;
    message?: string;
    type: 'error' | 'success' | 'info' | 'warning'
};

const initialState: AlertSate = {
    open: false,
    message: undefined,
    type: 'warning'
}
interface IChangeMessage {
    message: string
    type: 'error' | 'success' | 'info' | 'warning'
}
const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        changeMessage(state, action: PayloadAction<IChangeMessage>) {            
            state.open = true            
            state.message = action.payload.message
            state.type = action.payload.type
        },
        changeOpen(state){
            state.open = false
        }
    }
});

export const alertAction = alertSlice.actions;

export const selectOpen = (state: RootState) => state.alert.open
export const selectMessage = (state: RootState) => state.alert.message
export const selectType = (state: RootState) => state.alert.type
//export reducer
const alertReducer = alertSlice.reducer;
export default alertReducer;