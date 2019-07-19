import { all } from 'redux-saga/effects';
import messagesSagas from './containers/Chat/sagas';
import messagePageSagas from './containers/MessagePage/sagas';
import usersSagas from './containers/Users/sagas';
import userPageSagas from './containers/UserPage/sagas';

export default function* rootSaga() {
    yield all([
        messagesSagas(),
        messagePageSagas(),
        usersSagas(),
        userPageSagas()
    ])
};