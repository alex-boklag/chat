import { LIKE_MESSAGE, ADD_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE, FETCH_MESSAGES } from "./actionTypes";
import service from '../../service';

export const fetchMessages = () => ({
    type: FETCH_MESSAGES
});

export const likeMessage = (id) => ({  
    type: LIKE_MESSAGE,
    payload: {
        id
    }
});

export const addMessage = (data) => ({  
    type: ADD_MESSAGE,
    payload: {
        id: service.getNewId(),
        data
    }
});

export const editMessage = (id, data) => ({
    type: EDIT_MESSAGE,
    payload: {
        id,
        data
    }
});

export const deleteMessage = (id) => ({
    type: DELETE_MESSAGE,
    payload: {
        id
    }
});