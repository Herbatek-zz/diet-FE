import _ from 'lodash';

import {FETCH_PRODUCT, FETCH_PRODUCTS} from "../actions";


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS: {
            console.log({...state});
            return {
                content: _.mapKeys(action.payload.data.content, 'id'),
                currentPage: action.payload.data.pageNumber,
                pageSize: action.payload.data.pageSize,
                totalElements: action.payload.data.totalElements
            }
        }
        case FETCH_PRODUCT: {
            console.log({...state});
            return {
                ...state,
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