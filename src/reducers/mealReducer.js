import _ from 'lodash';

import {
    FETCH_MEAL,
    FETCH_MEALS,
    DELETE_MEAL,
    FETCH_MY_MEALS,
    SEARCH_MEALS,
    FETCH_FAVOURITE_MEALS,
    IS_FAVOURITE_MEAL,
    ADD_MEAL_TO_FAVOURITES,
    REMOVE_MEAL_FROM_FAVOURITES, EDIT_MEAL,
    FETCH_TOP_MEALS, FETCH_LATEST_MEALS
} from "../actions";


export default (state = {content: {}}, action) => {
    switch (action.type) {
        case FETCH_MEALS: {
            if (action.payload.data)
                return {
                    content: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements
                };
            return state;
        }

        case DELETE_MEAL:
            return {
                ...state.meals,
                content: _.omit(state.meals.content, action.payload)
            };

        case FETCH_MY_MEALS:
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements
            };

        case FETCH_MEAL:
            return {
                ...state.meals,
                content: {
                    ...state.content,
                    [action.payload.data.id]: action.payload.data
                }
            };

        case SEARCH_MEALS: {
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements
            }
        }

        case FETCH_FAVOURITE_MEALS: {
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements
            }
        }

        case FETCH_TOP_MEALS: {
            return {
                ...state,
                top: action.payload.data
            }
        }

        case FETCH_LATEST_MEALS: {
            return {
                ...state,
                latestMeals: action.payload.data
            }
        }

        case IS_FAVOURITE_MEAL: {
            return {
                ...state,
                isFavourite: action.payload.data
            }
        }

        case ADD_MEAL_TO_FAVOURITES: {
            return {
                ...state,
                isFavourite: action.payload.status === 201
            }
        }

        case REMOVE_MEAL_FROM_FAVOURITES: {
            return {
                ...state,
                isFavourite: action.payload.status !== 204
            }
        }

        case EDIT_MEAL: {
            return {
                ...state.meals,
                content: {
                    ...state.content,
                    [action.payload.data.id]: action.payload.data
                }
            }
        }

        default:
            return state;
    }
}