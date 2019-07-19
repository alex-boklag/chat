import { FETCH_MESSAGES_SUCCESS } from './actionTypes';

export default function (state = [''], action) {
    switch (action.type) {
        case FETCH_MESSAGES_SUCCESS: {
            return [...action.payload.messages];
        }
        default:
            return state;
    }
}