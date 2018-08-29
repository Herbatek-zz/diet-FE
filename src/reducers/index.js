import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import ProductReducer from './productReducer';

const rootReducer = combineReducers({
    products: ProductReducer,
    form: formReducer
});

export default rootReducer;