import _ from 'lodash';

import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_DONE,
    CREATE_PRODUCT_FAILED,
    FETCH_PRODUCT,
    DELETE_PRODUCT,
    FETCH_PRODUCTS,
    FETCH_MY_PRODUCTS,
    SEARCH_PRODUCTS,
    FETCH_PRODUCTS_INFINITY,
    SEARCH_PRODUCTS_INFINITY
} from "../actions";


export default (state = {content: {}, created: {}}, action) => {
    switch (action.type) {

        case CREATE_PRODUCT: {
            console.log("Tworzenie");
            return {
                ...state,
                created: {isLoading: true, isError: false}
            }
        }

        case CREATE_PRODUCT_DONE: {
            console.log("Stworzono");
            return {
                ...state,
                created: {product: action.payload.data, isLoading: false, isError: false}
            }
        }

        case CREATE_PRODUCT_FAILED: {
            return {
                ...state,
                created: {isLoading: false, isError: true}
            }
        }

        case FETCH_PRODUCTS: {
            if (action.payload.data)
                return {
                    content: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    last: action.payload.data.last
                };
            return state;
        }

        case DELETE_PRODUCT:
            return {
                ...state.products,
                content: _.omit(state.products.content, action.payload)
            };

        case FETCH_PRODUCTS_INFINITY:
            return {
                content: {...state.content, ...(_.mapKeys(action.payload.data.content, 'id'))},
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements,
                last: action.payload.data.last
            };

        case FETCH_MY_PRODUCTS:
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements,
                last: action.payload.data.last
            };

        case FETCH_PRODUCT:
            return {
                ...state.products,
                content: {
                    ...state.content,
                    [action.payload.data.id]: action.payload.data
                }
            };

        case SEARCH_PRODUCTS: {
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements,
                last: action.payload.data.last
            }
        }

        case SEARCH_PRODUCTS_INFINITY: {
            return {
                content: {...state.content, ...(_.mapKeys(action.payload.data.content, 'id'))},
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements,
                last: action.payload.data.last
            }
        }

        default:
            return state;
    }
}