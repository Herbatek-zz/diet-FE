import {FETCH_TOP_MEALS, FETCH_TOP_MEALS_DONE, FETCH_TOP_MEALS_FAILED} from "../actions";


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_TOP_MEALS: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }

        case FETCH_TOP_MEALS_DONE: {
            return {
                ...state,
                list: action.payload.data,
                isLoading: false,
                isError: false
            }
        }

        case FETCH_TOP_MEALS_FAILED: {
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