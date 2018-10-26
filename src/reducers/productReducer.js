import _ from 'lodash';

import {
    FETCH_PRODUCT,
    DELETE_PRODUCT,
    FETCH_PRODUCTS,
    FETCH_MY_PRODUCTS,
    SEARCH_PRODUCTS,
    FETCH_PRODUCTS_INFINITY,
    SEARCH_PRODUCTS_INFINITY} from "../actions";


export default (state = {content: {}}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements,
                last: action.payload.data.last
            };

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