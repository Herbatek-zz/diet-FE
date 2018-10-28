import {FETCH_CART, ADD_MEAL_TO_CART, ADD_PRODUCT_TO_CART, REMOVE_MEAL_FROM_CART, REMOVE_PRODUCT_FROM_CART} from "../actions";
import _ from "lodash";


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
            return {
                ...state,
                meals: _.omitBy(state.meals, {id: action.payload}),
                itemCounter: --state.itemCounter
            };


        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                products: _.omitBy(state.products, {id: action.payload}),
                itemCounter: --state.itemCounter
            };

        default:
            return state;
    }
}