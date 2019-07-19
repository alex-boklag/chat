import { FETCH_USER_SUCCESS } from "./actionTypes";

const initialState = {
    userData: {
        name: '',
        surname: '',
        email: '',
        password: ''
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_SUCCESS: {
            const { userData } = action.payload;
            return {
                ...state,
                userData
            };
        }

        default:
            return state;
    }
}