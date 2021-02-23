import {REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, REGISTER_USER_FAIL} from '../actions/authAction';

const initialState = {
    user: {},
    errors: {}
};

export default function(state = initialState, action) {

    switch(action.type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                errors: true
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                errors: true
            }
    }

    return state;
}
