/* eslint-disable require-yield */
import { all } from 'redux-saga/effects'
import { authSaga } from './auth/authSaga';
import { roomSaga } from './room/roomSaga';
import { userSaga } from './user/userSaga';
function* hello() {
    console.log('hello');
    
};

export default function* rootSaga() {
    yield all([hello(), authSaga(), userSaga(), roomSaga()])
};