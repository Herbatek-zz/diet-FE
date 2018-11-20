import {fetchCart, addMealToCart, addProductToCart, removeMealFromCart, removeProductFromCart} from "./cartAction";
import {
    fetchMeal,
    createMeal,
    deleteMeal,
    fetchMeals,
    fetchMyMeals,
    searchMeals,
    fetchFavouriteMeals,
    isFavouriteMeal,
    addMealToFavourites,
    removeMealFromFavourites,
    editMeal,
    fetchTopMeals,
    fetchLatestMeals
} from "./mealAction";

import {
    createProduct,
    fetchProduct,
    deleteProduct,
    fetchProducts,
    searchProducts,
    searchProductsInfinity,
    fetchProductsInfinity,
    fetchMyProducts,
    editProduct
} from "./productAction";

import {fetchUser, editUser} from './userAction';
import AuthService from "../helpers/auth_service";

export const CREATE_PRODUCT = 'create_product';
export const FETCH_PRODUCT = 'fetch_product';
export const DELETE_PRODUCT = 'delete_product';
export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_PRODUCTS_INFINITY = 'fetch_products_infinty';
export const FETCH_MY_PRODUCTS = 'fetch_my_products';
export const SEARCH_PRODUCTS = 'search_products';
export const SEARCH_PRODUCTS_INFINITY = 'search_products_infinity';
export const EDIT_PRODUCT = 'edit_product';

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
export const FETCH_TOP_MEALS = 'fetch_top_meals';
export const FETCH_LATEST_MEALS = 'fetch_latest_meals';

export const FETCH_CART = 'fetch_cart';
export const ADD_MEAL_TO_CART = 'add_meal_to_cart';
export const REMOVE_MEAL_FROM_CART = 'remove_meal_from_cart';
export const ADD_PRODUCT_TO_CART = 'add_product_to_cart';
export const REMOVE_PRODUCT_FROM_CART = 'remove_product_from_cart';

export const FETCH_USER = 'fetch_user';
export const EDIT_USER = 'edit_user';
export const FETCH_USER_FROM_COOKIE = 'fetch_user_from_cookie';

export const SELECT_MENU_ITEM = 'select_menu_item';

export function setMenuItem(menuItem) {
    return {
        type: SELECT_MENU_ITEM,
        payload: menuItem
    }
}

export function fetchUserFromCookie() {
    const decodedToken = AuthService.getDecodedToken();

    return {
        type: FETCH_USER_FROM_COOKIE,
        payload: {
            username: decodedToken.username,
            imageUrl: decodedToken.pictureUrl
        }
    }
}

export{createProduct}

export {fetchProduct}

export {deleteProduct}

export {fetchProducts}

export {fetchProductsInfinity}

export {fetchMyProducts}

export {searchProducts}

export {searchProductsInfinity}

export {createMeal}

export {deleteMeal}

export {fetchMeal}

export {fetchMeals}

export {fetchMyMeals}

export {searchMeals}

export {fetchFavouriteMeals}

export {isFavouriteMeal}

export {addMealToFavourites}

export {removeMealFromFavourites}

export {editMeal}

export {fetchTopMeals}

export {fetchLatestMeals}

export {fetchCart}

export {addMealToCart}

export {addProductToCart}

export {removeMealFromCart}

export {removeProductFromCart}

export {editProduct}

export {fetchUser}

export {editUser}

