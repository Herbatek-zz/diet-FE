import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import ProductReducer from './productReducer';
import MealReducer from './mealReducer';
import CartReducer from './cartReducer';
import MenuNavReducer from './menuNavReducer';
import UserReducer from './userReducer';
import LoggedUserReducer from './loggedUserReducer';

const rootReducer = combineReducers({
    products: ProductReducer,
    meals: MealReducer,
    cart: CartReducer,
    user: UserReducer,
    loggedUser: LoggedUserReducer,
    form: formReducer,
    selectedMenuItem: MenuNavReducer
});

export default rootReducer;