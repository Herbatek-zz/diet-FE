import AuthService from "../helpers/auth_service";
import SecuredRequest from "../helpers/secured_request";
import {FETCH_CART, ADD_MEAL_TO_CART, ADD_PRODUCT_TO_CART, REMOVE_MEAL_FROM_CART, REMOVE_PRODUCT_FROM_CART} from "./index";

export function fetchCart(date) {
    const userId = AuthService.getDecodedToken().sub;
    const dateRequest = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const request = SecuredRequest.get(`/users/${userId}/carts?date=${dateRequest}`);

    return {
        type: FETCH_CART,
        payload: request
    }
}

export function addMealToCart(mealId, date, amount) {
    const userId = AuthService.getDecodedToken().sub;
    const dateRequest = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const request = SecuredRequest.post(`/users/${userId}/carts/meals/${mealId}?date=${dateRequest}&amount=${amount}`);

    return {
        type: ADD_MEAL_TO_CART,
        payload: request
    }
}

export function addProductToCart(productId, date, amount) {
    const userId = AuthService.getDecodedToken().sub;
    const dateRequest = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const request = SecuredRequest.post(`/users/${userId}/carts/products/${productId}?date=${dateRequest}&amount=${amount}`);

    return {
        type: ADD_PRODUCT_TO_CART,
        payload: request
    }
}

export function removeMealFromCart(mealId, date, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const dateRequest = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    SecuredRequest.delete(`/users/${userId}/carts/meals/${mealId}?date=${dateRequest}`)
        .then(() => callback());

    return {
        type: REMOVE_MEAL_FROM_CART,
        payload: mealId
    }
}

export function removeProductFromCart(productId, date, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const dateRequest = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    SecuredRequest.delete(`/users/${userId}/carts/products/${productId}?date=${dateRequest}`)
        .then(() => callback());


    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: productId
    }
}