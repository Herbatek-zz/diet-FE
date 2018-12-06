import AuthService from "../helpers/auth_service";
import request from "../helpers/request";
import {
    CREATE_MEAL,
    FETCH_MEAL,
    FETCH_MEALS,
    FETCH_MEALS_DONE,
    FETCH_MEALS_FAILED,
    DELETE_MEAL,
    FETCH_MY_MEALS,
    FETCH_FAVOURITE_MEALS,
    IS_FAVOURITE_MEAL,
    ADD_MEAL_TO_FAVOURITES,
    REMOVE_MEAL_FROM_FAVOURITES,
    SEARCH_MEALS,
    EDIT_MEAL,
    FETCH_MY_MEALS_FAILED,
    FETCH_MY_MEALS_DONE,
    FETCH_MEAL_DONE,
    FETCH_MEAL_FAILED,
    CREATE_MEAL_DONE,
    CREATE_MEAL_FAILED,
    FETCH_FAVOURITE_MEALS_DONE,
    FETCH_FAVOURITE_MEALS_FAILED,
    SEARCH_MEALS_DONE,
    SEARCH_MEALS_FAILED,
    EDIT_MEAL_FAILED, EDIT_MEAL_DONE,
} from "./index";

export const createMeal = (meal) => async dispatch => {
    await dispatch(createMealStart());

    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();

    const formData = new FormData();
    formData.append("imageToSave", meal.image);
    formData.append("recipe", meal.recipe);
    formData.append("description", meal.description);
    formData.append("name", meal.name);

    await request.post(`/users/${userId}/meals`, formData, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => dispatch(createMealDone(response)))
        .catch(error => dispatch(createMealFailed(error)));

};

export const createMealStart = () => {
    return {type: CREATE_MEAL}
};

export const createMealDone = (data) => {
    return {type: CREATE_MEAL_DONE, payload: data}
};

export const createMealFailed = (error) => {
    return {type: CREATE_MEAL_FAILED, payload: error}
};

export function deleteMeal(id, callback) {
    const token = AuthService.getToken();
    request.delete(`/meals/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(() => callback());

    return {
        type: DELETE_MEAL,
        payload: id
    }
}

export const fetchMeal = (id) => async dispatch => {
    await dispatch(fetchMealStart());

    await request.get(`/meals/${id}`)
        .then(response => dispatch(fetchMealDone(response)))
        .catch(error => dispatch(fetchMealFailed(error)));
};

export const fetchMealStart = () => {
    return {type: FETCH_MEAL,}
};

export const fetchMealDone = (data) => {
    return {type: FETCH_MEAL_DONE, payload: data}
};

export const fetchMealFailed = (error) => {
    return {type: FETCH_MEAL_FAILED, payload: error}
};

export const fetchMeals = (page, pageSize) => async dispatch => {
    await dispatch(fetchMealsStart());

    await request.get(`/meals?page=${page}&size=${pageSize}`)
        .then(response => dispatch(fetchMealsDone(response)))
        .catch(error => dispatch(fetchMealsFailed(error)));
};

export const fetchMealsStart = () => {
    return {type: FETCH_MEALS}
};

export const fetchMealsDone = (data) => {
    return {type: FETCH_MEALS_DONE, payload: data}
};

export const fetchMealsFailed = (error) => {
    return {type: FETCH_MEALS_FAILED, payload: error}
};


export const fetchMyMeals = (page, pageSize) => async dispatch => {
    await dispatch(fetchMyMealsStart());

    const userId = AuthService.getDecodedToken().sub;
    await request.get(`/users/${userId}/meals?page=${page}&size=${pageSize}`)
        .then(response => dispatch(fetchMyMealsDone(response)))
        .catch(error => dispatch(fetchMyMealsFailed(error)));
};

export const fetchMyMealsStart = () => {
    return {type: FETCH_MY_MEALS}
};

export const fetchMyMealsDone = (data) => {
    return {type: FETCH_MY_MEALS_DONE, payload: data}
};

export const fetchMyMealsFailed = (error) => {
    return {type: FETCH_MY_MEALS_FAILED, payload: error}
};

export const searchMeals = (query, page, pageSize) => async dispatch => {
    await dispatch(searchMealsStart());

    await request.get(`/meals/search?query=${query}&page=${page}&size=${pageSize}`)
        .then(response => dispatch(searchMealsDone(response)))
        .catch(error => dispatch(searchMealsFailed(error)));
};

export const searchMealsStart = () => {
    return {type: SEARCH_MEALS}
};

export const searchMealsDone = (data) => {
    return {type: SEARCH_MEALS_DONE, payload: data}
};

export const searchMealsFailed = (error) => {
    return {type: SEARCH_MEALS_FAILED, payload: error}
};

export const fetchFavouriteMeals = (page, pageSize) => async dispatch => {
    await dispatch(fetchFavouriteMealsStart());

    const userId = AuthService.getDecodedToken().sub;
    await request.get(`/users/${userId}/meals/favourites?page=${page}&size=${pageSize}`)
        .then(response => dispatch(fetchFavouriteMealsDone(response)))
        .catch(error => dispatch(fetchFavouriteMealsFailed(error)));
};

export const fetchFavouriteMealsStart = () => {
    return {type: FETCH_FAVOURITE_MEALS}
};

export const fetchFavouriteMealsDone = (data) => {
    return {type: FETCH_FAVOURITE_MEALS_DONE, payload: data}
};

export const fetchFavouriteMealsFailed = (error) => {
    return {type: FETCH_FAVOURITE_MEALS_FAILED, payload: error}
};

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

export const editMeal = (mealId, update) => async dispatch => {
    await dispatch(editMealStart());

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

    await request.put(`/meals/${mealId}`, formData, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => dispatch(editMealDone(response)))
        .catch(error => dispatch(editMealFailed(error)));
};

export const editMealStart = () => {
    return {type: EDIT_MEAL}
};

export const editMealDone = (data) => {
    return {type: EDIT_MEAL_DONE, payload: data}
};

export const editMealFailed = (error) => {
    return {type: EDIT_MEAL_FAILED, payload: error}
};