import axios from 'axios';
import api from '../../shared/config/api.json';
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { ADD_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE, FETCH_MESSAGES } from "./actionTypes";

export function* fetchMessages() {
    try {
        const messages = yield call(axios.get, `${api.url}/messages`);
        yield put({ type: 'FETCH_MESSAGES_SUCCESS', payload: { messages: messages.data } })
    } catch (error) {
        console.error('fetchMessages error:', error.message)
    }
}
function* watchFetchMessages() {
    yield takeEvery(FETCH_MESSAGES, fetchMessages);
}

export function* addMessage(action) {
    const date = new Date();
    const time =
        `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const newMessage = {
        id: `${action.payload.id}`,
        user: 'me',
        created_at: time,
        message: action.payload.data,
        marked_read: false,
        className: 'right'
    };
    try {
        yield call(axios.post, `${api.url}/message`, newMessage);
        yield put({ type: FETCH_MESSAGES });
    } catch (error) {
        console.error('createMessage error:', error.message);
    }
}
function* watchAddMessage() {
    yield takeEvery(ADD_MESSAGE, addMessage);
}

export function* editMessage(action) {
    const id = action.payload.id;
    const editedMessage = {
        message: action.payload.data
    }

    try {
        yield call(axios.put, `${api.url}/message/${id}`, editedMessage);
        yield put({ type: FETCH_MESSAGES });
    } catch (error) {
        console.error('editMessage error:', error.message);
    }
}
function* watchEditMessage() {
    yield takeEvery(EDIT_MESSAGE, editMessage);
}

export function* deleteMessage(action) {
    const id = action.payload.id;

    try {
        yield call(axios.delete, `${api.url}/message/${id}`);
        yield put({ type: FETCH_MESSAGES })
    } catch (error) {
        console.error('deleteMessage Error:', error.message);
    }
}
function* watchDeleteMessage() {
    yield takeEvery(DELETE_MESSAGE, deleteMessage);
}

export default function* messagesSagas() {
    yield all([
        watchFetchMessages(),
        watchAddMessage(),
        watchEditMessage(),
        watchDeleteMessage()
    ])
};