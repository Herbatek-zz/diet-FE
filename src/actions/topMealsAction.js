import request from "../helpers/request";
import {FETCH_TOP_MEALS, FETCH_TOP_MEALS_DONE, FETCH_TOP_MEALS_FAILED} from "./index";

export const fetchTopMeals = () => dispatch => {
    dispatch(fetchTopMealsStart());
    request.get('meals/top-favourites')
        .then(response => dispatch(fetchTopMealsDone(response)))
        .catch(error => dispatch(fetchTopMealsFailed(error)));
};

export const fetchTopMealsStart = () => {
    return {
        type: FETCH_TOP_MEALS
    };
};

export function fetchTopMealsDone(data) {
    return {
        type: FETCH_TOP_MEALS_DONE,
        payload: data
    };
}

export function fetchTopMealsFailed(error) {
    return {
        type: FETCH_TOP_MEALS_FAILED,
        payload: error
    };
}