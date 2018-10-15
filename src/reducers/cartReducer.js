import {FETCH_CART, ADD_MEAL_TO_CART} from "../actions";


export default (state = {meals: {}}, action) => {
    switch (action.type) {
        case FETCH_CART:
            return action.payload.data;

        case ADD_MEAL_TO_CART:
            return action.payload.data;

        default:
            return state;
    }
}