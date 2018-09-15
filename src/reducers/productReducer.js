import _ from 'lodash';

import {FETCH_PRODUCT, FETCH_PRODUCTS, FETCH_MY_PRODUCTS} from "../actions";


export default (state = {content: {}}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements
            };

        case FETCH_MY_PRODUCTS:
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements
            };

        case FETCH_PRODUCT:
            return {
                ...state.products,
                content: {
                    ...state.content,
                    [action.payload.data.id]: action.payload.data
                }
            };

        default:
            return state;
    }
}