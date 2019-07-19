import axios from 'axios';
import api from '../../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { FETCH_USER, FETCH_USER_SUCCESS } from "./actionTypes";

export function* fetchUser(action) {
    try {
        const user = yield call(axios.get, `${api.url}/user/${action.payload.id}`);
        yield put({ type: FETCH_USER_SUCCESS, payload: { userData: user.data } })
    } catch (error) {
        console.log('fetchUsers error:', error.message)
    }
}

function* watchFetchUser() {
    yield takeEvery(FETCH_USER, fetchUser)
}

export default function* userPageSagas() {
    yield all([
        watchFetchUser()
    ])
};