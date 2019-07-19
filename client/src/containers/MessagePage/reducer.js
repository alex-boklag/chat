import { FETCH_MESSAGE_SUCCESS } from "./actionTypes";

const initialState = {
    messageData: {
        id: '',
        message: ''
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MESSAGE_SUCCESS: {
            const messageData = {
                id: action.payload.messageData.id,
                message: action.payload.messageData.message,
            }
            return {
                ...state,
                messageData
            };
        }

        default:
            return state;
    }
}