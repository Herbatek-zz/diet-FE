import _ from 'lodash';

import {FETCH_PRODUCT, FETCH_PRODUCTS} from "../actions";


export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS: {
            console.log({...state});
            return _.mapKeys(action.payload.data.content, 'id');
        }
        case FETCH_PRODUCT: {
            console.log({...state});
            return {...state, [action.payload.data.id]: action.payload.data};
        }
        default:
            return state;
    }
}