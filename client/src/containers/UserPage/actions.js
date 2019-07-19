import { FETCH_USER } from "./actionTypes";

export const fetchUser = (id) => ({
    type: FETCH_USER,
    payload: {
        id
    }
});