import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import ProductReducer from './productReducer';
import MealReducer from './mealReducer';
import CartReducer from './cartReducer';
import MenuNavReducer from './menuNavReducer';

const rootReducer = combineReducers({
    products: ProductReducer,
    meals: MealReducer,
    cart: CartReducer,
    form: formReducer,
    selectedMenuItem: MenuNavReducer
});

export default rootReducer;