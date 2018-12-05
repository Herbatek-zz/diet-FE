import request from "../helpers/request";
import {FETCH_LATEST_MEALS, FETCH_LATEST_MEALS_DONE, FETCH_LATEST_MEALS_FAILED} from "./index";

export const fetchLatestMeals = () => dispatch => {
    dispatch(fetchLatestMealsStart());
    request.get('meals/latest')
        .then(response => dispatch(fetchLatestMealsDone(response)))
        .catch(error => dispatch(fetchLatestMealsFailed(error)));
};

export const fetchLatestMealsStart = () => {
    return {
        type: FETCH_LATEST_MEALS
    };
};

export function fetchLatestMealsDone(data) {
    return {
        type: FETCH_LATEST_MEALS_DONE,
        payload: data
    };
}

export function fetchLatestMealsFailed(error) {
    return {
        type: FETCH_LATEST_MEALS_FAILED,
        payload: error
    };
}