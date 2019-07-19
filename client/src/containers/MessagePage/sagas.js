import axios from 'axios';
import api from '../../shared/config/api';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { FETCH_MESSAGE, FETCH_MESSAGE_SUCCESS } from "./actionTypes";

export function* fetchMessage(action) {
    try {
        const message = yield call(axios.get, `${api.url}/message/${action.payload.id}`);
        yield put({ type: FETCH_MESSAGE_SUCCESS, payload: { messageData: message.data } })
    } catch (error) {
        console.log('fetchMessages error:', error.message)
    }
}
function* watchFetchMessage() {
    yield takeEvery(FETCH_MESSAGE, fetchMessage)
}

export default function* messagePageSagas() {
    yield all([
        watchFetchMessage()
    ])
};