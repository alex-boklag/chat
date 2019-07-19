import { FETCH_MESSAGE } from "./actionTypes";

export const fetchMessage = (id) => ({
    type: FETCH_MESSAGE,
    payload: {
        id
    }
});