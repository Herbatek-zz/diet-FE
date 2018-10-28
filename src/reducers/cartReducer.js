import {FETCH_CART, ADD_MEAL_TO_CART, ADD_PRODUCT_TO_CART, REMOVE_MEAL_FROM_CART, REMOVE_PRODUCT_FROM_CART} from "../actions";

export default (state = {meals: {}, products: {}}, action) => {
    switch (action.type) {
        case FETCH_CART:
            if (action.payload.data)
                return action.payload.data;
            return state;

        case ADD_MEAL_TO_CART:
            return action.payload.data;

        case ADD_PRODUCT_TO_CART:
            return action.payload.data;

        case REMOVE_MEAL_FROM_CART:
            return action.payload.data;

        case REMOVE_PRODUCT_FROM_CART:
            return action.payload.data;

        default:
            return state;
    }
}