import AuthService from "../helpers/auth_service";
import SecuredRequest from "../helpers/secured_request";
import Request from "../helpers/request";
import {
    CREATE_MEAL,
    FETCH_MEAL,
    FETCH_MEALS,
    DELETE_MEAL,
    FETCH_MY_MEALS,
    FETCH_FAVOURITE_MEALS,
    IS_FAVOURITE_MEAL,
    ADD_MEAL_TO_FAVOURITES,
    REMOVE_MEAL_FROM_FAVOURITES,
    SEARCH_MEALS,
    EDIT_MEAL,
    FETCH_TOP_MEALS, FETCH_LATEST_MEALS
} from "./index";

export function createMeal(meal, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();

    const formData = new FormData();
    formData.append("imageUrl", meal.image);
    formData.append("recipe", meal.recipe);
    formData.append("description", meal.description);
    formData.append("name", meal.name);

    const request = SecuredRequest.post(`/users/${userId}/meals`, formData, {headers: {'Authorization': `Bearer ${token}`}})
        .then((response) => callback(response.data.id));

    return {
        type: CREATE_MEAL,
        payload: request
    }
}

export function deleteMeal(id, callback) {
    const token = AuthService.getToken();
    SecuredRequest.delete(`/meals/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(() => callback());

    return {
        type: DELETE_MEAL,
        payload: id
    }
}

export function fetchMeal(id, onErrorDo) {
    const request = Request.get(`/meals/${id}`)
        .catch(() => onErrorDo());

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
    const token = AuthService.getToken();
    const request = SecuredRequest.get(`/users/${userId}/meals/${mealId}/favourites`, {headers: {'Authorization': `Bearer ${token}`}});

    return {
        type: IS_FAVOURITE_MEAL,
        payload: request
    }
}

export function addMealToFavourites(mealId, onErrorDo) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();
    const request = SecuredRequest.post(`/users/${userId}/meals/${mealId}/favourites`, null, {headers: {'Authorization': `Bearer ${token}`}})
        .catch(e  => onErrorDo());

    return {
        type: ADD_MEAL_TO_FAVOURITES,
        payload: request
    }
}

export function removeMealFromFavourites(mealId, onErrorDo) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();
    const request = SecuredRequest.delete(`/users/${userId}/meals/${mealId}/favourites`, {headers: {'Authorization': `Bearer ${token}`}})
        .catch(() => onErrorDo());

    return {
        type: REMOVE_MEAL_FROM_FAVOURITES,
        payload: request
    }
}

export function editMeal(mealId, update, callback) {
    const token = AuthService.getToken();
    const request = SecuredRequest.put(`/meals/${mealId}`, update, {headers: {'Authorization': `Bearer ${token}`}})
        .then((response) => {
            callback();
            return response;
        });

    return {
        type: EDIT_MEAL,
        payload: request
    }
}

export function fetchTopMeals() {
    const request = Request.get('meals/top-favourites');

    return {
        type: FETCH_TOP_MEALS,
        payload: request
    }
}

export function fetchLatestMeals() {
    const request = Request.get('meals/latest');

    return {
        type: FETCH_LATEST_MEALS,
        payload: request
    }
}