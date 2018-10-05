import _ from 'lodash';

import {
    FETCH_MEAL,
    FETCH_MEALS,
    FETCH_MY_MEALS,
    SEARCH_MEALS,
    FETCH_FAVOURITE_MEALS,
    IS_FAVOURITE_MEAL,
    ADD_MEAL_TO_FAVOURITES,
    REMOVE_MEAL_FROM_FAVOURITES
} from "../actions";


export default (state = {content: {}}, action) => {
    switch (action.type) {
        case FETCH_MEALS:
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements
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

        case IS_FAVOURITE_MEAL: {
            return {
                ...state,
                isFavourite: action.payload.data
            }
        }

        case ADD_MEAL_TO_FAVOURITES: {
            return {
                ...state,
                isFavourite: true
            }
        }

        case REMOVE_MEAL_FROM_FAVOURITES: {
            return {
                ...state,
                isFavourite: false
            }
        }

        default:
            return state;
    }
}