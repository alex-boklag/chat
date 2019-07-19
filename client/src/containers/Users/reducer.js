import { FETCH_USERS_SUCCESS } from "./actionTypes";

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_USERS_SUCCESS: {
            return [...action.payload.users];
        }

        default:
            return state;
    }
}