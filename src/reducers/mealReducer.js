import _ from 'lodash';

import {
    FETCH_MEAL,
    FETCH_MEALS,
    FETCH_MEALS_DONE,
    FETCH_MEALS_FAILED,
    DELETE_MEAL,
    FETCH_MY_MEALS,
    SEARCH_MEALS,
    FETCH_FAVOURITE_MEALS,
    IS_FAVOURITE_MEAL,
    ADD_MEAL_TO_FAVOURITES,
    REMOVE_MEAL_FROM_FAVOURITES,
    EDIT_MEAL,
    FETCH_MY_MEALS_DONE,
    FETCH_MY_MEALS_FAILED,
    FETCH_MEAL_DONE,
    FETCH_MEAL_FAILED,
    CREATE_MEAL,
    CREATE_MEAL_DONE,
    CREATE_MEAL_FAILED,
    FETCH_FAVOURITE_MEALS_DONE,
    FETCH_FAVOURITE_MEALS_FAILED,
    SEARCH_MEALS_DONE,
    SEARCH_MEALS_FAILED,
    EDIT_MEAL_DONE, EDIT_MEAL_FAILED
} from "../actions";


export default (state = {
    allMeals: {list: {}},
    myMeals: {list: {}},
    selectedMeal: {},
    created: {},
    favourites: {list: {}}
}, action) => {
    switch (action.type) {

        case FETCH_MEALS: {
            return {
                ...state,
                allMeals: {list: {}, isLoading: true, isError: false}
            };
        }

        case FETCH_MEALS_DONE: {
            return {
                ...state,
                allMeals: {
                    list: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    isLoading: false,
                    isError: false
                }
            };
        }

        case FETCH_MEALS_FAILED: {
            return {
                ...state,
                allMeals: {list: {}, isLoading: false, isError: true}
            };
        }

        case CREATE_MEAL: {
            return {
                ...state,
                created: {isLoading: true, isError: false}
            }
        }

        case CREATE_MEAL_DONE: {
            return {
                ...state,
                created: {...action.payload.data, isLoading: false, isError: false}
            }
        }

        case CREATE_MEAL_FAILED: {
            return {
                ...state,
                created: {isLoading: false, isError: true}
            }
        }


        case DELETE_MEAL:
            return {
                ...state.meals,
                content: _.omit(state.meals.content, action.payload)
            };

        case FETCH_MY_MEALS:
            return {
                ...state,
                myMeals: {list: {}, isLoading: true, isError: false}
            };

        case FETCH_MY_MEALS_DONE:
            return {
                ...state,
                myMeals: {
                    list: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    isLoading: false,
                    isError: false
                }
            };

        case FETCH_MY_MEALS_FAILED:
            return {
                ...state,
                myMeals: {list: {}, isLoading: false, isError: true}
            };

        case FETCH_MEAL:
            return {
                ...state,
                selectedMeal: {isLoading: true, isError: false}
            };

        case FETCH_MEAL_DONE:
            return {
                ...state,
                selectedMeal: {isLoading: false, isError: false, ...action.payload.data}
            };

        case FETCH_MEAL_FAILED:
            return {
                ...state,
                selectedMeal: {isLoading: false, isError: true}
            };

        case SEARCH_MEALS: {
            return {
                ...state,
                allMeals: {list: {}, isLoading: true, isError: false}
            }
        }

        case SEARCH_MEALS_DONE: {
            return {
                ...state,
                allMeals: {
                    list: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    isLoading: false,
                    isError: false
                }
            }
        }

        case SEARCH_MEALS_FAILED: {
            return {
                ...state,
                allMeals: {list: {}, isLoading: false, isError: true}
            }
        }

        case FETCH_FAVOURITE_MEALS: {
            return {
                ...state,
                favourites: {list: {}, isLoading: true, isError: false}
            }
        }

        case FETCH_FAVOURITE_MEALS_DONE: {
            return {
                ...state,
                favourites: {
                    list: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    isLoading: false,
                    isError: false
                }
            }
        }

        case FETCH_FAVOURITE_MEALS_FAILED: {
            return {
                ...state,
                favourites: {
                    list: {},
                    isLoading: false,
                    isError: true
                }
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
                ...state,
                selectedMeal: {isLoading: true, isError: false}
            }
        }

        case EDIT_MEAL_DONE: {
            return {
                ...state,
                selectedMeal: {isLoading: false, isError: false, ...action.payload.data}
            }
        }

        case EDIT_MEAL_FAILED: {
            return {
                ...state,
                selectedMeal: {isLoading: false, isError: true}
            }
        }

        default:
            return state;
    }
}