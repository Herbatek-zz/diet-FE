import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import ProductReducer from './productReducer';
import MealReducer from './mealReducer';

const rootReducer = combineReducers({
    products: ProductReducer,
    meals: MealReducer,
    form: formReducer
});

export default rootReducer;