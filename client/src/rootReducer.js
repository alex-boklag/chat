import { combineReducers } from 'redux';
import login from './containers/Login/reducer';
import chat from './containers/Chat/reducer';
import messagePage from './containers/MessagePage/reducer';
import users from './containers/Users/reducer';
import userPage from './containers/UserPage/reducer';

export const rootReducer = combineReducers({
    login,
    chat,
    messagePage,
    users,
    userPage
});