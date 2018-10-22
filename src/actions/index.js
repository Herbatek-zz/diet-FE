import Request from '../helpers/request';
import SecuredRequest from '../helpers/secured_request';
import AuthService from "../helpers/auth_service";

export const CREATE_PRODUCT = 'create_product';
export const FETCH_PRODUCT = 'fetch_product';
export const DELETE_PRODUCT = 'delete_product';
export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_PRODUCTS_INFINITY = 'fetch_products_infinty';
export const FETCH_MY_PRODUCTS = 'fetch_my_products';
export const SEARCH_PRODUCTS = 'search_products';
export const SEARCH_PRODUCTS_INFINITY = 'search_products_infinity';

export const CREATE_MEAL = 'create_meal';
export const FETCH_MEAL = 'fetch_meal';
export const DELETE_MEAL = 'delete_meal';
export const FETCH_MEALS = 'fetch_meals';
export const FETCH_MY_MEALS = 'fetch_my_meals';
export const FETCH_FAVOURITE_MEALS = 'fetch_favourite_meals';
export const IS_FAVOURITE_MEAL = 'is_favourite_meal';
export const ADD_MEAL_TO_FAVOURITES = 'add_meal_to_favourites';
export const REMOVE_MEAL_FROM_FAVOURITES = 'remove_meal_from_favourites';
export const SEARCH_MEALS = 'search_meals';
export const EDIT_MEAL = 'edit_meal';

export const FETCH_CART = 'fetch_cart';
export const ADD_MEAL_TO_CART = 'add_meal_to_cart';

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

export function deleteProduct(id, callback) {
    SecuredRequest.delete(`/products/${id}`)
        .then(() => callback());

    return {
        type: DELETE_PRODUCT,
        payload: id
    }
}

export function fetchProducts(page, pageSize) {
    const request = Request.get(`/products?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}

export function fetchProductsInfinity(page, pageSize) {
    const request = Request.get(`/products?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_PRODUCTS_INFINITY,
        payload: request
    }
}

export function fetchMyProducts(page, pageSize) {
    const userId = AuthService.getDecodedToken().sub;
    const request = Request.get(`/users/${userId}/products?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_MY_PRODUCTS,
        payload: request
    }
}

export function searchProducts(query, page, pageSize) {
    const request = Request.get(`/products/search?query=${query}&page=${page}&size=${pageSize}`);

    return {
        type: SEARCH_PRODUCTS,
        payload: request
    }
}

export function searchProductsInfinity(query, page, pageSize) {
    const request = Request.get(`/products/search?query=${query}&page=${page}&size=${pageSize}`);

    return {
        type: SEARCH_PRODUCTS_INFINITY,
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

export function deleteMeal(id, callback) {
    SecuredRequest.delete(`/meals/${id}`)
        .then(() => callback());

    return {
        type: DELETE_MEAL,
        payload: id
    }
}

export function fetchMeal(id) {
    const request = Request.get(`/meals/${id}`);

    return {
        type: FETCH_MEAL,
        payload: request
    }
}

export function fetchMeals(page, pageSize) {
    const request = Request.get(`/meals?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_MEALS,
        payload: request
    }
}

export function fetchMyMeals(page, pageSize) {
    const userId = AuthService.getDecodedToken().sub;
    const request = Request.get(`/users/${userId}/meals?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_MY_MEALS,
        payload: request
    }
}

export function searchMeals(query, page, pageSize) {
    const request = Request.get(`/meals/search?query=${query}&page=${page}&size=${pageSize}`);

    return {
        type: SEARCH_MEALS,
        payload: request
    }
}

export function fetchFavouriteMeals(page, pageSize) {
    const userId = AuthService.getDecodedToken().sub;
    const request = Request.get(`/users/${userId}/meals/favourites?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_FAVOURITE_MEALS,
        payload: request
    }
}

export function isFavouriteMeal(mealId) {
    const userId = AuthService.getDecodedToken().sub;
    const request = SecuredRequest.get(`/users/${userId}/meals/${mealId}/favourites`);

    return {
        type: IS_FAVOURITE_MEAL,
        payload: request
    }
}

export function addMealToFavourites(mealId) {
    const userId = AuthService.getDecodedToken().sub;
    const request = SecuredRequest.post(`/users/${userId}/meals/${mealId}/favourites`);

    return {
        type: ADD_MEAL_TO_FAVOURITES,
        payload: request
    }
}

export function removeMealFromFavourites(mealId) {
    const userId = AuthService.getDecodedToken().sub;
    const request = SecuredRequest.delete(`/users/${userId}/meals/${mealId}/favourites`);

    return {
        type: REMOVE_MEAL_FROM_FAVOURITES,
        payload: request
    }
}

export function fetchCart(date) {
    const userId = AuthService.getDecodedToken().sub;
    const dateRequest = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const request = SecuredRequest.get(`/users/${userId}/carts?date=${dateRequest}`);

    return {
        type: FETCH_CART,
        payload: request
    }
}

export function addMealToCart(mealId, date) {
    const userId = AuthService.getDecodedToken().sub;
    const dateRequest = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const request = SecuredRequest.put(`/users/${userId}/carts/meals/${mealId}?date=${dateRequest}`);

    return {
        type: ADD_MEAL_TO_CART,
        payload: request
    }
}

export function editMeal(update, callback) {
    const request = SecuredRequest.put(`/meals/${update.id}`, update)
        .then(() => callback());

    return {
        type: EDIT_MEAL,
        payload: request
    }
}


export function setMenuItem(menuItem) {
    return {
        type: SELECT_MENU_ITEM,
        payload: menuItem
    }
}

