import AuthService from "../helpers/auth_service";
import request from "../helpers/request";
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
} from "./index";

export function createMeal(meal, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();

    const formData = new FormData();
    formData.append("imageToSave", meal.image);
    formData.append("recipe", meal.recipe);
    formData.append("description", meal.description);
    formData.append("name", meal.name);

    const requestPost = request.post(`/users/${userId}/meals`, formData, {headers: {'Authorization': `Bearer ${token}`}})
        .then((response) => callback(response.data.id));

    return {
        type: CREATE_MEAL,
        payload: requestPost
    }
}

export function deleteMeal(id, callback) {
    const token = AuthService.getToken();
    request.delete(`/meals/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(() => callback());

    return {
        type: DELETE_MEAL,
        payload: id
    }
}

export function fetchMeal(id, onErrorDo) {
    const requestGet = request.get(`/meals/${id}`)
        .catch(() => onErrorDo());

    return {
        type: FETCH_MEAL,
        payload: requestGet
    }
}

export function fetchMeals(page, pageSize) {
    const requestGet = request.get(`/meals?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_MEALS,
        payload: requestGet
    }
}

export function fetchMyMeals(page, pageSize) {
    const userId = AuthService.getDecodedToken().sub;
    const requestGet = request.get(`/users/${userId}/meals?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_MY_MEALS,
        payload: requestGet
    }
}

export function searchMeals(query, page, pageSize) {
    const requestGet = request.get(`/meals/search?query=${query}&page=${page}&size=${pageSize}`);

    return {
        type: SEARCH_MEALS,
        payload: requestGet
    }
}

export function fetchFavouriteMeals(page, pageSize) {
    const userId = AuthService.getDecodedToken().sub;
    const requestGet = request.get(`/users/${userId}/meals/favourites?page=${page}&size=${pageSize}`);

    return {
        type: FETCH_FAVOURITE_MEALS,
        payload: requestGet
    }
}

export function isFavouriteMeal(mealId) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();
    const requestGet = request.get(`/users/${userId}/meals/${mealId}/favourites`, {headers: {'Authorization': `Bearer ${token}`}});

    return {
        type: IS_FAVOURITE_MEAL,
        payload: requestGet
    }
}

export function addMealToFavourites(mealId, onErrorDo) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();
    const requestPost = request.post(`/users/${userId}/meals/${mealId}/favourites`, null, {headers: {'Authorization': `Bearer ${token}`}})
        .catch(e => onErrorDo());

    return {
        type: ADD_MEAL_TO_FAVOURITES,
        payload: requestPost
    }
}

export function removeMealFromFavourites(mealId, onErrorDo) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();
    const requestDelete = request.delete(`/users/${userId}/meals/${mealId}/favourites`, {headers: {'Authorization': `Bearer ${token}`}})
        .catch(() => onErrorDo());

    return {
        type: REMOVE_MEAL_FROM_FAVOURITES,
        payload: requestDelete
    }
}

export function editMeal(mealId, update, callback) {
    const token = AuthService.getToken();
    const formData = new FormData();
    if (update.image instanceof File)
        formData.append("imageToSave", update.image);
    formData.append("recipe", update.recipe);
    formData.append("description", update.description);
    formData.append("name", update.name);

    let index = 0;
    for (let product of update.products) {
        formData.append(`products[${index}].id`, product.id);
        formData.append(`products[${index}].name`, product.name);
        formData.append(`products[${index}].imageUrl`, product.imageUrl);
        formData.append(`products[${index}].protein`, product.protein);
        formData.append(`products[${index}].carbohydrate`, product.carbohydrate);
        formData.append(`products[${index}].fat`, product.fat);
        formData.append(`products[${index}].fibre`, product.fibre);
        formData.append(`products[${index}].kcal`, product.kcal);
        formData.append(`products[${index}].amount`, product.amount);
        formData.append(`products[${index}].carbohydrateExchange`, product.carbohydrateExchange);
        formData.append(`products[${index}].proteinAndFatEquivalent`, product.proteinAndFatEquivalent);
        formData.append(`products[${index}].userId`, product.userId);
        index++;
    }

    const requestPut = request.put(`/meals/${mealId}`, formData, {headers: {'Authorization': `Bearer ${token}`}})
        .then((response) => {
            callback();
            return response;
        });

    return {
        type: EDIT_MEAL,
        payload: requestPut
    }
}