import _ from 'lodash';

import {FETCH_PRODUCT, FETCH_PRODUCTS} from "../actions";


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return _.mapKeys(action.payload.data.content, 'id');
        case FETCH_PRODUCT:
            return {...state, [action.payload.data.id]: action.payload.data};
        default:
            return state;
    }
}