import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga'
import authReducer from './auth/authSlice';
import alertReducer from './alert/alertSlice';
import userReducer from './user/userSlice';
import roomReducer from './room/roomSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  room: roomReducer
})
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    // devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
