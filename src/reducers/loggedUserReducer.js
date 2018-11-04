import {FETCH_USER_FROM_COOKIE} from "../actions";


export default (state = {username: "username", imageUrl: ''}, action) => {
    switch (action.type) {
        case FETCH_USER_FROM_COOKIE:
            return action.payload;

        default:
            return state;
    }
}