import {FETCH_LATEST_MEALS, FETCH_LATEST_MEALS_DONE, FETCH_LATEST_MEALS_FAILED} from "../actions";


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_LATEST_MEALS: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }

        case FETCH_LATEST_MEALS_DONE: {
            return {
                ...state,
                list: action.payload.data,
                isLoading: false,
                isError: false
            }
        }

        case FETCH_LATEST_MEALS_FAILED: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        default:
            return state;
    }
}