import Request from '../helpers/request';
import SecuredRequest from '../helpers/secured_request';
import AuthService from "../helpers/auth_service";

export const CREATE_PRODUCT = 'create_product';
export const FETCH_PRODUCT = 'fetch_product';
export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_MY_PRODUCTS = 'fetch_my_products';
export const SEARCH_PRODUCTS = 'search_products';

export const CREATE_MEAL = 'create_meal';
export const FETCH_MEAL = 'fetch_meal';
export const FETCH_MEALS = 'fetch_meals';
export const FETCH_MY_MEALS = 'fetch_my_meals';
export const SEARCH_MEALS = 'search_meals';

export const SELECT_MENU_ITEM = 'select_menu_item';

export function createProduct(values, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const request = SecuredRequest.post(`/users/${userId}/products`, values)
        .then(() => callback());

    return {
        type: CREATE_PRODUCT,
        payload: request
    }
}

export function fetchProduct(id) {
    const request = Request.get(`/products/${id}`);

    return {
        type: FETCH_PRODUCT,
        payload: request
    }
}

export function fetchProducts(page) {
    const request = Request.get(`/products?page=${page}&size=5`);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}

export function fetchMyProducts(page) {
    const userId = AuthService.getDecodedToken().sub;
    const request = Request.get(`/users/${userId}/products?page=${page}`);

    return {
        type: FETCH_MY_PRODUCTS,
        payload: request
    }
}


export function createMeal(values, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const request = SecuredRequest.post(`/users/${userId}/meals`, values)
        .then(() => callback());

    return {
        type: CREATE_MEAL,
        payload: request
    }
}

export function fetchMeal(id) {
    const request = Request.get(`/meals/${id}`);

    return {
        type: FETCH_MEAL,
        payload: request
    }
}

export function fetchMeals(page) {
    const request = Request.get(`/meals?page=${page}`);

    return {
        type: FETCH_MEALS,
        payload: request
    }
}

export function fetchMyMeals(page) {
    const userId = AuthService.getDecodedToken().sub;
    const request = Request.get(`/users/${userId}/meals?page=${page}`);

    return {
        type: FETCH_MY_MEALS,
        payload: request
    }
}

export function searchMeals(query, page) {
    const request = Request.get(`/meals/search?query=${query}&page=${page}`);

    return {
        type: SEARCH_MEALS,
        payload: request
    }
}



export function setMenuItem(menuItem) {
    return {
        type: SELECT_MENU_ITEM,
        payload: menuItem
    }
}

