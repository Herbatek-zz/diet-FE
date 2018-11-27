import AuthService from "../helpers/auth_service";
import SecuredRequest from "../helpers/secured_request";
import {FETCH_CART, ADD_MEAL_TO_CART, ADD_PRODUCT_TO_CART, REMOVE_MEAL_FROM_CART, REMOVE_PRODUCT_FROM_CART} from "./index";

export function fetchCart(date, callback = () => {
}) {
    const token = AuthService.getToken();
    const userId = AuthService.getDecodedToken().sub;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const dateRequest = `${day}-${month}-${date.getFullYear()}`;
    const request = SecuredRequest.get(`/users/${userId}/carts?date=${dateRequest}`, {headers: {'Authorization': `Bearer ${token}`}})
        .catch(() => callback());

    return {
        type: FETCH_CART,
        payload: request
    }
}

export function addMealToCart(mealId, date, amount) {
    const token = AuthService.getToken();
    const userId = AuthService.getDecodedToken().sub;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const dateRequest = `${day}-${month}-${date.getFullYear()}`;
    const request = SecuredRequest.post(`/users/${userId}/carts/meals/${mealId}?date=${dateRequest}&amount=${amount}`, null, {headers: {'Authorization': `Bearer ${token}`}});

    return {
        type: ADD_MEAL_TO_CART,
        payload: request
    }
}

export function addProductToCart(productId, date, amount) {
    const token = AuthService.getToken();
    const userId = AuthService.getDecodedToken().sub;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const dateRequest = `${day}-${month}-${date.getFullYear()}`;
    const request = SecuredRequest.post(`/users/${userId}/carts/products/${productId}?date=${dateRequest}&amount=${amount}`, null, {headers: {'Authorization': `Bearer ${token}`}});

    return {
        type: ADD_PRODUCT_TO_CART,
        payload: request
    }
}

export function removeMealFromCart(mealId, date) {
    const token = AuthService.getToken();
    const userId = AuthService.getDecodedToken().sub;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const dateRequest = `${day}-${month}-${date.getFullYear()}`;
    const request = SecuredRequest.delete(`/users/${userId}/carts/meals/${mealId}?date=${dateRequest}`, {headers: {'Authorization': `Bearer ${token}`}});

    return {
        type: REMOVE_MEAL_FROM_CART,
        payload: request
    }
}

export function removeProductFromCart(productId, date) {
    const token = AuthService.getToken();
    const userId = AuthService.getDecodedToken().sub;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const dateRequest = `${day}-${month}-${date.getFullYear()}`;

    const request = SecuredRequest.delete(`/users/${userId}/carts/products/${productId}?date=${dateRequest}`, {headers: {'Authorization': `Bearer ${token}`}});


    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: request
    }
}